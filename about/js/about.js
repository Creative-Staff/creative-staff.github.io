// ロードマップ: about/json/roadmap.json を読んで、1本の棒に出来事の吹き出しを置く
// 形式: [{ "month": 4, "text": "内容(改行可)" }, ...]  同じ月に複数あれば1つの吹き出しにまとめる
// 棒の上・下に交互に置く。両端の月は、吹き出しが画面からはみ出さないよう寄せる
//
// イベント: about/json/events.json を読んでカードを描く
// 形式: [{ "title": "名前", "text": "本文(改行可・[文字](URL)でリンク)" }, ...]

(() => {
const MONTHS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];   // 年度順

function esc(s) {
    return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/** 本文: 改行はそのまま、[文字](https://…) はリンクにする */
function htmlText(s) {
    return esc(s)
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\n/g, '<br>');
}

// ---------------- イベント ----------------
const evBox = document.getElementById('events');

fetch('json/events.json')
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then((list) => {
        evBox.innerHTML = list.length
            ? list.map((e) => `<li><h2>${esc(e.title)}</h2><p>${htmlText(e.text)}</p></li>`).join('')
            : '<li><p>準備中です</p></li>';
    })
    .catch((err) => {
        console.error(err);
        evBox.innerHTML = '<li><p>読み込めませんでした。</p></li>';
    });

// ---------------- ロードマップ ----------------
const box = document.getElementById('roadmap');

fetch('json/roadmap.json')
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then((list) => {
        let n = 0;
        const html = MONTHS.map((m, i) => {
            const items = list.filter((e) => Number(e.month) === m);
            if (items.length === 0) return '';
            const side = n++ % 2 === 0 ? 'up' : 'down';
            const col = i < 2 ? 's' : i > 9 ? 'e' : 'c';
            return `<div class="rm-dot ${side}" style="--i:${i + 1}"></div>` +
                   `<div class="rm-ev ${side} ${col}" style="--i:${i + 1}"><small>${m}月</small>` +
                   items.map((e) => esc(e.text).replace(/\n/g, '<br>')).join('<br>') + `</div>`;
        }).join('');
        box.innerHTML = html || '<p class="rm-empty">準備中です</p>';
    })
    .catch((err) => {
        console.error(err);
        box.innerHTML = '<p class="rm-empty">ロードマップを読み込めませんでした。</p>';
    });
})();
