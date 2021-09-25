const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

let guild;
let channel;
let defaultRole;

const setRichPresence = () => {
    client.user.setStatus('dnd');
    client.user.setActivity('the server',{type:'WATCHING'})
}

client.once('ready', () => {
    console.log('Connected');
    setRichPresence();

    guild = client.guilds.cache.get(process.env.serverId);
    channel = client.channels.cache.get(process.env.testChannel);
})

const setChannelNames = (guild) => {
    const membersChannel = guild.channels.cache.get(process.env.membersChannelId);
    membersChannel.setName('Total members: '+guild.memberCount.toLocaleString());
}

client.on('guildMemberAdd', 
(member) => {
    setChannelNames(member.guild);
    defaultRole = member.guild.roles.cache.find(role => role.id == "891357798322045028");
    member.roles.add(defaultRole);
});

client.on('guildMemberRemove', 
(member) => {
    setChannelNames(member.guild);
});

client.login(process.env.token);