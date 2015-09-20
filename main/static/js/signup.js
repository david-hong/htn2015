var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/')
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

function signUp(){
  var name = document.getElementById("inputName").value
  var email = document.getElementById("inputEmail").value
  var pass =document.getElementById("inputPassword").value

  console.log(name)
  console.log(email)
  console.log(pass)

  usersRef.child(name).set({
    name: name,
    email: email,
    password: pass
  })
}
