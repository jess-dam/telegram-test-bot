import { Telegraf } from 'telegraf'
import getBotTokenOrQuit from './util/getBotToken';

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)


// Commands
const WHO_RILEY = "Err Who's Riley?";
const WHAT_SITUATIONS = "What situations can I practice?";
const WHAT_I_LOOK_LIKE = "Show me what I look like";

const SIT_RESCHEDULING_CONFLICTS = 'Reschduling conflicts';

// Content
let name = 'Elmo';
const INTRO_MESSAGE = `Hey ${name} 👋! I'm Riley from Greenworkx, nice to meet you!

I'd like to help you practice talking to your customers in common situations you might face at work.`;

bot.start((ctx) => {
    ctx.reply(INTRO_MESSAGE, {
        reply_markup: {
            inline_keyboard: [
                [  { text: WHO_RILEY, callback_data: WHO_RILEY } ],
                [ { text: WHAT_SITUATIONS, callback_data: WHAT_SITUATIONS } ],
                [ { text: WHAT_I_LOOK_LIKE, callback_data: WHAT_I_LOOK_LIKE } ],
            ]
        }
    })
});

bot.action(WHO_RILEY, (ctx) => {
    ctx.reply('Riley is Riley')
});

bot.action(WHAT_SITUATIONS, (ctx) => {
    ctx.reply('Choose one of the following', {
        reply_markup: {
            inline_keyboard: [
                [  { text: SIT_RESCHEDULING_CONFLICTS, callback_data: SIT_RESCHEDULING_CONFLICTS } ],
            ]
        }})
});

bot.action(WHAT_I_LOOK_LIKE, (ctx) => {
    ctx.reply('See for yourself');
    ctx.replyWithPhoto({ url: 'https://uploads.dailydot.com/2023/11/Elmo-Fire.jpg?q=65&auto=format&w=800&ar=2:1&fit=crop' });
});



// DEFAULTS
bot.help((ctx) => ctx.reply('Hmm i am not programmed to be helpful, yet!'))
bot.hears('hello', (ctx) => ctx.reply('Ok, I heard you say hello'))
bot.command('sing', (ctx) => ctx.reply('La la la!  I got your command.'))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
