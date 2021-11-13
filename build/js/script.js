function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * script.js
 *
 * @license MIT
 *
 */
import { projectTemplate, modalTemplate, buildTemplate } from './templates.js';
import FormData from './FormData.js';

function menu() {
  var headerElement = document.querySelector('.header');
  var menuButtonElement = document.querySelector('.btn-menu');
  var menuLinkElements = document.querySelectorAll('.nav-link');

  var isMobile = () => window.innerWidth < 992;

  var toggleMenu = () => {
    headerElement.classList.toggle('header-mobile');
  };

  var removeClass = () => {
    headerElement.classList.remove('header-mobile');
  };

  var handleDesktop = () => {
    removeClass();
    menuButtonElement.removeEventListener('click', toggleMenu);
    menuLinkElements.forEach(menuLink => {
      menuLink.removeEventListener('click', toggleMenu);
    });
  };

  var handleLinks = () => {
    menuLinkElements.forEach(menuLink => {
      menuLink.addEventListener('click', toggleMenu);
    });
  };

  var handleMobile = () => {
    menuButtonElement.addEventListener('click', toggleMenu);
    handleLinks();
  };

  var main = () => {
    if (isMobile()) {
      handleMobile();
    } else {
      handleDesktop();
    }
  };

  main();
  window.addEventListener('resize', main);
}

function projects() {
  return _projects.apply(this, arguments);
}

function _projects() {
  _projects = _asyncToGenerator(function* () {
    var projects = yield fetch('assets/json/projects.json').then(r => r.json());
    var projectsElement = document.querySelector('.projects');

    var handleCloseModalButton = modalElement => {
      var element = modalElement.querySelector('.modal-close');
      element.addEventListener('click', () => modalElement.remove());
    };

    var handleNextModalButton = (modalElement, project) => {
      var element = modalElement.querySelector('.btn-next');
      element.addEventListener('click', () => {
        var findIndex = projects.findIndex(p => p.id === project.id);
        var lastIndex = projects.lastIndex();

        if (findIndex === lastIndex) {}
      });
    };

    var handlePreviousModalButton = (modalElement, project) => {
      var element = modalElement.querySelector('.btn-prev');
      element.addEventListener('click', () => {
        var findIndex = projects.findIndex(p => p.id === project.id);
        var firstIndex = projects.firstIndex();

        if (findIndex === firstIndex) {}
      });
    };

    var handleSeeProjectButton = (projectTemplateElement, project) => {
      var element = projectTemplateElement.querySelector('.see-project');
      element.addEventListener('click', () => {
        var object = modalTemplate(project);
        var template = buildTemplate(object);
        projectsElement.appendChild(template);
        handleCloseModalButton(template);
        handleNextModalButton(template, project);
        handlePreviousModalButton(template, project);
      });
    };

    var createProjectTemplate = project => {
      var object = projectTemplate(project);
      var template = buildTemplate(object);
      template.classList.add("project-".concat(project.id));
      projectsElement.appendChild(template);
      handleSeeProjectButton(template, project);
    };

    var main = () => {
      projects.forEach(project => {
        createProjectTemplate(project);
      });
    };

    main();
  });
  return _projects.apply(this, arguments);
}

function form() {
  var formData = new FormData('form');
  formData.setErrorMessages({
    email: {
      isNotEmpty: 'The email address is required',
      isLowerCase: 'Please enter your email in lowercase',
      isValidEmail: 'Please verify the email format, e.g. user@example.com'
    },
    name: {
      isNotEmpty: 'The name is required',
      isLengthLowerThan: 'The name must be a maximum of 30 characters'
    },
    message: {
      isNotEmpty: 'The message is required',
      isLengthLowerThan: 'The name must be a maximum of 500 characters'
    }
  }).setRules({
    name: {
      isNotEmpty: true,
      isLengthLowerThan: 30
    },
    email: {
      isNotEmpty: true,
      isLowerCase: true,
      isValidEmail: true
    },
    message: {
      isNotEmpty: true,
      isLengthLowerThan: 500
    }
  }).exec();
}

menu();
projects();
form();