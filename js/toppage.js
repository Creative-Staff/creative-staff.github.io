// ----------------------------------------------------------------------------
// 設定
// ----------------------------------------------------------------------------

// ゲームランチャーと同じ配信元(games.json と toppage.json と画像を置いている場所)
const WEBPAGE_URL = 'https://cs-launcher-api.akane-minori-cslauncher.workers.dev';


// ----------------------------------------------------------------------------
// ロゴフェード
// ----------------------------------------------------------------------------

$(function() {
    // 0.1秒後にロゴをフェードイン
    setTimeout(function() {
        $('.fadeOut p').fadeIn(1600);
    }, 100);

    // 0.9秒後にロゴ含め真っ白背景をフェードアウト
    setTimeout(function() {
        $('.fadeOut').fadeOut(500);
    }, 900);
});


// ----------------------------------------------------------------------------
// ゲームサムネ
// ----------------------------------------------------------------------------

/** ゲームIDと相対パスから、画像のURLを組み立てる(日本語・スペース対応) */
function assetUrl(gameId, path) {
    const encodedPath = path.split('/').map(encodeURIComponent).join('/');
    return `${WEBPAGE_URL}/games/${encodeURIComponent(gameId)}/${encodedPath}`;
}

/** toppage.json(ゲームIDの一覧)と games.json を読んで、スライダーに画像を並べる */
async function loadSliderGames() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    try {
        const [idsRes, gamesRes] = await Promise.all([
            fetch(`${WEBPAGE_URL}/toppage.json`),
            fetch(`${WEBPAGE_URL}/games.json`),
        ]);
        if (!idsRes.ok) throw new Error(`toppage.json: HTTP ${idsRes.status}`);
        if (!gamesRes.ok) throw new Error(`games.json: HTTP ${gamesRes.status}`);

        const ids = await idsRes.json();
        const games = await gamesRes.json();

        // IDで games.json を引く(見つからないIDは飛ばす)
        const gameById = new Map(games.map((g) => [g.id, g]));
        const items = ids.map((id) => gameById.get(id)).filter(Boolean);

        slider.replaceChildren(...items.map((game) => {
            const li = document.createElement('li');

            const link = document.createElement('a');
            link.href = 'games/games.html';

            const img = document.createElement('img');
            img.src = assetUrl(game.id, game.thumbnail_path);
            img.alt = game.title;

            link.append(img);
            li.append(link);
            return li;
        }));
    } catch (err) {
        console.error('スライダーの読み込みに失敗しました', err);
        return;
    }

    initSlider();
}


// ----------------------------------------------------------------------------
// スライダー
// ----------------------------------------------------------------------------

/** 画像を並べ終わったあとに呼ぶ(先に呼ぶと空のまま固まる) */
function initSlider() {
    $('.slider').slick({
        autoplay: true,                 // 自動的に動き出すか
        infinite: true,                 // スライドをループさせるか
        slidesToShow: 3,                // 画面に3枚見せる
        slidesToScroll: 3,              // 1回で3枚移動する
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        dots: true,                     // 下部ドットナビゲーション
        autoplaySpeed: 7000,            // 1枚目だけ長めに見せる
        responsive: [
            { breakpoint: 990, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 750, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });

    // 最初のスライド送りのあとは、間隔を5秒にする
    $('.slider').one('beforeChange', function() {
        $('.slider').slick('slickSetOption', 'autoplaySpeed', 5000, true);
    });
}

$(loadSliderGames);
