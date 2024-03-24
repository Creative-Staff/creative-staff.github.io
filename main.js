$(function() {
	setTimeout(function(){
		$('.fadeOut p').fadeIn(1600);
	},500); //0.5秒後にロゴをフェードイン
	setTimeout(function(){
		$('.fadeOut').fadeOut(500);
	},2500); //2.5秒後にロゴ含め真っ白背景をフェードアウト
});

$('.slider').slick({
	autoplay: true,//自動的に動き出すか。初期値はfalse。
	infinite: true,//スライドをループさせるかどうか。初期値はtrue。
	slidesToShow: 3,//スライドを画面に3枚見せる
	slidesToScroll: 3,//1回のスクロールで3枚の写真を移動して見せる
	prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
	nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
	dots: true,//下部ドットナビゲーションの表示
	autoplaySpeed: 7000,
});

$(".slider").on('beforeChange',function(event, slick, currentSlide, nextSlide){
	if(nextSlide > 0) { //スライド1枚目以外
	  $(".slider").slick('slickSetOption', 'autoplaySpeed', 5000, true);
	} else { //2周目以降のスライド1枚目
	  $(".slider").slick('slickSetOption', 'autoplaySpeed', 5000, true);
	}
});

window.addEventListener("load", () => {
	var winSize_w = window.innerWidth;
	if(winSize_w < 750){
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
		$(".slider").slick("slickSetOption", {
			slidesToShow: 1,
			slidesToScroll: 1
		}, true);
	}
	else if(winSize_w < 990){
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
		$(".slider").slick("slickSetOption", {
			slidesToShow: 2,
			slidesToScroll: 2
		}, true);
	}
	else{
		$(".ham_select").slideUp();
		$(".header_select").slideDown();
		$(".slider").slick("slickSetOption", {
			slidesToShow: 3,
			slidesToScroll: 3
		}, true);
	}
}, false)

window.addEventListener("resize", () => {
	var winSize_w = window.innerWidth;
	if(winSize_w < 750){
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
		$(".slider").slick("slickSetOption", {
			slidesToShow: 1,
			slidesToScroll: 1
		}, true);
	}
	else if(winSize_w < 990){
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
		$(".slider").slick("slickSetOption", {
			slidesToShow: 2,
			slidesToScroll: 2
		}, true);
	}
	else{
		$(".ham_select").slideUp();
		$(".header_select").slideDown();
		$(".slider").slick("slickSetOption", {
			slidesToShow: 3,
			slidesToScroll: 3
		}, true);
	}
}, false)

//if文が無いとaタグが反応しなくなる
$(function(){
	$("#content-main").click(function(){
		const atm = $(".all_topic_mode").css("display");
		if(atm != "none"){
			$(".all_topic_mode").fadeOut();
			$(".atm_img").fadeOut();
			$("#closed_atm").fadeOut();
			return false;
		}
	});
});


$(function(){
	$("#footer").click(function(){
		const atm = $(".all_topic_mode").css("display");
		if(atm != "none"){
			$(".all_topic_mode").fadeOut();
			$(".atm_img").fadeOut();
			$("#closed_atm").fadeOut();
			return false;
		}
	});
});

$(function(){
	$("#header").click(function(){
		const atm = $(".all_topic_mode").css("display");
		if(atm != "none"){
			$(".all_topic_mode").fadeOut();
			$(".atm_img").fadeOut();
			$("#closed_atm").fadeOut();
			return false;
		}
	});
});

$(function(){
	$("#closed_atm").click(function(){
		$(".all_topic_mode").fadeOut();
		$(".atm_img").fadeOut();
		$("#closed_atm").fadeOut();
		return false;
	});
});

$(function(){
	$("#all_topic").click(function(){
		$(".all_topic_mode").fadeIn();
		$(".atm_img").fadeIn();
		$("#closed_atm").fadeIn();
		return false;
	});
});