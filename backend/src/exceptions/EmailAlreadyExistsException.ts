class EmailAlreadyExistsException extends Error {
  constructor() {
    super(`The email already exists.`);
    this.name = 'EmailAlreadyExistsException';
  }
}

export default EmailAlreadyExistsException;
