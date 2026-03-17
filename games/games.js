$('.slider').slick({
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    autoplaySpeed: 4000,//次のスライドに切り替わる待ち時間
    speed:1000,//スライドの動きのスピード。初期値は300。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 1,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
    arrows: true,//左右の矢印あり
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    dots: true,//下部ドットナビゲーションの表示
    pauseOnFocus: true,//フォーカスで一時停止を無効
    pauseOnHover: true,//マウスホバーで一時停止を無効
    pauseOnDotsHover: false,//ドットナビゲーションをマウスホバーで一時停止を無効
});

window.addEventListener("load", () =>{
	var winSize_w = window.innerWidth;
	var winSize_h = window.innerHeight;
	if(winSize_w > 990){
		$(".ham_select").slideUp();
		$(".header_select").slideDown();
	}
	else{
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
	}

	if(winSize_w <= winSize_h){
		$(".pop_box").css({
			"display": "block",
			"width": "80vw",
			"height": "85vh",
			"max-height": "1100px"
		});
		$(".slider").css({
			"width": "80%",
			"height": "40%",
			"max-height": "250px",
			"transition": "0.4s"
		});
		$(".pop_txt").css({
			"width": "95%",
			"height": "60%",
			"min-height": "calc(95% - 200px)",
			"margin": "0 auto",
			"margin-top": "5%"
		});
		$(".pop_img").css({
			"max-width": "100%",
			"max-height": "250px"
		});
		$(".pop_dlbutton").css({
			"display": "none"
		});
	}
	else{
		$(".pop_box").css({
			"display": "flex",
			"width": "95vw",
			"height": "75vh"
		});
		$(".slider").css({
			"width": "48%",
			"height": "auto",
			"margin": "0 auto"
		});
		$(".pop_txt").css({
			"width": "45%",
			"height": "100%",
			"margin-top": "1%",
			"margin-left": "1%",
			"padding-right": "1%"
		});
		$(".pop_img").css({
			"height": "100%",
			"max-width": "100%"
		});
		$(".pop_dlbutton").css({
			"display": "block"
		});
	}
}, false);

window.addEventListener("resize", () => {
	var winSize_w = window.innerWidth;
	var winSize_h = window.innerHeight;
	$(".pop_mode").fadeOut();
	$(".pop_box").fadeOut();
	$(".pop_img").fadeOut();
	$(".pop_txt").fadeOut();
	if(winSize_w > 990){
		$(".ham_select").slideUp();
		$(".header_select").slideDown();
	}
	else{
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
	}
	
	if(winSize_w <= winSize_h){
		$(".pop_box").css({
			"display": "block",
			"width": "80vw",
			"height": "85vh",
			"max-height": "1100px"
		});
		$(".slider").css({
			"width": "80%",
			"height": "40%",
			"max-height": "250px",
			"transition": "0.4s"
		});
		$(".pop_txt").css({
			"width": "95%",
			"height": "60%",
			"min-height": "calc(95% - 200px)",
			"margin": "0 auto",
			"margin-top": "2%"
		});
		$(".pop_img").css({
			"max-width": "100%",
			"max-height": "250px"
		});
		$(".pop_dlbutton").css({
			"display": "none"
		});
	}
	else{
		$(".pop_box").css({
			"display": "flex",
			"width": "95vw",
			"height": "75vh"
		});
		$(".slider").css({
			"width": "48%",
			"height": "auto",
			"margin": "0 auto"
		});
		$(".pop_txt").css({
			"width": "45%",
			"height": "100%",
			"margin-top": "1%",
			"margin-left": "1%",
			"padding-right": "1%"
		});
		$(".pop_img").css({
			"height": "100%",
			"max-width": "100%"
		});
		$(".pop_dlbutton").css({
			"display": "block"
		});
	}
	$(".slider").slick('slickNext');
}, false);

// 絞り込み検索機能
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const items = document.querySelectorAll(".GameCard");
  
    // チェックボックスの状態に応じて表示を更新する関数
    function updateDisplay() {
      // チェックされたカテゴリを配列で取得
      const activeCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  
      items.forEach(item => {
        // 各項目のカテゴリ（クラス）を取得
        const itemCategories = item.className.split(" ");
        // activeCategories内のすべてのカテゴリがitemCategoriesに含まれているかを判定
        const shouldDisplay = activeCategories.every(category => itemCategories.includes(category));
  
        // 絞り込み条件がない（すべてのチェックボックスがオフ）の場合はすべて表示
        item.style.display = activeCategories.length === 0 || shouldDisplay ? "block" : "none";
      });
    }
  
    // チェックボックスの変更イベントを監視
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", updateDisplay);
    });
  
    // 初期状態の表示更新
    updateDisplay();
  });