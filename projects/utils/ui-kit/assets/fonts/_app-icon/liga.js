/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'eye_slash': '&#xe92c;',
            'eye': '&#xe92d;',
            'arrow_right_from_bracket': '&#xe92b;',
            'trash': '&#xe929;',
            'trash_alt': '&#xe92a;',
            'image': '&#xe926;',
            'file': '&#xe927;',
            'file_alt': '&#xe928;',
            'chevron_down': '&#xe91c;',
            'chevron_left': '&#xe91d;',
            'chevron_right': '&#xe91e;',
            'chevron_up': '&#xe91f;',
            'circle_close': '&#xe920;',
            'warning': '&#xe921;',
            'close': '&#xe922;',
            'check': '&#xe923;',
            'check_circle': '&#xe924;',
            'info_circle': '&#xe925;',
            'bell': '&#xe900;',
            'at': '&#xe901;',
            'sort_asc': '&#xe902;',
            'sort_desc': '&#xe903;',
            'phone_square': '&#xe904;',
            'phone': '&#xe905;',
            'mobile': '&#xe906;',
            'user_gear': '&#xe907;',
            'user_friends': '&#xe908;',
            'user_edit': '&#xe909;',
            'user_check': '&#xe90a;',
            'user_circle': '&#xe90b;',
            'user': '&#xe90c;',
            'minus': '&#xe90d;',
            'minus_circle': '&#xe90e;',
            'minus_square': '&#xe90f;',
            'plus': '&#xe910;',
            'plus_circle': '&#xe911;',
            'plus_square': '&#xe912;',
            'search': '&#xe913;',
            'search_plus': '&#xe914;',
            'share': '&#xe915;',
            'share_square': '&#xe916;',
            'comment': '&#xe917;',
            'gear': '&#xe918;',
            'heart': '&#xe919;',
            'message': '&#xe91a;',
            'home': '&#xe91b;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
