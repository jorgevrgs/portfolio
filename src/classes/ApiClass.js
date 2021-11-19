// @ts-check

import MockProvider from './MockProvider.js';

export default class ApiClass {
  #api = undefined;

  /**
   *
   * @param {MockProvider} serviceProvider
   */
  constructor(serviceProvider = undefined) {
    if (!serviceProvider) {
      this.#api = MockProvider;
    } else {
      this.#api = serviceProvider;
    }
  }

  /**
   *
   * @param {string} service Name of the service
   * @returns
   */
  get(service) {
    return this.#api.get(service);
  }
}
