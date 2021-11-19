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
 *
 * @typedef {Object<string, string | number>} KeyValDef
 *
 * @typedef {({
 *   tag: string,
 *   className: (string | string[]),
 *   attributes?: KeyValDef,
 *   innerHTML?: string,
 *   textContent?: string,
 *   dataset?: KeyValDef,
 *   children?: (TemplateObjectDef[])
 * })} TemplateObjectDef
 */

/**
 *
 * @param {TemplateObjectDef} param0 Project element object
 * @returns {HTMLElement}
 */
export const buildTemplate = ({
  tag,
  className,
  attributes,
  children,
  innerHTML,
  textContent,
  dataset = undefined,
}) => {
  /** @type HTMLElement */
  const element = document.createElement(tag);

  if (Array.isArray(className)) {
    element.classList.add(...className);
  } else if (typeof className === 'string' && className.length) {
    element.classList.add(className);
  }

  if (textContent) {
    element.textContent = textContent;
  } else if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, String(attributes[key]));
    });
  }

  if (dataset) {
    Object.keys(dataset).forEach((key) => {
      element.dataset[key] = String(dataset[key]);
    });
  }

  if (children) {
    children.forEach((child) => {
      element.appendChild(buildTemplate(child));
    });
  }

  return element;
};

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef[]}
 */
const getTag = (project) => {
  const technologies = [];
  project.technologies.forEach((technology) => {
    technologies.push({
      tag: 'div',
      className: 'tag',
      textContent: technology,
    });
  });

  return technologies;
};

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef}
 */
const getTags = (project) => ({
  tag: 'div',
  className: ['d-flex', 'flex-wrap', 'my-16', 'flex-md-wrap', 'tags'],
  children: getTag(project),
});

/**
 *
 * @returns {TemplateObjectDef}
 */
const getButtonClose = () => ({
  tag: 'button',
  className: ['btn', 'btn-close', 'modal-close'],
  children: [
    {
      tag: 'span',
      className: ['icon', 'icon-close'],
    },
  ],
});

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef}
 */
const getTitle = (project) => ({
  tag: 'h3',
  className: ['ma-0', 'color-secondary', 'font-weight-light', 'text-md-truncate', 'title'],
  textContent: project.title,
});

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef}
 */
const getDescription = (project) => ({
  tag: 'p',
  className: 'description',
  textContent: project.description,
});

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef}
 */
const getMedia = (project) => ({
  tag: 'div',
  className: ['d-flex', 'project-media'],
  children: [
    {
      tag: 'img',
      className: ['d-block', 'w-100', 'overflow-hidden', 'h-auto', 'project-image'],
      attributes: {
        src: project.image,
        alt: project.title,
        srcset: project.image,
      },
    },
  ],
});

/**
 *
 * @returns {TemplateObjectDef}
 */
const getProjectButtons = () => ({
  tag: 'div',
  className: 'project-button',
  children: [
    {
      tag: 'button',
      className: ['btn', 'btn-primary', 'btn-md-secondary', 'see-project'],
      attributes: {
        type: 'button',
      },
      innerHTML: 'See This Project <span class="icon icon-arrow-right"></span>',
    },
    {
      tag: 'div',
      className: [
        'd-none',
        'flex-column',
        'flex-md-row',
        'justify-md-center',
        'button-details',
      ],
      children: [
        {
          tag: 'button',
          className: ['btn', 'btn-secondary', 'btn-lg', 'see-live'],
          attributes: {
            type: 'button',
          },
          innerHTML: 'See live <span class="icon icon-link"></span>',
        },
        {
          tag: 'button',
          className: ['btn', 'btn-secondary', 'btn-lg', 'see-source'],
          attributes: {
            type: 'button',
          },
          innerHTML: 'See source <span class="icon icon-github-white"></span>',
        },
      ],
    },
    {
      tag: 'div',
      className: ['d-none', 'justify-md-space-between', 'button-navigation'],
      children: [
        {
          tag: 'button',
          className: ['btn', 'btn-prev'],
          attributes: {
            type: 'button',
          },
          innerHTML:
            '<span class="icon icon-arrow-left-dark"></span> Previous project',
        },
        {
          tag: 'button',
          className: ['btn', 'btn-next'],
          attributes: {
            type: 'button',
          },
          innerHTML:
            'Next project <span class="icon icon-arrow-right-dark"></span>',
        },
      ],
    },
  ],
});

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef}
 */
export const projectTemplate = (project) => {
  const result = {
    tag: 'article',
    className: ['d-flex', 'flex-column', 'mx-n16', 'overflow-md-hidden', 'mx-md-0', 'project'],
    dataset: {
      id: project.id,
    },
    children: [
      getMedia(project),
      {
        tag: 'div',
        className: [
          'd-flex',
          'flex-column',
          'pa-20',
          'bg-primary',
          'w-md-100',
          'project-content',
        ],
        children: [
          getTitle(project),
          getTags(project),
          getProjectButtons(),
        ],
      },
    ],
  };

  return result;
};

/**
 *
 * @param {ProjectDef} project
 * @returns {TemplateObjectDef}
 */
export const modalTemplate = (project) => ({
  tag: 'div',
  className: 'modal',
  dataset: {
    id: project.id,
  },
  children: [
    {
      tag: 'article',
      className: 'project',
      children: [
        getButtonClose(),
        getTitle(project),
        getTags(project),
        getMedia(project),
        {
          tag: 'div',
          className: [
            'd-flex',
            'flex-column',
            'pa-20',
            'bg-primary',
            'w-md-100',
            'project-content',
          ],
          children: [getDescription(project), getProjectButtons()],
        },
      ],
    },
  ],
});

/**
 *
 * @param {string} text
 * @returns {TemplateObjectDef}
 */
export const errorTemplate = (text) => ({
  tag: 'div',
  className: ['d-flex', 'align-center', 'pa-16', 'error-message'],
  innerHTML: `<span class="icon icon-exclamation-triangle"></span> ${text}`,
});
