// 記事一覧: articles.json を読んで、並べ替え(新しい順・古い順・作者別)と作者での絞り込み、ページ送りをする
// 選んだ内容は URL に残る(例: list.html?sort=author&author=○○&page=2)ので、そのまま共有できる
// ページ送りの部品は js/pager.js

(() => {
const NONE = '__none__';   // 「作者未設定」を表す絞り込み値
const PER_PAGE = 24;       // 1ページの件数
const byId = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
let items = [];
let page = 1;

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
    img.src = a.thumbnail ? a.thumbnail : DEFAULT_THUMB;
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
        author.onclick = () => { byId('author').value = a.author; update(true); scrollTo({ top: 0, behavior: 'smooth' }); };
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

/** 並べ替え・絞り込みを反映して描き直す。resetPage=true なら1ページ目に戻す */
function update(resetPage) {
    const sort = byId('sort').value;
    const who = byId('author').value;

    let list = items.filter((a) => !who || (who === NONE ? !a.author : a.author === who));
    list.sort(sort === 'old' ? (a, b) => -byDateDesc(a, b) : byDateDesc);

    // 作者別のときは、作者名の五十音順(未設定は最後)・中は新しい順に並べ直してからページに切る
    let groupTotals = null;
    if (sort === 'author') {
        const groups = new Map();
        for (const a of list) {
            const k = a.author || NONE;
            if (!groups.has(k)) groups.set(k, []);
            groups.get(k).push(a);
        }
        const keys = [...groups.keys()].sort((x, y) => (x === NONE) - (y === NONE) || jaCompare(x, y));
        groupTotals = new Map(keys.map((k) => [k, groups.get(k).length]));
        list = keys.flatMap((k) => groups.get(k));
    }

    page = resetPage ? 1 : Pager.clamp(page, list.length, PER_PAGE);
    const slice = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const box = byId('list');
    if (list.length === 0) {
        box.innerHTML = '<p class="ls-empty">該当する記事がありません</p>';
    } else if (groupTotals) {
        // このページに載る分を、作者ごとの見出しでまとめる(見出しの件数は全体の件数)
        const groups = new Map();
        for (const a of slice) {
            const k = a.author || NONE;
            if (!groups.has(k)) groups.set(k, []);
            groups.get(k).push(a);
        }
        box.replaceChildren(...[...groups.keys()].flatMap((k) => {
            const h = document.createElement('div');
            h.className = 'ls-group';
            h.textContent = (k === NONE ? '作者未設定' : k) + `(${groupTotals.get(k)})`;
            return [h, grid(groups.get(k))];
        }));
    } else {
        box.replaceChildren(grid(slice));
    }
    byId('count').textContent = `${list.length} 件`;

    Pager.render(byId('pager'), {
        page,
        total: list.length,
        perPage: PER_PAGE,
        onChange: (n) => { page = n; update(false); scrollTo({ top: 0, behavior: 'smooth' }); },
    });

    // 選んだ内容を URL に残す(標準のまま=パラメータなし)
    const q = new URLSearchParams();
    if (sort !== 'new') q.set('sort', sort);
    if (who) q.set('author', who);
    if (page > 1) q.set('page', String(page));
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
        page = Math.max(1, parseInt(params.get('page'), 10) || 1);

        byId('sort').onchange = byId('author').onchange = () => update(true);
        update(false);
    })
    .catch((err) => {
        console.error(err);
        byId('list').innerHTML = '<p class="ls-empty">記事を読み込めませんでした。時間をおいて再読み込みしてください。</p>';
    });
})();
