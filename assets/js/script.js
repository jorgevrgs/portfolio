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
const projectsElement = document.querySelector('.projects');

/**
 *
 * @param {string} template Template selector
 * @returns {object} Node element
 *
 * @example template = '.modal-template'
 */
const getTemplate = (template) => document.querySelector(template).content.cloneNode(true);

const handleCloseModal = (clone) => {
  const closeButtonElement = clone.querySelector('.btn-close');
  closeButtonElement.addEventListener('click', () => {
    projectsElement.querySelector('.modal-projects').remove();
  });
};

/**
 *
 * @param {object} clone Node element
 * @param {object} project Project
 */
const updateModalContent = (clone, project) => {
  // Render image
  const imageElement = clone.querySelector('.cover-image');
  imageElement.src = project.image;

  // @TODO: Update content
};

/**
 * Render the content of the modal
 *
 * @param {object} clone Node element
 */
const renderModal = (project) => {
  const clone = getTemplate('.modal-template');

  // Update content
  updateModalContent(clone, project);

  // Click events
  handleCloseModal(clone);

  return clone;
};

/**
 *
 * @param {object} clone Node element
 * @param {object} project Project
 */
const updateArticleContent = (clone, project) => {
  // Render image
  const imageElement = clone.querySelector('.project-image');
  imageElement.src = project.image;
  imageElement.srcset = project.image;

  // @TODO: Update content
};

/**
 *
 * @param {object} clone Node element
 * @param {object} project Project
 */
const setArticleButtonEvent = (clone, project) => {
  const buttonElement = clone.querySelector('.btn');
  buttonElement.addEventListener('click', () => {
    const clone = renderModal(project);

    projectsElement.appendChild(clone);
  });
};

/**
 *
 * @param {object} project Project element
 * @returns {object} Node element
 */
const renderArticle = (project) => {
  const clone = getTemplate('.project-template');

  const projectElement = clone.querySelector('.project');
  projectElement.classList.add(`project-${project.id}`);

  // Update content
  updateArticleContent(clone, project);

  // Click events
  setArticleButtonEvent(clone, project);

  return clone;
};

/**
 * Process the projects in order to get data and render templates
 */
const processProjects = async () => {
  const projects = await fetch('assets/json/projects.json').then((r) => r.json());

  projects.forEach((project) => {
    const clone = renderArticle(project);

    projectsElement.appendChild(clone);
  });
};

processProjects();
