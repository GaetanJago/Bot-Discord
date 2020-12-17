const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const token = require('./token')

client.once('ready', () => {
	console.log('Ready!');
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // check for bot
    if (oldState.member.user.bot) return;

    // the rest of your code
    
    
    if(newState.id == '228494290811092992'){
        const channel = client.channels.cache.get(newState.channelID)
        if(channel && newState.selfMute == false && newState.selfDeaf == false){
            channel.join().then(connection => {
                // Yay, it worked!
                console.log("Play jago jingle");
                // Create a dispatcher
                const dispatcher = connection.play('audios/jagooo.mp3', { volume: 0 });

                dispatcher.on('start', () => {
                    console.log('audio.mp3 is now playing!');
                });

                dispatcher.on('finish', () => {
                    console.log('audio.mp3 has finished playing!');
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


client.login(token.botToken);
