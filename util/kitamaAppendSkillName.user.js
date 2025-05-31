// ==UserScript==
// @name         kitamaAppendSkillName
// @namespace    https://kurone.co//
// @version      0.1
// @description  スキル選択のアイコンにスキル名が出ます。
// @author       skrige
// @match        https://wdrb.work/otherside/area.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wdrb.work
// @grant        GM_addStyle
// ==/UserScript==

(($)=>{
    $('ul.act_choice>li[data-skilltarget]').each(function(){
        $(this).append(`<div class="appendName">${$(this).data('tippy-content')}</div>`);
    })
   GM_addStyle('ul.act_choice>li[data-skilltarget]{position:relative} .appendName{position:absolute;bottom:0;max-width:100%;background-color:rgba(0,0,0,0.55);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:60%;padding:1px}');

})(jQuery);