$(document).ready(function(){

	//parallax
	$('#banner').parallax({imageSrc:"images/bulb8.jpg"})
	$('#about-us').parallax({imageSrc:"images/fff.jpg"});
	$('#student-section').parallax({imageSrc: 'images/student.jpg'});	

	//parallax
	$('#banner').height($(window).height());

	$(".btn-groups .student").click(function() {
    $('html, body').animate({
        scrollTop: $("#student-section").offset().top
    }, 2000);
});
	$(".btn-groups .teacher").click(function() {
    $('html, body').animate({
        scrollTop: $("#teacher-section").offset().top
    }, 2000);
 
});

	   $(".arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#about-us").offset().top
    }, 2000);
});

	$('#student-section .filter-group li').click(function(){

	$('.cards-advanced').fadeToggle( "slow", "linear" );
	$('.cards-beginner').fadeToggle( "slow", "linear" );
	$('#student-section .filter-group li').removeClass('active');
	$(this).addClass('active');
	})
})