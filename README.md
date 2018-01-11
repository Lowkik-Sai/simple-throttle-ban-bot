# Discord  throttle ban moderation bot

> A simple bot used to throttle your ban command from your mods

## What it is

That's a simple bot made with Fisherman and Discord.js to rate limit the use of a ban command from your mods

## Why

It prevents you from getting raid by your mods and getting all your members banned

## Setup

* Clone this repository

* Run `npm install` in the folder of the cloned repo

* Edit the config file (see below)

* Run the index.js file with node

## Use

[prefix]ban [@usermention] [reason]

Ex: `?ban @malicioususer He is malicious`

## Config file properties

| Property name      | Type          | Description                                                                                                                                                                 |
|--------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| modRole            | String        | The moderation role id                                                                                                                                                      |
| throttlingMS       | int           | Time used to thottle the ban command from mods                                                                                                                              |
| disabledRoleBan    | Array<String> | An array of role id. If the ban target has one of those role, it can't be banned                                                                                            |
| serverId           | String        | The server id used to operate. Only used by modLog                                                                                                                          |
| modLog             | String/Bool   | If set to false, there are no logs sent to the modlog channel. It's the modlog channel id. When a mod use the ban command, it sent some infos to the log channel in a embed |
| token              | String        | The bot token                                                                                                                                                               |
| fisherman          | Object        | The Fisherman options. See [here](https://maxerbox.github.io/fisherman-discord.js/?api=fisherman#FishermanOptions)                                                                |
| allowBotBan        | Bool          | Allow mods to ban bots on the server                                                                                                                                         |
| allowHigherRankBan | Bool          | Allow mods to ban an higher rank than the mod using the command                                                                                                             |
| presenceOnConnect  | Object        | Updated on connect. See [here](https://discord.js.org/#/docs/main/stable/typedef/PresenceData)                                                                                      |
