/**
 * Created by SD on 22.06.2017.
 */
$(document).ready(function(){
// Block Carousel-----------------------------------------------------------
	$(".b-carousel-button-left").click(function(){ // при клике на правую кнопку запускаем следующую функцию:
		$(".h-carousel-items").animate({left: "100%"}, 100); // производим анимацию: блок с набором картинок уедет влево
		setTimeout(function () { // устанавливаем задержку времени перед выполнением следующих функций. Задержка нужна, т.к. эти ффункции должны запуститься только после завершения анимации.
			$(".h-carousel-items .b-carousel-block").eq(0).clone().appendTo(".h-carousel-items"); // выбираем первый элемент, создаём его копию и помещаем в конец карусели
			$(".h-carousel-items .b-carousel-block").eq(0).remove(); // удаляем первый элемент карусели
			$(".h-carousel-items").css({"left":"0px"}); // возвращаем исходное смещение набора набора элементов карусели
		}, 300);
	});

	$(".b-carousel-button-right").click(function(){// при клике на левую кнопку выполняем следующую функцию:
		$(".h-carousel-items .b-carousel-block").eq(-1).clone().prependTo(".h-carousel-items"); // выбираем последний элемент набора, создаём его копию и помещаем в начало набора
		$(".h-carousel-items").css({"left":"100%"});
		$(".h-carousel-items").animate({left: "0px"}, 200); // за 200 милисекунд набор элементов плавно переместится в исходную нулевую точку
		$(".h-carousel-items .b-carousel-block").eq(-1).remove(); // выбираем последний элемент карусели и удаляем его
	});
//EXIT Block Carousel-----------------------------


//Block Hover Button Price	----------------------------
	$('.buy').hover(
		function () {
			$(this).parents('article').find('h5').attr('style', 'background-color: #49cbcd !important');
		},
		function () {
			$('h5').attr('style', 'background-color: #485460 !important');
		}
	);
//EXIT Botton Price-------------------

//Block Anchors-------------------------
	$("#menu").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 700);
	});
//EXIT Block Anchors----------------------------------------
});

