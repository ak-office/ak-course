    // Get the login form element
    var loginForm = document.getElementById("login-form");

    // Handle login form submission
    loginForm.addEventListener("submit", function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the username and password from the form

      var password = document.getElementById("password").value;

      // Check if the username and password are correct
      if (password === "akx1") {
        // Set the "loggedIn" key in local storage
        localStorage.setItem("loggedIn", "true");

        // Redirect to the home page
        window.location.href = "/logout.html";
      } else {
        // Show an error message
        var errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "⚠️ Wrong Password. Please Enter Correct Password.";
      }
    });
