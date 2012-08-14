(function() {

// Chrome bug: needs a poke to update the font size when resizing viewport
var repaint_on = $('#style_copy, #size_test_b')
$(window).resize(function() {
	repaint_on.css('z-index', 1);
});

// about dialog
$('#about_link').click(function() {
	$('#about').show(250);
	return false;
});
$('#about_close_link').click(function() {
	$('#about').hide(250);
	return false;
});

// show/hide
$('#show_hide').click(function() {
	$('#ui_content').toggle(250);
	return false;
});

function update_preview() {
	var hf = $('#horizontal_factor').val(),
		vf = $('#vertical_factor').val(),
		mp = $('#margin_percentage').val(),
		fs = $('#font_size').val(),
		fw = $('#fallback_viewport_width').val(), // width in px (fallback)
		fh = fw * vf / hf, // height in px (fallback)
		wh = (100 - 2 * mp), // height in vh when wider
		ww = wh * hf / vf, // width in vh when wider
		nw = (100 - 2 * mp), // width in vw when narrower
		nh = nw * vf / hf; // height in vw when narrower
	function generate_styles(base) {
		return [
		'/* scalabox: hf {{hf}}, vf {{vf}}, mp {{mp}}, fs {{fs}}, fw {{fw}} */',
		'{{base}} { position: absolute; }',
		'/* fallback code first for those who don\'t have vw/vh */',
		'{{base}} {',
		'	width: {{fw}}px;',
		'	height: {{fh}}px;',
		'	left: 50%;',
		'	top: 50%;',
		'	margin-left: -{{fw / 2}}px;',
		'	margin-top: -{{fh / 2}}px;',
		'}',
		'{{base}}, {{base}} * {',
		'	font-size: {{fh * fs / 100}}px;',
		'}',
		'{{base}} *.text_size_0_5, {{base}} *.text_size_0_5 * {',
		'	font-size: {{0.5 * fh * fs / 100}}px;',
		'}',
		'{{base}} *.text_size_0_75, {{base}} *.text_size_0_75 * {',
		'	font-size: {{0.75 * fh * fs / 100}}px;',
		'}',
		'{{base}} *.text_size_1_25, {{base}} *.text_size_1_25 * {',
		'	font-size: {{1.25 * fh * fs / 100}}px;',
		'}',
		'{{base}} *.text_size_1_5, {{base}} *.text_size_1_5 * {',
		'	font-size: {{1.5 * fh * fs / 100}}px;',
		'}',
		'{{base}} *.text_size_2, {{base}} *.text_size_2 * {',
		'	font-size: {{2 * fh * fs / 100}}px;',
		'}',
		'{{base}} *.text_size_3, {{base}} *.text_size_3 * {',
		'	font-size: {{3 * fh * fs / 100}}px;',
		'}',
		'/* now for what you came here for */',
		'/* wider or equal to {{hf}}:{{vf}} */',
		'@media all and (min-aspect-ratio: {{hf}}/{{vf}}) {',
		'	{{base}} {',
		'		width: {{ww}}vh;',
		'		height: {{wh}}vh;',
		'		left: 50%;',
		'		top: 50%;',
		'		margin-left: -{{ww / 2}}vh;',
		'		margin-top: -{{wh / 2}}vh;',
		'	}',
		'	{{base}}, {{base}} * {',
		'		font-size: {{wh * fs / 100}}vh;',
		'	}',
		'	{{base}} *.text_size_0_5, {{base}} *.text_size_0_5 * {',
		'		font-size: {{0.5 * wh * fs / 100}}vh;',
		'	}',
		'	{{base}} *.text_size_0_75, {{base}} *.text_size_0_75 * {',
		'		font-size: {{0.75 * wh * fs / 100}}vh;',
		'	}',
		'	{{base}} *.text_size_1_25, {{base}} *.text_size_1_25 * {',
		'		font-size: {{1.25 * wh * fs / 100}}vh;',
		'	}',
		'	{{base}} *.text_size_1_5, {{base}} *.text_size_1_5 * {',
		'		font-size: {{1.5 * wh * fs / 100}}vh;',
		'	}',
		'	{{base}} *.text_size_2, {{base}} *.text_size_2 * {',
		'		font-size: {{2 * wh * fs / 100}}vh;',
		'	}',
		'	{{base}} *.text_size_3, {{base}} *.text_size_3 * {',
		'		font-size: {{3 * wh * fs / 100}}vh;',
		'	}',
		'}',
		'/* narrower or equal to {{hf}}:{{vf}} */',
		'@media all and (max-aspect-ratio: {{hf}}/{{vf}}) {',
		'	{{base}} {',
		'		width: {{nw}}vw;',
		'		height: {{nh}}vw;',
		'		left: 50%;',
		'		top: 50%;',
		'		margin-left: -{{nw / 2}}vw;',
		'		margin-top: -{{nh / 2}}vw;',
		'	}',
		'	{{base}} * {',
		'		font-size: {{nh * fs / 100}}vw;',
		'	}',
		'	{{base}} *.text_size_0_5, {{base}} *.text_size_0_5 * {',
		'		font-size: {{0.5 * nh * fs / 100}}vw;',
		'	}',
		'	{{base}} *.text_size_0_75, {{base}} *.text_size_0_75 * {',
		'		font-size: {{0.75 * nh * fs / 100}}vw;',
		'	}',
		'	{{base}} *.text_size_1_25, {{base}} *.text_size_1_25 * {',
		'		font-size: {{1.25 * nh * fs / 100}}vw;',
		'	}',
		'	{{base}} *.text_size_1_5, {{base}} *.text_size_1_5 * {',
		'		font-size: {{1.5 * nh * fs / 100}}vw;',
		'	}',
		'	{{base}} *.text_size_2, {{base}} *.text_size_2 * {',
		'		font-size: {{2 * nh * fs / 100}}vw;',
		'	}',
		'	{{base}} *.text_size_3, {{base}} *.text_size_3 * {',
		'		font-size: {{3 * nh * fs / 100}}vw;',
		'	}',
		'}',
		'/* end scalabox */'
		].map(function(line) {
			return line.replace(/{{(.+?)}}/g, function(m, p) {
				return eval(p);
			});
		}).join('\n');
		// A quick 'expression interpolation' hack here seriously cuts down on
		// code size and ugly' + entries / exits * from + 'strings and improves
		// clarity even though people think eval() == evil().
	}
	$('#style_copy').val(generate_styles($('#element_selector').val()));
	$('#preview_style').text(generate_styles('#preview_box'));
}

$('input').change(update_preview);
update_preview();

})();
