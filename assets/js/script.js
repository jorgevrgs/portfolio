const header = document.querySelector('header');
const menuButton = document.querySelector('.btn-menu');
const menuLinks = document.querySelectorAll('.nav-link');

const toggleMenu = () =>{
  header.classList.toggle('header-mobile');
}

function removeClass() {
  header.classList.remove('header-mobile');
}

menuButton.addEventListener('click', toggleMenu);

menuLinks.forEach(menuLink => {
  menuLink.addEventListener('click', toggleMenu);
})

window.addEventListener('resize', () => {
  if (window.innerWidth>992){
    removeClass();
  }
})
