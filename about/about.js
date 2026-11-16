// ロードマップ: about/roadmap.json を読んで、1本の棒に出来事の吹き出しを置く
// 形式: [{ "month": 4, "text": "内容(改行可)" }, ...]  同じ月に複数あれば1つの吹き出しにまとめる
// 棒の上・下に交互に置く。両端の月は、吹き出しが画面からはみ出さないよう寄せる

(() => {
const MONTHS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];   // 年度順

function esc(s) {
    return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const box = document.getElementById('roadmap');

fetch('roadmap.json')
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
