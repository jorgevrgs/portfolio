import { buildTemplate, errorTemplate } from '../helpers/templates.js';

/**
 * Use default value object to get elements, run validations and store data using localStorage
 *
 * @example const form = new FormClass('form');
 *   form
 *     .setRules({name: 'isNotEmpty'})
 *     .setErrorMessages({name: {isEmpty: 'Name is required'}})
 *     .exec();
 */
export default class FormClass {
  /** @type {HTMLFormElement | null} */
  #form = null;

  /** @type {[string]} */
  #keys = [];

  /** @type {{[key: string]: string}} */
  #values = {};

  /**
   * @example [{field: 'name', rule: 'isNotEmpty'}]
   */
  #errors = [];

  /** @example {[name: string]: HTMLElement: Element} */
  #elements = {};

  /** @type {HTMLElement | null} */
  #errorMessagesElement = null;

  /** @type {[key: string] = HTMLButtonElement} */
  #buttons = {};

  /** @type {{[inputName: string]: { [ruleName: string]: boolean | number }}} */
  #rules = {};

  /**
   * Built in validations
   */
  #validations = {
    /**
     *
     * @param {string} val Value of the input
     * @returns {boolean}
     */
    isNotEmpty: (val) => val.trim() !== '',

    /**
     *
     * @param {string} val Value of the input
     * @returns {boolean}
     */
    isLowerCase: (val) => val.toLowerCase() === val,

    /**
     *
     * @param {string} val Value of the input
     * @returns {boolean}
     *
     * @copyright https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     */
    isValidEmail: (val) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    ),

    /**
     *
     * @param {string} val Value of the input
     * @param {number} length Maximum
     * @returns {boolean}
     */
    isLengthLowerThan: (val, length = 30) => val.length < length,

    /**
     *
     * @param {string} val Value of the input
     * @param {number} length Minimum
     * @returns {boolean}
     */
    isLengthGreaterThan: (val, length = 0) => val.length > length,
  };

  /** @type {{[key: string]: { [key: string]: string }}} */
  #errorMessages = {};

  #storageKey = 'formData';

  constructor(formName) {
    /** @type {HTMLFormElement} */
    const formElement = document.querySelector(`.${formName}`);

    if (!formElement) {
      throw new Error(
        `It was not possible to find a form element with class ${formName}`,
      );
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.#form = formElement;

    const elements = Array.from(formElement.elements);

    elements.forEach((input) => {
      if (['INPUT', 'TEXTAREA'].includes(input.nodeName)) {
        this.#keys.push(input.name);
        this.#elements[input.name] = input;
        this.#values[input.name] = input.value;

        input.addEventListener('change', this.handleChange);
      } else if (input.nodeName === 'BUTTON') {
        if (input.id) {
          this.#buttons[input.id] = input;
        }

        if (input.type === 'submit') {
          input.addEventListener('click', this.handleSubmit);
        } else if (input.type === 'reset') {
          input.addEventListener('click', this.handleReset);
        }
      }
    });

    if (!this.#keys.length) {
      throw new Error(
        'No inputs found, use "name" attribute in both input and textarea',
      );
    }

    this.#errorMessagesElement = document.querySelector('.error-messages');
  }

  // ░█▀▀▀ ▀█─█▀ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
  // ░█▀▀▀ ─█▄█─ █▀▀ █──█ ──█── ▀▀█
  // ░█▄▄▄ ──▀── ▀▀▀ ▀──▀ ──▀── ▀▀▀

  /**
   *
   * @param {Event} e Change input event
   */
  handleChange(e) {
    this.set(e.target.name, e.target.value);
  }

  /**
   *
   * @param {Event} e Click event
   */
  handleSubmit(e) {
    e.preventDefault();

    this.#errorMessagesElement.textContent = '';

    this.validate();

    if (this.hasErrors()) {
      this.#errors.forEach(({ field, rule }) => {
        if (this.#errorMessagesElement) {
          const object = errorTemplate(this.#getErrorMessage(field, rule));
          const element = buildTemplate(object);

          this.#errorMessagesElement.appendChild(element);
        }
      });
    } else {
      this.#form.submit();
      this.clear();
    }
  }

  /**
   *
   * @param {Event} e Click event
   */
  handleReset(e) {
    e.preventDefault();

    if (this.#errorMessages) {
      this.#errorMessagesElement.textContent = '';
    }

    this.clear();
  }

  exec() {
    const store = localStorage.getItem(this.#storageKey);
    let result;

    try {
      result = JSON.parse(store);
    } finally {
      Object.assign(this.#values, result);
    }

    this.#keys.forEach((key) => {
      this.set(key, this.get(key));
      this.#elements[key].value = this.get(key);
    });
  }

  /**
   * Get the value of a key
   *
   * @param {string} key Name of the input
   * @returns {string}
   */
  get(key) {
    return this.#values[key];
  }

  /**
   * Store a key - value in the values and localStorage
   *
   * @param {string} key Name of the input
   * @param {string} value Value of the input
   * @returns {this}
   */
  set(key, value) {
    this.#values[key] = value;
    localStorage.setItem(this.#storageKey, JSON.stringify(this.#values));

    return this;
  }

  /**
   * @param {{[inputName: string]: { [ruleName: string]: string }}} object
   *
   * @returns {this}
   */
  setErrorMessages(object) {
    Object.assign(this.#errorMessages, object);

    return this;
  }

  /**
   *
   * @param {{[ruleName: string]: (val: string) => boolean}} object
   *
   *  @returns {this}
   */
  setValidations(object) {
    Object.assign(this.#validations, object);

    return this;
  }

  /**
   *
   * @param {{[inputName: string]: { [ruleName: string]: boolean | number }}} object
   * @returns
   */
  setRules(object) {
    Object.assign(this.#rules, object);

    return this;
  }

  /**
   * Update value inputs and clear localStorage
   *
   * @returns {this}
   */
  clear() {
    this.#keys.forEach((name) => {
      this.#elements[name].value = '';
      this.#elements[name].classList.remove('error');
    });

    localStorage.removeItem(this.#storageKey);

    return this;
  }

  /**
   * Check if there are errors
   *
   * @returns {boolean}
   */
  hasErrors() {
    return this.#errors.length > 0;
  }

  /**
   *
   * @param {string} field Name of the input
   * @param {string} rule Name of the rule
   * @returns {boolean}
   */
  #getErrorMessage(field, rule) {
    return this.#errorMessages[field][rule];
  }

  /**
   * Use the rules to check the values according to validation functions
   *
   * @returns {this}
   */
  validate() {
    // Reset errors
    this.#errors.splice(0);

    // Check the rules according to the validation and values
    Object.keys(this.#rules).forEach((field) => {
      Object.keys(this.#rules[field]).forEach((rule) => {
        if (['isLengthLowerThan', 'isLengthGreaterThan'].includes(rule)) {
          if (
            !this.#validations[rule](
              this.#values[field],
              this.#rules[field][rule],
            )
          ) {
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

  toJSON() {
    return this.#values;
  }
}
