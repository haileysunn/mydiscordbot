const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const title = ["노말", "하드"];

module.exports = {
  data: new SlashCommandBuilder().setName("큐브").setDescription("-")
    .addIntegerOption(option => option.setName('난이도')
      .setDescription('난이도')
      .setRequired(true)
      .addChoices(
        { name: '노말', value: 0 },
        { name: '하드', value: 1 }))
    .addIntegerOption(option => option.setName('장수')
      .setDescription('몇장 쓸거여')
      .setRequired(true)),
  async execute(interaction) {
    const index = interaction.options.getInteger('난이도');
    const count = interaction.options.getInteger('장수');

    try {
      await interaction.deferReply();
      const embed = calcReward(index, count);
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.log('error');
      await interaction.editReply('fail');
    }
  }
}

function calcReward(index, count) {
  const exp = 3000;
  let shilling;

  if (index == 0) {
    shilling = 83000;
  } else {
    shilling = 100000;
  }

  const su3 = parseInt(count / 3);
  const su1 = count % 3;

  const embed = new EmbedBuilder()
    .setColor('#A6FF4D')
    .setTitle(`[ 큐브 보상 : ${title[index]} ${count}장 ]`)
    .addFields(
      { name: "실링", value: (shilling * count).toLocaleString('ko-KR'), inline: true },
      { name: "카드 경험치", value: (exp * count).toLocaleString('ko-KR'), inline: true },
      { name: "3배 체크시", value: `3배로 ${su3.toLocaleString('ko-KR')}수 + 1장씩 ${su1.toLocaleString('ko-KR')}수`, inline: false })

  return embed;
}