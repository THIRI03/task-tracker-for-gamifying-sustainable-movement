// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 200) {
      // Check if login was successful
      if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);
        // Redirect or perform further actions for logged-in user
        window.location.href = "profile.html?user_id=" + responseData.user_id;
      }
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  const loginForm = document.getElementById("loginForm");

  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      email: email,
      password: password,
    };
    // Perform login request
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);

    // Reset the form fields
    loginForm.reset();
  });
});