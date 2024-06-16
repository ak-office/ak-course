  // Check if the user is logged in
  if (!isLoggedIn()) {
    // Redirect to the login page
    window.location.href = "/login.html";
  }

  // Check if the user is logged in
  function isLoggedIn() {
    // Check if the "loggedIn" key exists in local storage and its value is "true"
    return localStorage.getItem("loggedIn") === "true";
  }
