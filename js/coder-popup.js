$(document).ready(function(){
	var githubPopUp = document.getElementById('github-popup');
	var popupClose = document.getElementById('popupClose');

	setTimeout(function(){
		$(githubPopUp).slideToggle();
	}, 2000);

	popupClose.onclick = function(){
		$(githubPopUp).slideToggle();
	}
});