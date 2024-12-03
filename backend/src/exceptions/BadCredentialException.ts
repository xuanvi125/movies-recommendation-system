export class BadCredentialException extends Error {
  constructor(message: string = 'Bad credentials provided') {
    super(message);
    this.name = 'BadCredentialException';
  }
}
