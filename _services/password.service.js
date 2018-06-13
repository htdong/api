var generatePassword = require("password-generator");

const maxLength = 18;
const minLength = 12;
const uppercaseMinCount = 3;
const lowercaseMinCount = 3;
const numberMinCount = 2;
const specialMinCount = 2;
const UPPERCASE_RE = /([A-Z])/g;
const LOWERCASE_RE = /([a-z])/g;
const NUMBER_RE = /([\d])/g;
const SPECIAL_CHAR_RE = /([\?\-])/g;
const NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

/**
* passwordService
* All utilities on password
*
* @function isStrongEnough
* @function generate
*/
var passwordService = {

  /**
  * @function isStrongEnough
  * Check and return result if given password is strong or not
  *
  * @param {string} password
  *
  * @return {boolean}
  */
  isStrongEnough: (password) => {
    const uc = password.match(UPPERCASE_RE);
    const lc = password.match(LOWERCASE_RE);
    const n = password.match(NUMBER_RE);
    const sc = password.match(SPECIAL_CHAR_RE);
    const nr = password.match(NON_REPEATING_CHAR_RE);
    return password.length >= minLength &&
      !nr &&
      uc && uc.length >= uppercaseMinCount &&
      lc && lc.length >= lowercaseMinCount &&
      n && n.length >= numberMinCount &&
      sc && sc.length >= specialMinCount;
  },

  /**
  * @function generate
  * Generate a random password based on the pre-defined rules
  *
  * @return {string}
  */
  generate: () => {
    let password = "";
    const randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    while (!passwordService.isStrongEnough(password)) {
      password = generatePassword(randomLength, false, /[\w\d\?\-]/);
    }
    return password;
  }

}

module.exports = passwordService;
