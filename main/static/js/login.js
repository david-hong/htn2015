var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/')
var user

function login(){
  var email = document.getElementById("inputEmail").value
  var pass = document.getElementById("inputPassword").value
  var checkPass
  var firebaseIsShit = true

  usersRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
    firebaseIsShit = false
    user = snapshot.val()
    console.log(user.password)
    checkPass = user.password
    if(pass === checkPass){
        window.alert("Logged in")
    }
    else{
      alertIncorrect()
    }
  });
  setTimeout(function(){
    if(firebaseIsShit){
      alertIncorrect()
    }
  }, 500)
}

function alertIncorrect(){
  window.alert("Incorrect email/password")
  user = null
}
