// ==UserScript==
// @name         KitamaProfileQuickOpen
// @namespace    https://kurone.co/
// @version      v0
// @description  try to take over the world!
// @author       skrige
// @match        https://wdrb.work/otherside/charalist.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wdrb.work
// @grant        GM.openInTab
// ==/UserScript==

//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
//　機能説明
//　・キャラリストでミドルクリックで直接タブを開く
//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ==/UserScript==

(($) => {
    'use strict';
    $('div.charaCard').on('mousedown', function(event) {
            console.log('middle');
        if (event.which === 2) {
            var url = 'https://wdrb.work/otherside/profile.php?eno='+ $(this).attr('data-eno');
            if (url) {
                GM.openInTab(url, true);
                event.preventDefault();
                event.stopPropagation();
            }
        }
        });
})(jQuery);
