import { LOCAL_STORAGE_PREFIX } from '@src/configs';

export default class LocalStorageService {
  /**
   * get full key
   * @param {string} key
   * @returns {string}
   */
  static getKey(key) {
    return `${LOCAL_STORAGE_PREFIX}_${key}`;
  }

  /**
   * set storage item
   * @param {string} key
   * @param {string} value
   */
  static set(key, value) {
    if (!key) throw 'Not allowed empty key!';
    localStorage.setItem(LocalStorageService.getKey(key), value);
  }

  /**
   * get local storage item
   * @param {string} key
   * @returns {string}
   */
  static get(key) {
    return key ? localStorage.getItem(LocalStorageService.getKey(key)) : '';
  }

  /**
   * set storage item type Object
   * @param {string} key
   * @param {object} value
   */
  static setObject(key, value) {
    if (!key) throw 'Not allowed empty key!';
    localStorage.setItem(LocalStorageService.getKey(key), JSON.stringify(value));
  }

  /**
   * return object or null
   * @param {string} key
   * @return {(object|null)}
   */
  static getObject(key) {
    if (!key || !localStorage.getItem(key)) return null;
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * verify that local storage is empty
   * @returns {boolean}
   */
  static isStorageEmpty() {
    return localStorage.length === 0;
  }

  /**
   * remove item in local storage
   * @param {string} key
   * @return {void}
   */
  static remove(key) {
    localStorage.removeItem(key);
  }

  /**
   * clear local storage
   */
  static clear() {
    localStorage.clear();
  }
}
