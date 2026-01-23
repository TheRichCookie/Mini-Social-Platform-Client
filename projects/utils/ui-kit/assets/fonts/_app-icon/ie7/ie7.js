/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'app-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-question-circle': '&#xe92e;',
		'icon-dizzy': '&#xe92f;',
		'icon-eye-slash': '&#xe92c;',
		'icon-eye': '&#xe92d;',
		'icon-arrow-right-from-bracket': '&#xe92b;',
		'icon-trash': '&#xe929;',
		'icon-trash-alt': '&#xe92a;',
		'icon-image': '&#xe926;',
		'icon-file': '&#xe927;',
		'icon-file-alt': '&#xe928;',
		'icon-chevron-down': '&#xe91c;',
		'icon-chevron-left': '&#xe91d;',
		'icon-chevron-right': '&#xe91e;',
		'icon-chevron-up': '&#xe91f;',
		'icon-circle-close': '&#xe920;',
		'icon-warning': '&#xe921;',
		'icon-close': '&#xe922;',
		'icon-check': '&#xe923;',
		'icon-check-circle': '&#xe924;',
		'icon-info-circle': '&#xe925;',
		'icon-bell': '&#xe900;',
		'icon-at': '&#xe901;',
		'icon-sort-up': '&#xe902;',
		'icon-sort-desc': '&#xe903;',
		'icon-phone-square': '&#xe904;',
		'icon-phone': '&#xe905;',
		'icon-mobile': '&#xe906;',
		'icon-user-gear': '&#xe907;',
		'icon-user-friends': '&#xe908;',
		'icon-user-edit': '&#xe909;',
		'icon-user-check': '&#xe90a;',
		'icon-user-circle': '&#xe90b;',
		'icon-user': '&#xe90c;',
		'icon-minus': '&#xe90d;',
		'icon-minus-circle': '&#xe90e;',
		'icon-minus-square': '&#xe90f;',
		'icon-plus': '&#xe910;',
		'icon-plus-circle': '&#xe911;',
		'icon-plus-square': '&#xe912;',
		'icon-search': '&#xe913;',
		'icon-search-plus': '&#xe914;',
		'icon-share': '&#xe915;',
		'icon-share-square': '&#xe916;',
		'icon-comment': '&#xe917;',
		'icon-gear': '&#xe918;',
		'icon-heart': '&#xe919;',
		'icon-message': '&#xe91a;',
		'icon-home': '&#xe91b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
