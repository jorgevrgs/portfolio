/**
 * script.js
 *
 * @license MIT
 *
 */

import { projectTemplate, modalTemplate, buildTemplate } from './templates.js';

// ███╗░░░███╗███████╗███╗░░██╗██╗░░░██╗
// ████╗░████║██╔════╝████╗░██║██║░░░██║
// ██╔████╔██║█████╗░░██╔██╗██║██║░░░██║
// ██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║
// ██║░╚═╝░██║███████╗██║░╚███║╚██████╔╝
// ╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░╚═════╝░

function menu() {
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

// ██████╗░██████╗░░█████╗░░░░░░██╗███████╗░█████╗░████████╗░██████╗
// ██╔══██╗██╔══██╗██╔══██╗░░░░░██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝
// ██████╔╝██████╔╝██║░░██║░░░░░██║█████╗░░██║░░╚═╝░░░██║░░░╚█████╗░
// ██╔═══╝░██╔══██╗██║░░██║██╗░░██║██╔══╝░░██║░░██╗░░░██║░░░░╚═══██╗
// ██║░░░░░██║░░██║╚█████╔╝╚█████╔╝███████╗╚█████╔╝░░░██║░░░██████╔╝
// ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═════╝░

async function projects() {
  // ░█▀▀▀ █── █▀▀ █▀▄▀█ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
  // ░█▀▀▀ █── █▀▀ █─▀─█ █▀▀ █──█ ──█── ▀▀█
  // ░█▄▄▄ ▀▀▀ ▀▀▀ ▀───▀ ▀▀▀ ▀──▀ ──▀── ▀▀▀

  // PROJECTS
  const projects = await fetch('assets/json/projects.json').then((r) => r.json());
  const projectsElement = document.querySelector('.projects');

  // ░█▀▀▀ █──█ █▀▀▄ █▀▀ ▀▀█▀▀ ─▀─ █▀▀█ █▀▀▄ █▀▀
  // ░█▀▀▀ █──█ █──█ █── ──█── ▀█▀ █──█ █──█ ▀▀█
  // ░█─── ─▀▀▀ ▀──▀ ▀▀▀ ──▀── ▀▀▀ ▀▀▀▀ ▀──▀ ▀▀▀

  const handleCloseModalButton = (modalElement) => {
    const element = modalElement.querySelector('.modal-close');

    element.addEventListener('click', () => modalElement.remove());
  };

  const handleNextModalButton = (modalElement, project) => {
    const element = modalElement.querySelector('.btn-next');

    element.addEventListener('click', () => {
      const findIndex = projects.findIndex((p) => p.id === project.id);
      const lastIndex = projects.lastIndex();

      if (findIndex === lastIndex) {
        // not next
      }
    });
  };

  const handlePreviousModalButton = (modalElement, project) => {
    const element = modalElement.querySelector('.btn-prev');

    element.addEventListener('click', () => {
      const findIndex = projects.findIndex((p) => p.id === project.id);
      const firstIndex = projects.firstIndex();

      if (findIndex === firstIndex) {
        // not previous
      }
    });
  };

  const handleSeeProjectButton = (projectTemplateElement, project) => {
    // Add event listener to open modal
    const element = projectTemplateElement.querySelector('.see-project');

    element.addEventListener('click', () => {
      const object = modalTemplate(project);
      const template = buildTemplate(object);

      projectsElement.appendChild(template);

      handleCloseModalButton(template);
      handleNextModalButton(template, project);
      handlePreviousModalButton(template, project);
    });
  };

  const createProjectTemplate = (project) => {
    const object = projectTemplate(project);
    const template = buildTemplate(object);

    // Add a project id class
    template.classList.add(`project-${project.id}`);

    // Insert into the container
    projectsElement.appendChild(template);

    // Add event listener for the click on see project
    handleSeeProjectButton(template, project);
  };

  // ░█▀▄▀█ █▀▀█ ─▀─ █▀▀▄
  // ░█░█░█ █▄▄█ ▀█▀ █──█
  // ░█──░█ ▀──▀ ▀▀▀ ▀──▀

  /**
   * Process the projects in order to get data and render templates
   */
  const main = () => {
    projects.forEach((project) => {
      // Create project template
      createProjectTemplate(project);
    });
  };

  main();
}

// ███████╗░█████╗░██████╗░███╗░░░███╗
// ██╔════╝██╔══██╗██╔══██╗████╗░████║
// █████╗░░██║░░██║██████╔╝██╔████╔██║
// ██╔══╝░░██║░░██║██╔══██╗██║╚██╔╝██║
// ██║░░░░░╚█████╔╝██║░░██║██║░╚═╝░██║
// ╚═╝░░░░░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝

function form() {
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

  // Check if the formData is at localStorage
  class FormData {
    constructor(formData) {
      this.name = formData.name;
      this.email = formData.email;
      this.message = formData.message;
    }

    get(key) {
      return this[key];
    }

    set(key, value) {
      this[key] = value;

      return this;
    }
  }

  const formData = {
    name: '',
    email: '',
    message: '',
  };

  const getFormData = (formData) => new FormData(formData);

  const currentFormData = getFormData(formData);

  currentFormData.set('name', 'John Doe');

  const handleOnChange = (e) => {
    formData[e.target.name] = e.target.value;
  };

  nameInputElement.addEventListener('change', handleOnChange);
  emailInputElement.addEventListener('change', handleOnChange);
  messageInputElement.addEventListener('change', handleOnChange);

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
   * @param {object} inputs Collection of input elements
   * @param {object} rules Rules object
   * @param {object} validations Validation object
   * @returns {array}
   */
  const getFormErrors = (inputs, rules, validations) => {
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
    const errors = getFormErrors(inputs, rules, validations);
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
}

menu();
projects();
form();