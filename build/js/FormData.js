function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

import { buildTemplate, errorTemplate } from './templates.js';

var _form = new WeakMap();

var _keys = new WeakMap();

var _values = new WeakMap();

var _errors = new WeakMap();

var _elements = new WeakMap();

var _errorMessagesElement = new WeakMap();

var _buttons = new WeakMap();

var _rules = new WeakMap();

var _validations = new WeakMap();

var _errorMessages = new WeakMap();

var _storageKey = new WeakMap();

var _getErrorMessage = new WeakSet();

export default class FormData {
  constructor(formName) {
    _classPrivateMethodInitSpec(this, _getErrorMessage);

    _classPrivateFieldInitSpec(this, _form, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _keys, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _values, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _errors, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _errorMessagesElement, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _buttons, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _rules, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _validations, {
      writable: true,
      value: {
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
      }
    });

    _classPrivateFieldInitSpec(this, _errorMessages, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _storageKey, {
      writable: true,
      value: 'formData'
    });

    var formElement = document.querySelector(".".concat(formName));

    if (!formElement) {
      throw new Error("It was not possible to find a form element with class ".concat(formName));
    }

    var elements = Array.from(formElement.elements);

    _classPrivateFieldSet(this, _form, formElement);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    elements.forEach(input => {
      if (['INPUT', 'TEXTAREA'].includes(input.nodeName)) {
        _classPrivateFieldGet(this, _keys).push(input.name);

        _classPrivateFieldGet(this, _elements)[input.name] = input;
        _classPrivateFieldGet(this, _values)[input.name] = input.value;
        input.addEventListener('change', this.handleChange);
      } else if (input.nodeName === 'BUTTON') {
        _classPrivateFieldGet(this, _buttons)[input.name] = input;

        if (input.type === 'submit') {
          input.addEventListener('click', this.handleSubmit);
        } else if (input.type === 'reset') {
          input.addEventListener('click', this.handleReset);
        }
      }
    });

    _classPrivateFieldSet(this, _errorMessagesElement, document.querySelector('.error-messages'));
  }

  handleChange(e) {
    this.set(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    _classPrivateFieldGet(this, _errorMessagesElement).textContent = '';
    this.validate();

    if (this.hasErrors()) {
      _classPrivateFieldGet(this, _errors).forEach(_ref => {
        var {
          field,
          rule
        } = _ref;

        if (_classPrivateFieldGet(this, _errorMessagesElement)) {
          var object = errorTemplate(_classPrivateMethodGet(this, _getErrorMessage, _getErrorMessage2).call(this, field, rule));
          var element = buildTemplate(object);

          _classPrivateFieldGet(this, _errorMessagesElement).appendChild(element);
        }
      });
    } else {
      _classPrivateFieldGet(this, _form).submit();

      this.clear();
    }
  }

  handleReset(e) {
    e.preventDefault();

    if (_classPrivateFieldGet(this, _errorMessages)) {
      _classPrivateFieldGet(this, _errorMessagesElement).textContent = '';
    }

    this.clear();
  }

  exec() {
    var store = localStorage.getItem(_classPrivateFieldGet(this, _storageKey));
    var result;

    try {
      result = JSON.parse(store);
    } finally {
      Object.assign(_classPrivateFieldGet(this, _values), result);
    }

    _classPrivateFieldGet(this, _keys).forEach(key => {
      this.set(key, this.get(key));
      _classPrivateFieldGet(this, _elements)[key].value = this.get(key);
    });
  }

  get(key) {
    return _classPrivateFieldGet(this, _values)[key];
  }

  set(key, value) {
    _classPrivateFieldGet(this, _values)[key] = value;
    localStorage.setItem(_classPrivateFieldGet(this, _storageKey), JSON.stringify(_classPrivateFieldGet(this, _values)));
    return this;
  }

  setErrorMessages(object) {
    Object.assign(_classPrivateFieldGet(this, _errorMessages), object);
    return this;
  }

  setValidations(object) {
    Object.assign(_classPrivateFieldGet(this, _validations), object);
    return this;
  }

  setRules(object) {
    Object.assign(_classPrivateFieldGet(this, _rules), object);
    return this;
  }

  clear() {
    Object.keys(_classPrivateFieldGet(this, _values)).forEach(name => {
      _classPrivateFieldGet(this, _elements)[name].value = '';

      _classPrivateFieldGet(this, _elements)[name].classList.remove('error');
    });
    localStorage.removeItem(_classPrivateFieldGet(this, _storageKey));
    return this;
  }

  hasErrors() {
    return _classPrivateFieldGet(this, _errors).length > 0;
  }

  validate() {
    _classPrivateFieldGet(this, _errors).splice(0);

    Object.keys(_classPrivateFieldGet(this, _rules)).forEach(field => {
      Object.keys(_classPrivateFieldGet(this, _rules)[field]).forEach(rule => {
        if (['isLengthLowerThan', 'isLengthGreaterThan'].includes(rule)) {
          if (!_classPrivateFieldGet(this, _validations)[rule](_classPrivateFieldGet(this, _values)[field], _classPrivateFieldGet(this, _rules)[field][rule])) {
            _classPrivateFieldGet(this, _errors).push({
              field,
              rule
            });

            _classPrivateFieldGet(this, _elements)[field].classList.add('error');
          }
        } else if (!_classPrivateFieldGet(this, _validations)[rule](_classPrivateFieldGet(this, _values)[field])) {
          _classPrivateFieldGet(this, _errors).push({
            field,
            rule
          });

          _classPrivateFieldGet(this, _elements)[field].classList.add('error');
        }
      });
    });
    return this;
  }

  toJSON() {
    return _classPrivateFieldGet(this, _values);
  }

}

function _getErrorMessage2(field, rule) {
  return _classPrivateFieldGet(this, _errorMessages)[field][rule];
}