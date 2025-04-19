$(document).ready(function() {
    // 本のページめくり設定
    $("#book").turn({
        width: 400,  /* 縦長本の幅 */
        height: 600, /* 縦長本の高さ */
        autoCenter: true, // 自動的に中央に配置
        display: 'single', // 一度に1ページ表示
        acceleration: true, // アニメーションのスムーズさを調整
        when: {
            turning: function(event, page, view) {
                console.log("ページ " + page + " をめくっています。");
            },
            turned: function(event, page, view) {
                console.log("ページ " + page + " がめくられました。");
            }
        }
    });
});
