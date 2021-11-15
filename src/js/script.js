/**
 * script.js
 *
 * @license MIT
 *
 */

import '../css/style.scss';

import {
  projectTemplate, modalTemplate, buildTemplate,
} from './templates.js';
import FormData from './FormData.js';

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
  const formData = new FormData('form');

  formData
    .setErrorMessages({
      email: {
        isNotEmpty: 'The email address is required',
        isLowerCase: 'Please enter your email in lowercase',
        isValidEmail: 'Please verify the email format, e.g. user@example.com',
      },
      name: {
        isNotEmpty: 'The name is required',
        isLengthLowerThan: 'The name must be a maximum of 30 characters',
      },
      message: {
        isNotEmpty: 'The message is required',
        isLengthLowerThan: 'The name must be a maximum of 500 characters',
      },
    })
    .setRules({
      name: { isNotEmpty: true, isLengthLowerThan: 30 },
      email: { isNotEmpty: true, isLowerCase: true, isValidEmail: true },
      message: { isNotEmpty: true, isLengthLowerThan: 500 },
    })
    .exec();
}

menu();
projects();
form();