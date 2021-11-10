"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * script.js
 *
 * @license MIT
 *
 */
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
var projectsElement = document.querySelector('.projects');

var getTemplate = template => document.querySelector(template).content.cloneNode(true);

var handleCloseModal = clone => {
  var closeButtonElement = clone.querySelector('.btn-close');
  closeButtonElement.addEventListener('click', () => {
    projectsElement.querySelector('.modal-projects').remove();
  });
};

var updateModalContent = (clone, project) => {
  var imageElement = clone.querySelector('.cover-image');
  imageElement.src = project.image;
};

var renderModal = project => {
  var clone = getTemplate('.modal-template');
  updateModalContent(clone, project);
  handleCloseModal(clone);
  return clone;
};

var updateArticleContent = (clone, project) => {
  var imageElement = clone.querySelector('.project-image');
  imageElement.src = project.image;
  imageElement.srcset = project.image;
};

var setArticleButtonEvent = (clone, project) => {
  var buttonElement = clone.querySelector('.btn');
  buttonElement.addEventListener('click', () => {
    var clone = renderModal(project);
    projectsElement.appendChild(clone);
  });
};

var renderArticle = project => {
  var clone = getTemplate('.project-template');
  var projectElement = clone.querySelector('.project');
  projectElement.classList.add("project-".concat(project.id));
  updateArticleContent(clone, project);
  setArticleButtonEvent(clone, project);
  return clone;
};

var processProjects = function () {
  var _ref = _asyncToGenerator(function* () {
    var projects = yield fetch('assets/json/projects.json').then(r => r.json());
    projects.forEach(project => {
      var clone = renderArticle(project);
      projectsElement.appendChild(clone);
    });
  });

  return function processProjects() {
    return _ref.apply(this, arguments);
  };
}();

processProjects();
var formElement = document.querySelector('.form');
var nameInputElement = document.querySelector('#name');
var emailInputElement = document.querySelector('#email');
var messageInputElement = document.querySelector('#message');
var errors = [];
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
    isRequired: true,
    isLengthLowerThan: 300
  }
};
var values = {
  name: nameInputElement.value,
  email: emailInputElement.value,
  message: messageInputElement.value
};
formElement.addEventListener('submit', e => {
  e.preventDefault();
  Object.keys(rules).forEach(rule => {
    Object.keys(rule).forEach(key => {
      if (!validations[key](values[rule])) {
        errors.push(key);
      }
    });
  });
  console.log(errors);
});