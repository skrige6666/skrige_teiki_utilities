// ==UserScript==
// @name         fs_improve_css.user.js
// @namespace    https://kurone.co/
// @version      0.1
// @description  童話画廊のCSSをちょっと良くする
// @author       skrige
// @match        http://soraniwa.428.st/fs/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=428.st
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    //スキルツールチップ
    GM_addStyle('#skill td:nth-child(4){position:relative;}.fulldesc{position:absolute;top:calc(100% + 0.2em); pointer-events:none;left:0.5em;right:-0.5em;z-index:200;}tr.odd .fulldesc{background-color: #463020;}tr.even .fulldesc{background-color: #40291c;}');
    //プレビューの横幅調整
    GM_addStyle('#t0{width:481px;}');

})();
