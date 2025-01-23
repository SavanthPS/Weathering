console.log('Client side javascript file is loaded....')
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = searchElement.value
    messageone.style.color = 'rgb(72, 0, 143)';
    messageone.style.fontWeight = 'bold';
    messageone.textContent = "Loading....."
    messagetwo.textContent = ""

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageone.style.color = 'rgb(112, 50, 50)';
                messageone.style.fontWeight = 'bold';
                messageone.textContent = data.error;
            } else {
                messageone.style.color = 'rgb(72, 0, 143)';
                messageone.style.fontWeight = 'bold';

                messageone.textContent = 'At ' + data.location + ' . ' + data.forecast
            }
            searchElement.value = '';
        })
    })
})