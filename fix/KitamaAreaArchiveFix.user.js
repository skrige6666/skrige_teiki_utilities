// ==UserScript==
// @name         KitamaAreaArchiveFix
// @namespace    https://kurone.co/
// @version      v0
// @description  修正されるまでの代用品
// @author       skrige
// @match        https://wdrb.work/otherside/area.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wdrb.work
// @grant        none
// ==/UserScript==

/* めちゃくちゃ雑な対応をしています */

(($)=> {
    $('a[href="area.php?list=1&p_id=0&archived=1#chat"]').attr('href','area.php?list=1&archived=1#chat');
    $('a[href="area.php?list=2&p_id=0&archived=1#chat"]').attr('href','area.php?list=2&archived=1#chat');
    $('a[href="area.php?list=3&p_id=0&archived=1#chat"]').attr('href','area.php?list=3&archived=1#chat');
    $('a[href="area.php?list=4&p_id=0&archived=1#chat"]').attr('href','area.php?list=4&archived=1#chat');
    $('a[href="area.php?list=5&p_id=0&archived=1#chat"]').attr('href','area.php?list=5&archived=1#chat');
    $('a[href="area.php?list=6&p_id=0&archived=1#chat"]').attr('href','area.php?list=6&archived=1#chat');
    $('a[href="area.php?list=7&p_id=0&archived=1#chat"]').attr('href','area.php?list=7&archived=1#chat');
})(jQuery);