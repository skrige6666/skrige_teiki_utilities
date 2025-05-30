// ==UserScript==
// @name         kitamaIconWithName
// @namespace    https://kurone.co/
// @description  アイコン選択に名前を連動させたい
// @author       skrige
// @version      v1.2
// @match        https://wdrb.work/otherside/area.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wdrb.work
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// ==/UserScript==

//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
//　・アイコン選択時にURLに対応する発言者名を連動させます
//　・チャット及びメッセージの現在の発言者欄が
//　　　ページ表示時の名前、
//　　　最後に選んだアイコンの名前、
//　　　空欄
//　　の場合にのみ上書きします。
//　　動作しないなとおもったらメッセージの方で違う名前が入力されているかもしれません。
//　・空欄への自動変更は対応していません。空欄の場合変更しないという動作になります。
//　・ページ下部にアイコンマッピングボタンを追加します
//　・URLで管理しているため、アイコンを並び替えても保持されます
//　・ユーザースクリプトなので当然ながら別のブラウザでは見れません
//　・あんまりアイコンが大量だと動作しなくなるかも
//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
//
// 最終更新　マルチアカウント対応
//
//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

const icon_mapping = {};
(($) => {
  const eno = $("#prof > div.charaBanner.cap > a").attr("href").replace(
    /profile?eno=(\d+)/,
    "$1"
  )||0;
  const keys = GM_listValues();
  const savedMapping = keys.includes("iconNameMapping_" + eno)
    ? GM_getValue("iconNameMapping_" + eno, "{}")
    : GM_getValue("iconNameMapping", "{}");//過去バージョン対応用
  if (savedMapping !== "{}") {
    try {
      Object.assign(icon_mapping, JSON.parse(savedMapping));
    } catch (e) {
      console.error("アイコンマッピングデータの読み込みに失敗:", e);
    }
  }

  const imgList = $("img.choosing_icon");

  Object.keys(icon_mapping).forEach(function (icon) {
    if (!$(`img[src="${icon}"]`).length) {
      delete icon_mapping[icon];
    }
  });

  imgList.each(function () {
    const img = $(this);
    const icon = img.attr("src");
    if (!icon_mapping[icon]) {
      icon_mapping[icon] = "";
    }
  });

  const initialChatName = $('#chat_form input[name="nickname"]').val();
  const initialMessageName = $('#message_form input[name="nickname"]').val();
  let lastSelectName = "";

  $(document).on("click", ".choosing_icon", function () {
    const chatName = $('#chat_form input[name="nickname"]').val();
    const messageName = $('#message_form input[name="nickname"]').val();
    if (
      (chatName !== initialChatName &&
        chatName !== lastSelectName &&
        chatName !== "") ||
      (messageName !== initialMessageName &&
        messageName !== lastSelectName &&
        messageName !== "")
    ) {
      console.log("名前が手動で変更されているので中止");
      return;
    }
    var choice = $(this).data().img;
    var name = icon_mapping[choice];
    if (name) {
      lastSelectName = name;
      $('#chat_form input[name="nickname"]').val(name);
      $('#message_form input[name="nickname"]').val(name);
    } else {
      $('#chat_form input[name="nickname"]').val(initialChatName);
      $('#message_form input[name="nickname"]').val(initialMessageName);
    }
  });

  $("div.view_chats").prepend(
    '<form><div id="edit_mapping">アイコンマッピング</div></form>'
  );

  $(document).on("click", "#edit_mapping", function () {
    $("div.modal[data-modal='mapping_modal']").remove();
    var html = '<div class="modal" data-modal="mapping_modal">';
    html += '<div class="modal-content">';
    html += "<h2>表示名編集</h2>";
    html += "<table>";
    html += "<tr><th>アイコン</th><th>名前</th></tr>";
    const displayedUrls = new Set();
    imgList.each(function () {
      const icon = $(this).attr("src");
      if (displayedUrls.has(icon)) {
        return;
      }
      displayedUrls.add(icon);

      const name = icon_mapping[icon] || "";
      html += `<tr><td><img src="${icon}" style="width:60px"></td><td><input type="text" value="${name}"></td></tr>`;
    });
    html += "</table>";
    html +=
      '<div class="skill_buttons"><button id="save_mapping" type="button">保存</button>';
    html +=
      '<button id="cancel_mapping" type="button">キャンセル</button></div>';
    html += "</div>";
    $("body").append(html);
    modalOpen('div.modal[data-modal="mapping_modal"]');
  });

  $(document).on("click", "#save_mapping", function () {
    $('.modal input[type="text"]').each(function () {
      var icon = $(this).closest("tr").find("img").attr("src");
      var name = $(this).val();
      icon_mapping[icon] = name;
    });
    GM_setValue("iconNameMapping_" + eno, JSON.stringify(icon_mapping));
    modalClose();
  });

  $(document).on("click", "#cancel_mapping", function () {
    modalClose();
  });

  function modalOpen(target, style = "block") {
    $(target).css("display", style);
    $("div#overlay").css("display", "block");
  }

  function modalClose() {
    $("div.modal").css("display", "none");
    $("div#overlay").css("display", "none");
  }
})(jQuery);
