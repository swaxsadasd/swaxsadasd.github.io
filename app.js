// -- globals -- //

var turn; //true = P1, false = P2

// -- game control -- //

//starts game
function startGame() {
  //randomise images
  const suits = ["spade.png", "heart.png", "club.png", "diamond.png"];
  const values = ["Higher", "Lower"];
  document.getElementById("suitimg").src=suits[Math.floor(Math.random()*suits.length)];
  value = values[Math.floor(Math.random()*values.length)];
  document.getElementById("valueimg").src=value.concat(".png");
  document.getElementById("numbertag").innerHTML = value;

  //show and hide relevant elements
  document.getElementById("startmenu").classList.add("hide");
  document.getElementById("rulesmenu").classList.remove("hide");
  document.getElementById("P1time").classList.remove("hide");
  document.getElementById("P2time").classList.remove("hide");
  document.getElementById("turngradient").classList.remove("hide");

  //decide starting player
  flipacoin = Math.random();
  if (flipacoin < 0.5) {
    turn = false;
  } else {
    turn = true;
  }

  //show relevant components
  if (turn) {
    document.getElementById("P1pass").classList.remove("hide");
    gradient(true);
    P2controller(true);
  } else {
    document.getElementById("P2pass").classList.remove("hide");
    gradient(false);
    P1controller(true);
  }

}

//activates a game over screen
function endGame() {
  buttons = document.querySelectorAll("button");
  for (let i=0; i<buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  document.getElementById("retrybutton").style.display = "block";
  
  //make gradient red
  gradient = document.getElementById("turngradient");
  if (turn) {
    gradient.style.backgroundImage = "linear-gradient(rgb(0,0,0,0),rgb(255, 0, 0))";
  } else {
    gradient.style.backgroundImage = "linear-gradient(rgb(255, 0, 0),rgb(0,0,0,0))";
  }
  
  //OPEN ENDMENU
  document.getElementById("rulesmenu").classList.add("hide");
  document.getElementById("valuemenu").classList.add("hide");
  document.getElementById("suitmenu").classList.add("hide");
  document.getElementById("endmenu").classList.remove("hide");
}

// -- chess clock and turn swapping -- //

function P1controller(counting) {
  //if there is an existing interval, reset it
  if (typeof P1count !== 'undefined') {
    clearInterval(P1count);
  }

  //resets menu to rulesmenu
  document.getElementById("rulesmenu").classList.remove("hide");
  document.getElementById("valuemenu").classList.add("hide");
  document.getElementById("suitmenu").classList.add("hide");

  //begin interval
  if (counting == true) {
    turn = true;
    P1count = setInterval(P1countdown, 1000);
  }
}

//counts down timer until it reaches 0
function P1countdown() {
  const P1 = document.getElementById("P1time");
  var currentValue = parseInt(P1.innerHTML);
  if (currentValue != 0) {
    P1.innerHTML = currentValue - 1;
  } else {
    endGame();
  }
}

function P2controller(counting) {
  if (typeof P2count !== 'undefined') {
    clearInterval(P2count);
  }

  document.getElementById("rulesmenu").classList.remove("hide");
  document.getElementById("valuemenu").classList.add("hide");
  document.getElementById("suitmenu").classList.add("hide");

  if (counting == true) {
    turn = false;
    P2count = setInterval(P2countdown, 1000);
  }
}

function P2countdown() {
  const P2 = document.getElementById("P2time");
  var currentValue = parseInt(P2.innerHTML);
  if (currentValue != 0) {
    P2.innerHTML = currentValue - 1;
  } else {
    endGame();
  }
}

//swaps turn indicators
function gradient(player) { //player: true = P1, false = P2
  var element = document.getElementById("turngradient");
  if (player) {
    //swap position of gradient
    element.classList.remove("bottomgradient");
    element.classList.add("topgradient");

    //swap whose buttons are visible
    document.getElementById("P2pass").classList.add("hide");
    document.getElementById("P1pass").classList.remove("hide");
  } else {
    element.classList.remove("topgradient");
    element.classList.add("bottomgradient");  

    document.getElementById("P1pass").classList.add("hide");
    document.getElementById("P2pass").classList.remove("hide");
  }
}


// -- menus -- //

function openValue() {
  rulesmenu = document.getElementById("rulesmenu");
  valuemenu = document.getElementById("valuemenu");
  rulesmenu.classList.add("hide");
  valuemenu.classList.remove("hide");
}

function selectValue(value) {
  rulesmenu = document.getElementById("rulesmenu");
  valuemenu = document.getElementById("valuemenu");
  image = document.getElementById("valueimg");
  image.src=value.concat(".png");
  document.getElementById("numbertag").innerHTML = value;
  
  //decide who incurs the time penalty
  if (turn) {
    P = document.getElementById("P1time");
  } else {
    P = document.getElementById("P2time");
  }

  //retrieve current value for deduction
  var currentValue = parseInt(P.innerHTML);
  currentValue -= 5;

  //input sanitisation
  if (currentValue <= 0) {
    P.innerHTML = 0;
    endGame();
  } else {
    P.innerHTML = currentValue;
  }

  //close menu
  valuemenu.classList.add("hide");
  rulesmenu.classList.remove("hide");
}

function openSuit() {
  rulesmenu = document.getElementById("rulesmenu");
  suitmenu = document.getElementById("suitmenu");
  rulesmenu.classList.add("hide");
  suitmenu.classList.remove("hide");
}

function selectSuit(suit) {
  rulesmenu = document.getElementById("rulesmenu");
  suitmenu = document.getElementById("suitmenu");
  image = document.getElementById("suitimg");
  image.src=suit.concat(".png");

  //decide who incurs the time penalty
  if (turn) {
    P = document.getElementById("P1time");
  } else {
    P = document.getElementById("P2time");
  }

  //retrieve current value for deduction
  var currentValue = parseInt(P.innerHTML);
  currentValue -= 2;

  //input sanitisation
  if (currentValue <= 0) {
    P.innerHTML = 0;
    endGame();
  } else {
    P.innerHTML = currentValue;
  }

  //close menu  
  suitmenu.classList.add("hide");
  rulesmenu.classList.remove("hide");
}