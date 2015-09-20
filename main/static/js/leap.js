// Store frame for motion functions
var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/');
var previousFrame = null
var paused = false
var open = true
var lastNotify = new Date()
var currDate
var user
var harmful_mouseDV = []
var harmful_mouseCF = []
var harmful_mouseWR = []
var harmful_mousePM = []

var harmful_bendLeftDV = []
var harmful_bendLeftCF = []
var harmful_bendLeftWR = []
var harmful_bendLeftPM = []

var harmful_bendRightDV = []
var harmful_bendRightCF = []
var harmful_bendRightWR = []
var harmful_bendRightPM = []

var harmful_KnittingDV = []
var harmful_KnittingCF = []
var harmful_KnittingWR = []
var harmful_KnittingPM = []

var userPalm = []
var userConf = []
var userWris = []
var userDire = []

var len = 0
var matchThreshold = 10
var matchCount = [0,0,0,0]

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

$('document').ready(function(){
  user = JSON.parse(sessionStorage.getItem('user'))
  //console.log(user)

  usersRef.child("harmful_mouse").orderByKey().limitToFirst(1).on("child_added", function(snapshot) {
      var poiii = snapshot.val()
      for(var i = 1; i<poiii.length; i++){
        // hand direction
        harmful_mouseDV.push(poiii[i][2][0][2])
        // confid
        harmful_mouseCF.push(poiii[i][2][0][9])
        // wrist
        harmful_mouseWR.push(poiii[i][2][0][10][3])
        // palm
        harmful_mousePM.push(poiii[i][2][0][6])
      }
      /*console.log(harmful_mouseDV)
      console.log(harmful_mouseCF)
      console.log(harmful_mouseWR)
      console.log(harmful_mousePM)*/
  })

  usersRef.child("harmful_bendLeft").limitToFirst(1).on("child_added", function(snapshot) {
    var poiii = snapshot.val()
    for(var i = 1; i<poiii.length; i++){
      // hand direction
      harmful_bendLeftDV.push(poiii[i][2][0][2])
      // confid
      harmful_bendLeftCF.push(poiii[i][2][0][9])
      // wrist
      harmful_bendLeftWR.push(poiii[i][2][0][10][3])
      // palm
      harmful_bendLeftPM.push(poiii[i][2][0][6])
    }
    /*console.log("harmful_bendLeft")
    console.log(harmful_bendLeftDV)
    console.log(harmful_bendLeftCF)
    console.log(harmful_bendLeftWR)
    console.log(harmful_bendLeftPM)*/
  })

  usersRef.child("harmful_bendRight").limitToFirst(1).on("child_added", function(snapshot) {
    var poiii = snapshot.val()
    for(var i = 1; i<poiii.length; i++){
      // hand direction
      harmful_bendRightDV.push(poiii[i][2][0][2])
      // confid
      harmful_bendRightCF.push(poiii[i][2][0][9])
      // wrist
      harmful_bendRightWR.push(poiii[i][2][0][10][3])
      // palm
      harmful_bendRightPM.push(poiii[i][2][0][6])
    }
    /*console.log("harmful_bendRight")
    console.log(harmful_bendRightDV)
    console.log(harmful_bendRightCF)
    console.log(harmful_bendRightWR)
    console.log(harmful_bendRightPM)*/
  })

  usersRef.child("harmful_knitting").limitToFirst(1).on("child_added", function(snapshot) {
    var poiii = snapshot.val()
    for(var i = 1; i<poiii.length; i++){
      // hand direction
      harmful_KnittingDV.push(poiii[i][2][0][2])
      // confid
      harmful_KnittingCF.push(poiii[i][2][0][9])
      // wrist
      //harmful_KnittingWR.push(poiii[i][2][0][10][3])
      // palm
      //harmful_KnittingPM.push(poiii[i][2][0][6])
    }
    /*console.log("Knitting")
    console.log(harmful_KnittingDV)
    console.log(harmful_KnittingCF)
    console.log(harmful_KnittingWR)
    console.log(harmful_KnittingPM)*/
  })

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

//need to get some hand params
function updateLeap(hand){
  currDate = new Date()
  //IF SHIT IS BAAAAAAAAAAAAD, TIMEOUT
  //if(!open && currDate - lastNotify  >= 30000){
  if(!open){
    if(!open){
      open = true
    }
    else{
      lastNotify = currDate
    }

    var notification = new Notification('Be careful of your posture', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Try not to do such repetitive motions, they strain your nerves.",
    });
  }
  else{
    //console.log(currDate - lastNotify)
  }
}

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

      //userPalm.push(hand.stabilizedPalmPosition)
      userConf.push(hand.confidence)
      //userWris.push(hand.arm.basis[2])
      userDire.push(hand.direction)

      len++

      if(len === 100){
        //check match
        leastSquares()


        //console.log(userPalm)
        //console.log(userConf)
        //console.log(userWris)
        //console.log(userDire)

        //userPalm.shift()
        userConf.shift()
        //userWris.shift()
        userDire.shift()
        len--
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

      //supply some params
      updateLeap(hand)

      handString += "</div>";
    }
  }
  else {
    handString += "No hands";
  }
  handOutput.innerHTML = handString;

  // Store frame for motion functions
  previousFrame = frame;
})


// MOVE EVERYTHING HERE, PUT EVERYTHING IN THE FOR LOOP. YOLO
function leastSquares(){
  var sum = 0
  var match = 0
  var match2 = 0
  var match3 = 0
  var match4 = 0
  var matches = 0
  var matches2 = 0
  var matches3 = 0
  var matches4 = 0

  for(var i=0;i<100;i++){
    match=0
    match2=0
    match3=0
    match4=0
    //if(userConf[i]>0.75 && confArr[i]>0.75){
      for(var j=0;j<3;j++){
        match += Math.abs(userDire[i][j]  - harmful_mouseDV[i][j])
        if(match < 0.2){
          matches++
        }

        match2 += Math.abs(userDire[i][j]  - harmful_bendLeftDV[i][j])
        if(match2 < 0.2){
          matches2++
        }

        match3 += Math.abs(userDire[i][j]  - harmful_bendRightDV[i][j])
        if(match3 < 0.2){
          matches3++
        }

        match4 += Math.abs(userDire[i][j]  - harmful_KnittingDV[i][j])
        if(match4 < 0.2){
          matches4++
        }
      }
    //}
  }
  console.log(matches + " " + matches2 + " " + matches3 + " " + matches4)
  if(matches>90){
    matches = 0
    addMatchCount(0)
    //console.log("mc " + matchCount)
  }
  if(matches2>90){
    matches2 = 0
    addMatchCount(1)
    //console.log("mc2 " + matchCount)
  }
  if(matches3>90){
    matches3 = 0
    addMatchCount(2)
    //console.log("mc3 " + matchCount)
  }
  if(matches4>90){
    matches4 = 0
    addMatchCount(3)
    //console.log("mc4 " + matchCount)
  }
}

function addMatchCount(id){
  matchCount[id] = matchCount[id] + 1
  if(matchCount[id] === matchThreshold){
    matchCount[id] = 0
    open = false
    userDire = []
    userConf = []
    len = 0
  }
}

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
