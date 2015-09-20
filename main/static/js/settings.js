var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/')
var user

$('document').ready(function(){
  user = JSON.parse(sessionStorage.getItem('user'))
  console.log(user)

  $(".chand").hide()

  if(user){
    $("#login").hide()
    $("#signup").hide()
  }
  else{
    $("#logout").hide()
    $("#settings").hide()
    $("#data").hide()
  }

  $("#haveCTS").change(function() {
    if(this.checked) {
        $(".chand").show()
    }
    else{
        $(".chand").hide()
    }
  });
})

function logout(){
  if(user){
    user = null
    sessionStorage.removeItem("user")
    window.location.replace("http://localhost:5000/")
  }
}

function updateSettings(){
  var haveCTS = document.getElementById("haveCTS").checked
  var notifDownTime = document.getElementById("notifDownTime").value
  var CTShand = document.getElementById("CTShand").value

  console.log(haveCTS)
  console.log(notifDownTime)
  console.log(CTShand)

  var obj

  if(haveCTS){
    obj = {
        haveCTS: haveCTS,
        notificationDownTime: notifDownTime,
        CTShand: CTShand
    }
  }
  else{
    obj = {
        haveCTS: haveCTS,
        notificationDownTime: notifDownTime,
        CTShand: "none"
    }
  }
  usersRef.child(user.name.replace(/ /g, '_')).update(
    obj
  )
}

function testCTS(){
  //leap motion shit
}
