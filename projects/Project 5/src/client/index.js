import './styles/style.scss'
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'


const button = document.getElementById('submit-button');

button.addEventListener('click',  handleSubmit);


async function postData(){
    let response = await fetch("http://localhost:9000/sentiment-analysis", {
    method: 'POST',
    body: JSON.stringify({
        value: document.getElementById('sentence').value
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})
const result = await response.json();
console.log(result);
setData(result)
return result;
}

function setData(result) {
    let dataresult = document.getElementById('juanito');
    console.log(dataresult)
    dataresult.innerText = `This phrase is ${result.irony} and it's ${result.subjectivity} too.`;
};

const button2 = document.getElementById('submit-button-2')
button2.addEventListener('click', postData);