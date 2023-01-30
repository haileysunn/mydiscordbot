const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder().setName("쿠폰")
    .setDescription("등록 가능한 쿠폰 정보를 제공합니다."),
    async execute(interaction) {
        const userid = interaction.user.id;
        try {
            await interaction.deferReply();
            const url = `https://canfactory.tistory.com/`
            const html = await axios.get(url)
            
            const $ = cheerio.load(html.data);
            
            let item = [];
            const elements = $("#wrap_sidebar1 > div:nth-child(1) > ul > ul > li").toArray();
            elements.map((element) => {
                const $ = cheerio.load(element);
                const title = $("a:nth-child(1)").text();
                const endDate = $("a:nth-child(2)").text();
                item.push({name:title, value:endDate.trim().slice(1) + " 까지", inline:false});
            });
            
            let embed = new EmbedBuilder().setTitle('[ 2023 쿠폰 정보 ]').setColor('#A6FF4D')
            if (item == null) {
                embed.addFields({name:"쿠폰 정보가 없습니다.", value:"로스트아크 공식 홈페이지를 다시 확인해주세요", inline:false})
            } else {
               	embed.addFields(item);
                embed.setFooter({ text: '쿠폰은 로스트아크 홈페이지나 인게임 내에서 등록할 수 있습니다.'});
            }
            
            await interaction.editReply({ embeds: [embed] });
           
        } catch (err) {
            errorHandling(userid, '14_coupon 01 execute', err)
        }
    }
}

function errorHandling(userid, exp, error) {
  const today = new Date(+new Date() + 3240 * 10000)
  const date = today.toISOString().split("T")[0];
  const ts = today.toISOString().replace("T", " ").replace(/\..*/, '');

  const filePath = `/home/container/log/log_${date}.csv`;
  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, 'timestamp,userid,exp,error') : null;
  fs.appendFileSync(filePath, `\r\n${ts},${userid},${exp},${error.stack.replace(/\n|\r/g, '\t')}`);
}