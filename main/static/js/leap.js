// Store frame for motion functions
var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/');
var previousFrame = null
var paused = false
var open = false
var lastNotify = new Date()

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }
  // Display Hand object data
  var handOutput = document.getElementById("handData");
  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      handString += "<div style='width:300px; float:left; padding:5px'>";
      handString += "Type: " + hand.type + " hand" + "<br />";
      handString += "Confidence: " + hand.Confidence + "<br />";
      handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";

      var currDate = new Date()
      //IF SHIT IS BAAAAAAAAAAAAD, TIMEOUT
      if(hand.type == "right" && (!open || currDate - lastNotify  >= 30000)){

        usersRef.child("John_Doe").update({
            handValues: "Arham like cookies",
            senpai: "notice me"
        })

        console.log(currDate - lastNotify)
        if(!open){
          open = true
        }
        else{
          lastNotify = currDate
        }

        var notification = new Notification('Notification title', {
          icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: "Fix yo fucking wrists!",
        });

        notification.onclick = function () {
          window.open("http://stackoverflow.com/a/13328397/1269037");
        };
      }
      else{
        //console.log(hand.type)
        console.log(currDate - lastNotify)
        console.log(open)
      }

      // IDs of pointables associated with this hand
      if (hand.pointables.length > 0) {
        var fingerIds = [];
        for (var j = 0; j < hand.pointables.length; j++) {
          var pointable = hand.pointables[j];
            fingerIds.push(pointable.id);
        }
        if (fingerIds.length > 0) {
          handString += "Fingers IDs: " + fingerIds.join(", ") + "<br />";
        }
      }

      handString += "</div>";
    }
  }
  else {
    handString += "No hands";
  }
  handOutput.innerHTML = handString;

  // Display Pointable (finger and tool) object data
  var pointableOutput = document.getElementById("pointableData");
  var pointableString = "";
  if (frame.pointables.length > 0) {
    var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
    var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
    for (var i = 0; i < frame.pointables.length; i++) {
      var pointable = frame.pointables[i];

      pointableString += "<div style='width:250px; float:left; padding:5px'>";

      if (pointable.tool) {
        pointableString += "Classified as a tool <br />";
        pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
        pointableString += "</div>";
      }
      else {
        pointableString += "Type: " + fingerTypeMap[pointable.type] + "<br />";
        pointableString += "Classified as a finger<br />";
        pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
        pointableString += "</div>";
      }
    }
  }
  else {
    pointableString += "<div>No pointables</div>";
  }
  //pointableOutput.innerHTML = pointableString;

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
