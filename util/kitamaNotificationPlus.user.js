// ==UserScript==
// @name         kitamaNotificationPlus
// @namespace    https://kurone.co/
// @version      0.1-beta-3
// @description  未読が有ったら通知が出ます。
// @author       skrige
// @match        https://wdrb.work/otherside/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// ***このスクリプトは未読チェックのために5分おきに自動で通信を行います。***

// ***このスクリプトは未読チェックのために5分おきに自動で通信を行います。***

// ***このスクリプトは未読チェックのために5分おきに自動で通信を行います。***

// 実験的実装があります。
// 何か問題が発生した場合は、スクリプトを無効化してください。
// 導入は自己責任であり、このスクリプトを利用したことで何か問題が発生しても、一切の責任を負えません。

//　機能
// 未読のINFOやSURFがある場合に通知を出します。
// 5分おきにINFOやSURFの未読フラグをチェックします。(home画面を利用します。画像等の取得は有りませんが通信が発生します。)
// そのブラウザでの最後アクセス以降に「言及」「メッセージ」を含むACTIVITY更新があった場合に通知を出します。
// (※アクティビティ処理はアクセスタイミングやタブ切り替えのタイミングで多少前後する場合があります)

// 最終更新 言及のチェックをマルチアカウント対応に変更

(($) => {
    const eno = $("#prof > div.charaBanner.cap > a").attr("href").replace(
    /profile?eno=(\d+)/,
    "$1"
  )||0;
  let currentTime = new Date().getTime();

  //ページ読み込み時の処理
  // 現在のページがinfo.phpの場合はスキップ
  if (window.location.href.indexOf("info.php") === -1) {
    $('a.new[href="info.php"]').length > 0
      ? notification("未読のINFOがあります。")
      : null;
  }
  // 現在のページがsurf.phpの場合はスキップ
  if (window.location.href.indexOf("surf.php") === -1) {
    $('a.new[href="surf.php"]').length > 0
      ? notification("未読のSURFメッセージがあります。")
      : null;
  }

  // 最終アクティブ時間以降のアクティビティチェック
  const lastActiveTime = Number(GM_getValue("lastActiveTime_"+eno, GM_getValue("lastActiveTime",null)));
  if (lastActiveTime) {
    const $activities = $("ul.activity li");
    $activities.each(function () {
      // 「2025-06-04 00:13:10」形式の日時文字列をDateオブジェクトに変換
      const activityTime = new Date(
        $(this)
          .find("small.gray")
          .text()
          .replace(
            /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/,
            "$1/$2/$3 $4:$5:$6"
          )
      ).getTime();
      if (activityTime > lastActiveTime) {
        // pのテキスト内に「言及」「メッセージ」が含まれている場合のみ通知
        const activityText = $(this).find("p").text().trim();
        if (
          activityText.includes("言及") ||
          activityText.includes("メッセージ")
        ) {
          notification("新しいアクティビティ", $(this).find("p").text().trim());
        }
      }
    });
  }
  GM_setValue("lastActiveTime_"+eno, currentTime);

  let checkInterval = null;
  let lastCheckTime = currentTime;

  $(document).on("visibilitychange", function () {
    currentTime = new Date().getTime();
    if (document.visibilityState === "hidden") {
        //ブラウザのタブが非表示になった時の処理
      //取得インターバルをクリア
      clearInterval(checkInterval);

      // 最終チェックタイムから5分経過している場合は最終操作時間を更新
      if (lastCheckTime && currentTime - lastCheckTime >= 5 * 60 * 1000) {
        GM_setValue("lastActiveTime_"+eno, currentTime);
      }
    } else {
      //取得インターバルを設定
      checkInterval = setInterval(checkUnread, 5 * 60 * 1000);
      // 最終チェックタイムから5分経過している場合は処理と最終操作時間を更新
      if (lastCheckTime && currentTime - lastCheckTime >= 5 * 60 * 1000) {
        checkUnread();
        GM_setValue("lastActiveTime_"+eno, currentTime);
      }
    }
  });
  async function checkUnread() {
    //lastchecktimeを更新
    lastCheckTime = new Date().getTime();
    $.ajax({
      url: "https://wdrb.work/otherside/home.php",
      type: "GET",
      success: function (data) {
        // 受信したHTMLをjQueryオブジェクトに変換
        const $html = $(data);

        // INFO、SURFの未読チェック
        if ($html.find('a.new[href="info.php"]').length > 0) {
          notification("未読のINFOがあります。");
          $('a[href="info.php"]').addClass("new");
        } else {
          $('a[href="info.php"]').removeClass("new");
        }
        if ($html.find('a.new[href="surf.php"]').length > 0) {
          notification("未読のSURFメッセージがあります。");
          $('a[href="surf.php"]').addClass("new");
        } else {
          $('a[href="surf.php"]').removeClass("new");
        }
      },
      error: function (xhr, status, error) {
        // エラーハンドリング
        console.error(error);
      },
    });
  }

  function notification(title, text = null) {
    $("div.noticearea").append(
      $(
        `<div class="notice"><p><span class="red">${title}</span>${
          text ? "<br>" + text : ""
        }</p></div>`
      )
    );
  }
})(jQuery);
