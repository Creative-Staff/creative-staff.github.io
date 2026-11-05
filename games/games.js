// ----------------------------------------------------------------------------
// 設定
// ----------------------------------------------------------------------------

// ゲームランチャーと同じ配信元(games.json と画像・zip を置いている場所)
const API_BASE = 'https://cs-launcher-api.akane-minori-cslauncher.workers.dev';

let games = [];

// ----------------------------------------------------------------------------
// 共通の小さな関数
// ----------------------------------------------------------------------------

/** ゲームIDと相対パスから、画像やzipのURLを組み立てる(日本語・スペース対応) */
function assetUrl(gameId, path) {
    const encodedPath = path.split('/').map(encodeURIComponent).join('/');
    return `${API_BASE}/games/${encodeURIComponent(gameId)}/${encodedPath}`;
}

/** innerHTML に文字列を埋め込む前に、<, &, " などを無害な文字へ変換する */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/"/g, '&quot;');
}

function tagChipsHtml(game) {
    return game.tags.map((t) => `<span class="Gtag_chip">${escapeHtml(t)}</span>`).join('');
}

// ----------------------------------------------------------------------------
// ゲーム一覧の取得
// ----------------------------------------------------------------------------

async function loadGames() {
    const grid = document.getElementById('games-grid');
    try {
        const res = await fetch(`${API_BASE}/games.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        games = await res.json();
    } catch (err) {
        grid.innerHTML = '<p>ゲーム一覧の取得に失敗しました。時間をおいて再読み込みしてください。</p>';
        return;
    }
    renderFilter();
    renderGrid();
}

// ----------------------------------------------------------------------------
// ゲームカードの表示
// ----------------------------------------------------------------------------

function renderGrid() {
    const grid = document.getElementById('games-grid');
    grid.innerHTML = games
        .map(
            (game, i) => `
        <div class="GameCard" data-index="${i}" tabindex="0" role="button">
            <div class="GameCard_title">
                <h2>${escapeHtml(game.title)}</h2>
                <p class="Gtag">${tagChipsHtml(game)}</p>
            </div>
            <img src="${assetUrl(game.id, game.thumbnail_path)}" alt="${escapeHtml(game.title)}" loading="lazy">
        </div>`
        )
        .join('');

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.GameCard');
        if (card) openModal(games[Number(card.dataset.index)]);
    });
    grid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const card = e.target.closest('.GameCard');
        if (card) openModal(games[Number(card.dataset.index)]);
    });
}

// ----------------------------------------------------------------------------
// 絞り込み検索
// ----------------------------------------------------------------------------

/** games.json に出てくるタグを数の多い順に並べ、チェックボックスにする */
function renderFilter() {
    const counts = new Map();
    for (const game of games) {
        for (const tag of game.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    const tags = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);

    document.getElementById('sizeBox').innerHTML = tags
        .map(
            (tag) => `
        <label>
            <input type="checkbox" value="${escapeHtml(tag)}" class="filter-checkbox">
            <span class="checkbox_parts">${escapeHtml(tag)}</span>
        </label>`
        )
        .join('');

    document.querySelectorAll('.filter-checkbox').forEach((box) => {
        box.addEventListener('change', updateDisplay);
    });
}

/** チェックされたタグを全て持つゲームだけを表示する(何も選ばなければ全部表示) */
function updateDisplay() {
    const active = [...document.querySelectorAll('.filter-checkbox:checked')].map((box) => box.value);
    let visibleCount = 0;

    document.querySelectorAll('.GameCard').forEach((card) => {
        const game = games[Number(card.dataset.index)];
        const show = active.every((tag) => game.tags.includes(tag));
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

    document.getElementById('games-empty').hidden = visibleCount > 0;
}

// ----------------------------------------------------------------------------
// 詳細ポップアップ
// ----------------------------------------------------------------------------

function openModal(game) {
    const pop = document.getElementById('pop-mode');
    closeModal();

    const images = game.screenshot_paths && game.screenshot_paths.length > 0 ? game.screenshot_paths : [game.thumbnail_path];
    const isDownload = game.type === 'download';
    const actionLabel = isDownload ? 'ゲームをダウンロード' : 'ブラウザで遊ぶ';
    const hasAction = isDownload ? Boolean(game.archive_filename) : Boolean(game.url);
    const authors = game.authors && game.authors.length > 0 ? game.authors.join('、') : '';

    pop.innerHTML = `
        <div class="pop_box">
            <button type="button" class="pop_close" aria-label="閉じる">×</button>
            <ul class="slider">
                ${images.map((p) => `<li><img src="${assetUrl(game.id, p)}" alt="" class="pop_img"></li>`).join('')}
            </ul>
            <div class="pop_txt">
                <div class="pop_title">
                    <h1>${escapeHtml(game.title)}</h1>
                    <p class="Gtag">${tagChipsHtml(game)}</p>
                </div>
                ${authors ? `<p class="pop_authors">制作: ${escapeHtml(authors)}</p>` : ''}
                <p class="pop_p">${escapeHtml(game.description)}</p>
                ${hasAction ? `<div class="pop_dlbutton${isDownload ? ' is-download' : ''}"><button type="button" class="pop_action">${actionLabel}</button></div>` : ''}
            </div>
        </div>`;

    pop.querySelector('.pop_close').addEventListener('click', closeModal);
    const actionBtn = pop.querySelector('.pop_action');
    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            if (isDownload) location.href = assetUrl(game.id, game.archive_filename);
            else window.open(game.url, '_blank', 'noopener');
        });
    }

    // 表示してから slick を初期化する(非表示のままだと大きさを測れない)
    pop.style.display = 'block';
    $(pop).find('.slider').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: images.length > 1,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        dots: images.length > 1,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: false,
    });
}

function closeModal() {
    const pop = document.getElementById('pop-mode');
    const $slider = $(pop).find('.slider.slick-initialized');
    if ($slider.length > 0) $slider.slick('unslick');
    pop.style.display = 'none';
    pop.innerHTML = '';
}

// ポップアップの外(ヘッダー・フッター・余白)をクリックしたら閉じる。Esc キーでも閉じる
document.addEventListener('click', (e) => {
    const pop = document.getElementById('pop-mode');
    if (pop.style.display !== 'block') return;
    if (pop.contains(e.target) || e.target.closest('.GameCard')) return;
    closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ----------------------------------------------------------------------------
// 起動
// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', loadGames);
