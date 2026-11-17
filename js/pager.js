// 共通のページ送り部品(ページ番号つき)
// 使い方: Pager.render(nav要素, { page, total, perPage, onChange })
//   page: 今のページ(1始まり) / total: 全件数 / perPage: 1ページの件数
//   onChange(新しいページ番号) は、ボタンを押したときに呼ばれる
// 1ページしかないときはナビごと隠す

const Pager = (() => {
    /** 全ページ数(件数が0でも1ページ) */
    function pageCount(total, perPage) {
        return Math.max(1, Math.ceil(total / perPage));
    }

    /** ページ番号を範囲内におさめる */
    function clamp(page, total, perPage) {
        return Math.min(Math.max(1, page || 1), pageCount(total, perPage));
    }

    /** 表示する番号の並び。例: [1, '…', 4, 5, 6, '…', 20] */
    function items(page, pages) {
        const nums = [...new Set([1, pages, page - 1, page, page + 1])]
            .filter((n) => n >= 1 && n <= pages)
            .sort((a, b) => a - b);
        const out = [];
        let prev = 0;
        for (const n of nums) {
            if (n - prev > 1) out.push('…');
            out.push(n);
            prev = n;
        }
        return out;
    }

    function button(label, className, disabled, onClick) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'pager__btn' + (className ? ' ' + className : '');
        b.textContent = label;
        b.disabled = disabled;
        if (!disabled) b.onclick = onClick;
        return b;
    }

    function render(box, { page, total, perPage, onChange }) {
        const pages = pageCount(total, perPage);
        page = clamp(page, total, perPage);
        box.replaceChildren();
        box.hidden = pages <= 1;
        if (pages <= 1) return;

        box.setAttribute('aria-label', 'ページ送り');
        const go = (n) => () => onChange(n);

        box.append(button('‹', 'pager__prev', page === 1, go(page - 1)));
        for (const it of items(page, pages)) {
            if (it === '…') {
                const gap = document.createElement('span');
                gap.className = 'pager__gap';
                gap.textContent = '…';
                box.append(gap);
                continue;
            }
            const b = button(String(it), '', false, go(it));
            if (it === page) {
                b.setAttribute('aria-current', 'page');
                b.onclick = null;
            }
            box.append(b);
        }
        box.append(button('›', 'pager__next', page === pages, go(page + 1)));
    }

    return { pageCount, clamp, render };
})();
