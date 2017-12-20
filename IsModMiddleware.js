const config = require('./config.json')
class IsModMiddleware {
  handle (request, response, next) {
    if (request.isCommand && request.command.locales.moderation) {
      if (request.message.member.roles.has(config.modRole)) {
        next()
      } else next(true)
    }
  }
}
module.exports = IsModMiddleware
