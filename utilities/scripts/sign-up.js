const animatedForm = () => {
	const inputFields = document.querySelectorAll('input')
	const nextArrows = document.querySelectorAll('.next-arrow-btn');
	const backArrows = document.querySelectorAll('.back-arrow-btn'); 
	const submitBtn = document.querySelector('.submit-btn');
	submitBtn.disabled = true;
	//submitBtn.disabled = true;

	inputFields.forEach( input => {
		input.addEventListener('keyup', event => {
			const request = new XMLHttpRequest();
			request.open('post', '/signup', true);
			const fieldData = `${input.name}=${input.value}`;
			const message = input.nextElementSibling.firstElementChild;
			request.onload = () => {
				if (request.status == 200) {
					message.innerText = request.responseText;
					const response = request.responseText;
					if (input.name == "password")
					{
						if (response.length == 0) {
							submitBtn.disabled = false;
							submitBtn.style.border = '1px solid #e04199';	
						} else if (response.length != 0){
							submitBtn.disabled = true;
							submitBtn.style.border = 'none';
						}
					}
				}
			}
			request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			request.send((fieldData));		
		});
	});

	nextArrows.forEach( nextArrow => {
		const currentField = nextArrow.parentElement.parentElement;
		const nextField = currentField.nextElementSibling;
		nextArrow.addEventListener('click', event => {
			const message = event.target.parentElement.previousElementSibling.firstElementChild; 
			const input = message.parentElement.previousElementSibling;
			const fieldData = `${input.name}=${input.value}`;
			console.log(input);
			const request = new XMLHttpRequest();
			request.open('post', '/signup', true);
			request.onload = () => {
				if (request.status == 200) {
					message.innerText = request.responseText;
					const response2 = request.responseText;
					console.log(response2);
					setTimeout( ()=> {
						if (response2.length == 0) {	
							nextInputField(currentField, nextField);
						}
					}, 100);
				}
			}
			request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			request.send((fieldData));		
		});
	});

	backArrows.forEach( backArrow => {
		backArrow.addEventListener('click', () => {
			const currentField = backArrow.parentElement.parentElement;
			const previousField = currentField.previousElementSibling;
			previousInputField(currentField, previousField);
		});
	}); 
}

const nextInputField = (parent, nextField) => {
	parent.classList.add('inactive');
	parent.classList.remove('active');
	nextField.classList.add('active');
	nextField.classList.remove('inactive');
}

const previousInputField = (parent, previousField) => {
	parent.classList.add('inactive');
	parent.classList.remove('active');
	previousField.classList.add('active');
	previousField.classList.remove('inactive');
}

animatedForm();
