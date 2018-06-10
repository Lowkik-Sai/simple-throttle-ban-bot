const LRU = require('lru-cache')
const config = require('../../config.json')
var cache = new LRU({
  maxAge: config.throttlingMS
})
module.exports = {
  name: 'ban',
  execute: function (req, res) {
    if (!cache.get(req.message.author.id)) {
      cache.set(req.message.author.id, true)
      var execArray = this.regPattern.exec(req.command.suffixe)
      var userId = execArray[1]
      var reason = execArray[2] !== '' ? execArray[2].replace(/^\s+|\s+$/g, '') : 'No reason'
      var target = req.message.channel.guild.members.get(userId)
      if (!target) {
        if (target.roles.has(config.modRole)) return
        if (target._roles.some(role => config.disabledRoleBan.indexOf(role) >= 0)) return
        if (target.user.bot && !config.allowBotBan) return
        if (!config.allowHigherRankBan) {
          var roleIndexesReq = req.message.member.roles.map((role) => {
            return role.calculatedPosition
          })
          roleIndexesReq.sort()
          var roleIndexesTarget = target.roles.map((role) => {
            return role.calculatedPosition
          })
          roleIndexesTarget.sort()
          if (roleIndexesReq[roleIndexesReq.length - 1] < roleIndexesTarget[roleIndexesTarget.length - 1]) return
        }
      }
      console.log(`Banning command request from id: ${req.message.author.id} - ${req.message.author.username}\n Ban id requested: ${userId} - ${target !== null ? target.user.username : 'Unknown name'}\nReason: ${reason}`)
      req.channel.guild.ban(userId, {reason: reason}).then(() => {
        if (config.modLog) req.client.channelLog.send('', { embed: { description: `User banned by ${req.message.author.username} - ${req.message.author.id}\nReason: ${reason}`, title: `New ban: ${userId} - ${target !== null ? target.user.username : 'Unknown name'}` } })
        console.log(` Banned: ${userId} at ${new Date().toJSON().slice(0, 20).replace(/-/g, '/')}`)
      }).catch((err) => {
        console.log(`Can't ban\n ${err.message}`)
        req.channel.send('Can\'t ban')
      })
    }
  },
  channelType: ['text'],
  locales: { moderation: true },
  regPattern: new RegExp('<@!?([0-9]+)>\s*(.*)')
}
