function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * script.js
 *
 * @license MIT
 *
 */
import { projectTemplate, modalTemplate, buildTemplate } from './templates.js';

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
  var formElement = document.querySelector('.form');
  var nameInputElement = document.querySelector('#name');
  var emailInputElement = document.querySelector('#email');
  var messageInputElement = document.querySelector('#message');
  var errorMessagesElement = document.querySelector('.error-messages');

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

  var formData = {
    name: '',
    email: '',
    message: ''
  };

  var getFormData = formData => {
    var formFromLocalStorage = localStorage.getItem('formData');
    var result;

    try {
      result = JSON.parse(formFromLocalStorage);

      if (!result) {
        result = formData;
      }
    } catch (error) {
      result = formData;
    }

    return new FormData(result);
  };

  var currentFormData = getFormData(formData);

  var handleOnChange = e => {
    currentFormData.set(e.target.name, e.target.value);
    localStorage.setItem('formData', JSON.stringify(currentFormData));
  };

  nameInputElement.value = currentFormData.name || '';
  emailInputElement.value = currentFormData.email || '';
  messageInputElement.value = currentFormData.message || '';
  nameInputElement.addEventListener('change', handleOnChange);
  emailInputElement.addEventListener('change', handleOnChange);
  messageInputElement.addEventListener('change', handleOnChange);
  var errorMessages = {
    email: {
      isNotEmpty: 'The email address field is required',
      isLowerCase: 'Please fill out the email address in lowercase',
      isValidEmail: 'Please verify the email format, e.g. user@example.com'
    },
    name: {
      isNotEmpty: 'The name field is required',
      isLengthLowerThan: 'Please check the quantity of characters of this field'
    },
    message: {
      isNotEmpty: 'The message field is required',
      isLengthLowerThan: 'Please check the quantity of characters of this field'
    }
  };
  var validations = {
    isNotEmpty: val => val.trim() !== '',
    isLowerCase: val => val.toLowerCase() === val,
    isValidEmail: val => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val),
    isLengthLowerThan: function isLengthLowerThan(val) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
      return val.length < length;
    },
    isLengthGreaterThan: function isLengthGreaterThan(val) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return val.length > length;
    }
  };
  var rules = {
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
  };
  var inputs = {
    name: nameInputElement,
    email: emailInputElement,
    message: messageInputElement
  };

  var createErrorElement = text => {
    var div = document.createElement('div');
    div.classList.add('d-flex', 'align-center', 'pa-16', 'error-message');
    div.innerHTML = "<span class=\"icon icon-exclamation-triangle\"></span> ".concat(text);
    return div;
  };

  var getFormErrors = (inputs, rules, validations) => {
    var errors = [];
    Object.keys(rules).forEach(field => {
      Object.keys(rules[field]).forEach(rule => {
        if (!validations[rule](inputs[field].value)) {
          errors.push({
            field,
            rule
          });
        }
      });
    });
    return errors;
  };

  formElement.addEventListener('submit', e => {
    e.preventDefault();
    errorMessagesElement.textContent = '';
    var errors = getFormErrors(inputs, rules, validations);
    Object.keys(inputs).forEach(key => {
      inputs[key].classList.remove('error');
    });

    if (errors.length) {
      errors.forEach(_ref => {
        var {
          field,
          rule
        } = _ref;
        var element = createErrorElement(errorMessages[field][rule]);
        inputs[field].classList.add('error');
        errorMessagesElement.appendChild(element);
      });
    } else {
      localStorage.removeItem('formData');
      formElement.submit();
    }
  });
}

menu();
projects();
form();