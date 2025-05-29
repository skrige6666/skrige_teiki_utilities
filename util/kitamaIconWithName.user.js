// ==UserScript==
// @name         kitamaIconWithName
// @namespace    https://kurone.co/
// @description  アイコン選択に名前を連動させたい
// @author       skrige
// @version      v0-beta.1
// @match        https://wdrb.work/otherside/area.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wdrb.work
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const icon_mapping = {};
(($) => {
  // 保存されているマッピングデータがあれば取得する
  const savedMapping = GM_getValue("iconNameMapping", "{}");
  if (savedMapping !== "{}") {
    try {
      Object.assign(icon_mapping, JSON.parse(savedMapping));
    } catch (e) {
      // JSONパースに失敗した場合は空のオブジェクトのまま処理を続行
      console.error("マッピングデータの読み込みに失敗しました:", e);
    }
  }

  // デバッグ用：マッピングデータの内容を確認
  //console.log("現在のマッピングデータ:", icon_mapping);

  // 画像リストを取得
  const imgList = $("img.choosing_icon");

  // マッピングから画面に存在しないアイコンを削除する
  Object.keys(icon_mapping).forEach(function (icon) {
    if (!$(`img[src="${icon}"]`).length) {
      delete icon_mapping[icon];
    }
  });

  // mappingになければ空の名前で追加
  imgList.each(function () {
    const img = $(this);
    const icon = img.attr("src");
    if (!icon_mapping[icon]) {
      icon_mapping[icon] = "";
    }
  });

  // 初期ネームを取得
  const initialChatName = $('#chat_form input[name="nickname"]').val();
  const initialMessageName = $('#message_form input[name="nickname"]').val();
  let lastSelectName = "";

  // アイコン選択時に名前を自動設定
  $(document).on("click", ".choosing_icon", function () {
    const chatName = $('#chat_form input[name="nickname"]').val();
    const messageName = $('#message_form input[name="nickname"]').val();
    //入力欄が初期ネーム、最後に選択した名前、空欄のいずれでもない場合は処理を中止
    if (
      (chatName !== initialChatName &&
        chatName !== lastSelectName &&
        chatName !== "") ||
      (messageName !== initialMessageName &&
        messageName !== lastSelectName &&
        messageName !== "")
    ) {
      return;
    }
    var choice = $(this).data().img;
    var name = icon_mapping[choice];
    // 名前の設定があれば入力欄に設定、なければ初期ネームに戻す
    if (name) {
      lastSelectName = name;
      $('input[name="nickname"]').val(name);
    } else {
      $('input[name="nickname"]').val(initialName);
    }
  });
  //モーダル展開ボタンの配置
  // マッピング編集ボタンを一番前に追加
  $("div.view_chats").prepend(
    '<form><div id="edit_mapping">アイコンマッピング</div></form>'
  );

  //マッピング編集モーダルを作成する
  $(document).on("click", "#edit_mapping", function () {
    //すでにある場合は一度削除
    $("div.modal[data-modal='mapping_modal']").remove();
    //html生成
    var html = '<div class="modal" data-modal="mapping_modal">';
    html += '<div class="modal-content">';
    html += "<h2>表示名編集</h2>";
    html += "<table>";
    html += "<tr><th>アイコン</th><th>名前</th></tr>";
    // 現在のアイコンリストの順番でマッピングデータをテーブルに追加
    imgList.each(function () {
      const icon = $(this).attr("src");
      const name = icon_mapping[icon] || "";
      html += `<tr><td><img src="${icon}" style="width:60px"></td><td><input type="text" value="${name}"></td></tr>`;
    });
    html += "</table>";
    html +=
      '<div class="skill_buttons"><button id="save_mapping" type="button">保存</button>';
    html +=
      '<button id="cancel_mapping" type="button">キャンセル</button></div>';
    html += "</div>";
    // モーダルを開く
    $("body").append(html);
    modalOpen('div.modal[data-modal="mapping_modal"]');
  });
  //マッピングを保存する
  $(document).on("click", "#save_mapping", function () {
    var icon_mapping = {};
    $('.modal input[type="text"]').each(function () {
      var icon = $(this).closest("tr").find("img").attr("src");
      var name = $(this).val();
      icon_mapping[icon] = name;
    });
    // マッピングを保存
    GM_setValue("iconNameMapping", JSON.stringify(icon_mapping));
    modalClose();
  });

  //マッピングをキャンセルする
  $(document).on("click", "#cancel_mapping", function () {
    modalClose();
  });

  //モーダルを開く target:対象要素, style:表示スタイル
  function modalOpen(target, style = "block") {
    $(target).css("display", style);
    $("div#overlay").css("display", "block");
  }
  //モーダルを閉じる
  function modalClose() {
    $("div.modal").css("display", "none");
    $("div#overlay").css("display", "none");
    //console.log(icon_mapping);
  }
})(jQuery);
