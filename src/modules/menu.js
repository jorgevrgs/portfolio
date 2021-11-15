// ███╗░░░███╗███████╗███╗░░██╗██╗░░░██╗
// ████╗░████║██╔════╝████╗░██║██║░░░██║
// ██╔████╔██║█████╗░░██╔██╗██║██║░░░██║
// ██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║
// ██║░╚═╝░██║███████╗██║░╚███║╚██████╔╝
// ╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░╚═════╝░

export default function menu() {
  // ░█▀▀▀ █── █▀▀ █▀▄▀█ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
  // ░█▀▀▀ █── █▀▀ █─▀─█ █▀▀ █──█ ──█── ▀▀█
  // ░█▄▄▄ ▀▀▀ ▀▀▀ ▀───▀ ▀▀▀ ▀──▀ ──▀── ▀▀▀

  const headerElement = document.querySelector('.header');
  const menuButtonElement = document.querySelector('.btn-menu');
  const menuLinkElements = document.querySelectorAll('.nav-link');

  // ░█▀▀▀ █──█ █▀▀▄ █▀▀ ▀▀█▀▀ ─▀─ █▀▀█ █▀▀▄ █▀▀
  // ░█▀▀▀ █──█ █──█ █── ──█── ▀█▀ █──█ █──█ ▀▀█
  // ░█─── ─▀▀▀ ▀──▀ ▀▀▀ ──▀── ▀▀▀ ▀▀▀▀ ▀──▀ ▀▀▀

  /**
   * Determine if it's mobile based on the screen width
   *
   * @returns {boolean}
   */
  const isMobile = () => window.innerWidth < 992;

  /**
   * Add or remove 'header-mobile' class
   */
  const toggleMenu = () => {
    headerElement.classList.toggle('header-mobile');
  };

  /**
   * Remove 'header-mobile' class
   */
  const removeClass = () => {
    headerElement.classList.remove('header-mobile');
  };

  /**
   * Handle function if the screen width is desktop
   */
  const handleDesktop = () => {
    removeClass();

    menuButtonElement.removeEventListener('click', toggleMenu);
    menuLinkElements.forEach((menuLink) => {
      menuLink.removeEventListener('click', toggleMenu);
    });
  };

  /**
   * Create the listeners for each 'nak-link'
   */
  const handleLinks = () => {
    menuLinkElements.forEach((menuLink) => {
      menuLink.addEventListener('click', toggleMenu);
    });
  };

  /**
   * Handle function if the screen width is mobile
   */
  const handleMobile = () => {
    menuButtonElement.addEventListener('click', toggleMenu);

    handleLinks();
  };

  // ░█▀▄▀█ █▀▀█ ─▀─ █▀▀▄
  // ░█░█░█ █▄▄█ ▀█▀ █──█
  // ░█──░█ ▀──▀ ▀▀▀ ▀──▀

  /**
   * Main function
   */
  const main = () => {
    if (isMobile()) {
      handleMobile();
    } else {
      handleDesktop();
    }
  };

  main();

  /**
   * Event listener if the screen is resized
   */
  window.addEventListener('resize', main);
}
