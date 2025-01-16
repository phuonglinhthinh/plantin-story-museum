// const navbarToggle = document.getElementById("navbar-toggle");
// const navbarLinks = document.getElementById("navbar-links");

// // Toggle the menu on click
// navbarToggle.addEventListener("click", () => {
//   navbarLinks.classList.toggle("navbar__links--active");
// });

// // Close menu when a link is clicked
// document.querySelectorAll(".navbar__link").forEach(link => {
//   link.addEventListener("click", () => {
//     navbarLinks.classList.remove("navbar__links--active");
//   });
// });

const sideBar = document.querySelector('nav--mobile');

showSidebar = () => {
  sideBar.addEventListener("click", () => {
    navbarLinks.classList.toggle("navbar__links--active");
  });
}
closeSidebar = () => {
  sideBar.classList.display = 'none';
}