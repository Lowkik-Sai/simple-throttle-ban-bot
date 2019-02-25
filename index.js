const CommandLoader = require('command-loader-fisherman')
const { resolve } = require('path')
const config = require('./config.json')
const IsModMiddleware = require('./IsModMiddleware')
const { Fisherman } = require('fisherman-discord.js')

var commandLoader = new CommandLoader(resolve(__dirname, 'commands'))
var isModMiddleware = new IsModMiddleware()
var bot = new Fisherman(config.fisherman)
bot.use(commandLoader)
bot.use(isModMiddleware)
bot.on('initialized', () => {
  bot.client.user.setPresence(config.presenceOnConnect).catch(err => console.log(err))
  console.log('Logged in')
  if (config.modLog) {
    bot.channelLog = bot.client.guilds.get(config.serverId).channels.get(config.modLog)
    if (!bot.channelLog) throw new Error('Cannot found the modlog channel')
  }
})
bot.init(config.token)
