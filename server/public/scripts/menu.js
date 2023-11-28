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
  function toggleAbout() {
    document.getElementById("popup-about").classList.toggle("active");
  }

  return { toggleAbout };
})();
