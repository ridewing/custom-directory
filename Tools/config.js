var base 	= '../deploy/wp-content/themes/eskilstuna/X-Press/ui/include';
var scripts = base + '/src/js';
var styles 	= base + '/src/css';
var deploy  = base + '/deploy';

module.exports = {
	files : {
		javascript: [
			// Libs
			scripts + '/lib/jquery-1.8.3.min.js',
			scripts + '/lib/jquery-ui-1.9.2.custom.min.js',
			scripts + '/lib/jquery.cookie.js',
			scripts + '/lib/jquery.fitvid.js',
			scripts + '/lib/modernizr-2.0.6.js',
			scripts + '/lib/fastclick.js',
			scripts + '/lib/jquery.flexslider.js',
			scripts + '/lib/jquery.superbgimage.min.js',
			//scripts + '/lib/infobox_packed.js',

			// Greensock lib
			scripts + '/lib/greensock/TweenLite.min.js',
			scripts + '/lib/greensock/plugins/CSSPlugin.min.js',
			scripts + '/lib/greensock/easing/EasePack.min',

			// Core
			'../deploy/wp-content/plugins/x-press/js/core.js',
			'../deploy/wp-content/plugins/x-press/js/spin.min.js',

			// Site
			scripts + '/helpers.js',
			scripts + '/youtube.js',
			scripts + '/guide.js',
			scripts + '/social.js',
			scripts + '/globalSearch.js',
			scripts + '/listSearch.js',
			scripts + '/eventSearch.js',
			scripts + '/lib/infobox_packed.js',
			scripts + '/map.js',
			scripts + '/site.js'
		],
		stylesheet : [
			styles + '/reset.less',
			styles + '/style.less',
			styles + '/jquery-ui-1.9.2.custom.less',
			styles + '/flexslider.less',
			styles + '/media_queries.less',
			styles + '/ie.less'
		]
	},
	styles : styles,
	scripts : scripts,
	output : deploy
};
