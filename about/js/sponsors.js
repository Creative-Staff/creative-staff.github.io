// about/json/sponsors.json を読んで、協賛・提携のカードを描く(区別せず1つの一覧)
// 形式: [{ "name": "名前", "desc": "一言説明", "url": "リンク", "logo": "ロゴ画像(空でもOK)" }, ...]

(() => {
function esc(s) {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function card(e) {
    const logo = e.logo ? `<div class="sp-logo"><img src="${esc(e.logo)}" alt="${esc(e.name)}" loading="lazy"></div>` : '';
    const body = `<div class="sp-body"><span class="sp-name">${esc(e.name)}</span>` +
                 (e.desc ? `<span class="sp-desc">${esc(e.desc).replace(/\n/g, '<br>')}</span>` : '') + `</div>`;
    return /^https?:\/\//.test(e.url || '')
        ? `<a class="sp-card" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${logo}${body}</a>`
        : `<div class="sp-card">${logo}${body}</div>`;
}

const box = document.getElementById('sponsors');

fetch('json/sponsors.json')
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then((list) => {
        box.innerHTML = list.length ? `<div class="sp-grid">${list.map(card).join('')}</div>` : '<p class="sp-empty">準備中です</p>';
    })
    .catch((err) => {
        console.error(err);
        box.innerHTML = '<p class="sp-empty">読み込めませんでした。時間をおいて再読み込みしてください。</p>';
    });
})();
