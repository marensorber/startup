

function login() {
  const name = document.querySelector("#username");
  //console.log(name)
  localStorage.setItem("username", name.value);
  window.location.href = "home.html";
}
