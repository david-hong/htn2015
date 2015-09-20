var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users')
// cycles b2b
var user

$('document').ready(function(){
  user = JSON.parse(sessionStorage.getItem('user'))
  console.log(user)

  if(user){
    $("#login").hide()
    $("#signup").hide()
  }
  else{
    $("#logout").hide()
    $("#settings").hide()
    $("#data").hide()
  }
})

function logout(){
  if(user){
    user = null
    sessionStorage.removeItem("user")
    window.location.replace("http://localhost:5000/")
  }
}

function login(){
  var email = document.getElementById("inputEmail").value
  var pass = document.getElementById("inputPassword").value
  var checkPass
  var firebaseIsShit = true

  usersRef.orderByChild("email").on("child_added", function(snapshot) {
    firebaseIsShit = false
    user = snapshot.val()
    console.log(user)
    checkPass = user.password
    if(pass === checkPass){
        sessionStorage.setItem('user', JSON.stringify(user))
        window.location.replace("http://localhost:5000/")
    }
    else{
      alertIncorrect()
    }
  });
  setTimeout(function(){
    if(firebaseIsShit){
      alertIncorrect()
    }
  }, 1000)
}

function alertIncorrect(){
  window.alert("Incorrect email/password")
  user = null
}
