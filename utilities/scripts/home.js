const menuToggle = document.querySelector('.menu-toggle');
const navBar = document.querySelector('nav');
const container = document.querySelector('.container');
		
menuToggle.addEventListener('click', () => {
	navBar.classList.toggle('active');
	if (navBar.classList == 'active') {
		container.style.top = '65%';	
	} else {
		container.style.top = '50%';
	}
	
});