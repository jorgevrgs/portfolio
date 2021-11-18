// @ts-check

import FormClass from '../classes/FormClass.js';

export default function contact() {
  const formClass = new FormClass('form');

  formClass
    .setErrorMessages({
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
    })
    .setRules({
      name: { isNotEmpty: true, isLengthLowerThan: 30 },
      email: { isNotEmpty: true, isLowerCase: true, isValidEmail: true },
      message: { isNotEmpty: true, isLengthLowerThan: 500 },
    })
    .exec();
}
