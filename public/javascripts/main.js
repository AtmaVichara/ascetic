$(document).ready(() => {
  $("#signUp").on("click", () => {
    $("#signUp").hide();
    $("#logIn").hide();
    $("#signUpForm").show();
    event.preventDefault();
  });
  $("#logIn").on("click", () => {
    $("#signUp").hide();
    $("#logIn").hide();
    $("#signUpForm").hide();
    $("#logInForm").show();
  })
});
