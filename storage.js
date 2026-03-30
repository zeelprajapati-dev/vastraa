// storage.js

// ==============================
// Sign Up: Save new user
// ==============================
function saveUser(name, email, password) {
  // Get existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return false; // user exists
  }

  // Create new user object
  const newUser = { name, email, password };

  // Save user
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return true; // saved successfully
}

// ==============================
// Login: Check credentials and set currentUser
// ==============================
function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true; // login successful
  }
  return false; // invalid login
}

// ==============================
// Get current logged-in user
// ==============================
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// ==============================
// Get current user's name
// ==============================
function getCurrentUserName() {
  const user = getCurrentUser();
  return user ? user.name : null;
}

// ==============================
// Logout: remove currentUser
// ==============================
function logoutUser() {
  localStorage.removeItem("currentUser");
}

// ==============================
// Check if user is logged in
// ==============================
function isLoggedIn() {
  return localStorage.getItem("currentUser") ? true : false;
}
