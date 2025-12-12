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
            'general_image': '&#xe988;',
            'general_file': '&#xe986;',
            'general_film': '&#xe987;',
            'general_security': '&#xe985;',
            'user_access': '&#xe982;',
            'register_cartable': '&#xe983;',
            'financial_cartable': '&#xe984;',
            'general_loading': '&#xe97d;',
            'general_android': '&#xe97c;',
            'general_academy_play': '&#xe97f;',
            'general_academy_play_content': '&#xe980;',
            'general_academy': '&#xe97e;',
            'general_academy_content': '&#xe981;',
            'general_debug': '&#xe977;',
            'finance_financial_report': '&#xe97b;',
            'general_access': '&#xe978;',
            'general_refresh': '&#xe979;',
            'general_view': '&#xe97a;',
            'general_copy_clipboard': '&#xe976;',
            'link_chart': '&#xe959;',
            'link_spinner': '&#xe96a;',
            'general_shake_hand': '&#xe96b;',
            'general_cake': '&#xe96c;',
            'general_redo': '&#xe96d;',
            'badge_ok': '&#xe96e;',
            'unlock_after': '&#xe96f;',
            'lock_pre': '&#xe970;',
            'lock_progress': '&#xe971;',
            'lock_after': '&#xe972;',
            'settings_setting': '&#xe973;',
            'settings_moon': '&#xe974;',
            'settings_sun': '&#xe975;',
            'arrow_down': '&#xe900;',
            'arrow_left': '&#xe901;',
            'arrow_right': '&#xe902;',
            'arrow_up': '&#xe903;',
            'check_check': '&#xe904;',
            'check_check_selected': '&#xe905;',
            'chevron_down': '&#xe906;',
            'chevron_left': '&#xe907;',
            'chevron_right': '&#xe908;',
            'chevron_up': '&#xe909;',
            'contact_contact': '&#xe90a;',
            'contact_contact_selected': '&#xe90b;',
            'customer_add_user': '&#xe90c;',
            'customer_all': '&#xe90d;',
            'customer_contacts': '&#xe90e;',
            'customer_edit_profile': '&#xe90f;',
            'customer_group': '&#xe910;',
            'customer_user': '&#xe911;',
            'customer_user_delete': '&#xe912;',
            'date_calendar': '&#xe913;',
            'date_clock': '&#xe914;',
            'download_download': '&#xe915;',
            'download_upload': '&#xe916;',
            'edit_edit': '&#xe917;',
            'edit_edit_outline': '&#xe918;',
            'emoji_happy': '&#xe919;',
            'emoji_laugh': '&#xe91a;',
            'emoji_mad': '&#xe91b;',
            'emoji_poker': '&#xe91c;',
            'emoji_sad': '&#xe91d;',
            'finance_bank_card': '&#xe91e;',
            'finance_gift': '&#xe91f;',
            'finance_gift_card': '&#xe920;',
            'finance_love_card': '&#xe921;',
            'finance_money': '&#xe922;',
            'finance_terminal': '&#xe923;',
            'finance_wallet': '&#xe924;',
            'general_call_center': '&#xe925;',
            'general_copy': '&#xe926;',
            'general_delete': '&#xe927;',
            'general_empty_state': '&#xe928;',
            'general_exit': '&#xe929;',
            'general_filter': '&#xe92a;',
            'general_more': '&#xe92b;',
            'general_notification': '&#xe92c;',
            'general_retry': '&#xe92d;',
            'general_search': '&#xe92e;',
            'general_search_filter': '&#xe92f;',
            'general_setting': '&#xe930;',
            'general_share': '&#xe931;',
            'home_home': '&#xe932;',
            'home_home_selected': '&#xe933;',
            'info_info': '&#xe934;',
            'info_info_outline': '&#xe935;',
            'link_blog': '&#xe936;',
            'link_catalog': '&#xe937;',
            'link_customer_info': '&#xe938;',
            'link_link_outline': '&#xe939;',
            'link_menu': '&#xe93a;',
            'links_link': '&#xe93b;',
            'link_link': '&#xe93c;',
            'link_visit_card': '&#xe93d;',
            'link_web': '&#xe93e;',
            'marketing_marketing': '&#xe93f;',
            'marketing_marketing_selected': '&#xe940;',
            'math_check': '&#xe941;',
            'math_check_outline': '&#xe942;',
            'math_close': '&#xe943;',
            'math_close_outline': '&#xe944;',
            'math_minus': '&#xe945;',
            'math_minus_outline': '&#xe946;',
            'math_plus': '&#xe947;',
            'math_plus_outline': '&#xe948;',
            'msg_close': '&#xe949;',
            'msg_edit': '&#xe94a;',
            'msg_normal': '&#xe94b;',
            'msg_send': '&#xe94c;',
            'msg_sending': '&#xe94d;',
            'msg_type_love': '&#xe94e;',
            'msg_type_simple': '&#xe94f;',
            'msg_type_smile': '&#xe950;',
            'msg_type_survey': '&#xe951;',
            'msg_type_thanks': '&#xe952;',
            'msg_wait': '&#xe953;',
            'profile_not_selected': '&#xe954;',
            'profile_selected': '&#xe955;',
            'question_question': '&#xe956;',
            'question_question_outline': '&#xe957;',
            'radio_radio_not_selected': '&#xe958;',
            'send_message_send': '&#xe95a;',
            'send_message_send_selected': '&#xe95b;',
            'sort_down': '&#xe95c;',
            'sort_up': '&#xe95d;',
            'store_direction': '&#xe95e;',
            'store_location': '&#xe95f;',
            'store_mobile': '&#xe960;',
            'store_phone': '&#xe961;',
            'store_store': '&#xe962;',
            'store_trolly': '&#xe963;',
            'toggle_off': '&#xe964;',
            'toggle_on': '&#xe965;',
            'trend_down': '&#xe966;',
            'trend_down_outline': '&#xe967;',
            'trend_up': '&#xe968;',
            'trend_up_outline': '&#xe969;',
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
                if (/app-icon-/.test(classes)) {
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
