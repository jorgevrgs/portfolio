// @ts-check

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
  const projects = await fetch('/json/projects.json').then((r) => r.json());
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
