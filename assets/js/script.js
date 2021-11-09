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
const projectTemplate = document.querySelector('.project-template');

const projects = [
  {
    id: 1,
    title: 'Project name goes here',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi id qui porro cumque soluta ex itaque animi facere molestiae ullam dicta reprehenderit excepturi, laudantium, ducimus magni sint nam ad consequuntur!
    Porro, vitae earum eius ipsa velit dolores iure sit totam. Quos voluptates aliquam earum labore nobis? Voluptatum alias debitis adipisci libero dolores obcaecati architecto illum ut dolorum? Harum, tempora veniam?`,
    image: 'assets/images/projects/Project_1.png',
    technologies: ['HTML/CSS', 'Ruby On Rails', 'JavaScript'],
    linkToLive: '#',
    linkToSource: '#',
  },
  {
    id: 2,
    title: 'Project name goes here',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi id qui porro cumque soluta ex itaque animi facere molestiae ullam dicta reprehenderit excepturi, laudantium, ducimus magni sint nam ad consequuntur!
    Porro, vitae earum eius ipsa velit dolores iure sit totam. Quos voluptates aliquam earum labore nobis? Voluptatum alias debitis adipisci libero dolores obcaecati architecto illum ut dolorum? Harum, tempora veniam?`,
    image: 'assets/images/projects/Project_2.png',
    technologies: ['HTML/CSS', 'Ruby On Rails', 'JavaScript'],
    linkToLive: '#',
    linkToSource: '#',
  },
  {
    id: 3,
    title: 'Project name goes here',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi id qui porro cumque soluta ex itaque animi facere molestiae ullam dicta reprehenderit excepturi, laudantium, ducimus magni sint nam ad consequuntur!
    Porro, vitae earum eius ipsa velit dolores iure sit totam. Quos voluptates aliquam earum labore nobis? Voluptatum alias debitis adipisci libero dolores obcaecati architecto illum ut dolorum? Harum, tempora veniam?`,
    image: 'assets/images/projects/Project_3.png',
    technologies: ['HTML/CSS', 'Ruby On Rails', 'JavaScript'],
    linkToLive: '#',
    linkToSource: '#',
  },
  {
    id: 4,
    title: 'Project name goes here',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi id qui porro cumque soluta ex itaque animi facere molestiae ullam dicta reprehenderit excepturi, laudantium, ducimus magni sint nam ad consequuntur!
    Porro, vitae earum eius ipsa velit dolores iure sit totam. Quos voluptates aliquam earum labore nobis? Voluptatum alias debitis adipisci libero dolores obcaecati architecto illum ut dolorum? Harum, tempora veniam?`,
    image: 'assets/images/projects/Project_4.png',
    technologies: ['HTML/CSS', 'Ruby On Rails', 'JavaScript'],
    linkToLive: '#',
    linkToSource: '#',
  },
  {
    id: 5,
    title: 'Project name goes here',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi id qui porro cumque soluta ex itaque animi facere molestiae ullam dicta reprehenderit excepturi, laudantium, ducimus magni sint nam ad consequuntur!
    Porro, vitae earum eius ipsa velit dolores iure sit totam. Quos voluptates aliquam earum labore nobis? Voluptatum alias debitis adipisci libero dolores obcaecati architecto illum ut dolorum? Harum, tempora veniam?`,
    image: 'assets/images/projects/Project_5.png',
    technologies: ['HTML/CSS', 'Ruby On Rails', 'JavaScript'],
    linkToLive: '#',
    linkToSource: '#',
  },
  {
    id: 6,
    title: 'Project name goes here',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi id qui porro cumque soluta ex itaque animi facere molestiae ullam dicta reprehenderit excepturi, laudantium, ducimus magni sint nam ad consequuntur!
    Porro, vitae earum eius ipsa velit dolores iure sit totam. Quos voluptates aliquam earum labore nobis? Voluptatum alias debitis adipisci libero dolores obcaecati architecto illum ut dolorum? Harum, tempora veniam?`,
    image: 'assets/images/projects/Project_6.png',
    technologies: ['HTML/CSS', 'Ruby On Rails', 'JavaScript'],
    linkToLive: '#',
    linkToSource: '#',
  },
];

projects.forEach((project) => {
  const clone = projectTemplate.content.cloneNode(true);

  const projectElement = clone.querySelector('.project');
  projectElement.classList.add(`project-${project.id}`);

  const imageElement = clone.querySelector('.project-image');
  imageElement.src = project.image;
  imageElement.srcset = project.image;

  projectsElement.appendChild(clone);
});