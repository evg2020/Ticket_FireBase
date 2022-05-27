// firebase_subscribe.js
firebase.initializeApp({
  messagingSenderId: '91734333449'
});

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
  var messaging = firebase.messaging();

  // пользователь уже разрешил получение уведомлений
  // подписываем на уведомления если ещё не подписали
  if (Notification.permission === 'granted') {
    subscribe();
  }

  // по клику, запрашиваем у пользователя разрешение на уведомления
  // и подписываем его
  $('#subscribe').on('click', function () {
    subscribe();
  });
}

function subscribe() {
  // запрашиваем разрешение на получение уведомлений
  messaging.requestPermission()
    .then(function () {
      // получаем ID устройства
      messaging.getToken()
        .then(function (currentToken) {
          console.log(currentToken);

          if (currentToken) {
            sendTokenToServer(currentToken);
          } else {
            console.warn('Не удалось получить токен.');
            setTokenSentToServer(false);
          }
        })
        .catch(function (err) {
          console.warn('При получении токена произошла ошибка.', err);
          setTokenSentToServer(false);
        });
    })
    .catch(function (err) {
      console.warn('Не удалось получить разрешение на показ уведомлений.', err);
    });
}

// отправка ID на сервер
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer(currentToken)) {
    console.log('Отправка токена на сервер...');

    var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
    $.post(url, {
      token: currentToken
    });

    setTokenSentToServer(currentToken);
  } else {
    console.log('Токен уже отправлен на сервер.');
  }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken) {
  return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
  window.localStorage.setItem(
    'sentFirebaseMessagingToken',
    currentToken ? currentToken : ''
  );
}


///
const sendBtn = document.querySelector('#sendPush')

sendBtn.addEventListener('click', sendOn)

const YOUR_TOKEN_ID = 'dgCea40IQNo:APA91bFIfLgfEYnxXjMFQ_U7VO_8ToWhtLW5VfyYSrpgqS73Th2aFc6AHQm_q7yMbu2aYmKiX_9_GwMe6z2jCOodpkcUEI-KPcG1kTzm0Uq2QzQGcCf5pi91xPn1GRSTgfQuxkSEW0Yd'
const YOUR_SERVER_KEY = 'AAAAFVvK2Ak:APA91bGFjpVYDRxQWDOimDq30VDKMXKH-A8Vot_tySKFpjpUvpfpBDuKE3wvp9gAVwwZhBlpTvDau_-6KaqecdBpZzD_VjYalY2lvKdCoOeKIAuuxz15VdaOq4y7GAxKwHTEpM7Uilr-'

async function onSendPush(token) {
   console.log('ok');
  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: {
      "Authorization": "key=" + YOUR_SERVER_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        "notification": {
          "title": "Ералаш",
          "body": "Начало в 21:00",
          "icon": "https://eralash.ru.rsz.io/sites/all/themes/eralash_v5/logo.png?width=40&height=40",
          "click_action": "http://eralash.ru/"
        },
      },
      to: token
    })
  })
  return response.json()
}

function sendOn(){
  onSendPush(YOUR_TOKEN_ID)
  .then(data => console.log(data))
    .then(err => console.log(err))
}


var messaging = firebase.messaging();