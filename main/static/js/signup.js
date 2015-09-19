var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/')

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
