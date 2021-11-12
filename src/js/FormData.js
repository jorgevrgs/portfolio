/**
 * Use default value object to get elements, run validations and store data using localStorage
 */
export default class FormData {
  // @FUTURE: interface
  #values = {
    name: '',
    email: '',
    message: '',
  };

  #errors = [];

  /** @type {key: string => value: Element} */
  #elements = {};

  // @FUTURE: interface
  #rules = {
    name: { isNotEmpty: true, isLengthLowerThan: 30 },
    email: { isNotEmpty: true, isLowerCase: true, isValidEmail: true },
    message: { isNotEmpty: true, isLengthLowerThan: 500 },
  }

  // @FUTURE: interface
  #validations = {
    isNotEmpty: (val) => val.trim() !== '',
    isLowerCase: (val) => val.toLowerCase() === val,
    /** @copyright https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
    isValidEmail: (val) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val),
    isLengthLowerThan: (val, length = 30) => val.length < length,
    isLengthGreaterThan: (val, length = 0) => val.length > length,
  };

  // @FUTURE: interface
  #errorMessages = {
    email: {
      isNotEmpty: 'The email address is required',
      isLowerCase: 'Please enter your email in lowercase',
      isValidEmail: 'Please verify the email format, e.g. user@example.com',
    },
    name: {
      isNotEmpty: 'The name is required',
      isLengthLowerThan: 'The name must be a maximum of 30 characters',
    },
    message: {
      isNotEmpty: 'The message is required',
      isLengthLowerThan: 'The name must be a maximum of 500 characters',
    },
  };

  #storageKey = 'formData';

  constructor() {
    const store = localStorage.getItem(this.#storageKey);
    let result;

    try {
      result = JSON.parse(store);
    } finally {
      Object.assign(this.#values, result);
    }

    const self = this;

    Object.keys(this.#values).forEach((name) => {
      self.#elements[name] = document.querySelector(`#${name}`);
      self.#elements[name].value = this.#values[name];
      self.#elements[name].addEventListener('change', (e) => {
        self.set(name, e.target.value);
      });
    });
  }

  get(key) {
    return this.#values[key];
  }

  get errors() {
    return this.#errors;
  }

  set(key, value) {
    this.#values[key] = value;
    localStorage.setItem(this.#storageKey, JSON.stringify(this.#values));

    return this;
  }

  clear() {
    Object.keys(this.#values).forEach((name) => {
      this.#elements[name].value = '';
      this.#elements[name].classList.remove('error');
    });

    localStorage.removeItem(this.#storageKey);

    return this;
  }

  hasErrors() {
    return this.#errors.length > 0;
  }

  getErrorMessage(field, rule) {
    return this.#errorMessages[field][rule];
  }

  validate() {
    // Reset errors
    this.#errors.splice(0);

    // Check the rules according to the validation and values
    Object.keys(this.#rules).forEach((field) => {
      Object.keys(this.#rules[field]).forEach((rule) => {
        if (['isLengthLowerThan', 'isLengthGreaterThan'].includes(rule)) {
          if (!this.#validations[rule](this.#values[field], this.#rules[field][rule])) {
            this.#errors.push({ field, rule });
            this.#elements[field].classList.add('error');
          }
        } else if (!this.#validations[rule](this.#values[field])) {
          this.#errors.push({ field, rule });
          this.#elements[field].classList.add('error');
        }
      });
    });

    return this;
  }
}