// Store frame for motion functions
var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/');
var previousFrame = null
var paused = false
var open = false
var lastNotify = new Date()
var currDate
var user
var tested = false

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

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

  $(".endTimeShow").hide()
  $("#showCTR").hide()
  $("#recc").hide()

  $("#ctr").change(function() {
    if(this.checked) {
        $("#showCTR").show()
        $(".endTimeShow").hide()
    }
  });
  $("#noctr").change(function() {
    if(this.checked) {
        $("#recc").show()
        $(".endTimeShow").hide()
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
// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }

  // Display Pointable (finger and tool) object data
  var pointableOutput = document.getElementById("pointableData");
  var pointableString = "";
  var c = 0
  if (frame.pointables.length > 0) {
    var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
    var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
    for (var i = 1; i < frame.pointables.length; i++) {
      var pointable = frame.pointables[i];

      pointableString += "<div style='width:250px; float:left; padding:5px'>";

      if (pointable.tool) {
        console.log("not finger")
      }
      else {
        pointableString += "Type: " + fingerTypeMap[pointable.type] + "<br />";
        pointableString += "Direction: " + pointable.direction[1].toFixed(2)+ "<br />";
        pointableString += "</div>";

        if(pointable.direction[1].toFixed(2)>0.8)
          c++
        if(c>2 && !tested){
          startTimer()
          tested = true
          setTimeout(function(){
            console.log("end timer")
            $(".endTimeShow").show()
          }, 60000)
          paused = !paused
        }
      }
    }
  }
  else {
    pointableString += "<div>No pointables</div>";
  }
  pointableOutput.innerHTML = pointableString;

  // Store frame for motion functions
  previousFrame = frame;
})

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}

function pad(num) {
  return num<10?"0"+num:num;
}

function startTimer() {
  var tCont = $('#counttime');
  var timer = tCont.html().split(':');

  if (timer.length === 2) timer.unshift(0);
  var endMilli= timer[0]*60*60*1000;
  endMilli += timer[1]*60*1000
  endMilli += timer[2]*1000;
  if(endMilli > 0) {
    var endTime = new Date(Date.now()+endMilli);

    var tId = setInterval(function() {
      var diff = endTime.getTime()-Date.now();
      if (diff<=0) {
        tCont.html("00:00:00");
        clearInterval(tId);
      }
      else {
        var d = new Date(diff);
        mm = pad(d.getMinutes());
        ss = pad(d.getSeconds());
        tCont.html(mm+":"+ss);
      }
    },300);
  }
}
