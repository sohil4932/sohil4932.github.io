$(document).ready(function(){
	var learnerDrop, makerDrop, researcherDrop, coderDrop, coachDrop, volunteerDrop, blogDrop;
	learnerDrop = new Drop({
	    target: document.querySelector('.learner-ico'),
	    content: 'Learner',
	    position: 'top center',
	    openOn: 'hover'
	  });
	makerDrop = new Drop({
	    target: document.querySelector('.maker-ico'),
	    content: 'Maker',
	    position: 'top center',
	    openOn: 'hover'
	  });
	researcherDrop = new Drop({
	    target: document.querySelector('.researcher-ico'),
	    content: 'Researcher',
	    position: 'top center',
	    openOn: 'hover'
	  });
	coderDrop = new Drop({
	    target: document.querySelector('.coder-ico'),
	    content: 'Coder',
	    position: 'top center',
	    openOn: 'hover'
	  });
	coachDrop = new Drop({
	    target: document.querySelector('.coach-ico'),
	    content: 'Coach',
	    position: 'top center',
	    openOn: 'hover'
	  });
	volunteerDrop = new Drop({
	    target: document.querySelector('.volunteer-ico'),
	    content: 'Volunteer',
	    position: 'top center',
	    openOn: 'hover'
	  });
	blogDrop = new Drop({
		target: document.querySelector('.dummyActionButton'),
		content: 'Blog',
		position: 'top center',
		openOn: 'hover'
	});
});