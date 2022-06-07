const express = require('express');
const path = require('path')
const cors = require('cors');
const app = express();
const request = require('request')
const bodyParser = require('body-parser')


const fetch = (...args) => import('node-fetch').then(({ default: fetch}) => fetch(...args));


// app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'))
})


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE']
}));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running...');
});

const ingredients = {
  "ServerAnswer": "OK"
};

app.get('/', (req, res) => {
  res.send(ingredients);
});


app.post('/', (req, res) => {
  sendOn(req.body.token);
  console.log(req.body);
     res.send(req.body)
})





// http request to firebas

const YOUR_SERVER_KEY = 'AAAAFVvK2Ak:APA91bGFjpVYDRxQWDOimDq30VDKMXKH-A8Vot_tySKFpjpUvpfpBDuKE3wvp9gAVwwZhBlpTvDau_-6KaqecdBpZzD_VjYalY2lvKdCoOeKIAuuxz15VdaOq4y7GAxKwHTEpM7Uilr-'
const YOUR_TOKEN_ID = 'eYWROwCx1wY:APA91bFGw3jBWQdZwhHM44c9-aB4hKB-_HY-YiIfMJCMPY4zuCt1dG1o1TFIZIUp5okI1f_h-V0GqjhHoB1-dZEBWO83RFxxSHBaKRzICwGGm6_QR25FZm23sgvZ4ifbHRZfpWQl-F1C'



async function onSendPushtoFireBase(token) {
  console.log('onSendPushtoFareBase');
  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: {
      "Authorization": "key=" + YOUR_SERVER_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        "notification": {
          "title": "Message",
          "body": "New Message",
          "click_action": "http://yandex.ru/"
        },
      },
      to: token
    })
  })
  return response.json()
}

function sendOn(token) {
  onSendPushtoFireBase(token)
    .then(data => console.log(data))
    .then(err => console.log(err))
}

sendOn();