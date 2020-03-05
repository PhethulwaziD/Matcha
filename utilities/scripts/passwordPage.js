const animatedForm = () => {
	const input = document.querySelector('input')
	const submitBtn = document.querySelector('.submit-btn');
	submitBtn.disabled = true;

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
}

animatedForm();
