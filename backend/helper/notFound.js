export default function NotFound(message, code) {
  this.message = message;
  this.code = code;
  this.name = 'NotFound';
  this.statusCode = 404;
}
