require("dotenv").config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
	],
});

client.on("ready", () => {
    console.log("Bot is running...");
});

client.on("messageCreate", msg => {
    if (msg.content === "Ping!") {
        msg.channel.send("Pong!");
    }
});

client.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD") {
        if (event.d.message_id === "1047807703692611614" || "1047807703692611614") {
             const reactionChannel = client.channels.cache.get(event.d.channel_id);
             if(reactionChannel.messages.cache.has(event.d.message_id)) {
                return;
             }
             else {
                reactionChannel.messages.fetch(event.d.message_id)
                .then(msg => {
                    const messageReaction = msg.reactions.cache.get(event.d.emoji.name);
                    const user = client.users.cache.get(event.d.user_id);
                    if (event.d.message_id === "1047807703692611614") {
                        client.emit("messageReactionAdd", messageReaction, user);
                    } else {
                        client.emit("messageReactionRemove", messageReaction, user);
                    }
                    
                })
             }
        }
    }
})

client.on("messageReactionAdd", (messageReaction, user) => {
    let roleName = messageReaction.emoji.name;

    let member = messageReaction.message.guild.members.cache.find(member => member.id === user.id);

    switch (roleName) {
        case "💻":
            member.roles.add("1047841563050516562");
            break;
        case "🎨":
            member.roles.add("1047841638359236658");
            break;
        case "🥑":
            member.roles.add("1047841681300533278");
            break;
        case "✍️":
            member.roles.add("1047841726674518056");
            break;
        case "💼":
            member.roles.add("1047841815400824903");
            break;
        case "🎥":
            member.roles.add("1047841711298183198");
            break;
        case "🛠️":
            member.roles.add("1047841783540891749");
            break;   
        default:
            break;
    }
});

client.on("messageReactionRemove", (messageReaction, user) => {
    let roleName = messageReaction.emoji.name;

    let member = messageReaction.message.guild.members.cache.find(member => member.id === user.id);

    switch (roleName) {
        case "💻":
            member.roles.remove("1047841563050516562");
            break;
        case "🎨":
            member.roles.remove("1047841638359236658");
            break;
        case "🥑":
            member.roles.remove("1047841681300533278");
            break;
        case "✍️":
            member.roles.remove("1047841726674518056");
            break;
        case "💼":
            member.roles.remove("1047841815400824903");
            break;
        case "🎥":
            member.roles.remove("1047841711298183198");
            break;
        case "🛠️":
            member.roles.remove("1047841783540891749");
            break;   
        default:
            break;
    }
})

client.login(process.env.TOKEN);