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

const getTags = (project) => ({
  tag: 'div',
  className: ['d-flex', 'flex-wrap', 'my-16', 'tags'],
  children: getTag(project),
});

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

const getTitle = (project) => ({
  tag: 'h3',
  className: ['ma-0', 'title'],
  textContent: project.title,
});

const getDescription = (project) => ({
  tag: 'p',
  className: 'description',
  textContent: project.description,
});

const getMedia = (project) => ({
  tag: 'div',
  className: ['d-flex', 'project-media'],
  children: [
    {
      tag: 'img',
      className: 'project-image',
      attributes: {
        src: project.image,
        alt: project.title,
        srcset: project.image,
      },
    },
  ],
});

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

export const projectTemplate = (project) => {
  const result = {
    tag: 'article',
    className: 'project',
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
          'project-content',
        ],
        children: [
          getTitle(project),
          getTags(project),
          getProjectButtons(project),
        ],
      },
    ],
  };

  return result;
};

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
            'project-content',
          ],
          children: [getDescription(project), getProjectButtons(project)],
        },
      ],
    },
  ],
});

export const errorTemplate = (text) => ({
  tag: 'div',
  className: ['d-flex', 'align-center', 'pa-16', 'error-message'],
  innerHTML: `<span class="icon icon-exclamation-triangle"></span> ${text}`,
});

/**
 *
 * @copyright @jorgevrgs, @vechicin, and @williamrolando88, coding partners
 *
 * @param {object} param0 Project element object
 * @argument param0.tag {string}
 * @argument param0.className {string | array}
 * @argument param0.attributes {object}
 * @argument param0.children {array}
 * @argument param0.innerHTML {string}
 * @argument param0.textContent {string}
 * @argument param0.dataset {object}
 *
 * @returns Element
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
  /** @type Element */
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
      element.setAttribute(key, attributes[key]);
    });
  }

  if (dataset) {
    Object.keys(dataset).forEach((key) => {
      element.dataset[key] = dataset[key];
    });
  }

  if (children) {
    children.forEach((child) => {
      element.appendChild(buildTemplate(child));
    });
  }

  return element;
};
