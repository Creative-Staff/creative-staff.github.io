
// ヘッダー、フッターをインプット
fetch("/header.html")
	.then((response) => response.text())
	.then((data) => document.querySelector("#header").innerHTML = data);
fetch("/footer.html")
	.then((response) => response.text())
	.then((data) => document.querySelector("#footer").innerHTML = data);

// ヘッダー: 下にスクロールで隠し、上にスクロールで再表示する
(function () {
	var lastY = window.scrollY;
	window.addEventListener('scroll', function () {
		var header = document.querySelector('#header');
		if (!header) return;
		var y = window.scrollY;
		var menuOpen = document.querySelector('.main-navigation-items.is-visible');
		if (y <= 80 || y < lastY) {
			header.classList.remove('header-hidden');
		} else if (y > lastY && !menuOpen) {
			header.classList.add('header-hidden');
		}
		lastY = y;
	}, { passive: true });
})();
