// @ts-check

/**
 * @typedef {({
 *  id: number,
 *  title: string,
 *  description: string,
 *  image: string,
 *  technologies: string[],
 *  linkToLive: string,
 *  linkToSource: string,
 * })} ProjectDef
 */

import ApiClass from '../classes/ApiClass.js';

import {
  projectTemplate,
  modalTemplate,
  buildTemplate,
} from '../helpers/templates.js';

export default async function projects() {
  // ░█▀▀▀ █── █▀▀ █▀▄▀█ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
  // ░█▀▀▀ █── █▀▀ █─▀─█ █▀▀ █──█ ──█── ▀▀█
  // ░█▄▄▄ ▀▀▀ ▀▀▀ ▀───▀ ▀▀▀ ▀──▀ ──▀── ▀▀▀

  // PROJECTS
  const api = new ApiClass();

  /** @type {ProjectDef[]} */
  const projects = await api.get('projects');

  /** @type {HTMLElement} */
  const projectsElement = document.querySelector('.projects');

  // ░█▀▀▀ █──█ █▀▀▄ █▀▀ ▀▀█▀▀ ─▀─ █▀▀█ █▀▀▄ █▀▀
  // ░█▀▀▀ █──█ █──█ █── ──█── ▀█▀ █──█ █──█ ▀▀█
  // ░█─── ─▀▀▀ ▀──▀ ▀▀▀ ──▀── ▀▀▀ ▀▀▀▀ ▀──▀ ▀▀▀

  /**
   *
   * @param {HTMLElement} parentElement
   * @param {HTMLElement} childElement
   */
  const appendChild = (parentElement, childElement) => {
    if (parentElement && childElement) {
      parentElement.appendChild(childElement);
    }
  };

  /**
   *
   * @param {HTMLElement} modalElement
   */
  const handleCloseModalButton = (modalElement) => {
    if (modalElement) {
      const element = modalElement.querySelector('.modal-close');

      element.addEventListener('click', () => modalElement.remove());
    }
  };

  /**
   *
   * @param {HTMLElement} modalElement
   * @param {ProjectDef} project
   */
  const handleNextModalButton = (modalElement, project) => {
    if (modalElement) {
      const element = modalElement.querySelector('.btn-next');

      element.addEventListener('click', () => {
        const findIndex = projects.findIndex((p) => p.id === project.id);
        const lastIndex = projects.length - 1;

        if (findIndex === lastIndex) {
          // not next
        }
      });
    }
  };

  /**
   *
   * @param {HTMLElement} modalElement
   * @param {ProjectDef} project
   */
  const handlePreviousModalButton = (modalElement, project) => {
    if (modalElement) {
      const element = modalElement.querySelector('.btn-prev');

      element.addEventListener('click', () => {
        const findIndex = projects.findIndex((p) => p.id === project.id);
        const firstIndex = 0;

        if (findIndex === firstIndex) {
          // not previous
        }
      });
    }
  };

  /**
   *
   * @param {HTMLElement} projectTemplateElement
   * @param {ProjectDef} project
   */
  const handleSeeProjectButton = (projectTemplateElement, project) => {
    // Add event listener to open modal
    if (projectTemplateElement) {
      const element = projectTemplateElement.querySelector('.see-project');

      element.addEventListener('click', () => {
        const object = modalTemplate(project);
        const template = buildTemplate(object);

        appendChild(projectsElement, template);

        handleCloseModalButton(template);
        handleNextModalButton(template, project);
        handlePreviousModalButton(template, project);
      });
    }
  };

  /**
   *
   * @param {ProjectDef} project
   */
  const createProjectTemplate = (project) => {
    const object = projectTemplate(project);
    const template = buildTemplate(object);

    if (template) {
      // Add a project id class
      template.classList.add(`project-${project.id}`);

      // Insert into the container
      projectsElement.appendChild(template);

      // Add event listener for the click on see project
      handleSeeProjectButton(template, project);
    }
  };

  // MAIN

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
