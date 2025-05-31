// ==UserScript==
// @name         kitamaTabNameChanger
// @namespace    https://kurone.co/
// @version      0.1
// @description  アクティブティ画面のタブ名に現在地を追加します
// @author       skrige
// @match        https://wdrb.work/otherside/area.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wdrb.work
// @grant        none
// ==/UserScript==

(($)=>{
  if($('#info_form > div > p > b').length>0) document.title = '['+ $('#info_form > div > p > b').text()+'] ' + document.title
})(jQuery);