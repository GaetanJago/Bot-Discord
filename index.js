const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const token = require('./token')
const users = require('./users')

client.once('ready', () => {
	console.log('Ready!');
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // check for bot
    if (oldState.member.user.bot) return;

    // the rest of your code
    
    const user = getUser(newState.id)
    
    if(user.jingle != null){
        const channel = client.channels.cache.get(newState.channelID)
        if(channel && newState.selfMute == false && newState.selfDeaf == false){
            channel.join().then(connection => {

                // Create a dispatcher
                const dispatcher = connection.play('audios/' + user.jingle, { volume: 0.5 });

                dispatcher.on('start', () => {
                    console.log(user.jingle + ' is now playing!');
                });

                dispatcher.on('finish', () => {
                    console.log(user.jingle + ' has finished playing!');
                    channel.leave()
                });

                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);


              }).catch(e => {
                // Oh no, it errored! Let's log it to console :)
                console.error('impossible de rejoindre le channel')
                console.error(e);
              });
        }
    }

})


function getUser(id){
    for(const user of users){
        if(user.id == id){
            return user;
        }
    }
    return null
}

client.login(token.botToken);
