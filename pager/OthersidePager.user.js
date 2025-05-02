// ==UserScript==
// @name         OthersidePager
// @namespace    https://kurone.co/
// @version      0.1
// @description  いつものちょい改変スクリプト
// @author       skrige
// @match        https://wdrb.work/otherside/profile.php?eno=*
// @grant        GM_addStyle
// ==/UserScript==
/* global jQuery:false */

//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
//　機能説明
//　・プロフページのステータスの上に隣のENOに移動できるリンク追加
//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

(($) => {
    const url = new URLSearchParams(new URL(window.location).search);
    const id = Number(url.get('eno'));
    const buffer = '<section class="container" id="pager">'+((id!=1)?'<a href="./profile.php?eno='+ (id-1)+'">◀ prev</a>':'◀ prev')+'<a href="./profile.php?eno='+ (id+1)+'">next ▶</a></div>';
    $("section.container.profile.status").before(buffer);
    GM_addStyle("#pager{display:flex;justify-content:space-between;align-items:center;padding:4px 1em;opacity:0.6;}#pager a{text-decoration: none;}");


})(jQuery);