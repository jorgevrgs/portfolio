const header = document.querySelector('.header');
const menuButton = document.querySelector('.btn-menu');
const menuLinks = document.querySelectorAll('.nav-link');

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
  header.classList.toggle('header-mobile');
};

/**
 * Remove 'header-mobile' class
 */
const removeClass = () => {
  header.classList.remove('header-mobile');
};

/**
 * Handle function if the screen width is desktop
 */
const handleDesktop = () => {
  removeClass();

  menuButton.removeEventListener('click', toggleMenu);
  menuLinks.forEach((menuLink) => {
    menuLink.removeEventListener('click', toggleMenu);
  });
};

/**
 * Create the listeners for each 'nak-link'
 */
const handleLinks = () => {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', toggleMenu);
  });
};

/**
 * Handle function if the screen width is mobile
 */
const handleMobile = () => {
  menuButton.addEventListener('click', toggleMenu);

  handleLinks();
};

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

// PROJECTS
const processProjects = async () => {
  const projectsElement = document.querySelector('.projects');
  const projectTemplate = document.querySelector('.project-template');
  const modalTemplate = document.querySelector('.modal-template');

  const projects = await fetch('assets/json/projects.json').then((r) => r.json());

  const renderModal = (project) => {
    const clone = modalTemplate.content.cloneNode(true);

    // Render image
    const imageElement = clone.querySelector('.cover-image');
    imageElement.src = project.image;

    // Click events
    const closeButtonElement = clone.querySelector('.btn-close');
    closeButtonElement.addEventListener('click', () => {
      projectsElement.querySelector('.modal-projects').remove();
    });

    projectsElement.appendChild(clone);
  };

  projects.forEach((project) => {
    const clone = projectTemplate.content.cloneNode(true);

    const projectElement = clone.querySelector('.project');
    projectElement.classList.add(`project-${project.id}`);

    // Render image
    const imageElement = clone.querySelector('.project-image');
    imageElement.src = project.image;
    imageElement.srcset = project.image;

    // Click events
    const buttonElement = clone.querySelector('.btn');
    buttonElement.addEventListener('click', () => {
      renderModal(project);
    });

    projectsElement.appendChild(clone);
  });
};

processProjects();