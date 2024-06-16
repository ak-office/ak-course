// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  var password = document.getElementById("password").value;

  if (password === "test") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "/logout.html";
  } else {
    alert("⚠️ Wrong Password. Please Enter Correct Password.");
  }
});

// Check if the user is logged in
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "/login.html";
}

// Load content for the specified page
function loadContent(page) {
  if (!isLoggedIn()) {
    window.location.href = "/login.html";
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", page + ".html", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("content").innerPHP = xhr.responseText;
    }
  };
  xhr.send();
}

// Load the default content
loadContent("home");