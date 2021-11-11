/**
 * script.js
 *
 * @license MIT
 *
 */

// ███╗░░░███╗███████╗███╗░░██╗██╗░░░██╗
// ████╗░████║██╔════╝████╗░██║██║░░░██║
// ██╔████╔██║█████╗░░██╔██╗██║██║░░░██║
// ██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║
// ██║░╚═╝░██║███████╗██║░╚███║╚██████╔╝
// ╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░╚═════╝░

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

// ██████╗░██████╗░░█████╗░░░░░░██╗███████╗░█████╗░████████╗░██████╗
// ██╔══██╗██╔══██╗██╔══██╗░░░░░██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝
// ██████╔╝██████╔╝██║░░██║░░░░░██║█████╗░░██║░░╚═╝░░░██║░░░╚█████╗░
// ██╔═══╝░██╔══██╗██║░░██║██╗░░██║██╔══╝░░██║░░██╗░░░██║░░░░╚═══██╗
// ██║░░░░░██║░░██║╚█████╔╝╚█████╔╝███████╗╚█████╔╝░░░██║░░░██████╔╝
// ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═════╝░

// ░█▀▀▀ █── █▀▀ █▀▄▀█ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
// ░█▀▀▀ █── █▀▀ █─▀─█ █▀▀ █──█ ──█── ▀▀█
// ░█▄▄▄ ▀▀▀ ▀▀▀ ▀───▀ ▀▀▀ ▀──▀ ──▀── ▀▀▀

// PROJECTS
const projectsElement = document.querySelector('.projects');

// ░█▀▀▀ █──█ █▀▀▄ █▀▀ ▀▀█▀▀ ─▀─ █▀▀█ █▀▀▄ █▀▀
// ░█▀▀▀ █──█ █──█ █── ──█── ▀█▀ █──█ █──█ ▀▀█
// ░█─── ─▀▀▀ ▀──▀ ▀▀▀ ──▀── ▀▀▀ ▀▀▀▀ ▀──▀ ▀▀▀

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
 * @param {object} project Project
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

// ░█▀▄▀█ █▀▀█ ─▀─ █▀▀▄
// ░█░█░█ █▄▄█ ▀█▀ █──█
// ░█──░█ ▀──▀ ▀▀▀ ▀──▀

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

// ███████╗░█████╗░██████╗░███╗░░░███╗
// ██╔════╝██╔══██╗██╔══██╗████╗░████║
// █████╗░░██║░░██║██████╔╝██╔████╔██║
// ██╔══╝░░██║░░██║██╔══██╗██║╚██╔╝██║
// ██║░░░░░╚█████╔╝██║░░██║██║░╚═╝░██║
// ╚═╝░░░░░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝

/** @type {HTMLFormElement} */
const formElement = document.querySelector('.form');

/** @type {HTMLInputElement} */
const nameInputElement = document.querySelector('#name');

/** @type {HTMLInputElement} */
const emailInputElement = document.querySelector('#email');

/** @type {HTMLTextAreaElement} */
const messageInputElement = document.querySelector('#message');

/** @type {HTMLElement} */
const errorMessagesElement = document.querySelector('.error-messages');

const errorMessages = {
  email: {
    isNotEmpty: 'The email address field is required',
    isLowerCase: 'Please fill out the email address in lowercase',
    isValidEmail: 'Please verify the email format, e.g. user@example.com',
  },
  name: {
    isNotEmpty: 'The name field is required',
    isLengthLowerThan: 'Please check the quantity of characters of this field',
  },
  message: {
    isNotEmpty: 'The message field is required',
    isLengthLowerThan: 'Please check the quantity of characters of this field',
  },
};

const validations = {
  isNotEmpty: (val) => val.trim() !== '',
  isLowerCase: (val) => val.toLowerCase() === val,
  /** @copyright https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
  isValidEmail: (val) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val),
  isLengthLowerThan: (val, length = 30) => val.length < length,
  isLengthGreaterThan: (val, length = 0) => val.length > length,
};

const rules = {
  name: { isNotEmpty: true, isLengthLowerThan: 30 },
  email: { isNotEmpty: true, isLowerCase: true, isValidEmail: true },
  message: { isNotEmpty: true, isLengthLowerThan: 500 },
};

const inputs = {
  name: nameInputElement,
  email: emailInputElement,
  message: messageInputElement,
};

/**
 * Create an element with the error message
 *
 * @param {string} text Error message
 * @returns Element
 */
const createErrorElement = (text) => {
  const div = document.createElement('div');
  div.classList.add('d-flex', 'align-center', 'pa-16', 'error-message');
  div.innerHTML = `<span class="icon icon-exclamation-triangle"></span> ${text}`;

  return div;
};

/**
 * Validate and return the errors array
 *
 * @param {object} rules Rules object
 * @param {object} validations Validation object
 * @returns {array}
 */
const getFormErrors = (rules, validations) => {
  const errors = [];

  Object.keys(rules).forEach((field) => {
    Object.keys(rules[field]).forEach((rule) => {
      if (!validations[rule](inputs[field].value)) {
        errors.push({ field, rule });
      }
    });
  });

  return errors;
};

formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  // Reset errors
  errorMessagesElement.textContent = '';
  const errors = getFormErrors(rules, validations);
  Object.keys(inputs).forEach((key) => {
    inputs[key].classList.remove('error');
  });

  if (errors.length) {
    errors.forEach(({ field, rule }) => {
      const element = createErrorElement(errorMessages[field][rule]);

      inputs[field].classList.add('error');

      errorMessagesElement.appendChild(element);
    });
  } else {
    formElement.submit();
  }
});