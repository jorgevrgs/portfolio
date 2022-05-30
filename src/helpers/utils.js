// @ts-check

/**
 * Check whether it's mobile base on screen width
 *
 * @param {number} width Reference width
 * @returns {boolean}
 */
export const isMobile = (width = 768) => window.innerWidth < width;

/**
 * Toggle a class name over an object
 *
 *
 * @param {HTMLElement} element Element DOM
 * @param {string} className Class name
 * @returns {void}
 */
export const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

/**
 * Remove a class name over an object
 *
 *
 * @param {HTMLElement} element Element DOM
 * @param {string} className Class name
 * @returns {void}
 */
export const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};

/**
 * Remove a class name over an object
 *
 *
 * @param {HTMLElement} element Element DOM
 * @param {string | array} className Class name
 * @returns {void}
 */
export const addClass = (element, className) => {
  if (element) {
    if (className.length) {
      if (typeof className === 'string') {
        element.classList.add(className);
      } else if (Array.isArray(className)) {
        element.classList.add(...className);
      }
    }
  }
};
