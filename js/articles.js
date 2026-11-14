// js/articles.js
fetch('articles/articles.json')
  .then(r => r.json())
  .then(items => {
    const list = document.querySelector('.news-list');
    if (!list) return;

    items.sort((a, b) => b.date.localeCompare(a.date));

    list.replaceChildren(...items.map(a => {
      const li = document.createElement('li');
      li.className = 'item';

      const link = document.createElement('a');
      link.href = 'articles/' + a.id + '/article.html';

      // サムネイルが無い記事(または画像が読めない記事)は、サイト共通の画像を入れて高さをそろえる
      const DEFAULT_THUMB = 'cgls/ogp.png';
      const img = document.createElement('img');
      img.src = a.thumbnail ? 'articles/' + a.thumbnail : DEFAULT_THUMB;
      img.alt = '';
      img.loading = 'lazy';
      img.className = 'thumb';
      img.onerror = () => { img.onerror = null; img.src = DEFAULT_THUMB; };
      link.append(img);

      const date = document.createElement('p');
      date.className = 'date';
      date.textContent = a.date.replaceAll('-', '/');

      const title = document.createElement('p');
      title.className = 'title';
      title.textContent = a.title;

      link.append(date, title);
      li.append(link);
      return li;
    }));
  })
  .catch(console.error);
