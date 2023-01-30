const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const today = new Date(+new Date() + 3240 * 10000)
const date = today.toISOString().split("T")[0];

module.exports = {
  data: new SlashCommandBuilder().setName("신고")
    .setDescription("신고 기능! (익명성 보장 / 본인 정보 입력X)")
    .addStringOption(option => option.setName('닉네임')
      .setDescription('신고할 유저의 닉네임').setRequired(true))
    .addStringOption(option => option.setName('사유')
      .setDescription('신고 사유').setRequired(true))
    .addStringOption(option => option.setName('첨부')
      .setDescription('사진 첨부(링크만 가능)')),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const userid = interaction.user.id;
    var msg = '신고가 완료되었습니다.'

    const charname = interaction.options.getString('닉네임');
    const reason = interaction.options.getString('사유');
    const image = interaction.options.getString('첨부');
    try {
      const codename = encodeURI(charname);
      const url = `https://lostark.game.onstove.com/Profile/Character/${codename}`
      const html = await axios.get(url)
      const $ = cheerio.load(html.data);
      const warn = $(".profile-attention span:nth-of-type(2)").text();
      const server = $(".profile-character-info__server").text();
      const level = $(".level-info2__item span:nth-of-type(2)").text().substring(3).replace(',', '');
      const job = $("img.profile-character-info__img").attr("alt");
      const thum = $("img.profile-character-info__img").attr("src");

      if (warn === '캐릭터명을 확인해주세요.') {
        msg = '캐릭터명을 확인해주세요.';
      } else {
        makeLog(`${userid},${server},${charname},${reason}`);

        var exampleEmbed = new EmbedBuilder()
          .setColor('#A6FF4D')
          .setTitle('🚨 신고 접수')
          .addFields({ name: `${charname} : Lv.${level} ${job}`, value: `🔻 신고 사유\n${reason}` })
          .setThumbnail(thum)
          .setFooter({ text: '레이드 시 주의하세요!' })

        if (image != null && isImage(image)) {
          exampleEmbed.setImage(image);
        }

        interaction.guild.channels.cache.get('1067702441971294239').send({ embeds: [exampleEmbed] });
      }

      await interaction.editReply(msg);
    } catch (err) {
      errorHandling('auto', '34_report 01 execute', err)
      await interaction.editReply('신고 실패');
    }
  }
}

function errorHandling(userid, exp, error) {
  const ts = today.toISOString().replace("T", " ").replace(/\..*/, '');

  const filePath = `/home/container/log/log_${date}.csv`;
  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, 'timestamp,userid,exp,error') : null;
  fs.appendFileSync(filePath, `\r\n${ts},${userid},${exp},${error.stack.replace(/\n|\r/g, '\t')}`);
}

function makeLog(message) {
  const today = new Date(+new Date() + 3240 * 10000)
  const ts = today.toISOString().replace("T", " ").replace(/\..*/, '');

  const filePath = `/home/container/log/report.csv`;
  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, '신고자,서버,닉네임,사유,등록일시') : null;
  fs.appendFileSync(filePath, `\r\n${message},${ts}`);
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}