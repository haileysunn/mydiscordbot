const schedule = require('node-schedule');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

const channelId = ['1065938757255184414', '1065938779971539014'];
const serverName = ['카제로스', '니나브'];
let save = [[], []];
let flag = 0;

function reportTrader(client) {
    console.log("scheduler on");
    
    schedule.scheduleJob('30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,55 * * * *', async () => {
        const now = new Date();
      	const koNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000));

        console.log(`- - - ${koNow.getHours()}시 ${koNow.getMinutes()}분 떠상 - - -`);

        // 카제로스
        const resNo7 = await axios.get(`https://api.korlark.com/merchants?server=7`);
        const cazeros = resNo7.data.merchants;
        makeData(now, koNow, cazeros, 0, client);
        
        // 니나브
        const resNo8 = await axios.get(`https://api.korlark.com/merchants?server=8`);
        const ninav = resNo8.data.merchants;
        makeData(now, koNow, ninav, 1, client);
        
        if(now.getMinutes() > 54){
            const embed = new EmbedBuilder()
            .setColor('#A6FF4D')
            .setTitle(`[ ${koNow.getHours()}시 30분~55분 떠상 알림 통계 ]`)
            .addFields(
                { name: "카제로스", value: `${save[0].length}건`, inline: true },
                { name: "니나브", value: `${save[1].length}건`, inline: true })
            
            client.channels.fetch('1067701306661294143').then(channel => channel.send({ embeds: [embed] }));
            save = [[], []];
        	console.log(`- - - ${koNow.getHours()}시 떠상 완료 - - -`);
        }
    });
}

function makeData(now, koNow, data, index, client) {
    let list = [];
    let logStr = "";
    let color = "#A6FF4D";
    
    for (var obj of data) {
        const createdTime = new Date(obj.created_at);
        if (createdTime.getHours() == now.getHours() - 1 && createdTime.getMinutes() >= 30) {
            // check
        } else {
            continue;
        }
        
        const card = obj.card;
        const rapport = obj.rapport;
        
        var valueStr = '';
        if (card == '웨이 카드' || card == '에버그레이스 카드') {
            valueStr += card;
            color = "#FF0000";
        }
        if (rapport == '1') {
            if (valueStr == '') {
                valueStr = "전설 호감도";
            } else {
                valueStr += " / 전설 호감도";
            }
        }
        
        if (valueStr != '') {
            logStr += valueStr + " ";
            list.push({ name: `[${obj.continent}] ${obj.zone}`, value: valueStr, inline: false });
        }
    }
    
    if (JSON.stringify(save[index]) == JSON.stringify(list)) {
        // 같으면 전송 안함
    } else {
        save[index] = list;
        
        if(list.length != 0) {
            const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`[ ${serverName[index]} 떠상 알림 ]`)
            .addFields(list)
            .setFooter({ text: `${koNow.getHours()}:30 ~ ${koNow.getHours()}:55` })

            client.channels.fetch(channelId[index]).then(channel => channel.send({ embeds: [embed] }))
            flag = 1;
        }
    }
    console.log(`- - ${serverName[index]} : ${logStr}`);
}

module.exports = reportTrader;