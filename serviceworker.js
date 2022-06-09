navigator.serviceWorker.register('./your-serviceworker-file.js')
.then((registration) => {
  messaging.useServiceWorker(registration);

  // Request permission and get token.....
});