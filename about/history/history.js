// 年表エディターが書き出した history.json を読んで、年表を描く
// (描画のしかたは年表エディターのプレビューと同じ)

(() => {
const HISTORY_JSON = 'history/history.json';

function esc(s) {
    return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/** 本文: 改行はそのまま、[文字](https://…) はリンクにする */
function htmlText(s) {
    return esc(s)
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\n/g, '<br>');
}

/** 2022-04-06 → 2022年4月6日 / 2022-04 → 2022年4月 / 2022 → 2022年 */
function dateLabel(d) {
    const [y, m, day] = d.split('-');
    return `${y}年` + (m ? `${Number(m)}月` : '') + (day ? `${Number(day)}日` : '');
}

function renderTimeline(list, box) {
    if (list.length === 0) {
        box.innerHTML = '<p class="tl-empty">準備中です</p>';
        return;
    }
    let html = '';
    let year = '';
    let n = 0;
    for (const e of list) {
        const y = e.date.slice(0, 4);
        if (y !== year) { year = y; n = 0; html += `<div class="tl-year"><span>${esc(y)}</span></div>`; }
        html += `<div class="tl-item ${n++ % 2 === 0 ? 'l' : 'r'}"><div class="tl-card">` +
                `<span class="tl-date">${esc(dateLabel(e.date))}</span>${htmlText(e.text)}</div></div>`;
    }
    box.innerHTML = html;
}

fetch(HISTORY_JSON)
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then((list) => {
        list.sort((a, b) => a.date.localeCompare(b.date));
        renderTimeline(list, document.getElementById('timeline'));
    })
    .catch((err) => {
        console.error(err);
        document.getElementById('timeline').innerHTML = '<p class="tl-empty">年表を読み込めませんでした。時間をおいて再読み込みしてください。</p>';
    });
})();
