// const YOUR_TOKEN_ID = 'e-9PQyjb2bM:APA91bH1n9DIzPRx-7MrEg-fEKFmQjdd4eBH2FS3w25VCvjuU96ZJ4bWu5SGwtyj2YbHEIBDz1_Nn41l3GPvDqKnVGUAm_7O20rLZ49CljmQEPJ3B0nyoQUkxyALJMipP45lw7TrddzJ'
const YOUR_SERVER_KEY = 'AAAAFVvK2Ak:APA91bGFjpVYDRxQWDOimDq30VDKMXKH-A8Vot_tySKFpjpUvpfpBDuKE3wvp9gAVwwZhBlpTvDau_-6KaqecdBpZzD_VjYalY2lvKdCoOeKIAuuxz15VdaOq4y7GAxKwHTEpM7Uilr-'


// firebase_subscribe.js
firebase.initializeApp({
  messagingSenderId: '91734333449'
});

var messaging = firebase.messaging();

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
          return currentToken
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
    setTokenSentToServer(currentToken);
    send(currentToken)
    sendOn()
  } else {
    console.log('Токен уже отправлен на сервер..');
    send(currentToken)
    sendOn()

  }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken) {
  return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function getToken (){
  const res=window.localStorage.getItem ('sentFirebaseMessagingToken')
  console.log(res);
  return res
}


function setTokenSentToServer(currentToken) {
  window.localStorage.setItem(
    'sentFirebaseMessagingToken',
    currentToken ? currentToken : ''
  );
}


///--code
const sendBtn = document.querySelector('#sendPush')
sendBtn.addEventListener('click', sendOn)
// sendBtn.addEventListener('click', send)



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
          "body": "ody Message",
          "click_action": "http://yandex.ru/"
        },
      },
      to: token
    })
  })
  return response.json()
}

function sendOn() {
  const token = getToken ()
   onSendPushtoFireBase(token)
    .then(data => console.log(data))
    .then(err => console.log(err))
}

///---evg---------------------------------------

async function onSendtoServer(token) {
  console.log('onSendtoServer');
  const response = await fetch('http://127.0.0.1:3000', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json '
    },

    body: JSON.stringify({
        "token": token
    })
  })
  return response.json();
}

function send(currentToken) {
  onSendtoServer(currentToken)
    .then(data => console.log(data))
    .then(err => console.log(err))
}


///------------
// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Handling background message', payload);

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data));

  return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }
    return clients.openWindow(target);
  }));
});

// <!-- standart notification -->

if ('Notification' in window) {
  var messaging = firebase.messaging();

  messaging.onMessage(function(payload) {
      console.log('Message received. ', payload);
      new Notification(payload.notification.title, payload.notification);
  });
} 