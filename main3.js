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

	if(winSize_h > winSize_w){
		$(".pop_box").css({
			"width": "80vw",
			"height": "80vh",
			"max-height": "1100px",
			"background-color": "#154261",
			"box-shadow": "4px 4px 4px black",
			"overflow": "hidden"
		})
		$(".slider").css({
			"width": "70%",
			"height": "30%",
			"margin-top": "5%",
			"margin-bottom": "5%",
			"margin-right": "2%",
			"transition": "0.4s",
			"left": "47%",
			"top": "0%",
			"transform": "translate(-50%, 0%)"
		})
		$(".pop_txt").css({
			"width": "75vw",
			"height": "60%",
			"margin-left": "5%",
			"padding-right": "1%",
			"overflow": "auto",

		})
	}
	else{
		$(".pop_box").css({
			"width": "95vw",
			"height": "65vh",
			"background-color": "#154261",
			"box-shadow": "4px 4px 4px black",
			"overflow": "hidden"
		})
		$(".slider").css({
			"width": "48%",
			"height": "auto",
			"float": "left",
			"margin": "2%",
			"margin-right": "3%",
			"transition": "0.4s",
			"left": "0%",
			"top": "47%",
			"transform": "translate(0%, -50%)"
		})
		$(".pop_txt").css({
			"float": "left",
			"width": "45%",
			"height": "100%",
			"margin-top": "1%",
			"margin-left": "1%",
			"padding-right": "1%",
			"overflow": "auto"
		})
	}
}, false)

window.addEventListener("resize", () => {
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
	
	if(winSize_h > winSize_w){
		$(".pop_box").css({
			"width": "80vw",
			"height": "80vh",
			"max-height": "1100px",
			"background-color": "#154261",
			"box-shadow": "4px 4px 4px black",
			"overflow": "hidden"
		})
		$(".slider").css({
			"width": "70%",
			"height": "30%",
			"margin-top": "5%",
			"margin-bottom": "5%",
			"margin-right": "2%",
			"transition": "0.4s",
			"left": "47%",
			"top": "0%",
			"transform": "translate(-50%, 0%)"
		})
		$(".pop_txt").css({
			"width": "75vw",
			"height": "60%",
			"margin-left": "5%",
			"padding-right": "1%",
			"overflow": "auto",

		})
	}
	else{
		$(".pop_box").css({
			"width": "95vw",
			"height": "65vh",
			"background-color": "#154261",
			"box-shadow": "4px 4px 4px black",
			"overflow": "hidden"
		})
		$(".slider").css({
			"width": "48%",
			"height": "auto",
			"float": "left",
			"margin": "2%",
			"margin-right": "3%",
			"transition": "0.4s",
			"left": "0%",
			"top": "47%",
			"transform": "translate(0%, -50%)"
		})
		$(".pop_txt").css({
			"float": "left",
			"width": "45%",
			"height": "100%",
			"margin-top": "1%",
			"margin-left": "1%",
			"padding-right": "1%",
			"overflow": "auto"
		})
	}
	$(".slider").slick('slickNext');
}, false)

$(function(){
	$("#gi0").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb0").fadeIn();
		$(".pi0").fadeIn();
		$(".pt0").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi1").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb1").fadeIn();
		$(".pi1").fadeIn();
		$(".pt1").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi2").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb2").fadeIn();
		$(".pi2").fadeIn();		
		$(".pt2").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi3").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb3").fadeIn();
		$(".pi3").fadeIn();		
		$(".pt3").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi4").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb4").fadeIn();
		$(".pi4").fadeIn();		
		$(".pt4").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi5").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb5").fadeIn();
		$(".pi5").fadeIn();		
		$(".pt5").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi6").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb6").fadeIn();
		$(".pi6").fadeIn();		
		$(".pt6").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi7").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb7").fadeIn();
		$(".pi7").fadeIn();		
		$(".pt7").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi8").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb8").fadeIn();
		$(".pi8").fadeIn();		
		$(".pt8").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi9").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb9").fadeIn();
		$(".pi9").fadeIn();		
		$(".pt9").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#gi10").click(function(){
		$(".pop_box").hide();
		$(".pop_img").hide();
		$(".pop_txt").hide();
		$(".pop_mode").fadeIn();
		$(".pb10").fadeIn();
		$(".pi10").fadeIn();		
		$(".pt10").fadeIn();
		$(".slider").slick('slickGoTo', 0, false);
		$(".slider").slick('setPosition');
		return false;
	});
});
$(function(){
	$("#content-main").click(function(){
		const pm = $(".pop_mode").css("display");
		if(pm != "none"){
			$(".pop_mode").fadeOut();
			$(".pop_box").fadeOut();
			$(".pop_img").fadeOut();
			$(".pop_txt").fadeOut();
			return false;
		}
	});
});

$(function(){
	$("#footer").click(function(){
		$(".pop_mode").fadeOut();
		$(".pop_box").fadeOut();
		$(".pop_img").fadeOut();
		$(".pop_txt").fadeOut();
		return false;
	});
});

$(function(){
	$("#header").click(function(){
		const pm = $(".pop_mode").css("display");
		if(pm != "none"){
			$(".pop_mode").fadeOut();
			$(".pop_box").fadeOut();
			$(".pop_img").fadeOut();
			$(".pop_txt").fadeOut();
			return false;
		}
	});
});