 const btnHttp = document.querySelector('#site')
 btnHttp.addEventListener('click', on);


 function on() {
   fetch('https://jsonplaceholder.typicode.com/users', {
       headers: {
         "Content-Type": "text/plain;charset=UTF-8"
       }
     })
     .then(res => res.json())
     .then(json => {
       console.log("First user in the array:")
       console.log(json[0])
     })
 }



 async function onSendtoServer() {
      const response = await fetch('http://localhost:3000/ingredients', {
     method: "POST",
     headers: {
       'Content-Type': 'application/json, '
     },
     body: JSON.stringify({
       name: {
         "token": "token"
       }
     })
   })
   return response.json();
 }

 function send() {
   onSendtoServer()
     .then(data => console.log(data))
     .then(err => console.log(err))
 }


 
