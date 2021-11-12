function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _values = new WeakMap();

var _errors = new WeakMap();

var _elements = new WeakMap();

var _rules = new WeakMap();

var _validations = new WeakMap();

var _errorMessages = new WeakMap();

var _storageKey = new WeakMap();

export default class FormData {
  constructor() {
    _classPrivateFieldInitSpec(this, _values, {
      writable: true,
      value: {
        name: '',
        email: '',
        message: ''
      }
    });

    _classPrivateFieldInitSpec(this, _errors, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _rules, {
      writable: true,
      value: {
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
      }
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
      value: {
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
      }
    });

    _classPrivateFieldInitSpec(this, _storageKey, {
      writable: true,
      value: 'formData'
    });

    var store = localStorage.getItem(_classPrivateFieldGet(this, _storageKey));
    var result;

    try {
      result = JSON.parse(store);
    } finally {
      Object.assign(_classPrivateFieldGet(this, _values), result);
    }

    var self = this;
    Object.keys(_classPrivateFieldGet(this, _values)).forEach(name => {
      _classPrivateFieldGet(self, _elements)[name] = document.querySelector("#".concat(name));
      _classPrivateFieldGet(self, _elements)[name].value = _classPrivateFieldGet(this, _values)[name];

      _classPrivateFieldGet(self, _elements)[name].addEventListener('change', e => {
        self.set(name, e.target.value);
      });
    });
  }

  get(key) {
    return _classPrivateFieldGet(this, _values)[key];
  }

  get errors() {
    return _classPrivateFieldGet(this, _errors);
  }

  set(key, value) {
    _classPrivateFieldGet(this, _values)[key] = value;
    localStorage.setItem(_classPrivateFieldGet(this, _storageKey), JSON.stringify({
      name: _classPrivateFieldGet(this, _values).name,
      email: _classPrivateFieldGet(this, _values).email,
      message: _classPrivateFieldGet(this, _values).message
    }));
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

  getErrorMessage(field, rule) {
    return _classPrivateFieldGet(this, _errorMessages)[field][rule];
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

}