window.addEventListener("load", () => {
	var winSize_w = window.innerWidth;
	if(winSize_w > 990){
		$(".ham_select").slideUp();
		$(".header_select").slideDown();
	}
	else{
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
	}
}, false)

window.addEventListener("resize", () => {
	var winSize_w = window.innerWidth;
	if(winSize_w > 990){
		$(".ham_select").slideUp();
		$(".header_select").slideDown();
	}
	else{
		$(".header_select").slideUp();
		$(".ham_select").slideDown();
	}
}, false)