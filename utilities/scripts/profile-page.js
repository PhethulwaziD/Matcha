const yearOptions = document.querySelector('.year');
const dayOptions = document.querySelector('.day');
const inputInterest = document.querySelector('.input-interest');
const addButton = document.querySelector('.add-button');
const interestBlock = document.querySelector('.interest-block');
const deleteButton = document.querySelectorAll('delete-button');
const userName = document.querySelector('.username').textContent;
console.log(userName);

const Biography = document.querySelector('.field')

Biography.textContent = Biography.textContent.trim();


interestBlock.addEventListener('click', (event) => {
	if (event.target.className === 'delete-button') {
		let element = event.target;
		let interest = element.previousElementSibling.textContent.trim();
		requestFunction(`removeInterest=${interest}`);
		element.parentElement.remove();
	}
})

addButton.addEventListener('click', (event) => {

	if (inputInterest.value.length !== 0) {
		requestFunction(`addInterest=${inputInterest.value.trim()}`);
		interestBlock.innerHTML +=
									`
										<div class="option-container">
											<span class="radio-button">
												${inputInterest.value.trim()}
											</span>
											<div class="delete-button">&#215;</div>
										</div>
									`;
		inputInterest.value = "";
	}
});


 const requestFunction = (fieldData) => {
	const request = new XMLHttpRequest();
	request.open('post', '/profile', true);
	request.onload = () => {
		if (request.status == 200) {
			console.log(response);
		}
	}
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send((fieldData));
}

function getPost(position) {
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
}
