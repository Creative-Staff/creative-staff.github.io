/*---------------------------------------------------------------------------
	クリエイティブスタッフ　詳細メニュー
---------------------------------------------------------------------------*/
$(function(){
	$(document).on('click', ".main-navigation-items", function ()
	{
		console.log("メニューがクリックされました");
		// もし既にいずれかの項目が開かれていたら、'.is-visible'を切り換えて、megaNavigationを格納する。
		if($(".main-navigation-items").not(this).hasClass('is-visible'))
		{
			for(var i = 0; i < $(".main-navigation-items").length; i++)
			{
				if($(".main-navigation-items").eq(i).hasClass('is-visible'))
				{
					$(".main-navigation-items").eq(i).toggleClass('is-visible');
					$(".mega-navigation-items").eq(i).slideToggle();
				}
			}
		}

		// クリックされたものに'.is-visible'を切り換えて、megaNavigationを展開・格納する。
		$(this).toggleClass('is-visible');
		var index = $(".main-navigation-items").index(this);
		$(".mega-navigation-items").eq(index).slideToggle();
	});
});

/*---------------------------------------------------------------------------
	クリエイティブスタッフ　ハンバーガーメニュー
---------------------------------------------------------------------------*/
$(function() {
	// drawerNavigationオープンボタンの処理
	$(document).on('click', ".drawer-button-open", function() {

		$("#drawer-navigation").toggleClass('is-active');
		$("#drawer-navigation-bg").toggleClass('is-active');

	});

	// drawerNavigationクローズボタンの処理
	$(document).on('click', ".drawer-button-close", function() {

		$("#drawer-navigation").toggleClass('is-active');
		$("#drawer-navigation-bg").toggleClass('is-active');

	});
});