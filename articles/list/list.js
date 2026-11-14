// 記事一覧: articles.json を読んで、並べ替え(新しい順・古い順・作者別)と作者での絞り込みをする
// 選んだ内容は URL に残る(例: list.html?sort=author&author=○○)ので、そのまま共有できる

(() => {
const NONE = '__none__';   // 「作者未設定」を表す絞り込み値
const byId = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
let items = [];

const jaCompare = (a, b) => a.localeCompare(b, 'ja');
const byDateDesc = (a, b) => b.date.localeCompare(a.date) || jaCompare(a.id, b.id);

function card(a) {
    const el = document.createElement('div');
    el.className = 'ls-card';

    const href = a.id + '/article.html';
    const thumb = document.createElement('a');
    thumb.className = 'ls-thumb';
    thumb.href = href;
    // サムネイルが無い記事(または画像が読めない記事)は、サイト共通の画像を入れて見た目をそろえる
    const DEFAULT_THUMB = '../cgls/ogp.png';
    const img = document.createElement('img');
    img.src = a.thumbnail || DEFAULT_THUMB;
    img.alt = '';
    img.loading = 'lazy';
    img.onerror = () => { img.onerror = null; img.src = DEFAULT_THUMB; };
    thumb.append(img);

    const body = document.createElement('div');
    body.className = 'ls-body';
    const date = document.createElement('span');
    date.className = 'ls-date';
    date.textContent = a.date.replaceAll('-', '/');
    const title = document.createElement('a');
    title.className = 'ls-title';
    title.href = href;
    title.textContent = a.title;
    const author = document.createElement('button');
    author.type = 'button';
    author.className = 'ls-author' + (a.author ? '' : ' none');
    author.textContent = a.author || '作者未設定';
    if (a.author) {
        author.title = 'この作者の記事だけを表示';
        author.onclick = () => { byId('author').value = a.author; update(); scrollTo({ top: 0, behavior: 'smooth' }); };
    }
    body.append(date, title, author);
    el.append(thumb, body);
    return el;
}

function grid(list) {
    const g = document.createElement('div');
    g.className = 'ls-grid';
    g.append(...list.map(card));
    return g;
}

function update() {
    const sort = byId('sort').value;
    const who = byId('author').value;

    let list = items.filter((a) => !who || (who === NONE ? !a.author : a.author === who));
    list.sort(sort === 'old' ? (a, b) => -byDateDesc(a, b) : byDateDesc);

    const box = byId('list');
    if (list.length === 0) {
        box.innerHTML = '<p class="ls-empty">該当する記事がありません</p>';
    } else if (sort === 'author') {
        // 作者ごとにまとめる(作者名の五十音順、未設定は最後)。中は新しい順
        const groups = new Map();
        for (const a of list) {
            const k = a.author || NONE;
            if (!groups.has(k)) groups.set(k, []);
            groups.get(k).push(a);
        }
        const keys = [...groups.keys()].sort((x, y) => (x === NONE) - (y === NONE) || jaCompare(x, y));
        box.replaceChildren(...keys.flatMap((k) => {
            const h = document.createElement('div');
            h.className = 'ls-group';
            h.textContent = (k === NONE ? '作者未設定' : k) + `(${groups.get(k).length})`;
            return [h, grid(groups.get(k))];
        }));
    } else {
        box.replaceChildren(grid(list));
    }
    byId('count').textContent = `${list.length} 件`;

    // 選んだ内容を URL に残す(標準のまま=パラメータなし)
    const q = new URLSearchParams();
    if (sort !== 'new') q.set('sort', sort);
    if (who) q.set('author', who);
    history.replaceState(null, '', q.toString() ? '?' + q : location.pathname);
}

fetch('articles.json')
    .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then((list) => {
        items = list;
        const names = [...new Set(items.map((a) => a.author).filter(Boolean))].sort(jaCompare);
        const sel = byId('author');
        for (const n of names) sel.append(new Option(`${n}(${items.filter((a) => a.author === n).length})`, n));
        if (items.some((a) => !a.author)) sel.append(new Option(`作者未設定(${items.filter((a) => !a.author).length})`, NONE));

        // URL に指定があれば反映(存在しない作者名は無視)
        const s = params.get('sort');
        if (['new', 'old', 'author'].includes(s)) byId('sort').value = s;
        const w = params.get('author');
        if ([...sel.options].some((o) => o.value === w)) sel.value = w;

        byId('sort').onchange = byId('author').onchange = update;
        update();
    })
    .catch((err) => {
        console.error(err);
        byId('list').innerHTML = '<p class="ls-empty">記事を読み込めませんでした。時間をおいて再読み込みしてください。</p>';
    });
})();
