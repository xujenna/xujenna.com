  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCF2mhBJ6Ova-3XvMWmISH2l9DQle2jbl8",
    authDomain: "bye-qt.firebaseapp.com",
    databaseURL: "https://bye-qt.firebaseio.com",
    projectId: "bye-qt",
    storageBucket: "bye-qt.appspot.com",
    messagingSenderId: "492428074985",
    appId: "1:492428074985:web:53eb4b965ed08c9933b578"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();

  let postsDB = database.ref('/qt-entries/');

  // let formContainer = document.getElementById("form-container")
  // let submitButton = document.getElementById("submit");
  // let textarea = document.querySelector('textarea');

  function displayMsgs(){
    postsDB.on('value', (snapshot) => {
      let posters = snapshot.val();
      let posterKeys = Object.keys(posters);
      posterKeys.forEach(function (d,i) {
          let messageDiv = document.createElement('div')
          messageDiv.className = "message"
  
          if(posters[d]['fileRef']){
            let file = posters[d]['fileRef']
            let fileImg = document.createElement('img')
            fileImg.className = "msgImg"
  
            storageRef.child(file).getDownloadURL().then(function(url) {
            
              // This can be downloaded directly:
              var xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = function(event) {
                var blob = xhr.response;
              };
              xhr.open('GET', url);
              xhr.send();
            
              // Or inserted into an <img> element:
              fileImg.src = url;
              messageDiv.appendChild(fileImg)
            }).catch(function(error) {
              // Handle any errors
              console.log("error creating img")
            });
          }
  
          let name = posters[d]['name']
          let nameP = document.createElement('p')
          nameP.className = "posterName"
          nameP.textContent = name
          messageDiv.appendChild(nameP)
  
          let timePosted = posters[d]['time']
          let timePostedP = document.createElement('p')
          timePostedP.className = "posterTime"
          timePostedP.textContent = timeStamp(timePosted)
          messageDiv.appendChild(timePostedP)
          
          let message = posters[d]['message']
          let messageP = document.createElement('p')
          messageP.className = "posterMessage"
          messageP.innerHTML = message
          messageDiv.appendChild(messageP)
  
          // let file = posters[d]['fileRef']
          // let fileImg = document.createElement('img')
          // fileImg.src = getFile(file)
  
  
          let posts = document.getElementById("posts")
          let firstCol = document.getElementById("column-0")
          let secondCol = document.getElementById("column-1")
          let thirdCol = document.getElementById("column-2")
  
          switch(i % 3){
            case 0:
              firstCol.appendChild(messageDiv)
              break;
            case 1:
              secondCol.appendChild(messageDiv)
              break;
            case 2:
              thirdCol.appendChild(messageDiv)
              break;
            default:
              firstCol.appendChild(messageDiv)
          }
      })
    })
  }


  // Create a root reference
  var storageRef = firebase.storage().ref();

  // submitButton.onclick = function(){
  //   let time = Date.now();
  //   let newPost = {};
  //   let posterName = document.getElementById("name").value;
  //   let newMessage = document.getElementById("message").value.replace(/\r\n|\n/g, "</br>");
  //   let upload = document.getElementById("file").files

  //   if(upload.length > 0){
  //     let newFile = upload[0]
  //     let fileRef = storageRef.child("qt-imgs/"  + time + newFile.name)
  //     fileRef.put(newFile).then(function(snapshot) {
  //       console.log('Uploaded a blob or file!');
  //     });
  //     newPost["fileRef"] = "qt-imgs/"  + time + newFile.name;
  //   }

  //   let key = "/qt-entries/" + posterName + time;


  //   newPost["name"] = posterName;
  //   newPost["message"] = newMessage;
  //   newPost["time"] = time;
    

  //   if(newMessage.length > 0){
  //     database.ref(key).set(newPost);
  //     formContainer.remove()
  //     document.querySelectorAll('.message').forEach(e => e.remove());
  //     displayMsgs()
  //   }
  //   else{
  //     let error = document.createElement('p')
  //     error.className = "noContent"
  //     error.textContent = "No content to submit!"
  //     formContainer.appendChild(error)
  //   }
  // }



  function timeStamp(date) {
    // Create a date object with the current time
      var now = new Date(date);
    
    // Create an array with the current month, day and time
      var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    
    // Create an array with the current hour, minute and second
      var time = [ now.getHours(), now.getMinutes()];
    
    // Determine AM or PM suffix based on the hour
      var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    
    // Convert hour from military time
      time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    
    // If hour is 0, set it to 12
      time[0] = time[0] || 12;
    
    // If seconds and minutes are less than 10, add a zero
      for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
          time[i] = "0" + time[i];
        }
      }
    
    // Return the formatted string
      return date.join("/") + " " + time.join(":") + " " + suffix;
    }

    displayMsgs()