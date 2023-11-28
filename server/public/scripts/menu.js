const Menu = (function () {
  // // The components of the UI are put here
  // const components = [SignInForm, UserPanel];

  // // This function initializes the UI
  // const initialize = function() {
  //     // Initialize the components
  //     for (const component of components) {
  //         component.initialize();
  //     }
  // };

  var loginForm = document.getElementById("login-form");
  var registerForm = document.getElementById("register-form");
  var toggleBotton = document.getElementById("btn");

  function toggleRegistration() {
    loginForm.style.left = "-400px";
    registerForm.style.left = "50px";
    toggleBotton.style.left = "110px";
  }

  function toggleLogin() {
    loginForm.style.left = "50px";
    registerForm.style.left = "450px";
    toggleBotton.style.left = "0";
  }

  function toggleAbout() {
    document.getElementById("popup-about").classList.toggle("active");
  }

  // function toggleCreate() {
  //   document.getElementById("popup-create").classList.toggle("active");
  // }

  function toggleJoin() {
    document.getElementById("popup-join").classList.toggle("active");
  }

  // function createRoom() {
  //   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   var roomNumber = "";
  //   for (var i = 5; i > 0; --i)
  //     roomNumber += chars[Math.round(Math.random() * (chars.length - 1))];
  //   console.log(roomNumber);

  //   var createBtn = document.getElementById("create-room-btn");
  //   createBtn.style.display = "none";

  //   var roomNum = document.getElementById("room-num");
  //   roomNum.style.display = "block";

  //   var roomNumText = document.getElementById("room-num-text");
  //   roomNumText.innerHTML = "Room Number: " + roomNumber;

  //   var fireboySelect = document.getElementById("create-fireboy");
  //   fireboySelect.style.display = "block";
  //   var icegirlSelect = document.getElementById("create-icegirl");
  //   icegirlSelect.style.display = "block";

  //   // player1.style.display = "block";
  //   // player2.style.display = "block";
  // }

  // function selectFireboy() {
  //   var player1 = document.getElementById("create-player1");

  //   const currentUser = Authentication.getUser();
  //   console.log("current user: " + currentUser.username);

  //   player1.style.display = "block";
  //   player1.innerHTML = currentUser.username;
  // }

  // function selectIcegirl() {
  //   var player2 = document.getElementById("create-player2");

  //   const currentUser = Authentication.getUser();
  //   console.log("current user: " + currentUser.username);

  //   player2.style.display = "block";
  //   player2.innerHTML = currentUser.username;
  // }

  function logOut() {
    Authentication.signout(() => {
      Socket.disconnect();

      $("#background-authentication").show();
      // SignInForm.show();
    });
  }

  // return {
  //   toggleAbout,
  //   toggleCreate,
  //   createRoom,
  //   toggleJoin,
  //   toggleRegistration,
  //   toggleLogin,
  //   selectFireboy,
  //   selectIcegirl,
  //   logOut,
  // };
  return {
    toggleAbout,
    toggleJoin,
    toggleRegistration,
    toggleLogin,
    logOut,
  };
})();
