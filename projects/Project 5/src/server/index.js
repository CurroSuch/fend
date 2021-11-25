var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

const apiKey = process.env.API_KEY;

const app = express()

app.use(cors())

app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(9000, function () {
    console.log('App listening on port 9000!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/sentiment-analysis', async function (req, res){
    const data = req.body;
    const sentence = data.value;
    const result = await getAnalysis(sentence);
    
    console.log(result.irony);
    console.log(result.subjectivity);
    
    res.status(200).json({
        irony : result.irony,
        subjectivity : result.subjectivity
    })
})

async function getAnalysis(sentence) {
    let response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${sentence}&lang=en`)
    let data = await response.json()
    return data;
}