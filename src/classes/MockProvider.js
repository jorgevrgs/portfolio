// @ts-check

export default class MockProvider {
  /**
   *
   * @param {string} service Name of the service
   * @returns {Promise<object>}
   */
  static get(service) {
    return new Promise((resolve, reject) => {
      fetch(`/portfolio/json/${service}.json`)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }
}
