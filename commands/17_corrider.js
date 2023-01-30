const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const title = ["노말", "하드", "헬", "영겁"];
const jewelLabel = ["2레벨 ","3레벨 ", "4레벨 ", "5레벨 ", "6레벨 ", "7레벨 ", "8레벨 ", "9레벨 ", "10레벨 "];
const stoneLabel = ["명돌 ",	"위명돌 ",	"경명돌 ",	"찬명돌 "];
  
module.exports = {
  data: new SlashCommandBuilder().setName("회랑").setDescription("-")
    .addIntegerOption(option => option.setName('난이도')
      .setDescription('난이도')
      .setRequired(true)
      .addChoices(
        { name: '노말', value: 0 },
        { name: '하드', value: 1 },
        { name: '헬', value: 2 },
        { name: '영겁', value: 3 }))
    .addIntegerOption(option => option.setName('몇수')
      .setDescription('몇수할겨')
      .setRequired(true)),
  async execute(interaction) {
    const index = interaction.options.getInteger('난이도');
    const count = interaction.options.getInteger('몇수');
    
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

function calcReward(index, count){
  let jewel;
  let stone;

  switch(index){
    case 0:
      //       2  3  4  5  6  7  8  9  10
      jewel = [0,	1, 2, 0, 0, 0, 0, 0, 0];
      stone = [17, 18, 0, 0];
      break;
    case 1:
      jewel = [0,	1, 2, 0, 0, 0, 0, 0, 0];
      stone = [0, 0, 15, 0];
      break;
    case 2:
      jewel = [2,	2, 2, 0, 0, 0, 0, 0, 0];
      stone = [0, 0, 26, 0];
      break;
    case 3:
      jewel = [0,	1, 0, 1, 0, 0, 0, 0, 0];
      stone = [0, 0, 0, 15];
      break;
  }
  jewel = solution(jewel, count);
  stone = solution(stone, count);

  for(let i = 0; i < jewel.length - 1; i++){
    let up = parseInt(jewel[i]/3);
    let stay = jewel[i]%3;
    jewel[i] = stay;
    jewel[i+1] = jewel[i+1] + up;
  }

  let jewelStr = "";
  for(let i = 0; i < jewel.length; i++){
    if(jewel[i] > 0){
      jewelStr += jewelLabel[i] + jewel[i] + "개 / "; 
    }
  }

  let stoneStr = "";
  for(let i = 0; i < stone.length; i++){
    if(stone[i] > 0){
      stoneStr += stoneLabel[i] + stone[i] + "개 / "; 
    }
  }
  
  let embed = new EmbedBuilder()
    .setColor('#A6FF4D')
    .setTitle(`[ 회랑 보상 : ${title[index]} ${count}수 ]`)
    .addFields(
      { name: "보석", value: jewelStr.slice(0, -3), inline : false},
      { name: "돌파석", value: stoneStr.slice(0, -3), inline : true})

  if(index != 0){
    const exp = 8500 * count;
    embed.addFields({ name: "카경", value: exp.toLocaleString('ko-KR'), inline : true})
  }

  return embed;
}

function solution(array, count) {
    var answer = [];
    for(let i = 0; i < array.length; i++) {
        answer.push(array[i] * count);
    }
    return answer;
}