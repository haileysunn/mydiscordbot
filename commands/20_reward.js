const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("보상").setDescription("원하시는 어비스 던전 및 군단장 레이드에 대한 보상을 알려드립니다.")
    .addIntegerOption(option => option.setName('이름')
          .setDescription('보상을 확인하고자 하는 던전 및 레이드를 선택하세요.')
          .setRequired(true)
          .addChoices(
        	{ name: '발탄', value: 0 },
            { name: '비아키스', value: 1 },
            { name: '쿠크세이튼', value: 2 },
            { name: '아브렐슈드', value: 3 },
            { name: '카양겔', value: 4 },
            { name: '일리아칸', value: 5 })),
  async execute(interaction) {
    const userid = interaction.user.id;
    try {
      const selection = interaction.options.getInteger("이름")

      let embed = new EmbedBuilder()
        .setColor('#A6FF4D')
        .setTitle(`[ 군단장 보상 - ${title[selection]} ]`)
        .addFields(reward[selection])
        .setFooter({text:"# 🎲 랜덤 / 🎴 낮은 확률 을 의미합니다."});
      await interaction.reply({ embeds: [embed] })
    } catch (err) {
      errorHandling(userid, '20_reward 01 execute', err)
    }
  }
}

const title = ['발탄','비아키스','쿠크세이튼','아브렐슈드','카양겔','일리아칸'];
const reward = [
    // 발탄
    [
        {name:"노말 클리어 시 획득 보상", value:"1,200G, 뼈 3개, 힘줄 6개 [더보기 뼈 3개, 힘줄 6개]", inline:false},
        {name:"노말 1관문", value:"골드 : 500G\n보상: 뼈 1개, 힘줄 3개\n더보기 (300G): 뼈 1개, 힘줄 3개", inline:true},
   		{name:"노말 2관문", value:"골드 : 700G\n보상: 뼈 2개, 힘줄 3개\n더보기 (400G): 뼈 2개, 힘줄 3개", inline:true},
        {name:"하드 클리어 시 획득 보상", value:"1,800G, 뼈 6개 [더보기 뼈 6개]", inline:false},
        {name:"하드 1관문", value:"골드 : 700G\n보상: 뼈 3개\n더보기 (450G): 뼈 3개", inline:true},
        {name:"하드 2관문", value:"골드 : 1,100G\n보상: 뼈 3개\n더보기 (600G): 뼈 3개", inline:true},
    ],
    // 비아
    [
        {name:"노말 클리어 시 획득 보상", value:"1,600G, 날개 3개, 송곳니 6개 [더보기 날개 3개, 송곳니 6개]", inline:false},
        {name:"노말 1관문", value:"골드 : 400G\n보상: 날개 1개, 송곳니 2개\n더보기 (200G): 날개 1개, 송곳니 2개", inline:true},
        {name:"노말 2관문", value:"골드 : 500G\n보상: 날개 1개, 송곳니 2개\n더보기 (250G): 날개 1개, 송곳니 2개", inline:true},
        {name:"노말 3관문", value:"골드 : 700G\n보상: 날개 1개, 송곳니 2개\n더보기 (400G): 날개 1개, 송곳니 2개", inline:true},
        {name:"하드 클리어 시 획득 보상", value:"2,400G, 날개 6개 [더보기 날개 6개]", inline:false},
        {name:"하드 1관문", value:"골드 : 600G\n보상: 날개 2개\n더보기 (300G): 날개 2개", inline:true},
        {name:"하드 2관문", value:"골드 : 700G\n보상: 날개 2개\n더보기 (300G): 날개 2개", inline:true},
        {name:"하드 3관문", value:"골드 : 1,100G\n보상: 날개 2개\n더보기 (600G): 날개 2개", inline:true},
    	{name:"노1하23 클리어 시 획득 보상", value:"2,200G, 뼈 날개 [더보기 1,100G 날개 6개]", inline:false},
    ],
    // 쿠쿠
    [
        {name:"노말 클리어 시 획득 보상", value:"4,500골드, 나팔 5개, 광기의 표식 200개, 에스더의 기운🎴", inline:false},
        {name:"노말 1관문", value:"골드: 1,000G\n보상: 나팔 1개, 광기의 표식 50개\n더보기 (800G):\n- 나팔 1개", inline:true},
        {name:"노말 2관문", value:"골드: 1,000G\n보상: 나팔 2개, 광기의 표식 50개\n더보기 (1,000G):\n- 나팔 2개", inline:true},
        {name:"노말 3관문", value:"골드: 2,500G\n보상: 나팔 2개, 광기의 표식 100개\n+ 에스더의 기운🎴\n더보기 (1,300G):\n- 나팔 2개", inline:true},
        {name:"리허설 클리어 시 획득 보상", value:"광기의 표식 200개", inline:false},
    ],
    // 아브렐
    [
        {name:"노말 클리어 시 획득 보상", value:"8,500G, 뿔 22개, 표식 250개, 에스더의 기운🎴 [더보기 뿔 22개]", inline:false},
        {name:"노말 1관문", value:"골드: 2,000G\n보상: 뿔 3개, 표식 60개\n더보기 (400G):\n- 뿔 3개", inline:true},
        {name:"노말 2관문", value:"골드: 2,500G\n보상: 뿔 4개, 표식 60개\n더보기 (600G):\n- 뿔 4개, 심화의 돌파석", inline:true},
        {name:"노말 3관문", value:"골드: 700G\n보상: 뿔 3개, 표식 60개\n더보기 (700G):\n- 뿔 3개", inline:true},
        {name:"노말 4관문", value:"골드: 800G\n보상: 뿔 4개, 표식 70개\n더보기 (800G):\n- 뿔 4개, 심화의 돌파석", inline:true},
        {name:"노말 5관문", value:"골드: 1,000G\n보상: 뿔 3개\n더보기 (900G):\n- 뿔 3개", inline:true},
        {name:"노말 6관문", value:"골드: 1,500G\n보상: 뿔 5개\n+ 에스더의 기운🎴\n더보기 (1,100G):\n- 뿔 5개", inline:true},
        {name:"하드 클리어 시 획득 보상", value:"10,500G, 사념 22개, 표식 250개, 에스더의 기운🎴 [더보기 사념 22개]", inline:false},
        {name:"하드 1관문", value:"골드: 2,500G\n보상: 사념 3개, 표식 60개\n더보기 (700G):\n- 사념 3개", inline:true},
        {name:"하드 2관문", value:"골드: 3,000G\n보상: 사념 4개, 표식 60개\n더보기 (800G):\n- 사념 4개, 심화의 돌파석", inline:true},
        {name:"하드 3관문", value:"골드: 900G\n보상: 사념 3개, 표식 60개\n더보기 (900G):\n- 사념 3개", inline:true},
        {name:"하드 4관문", value:"골드: 1100G\n보상: 사념 4개, 표식 70개\n더보기 (1,100G):\n- 사념 4개, 심화의 돌파석", inline:true},
        {name:"하드 5관문", value:"골드: 1,200G\n보상: 사념 3개\n더보기 (1,100G):\n- 사념 3개", inline:true},
        {name:"하드 6관문", value:"골드: 1,800G\n보상: 사념 5개\n+ 에스더의 기운🎴\n더보기 (1,400G):\n- 사념 5개, 심화의 돌파석", inline:true},
        {name:"데자뷰 클리어 시 획득 보상", value:"몽환의 표식 250개", inline:false},
	],
    // 카양
    [
        {name:"노말 클리어 시 획득 보상", value:"파괴석 결정, 수호석 결정, 명예의 파편, 위대한 명예의 돌파석", inline:false},
        {name:"노말 넬라시아", value:"보상 : 시련의 빛 8개\n더보기 (400G): 시련의 빛 8개", inline:true},
        {name:"노말 빛의요람", value:"보상 : 시련의 빛 8개\n더보기 (600G): 시련의 빛 8개", inline:true},
        
        {name:"하드1 클리어 시 획득 보상", value:"파괴강석, 수호강석, 명예의 파편, 위대한 명예의 돌파석, 에스더의 기운🎴", inline:false},
        {name:"하드1 넬라시아", value:"보상 :\n- 시련의 빛 13개\n- [빛의 창, 질서의 수정]🎲\n더보기 (700G):\n- 시련의 빛 13개\n- [빛의 창, 질서의 수정]🎲", inline:true},
        {name:"하드1 빛의요람", value:"보상 :\n- 시련의 빛 13개\n- [빛의 창, 질서의 수정]🎲\n- 에스더의 기운🎴\n더보기 (800G):\n- 시련의 빛 13개\n- [빛의 창, 질서의 수정]🎲", inline:true},
        
        {name:"하드2 클리어 시 획득 보상", value:"파괴강석, 수호강석, 명예의 파편, 위대한 명예의 돌파석, 에스더의 기운🎴", inline:false},
        {name:"하드2 넬라시아", value:"보상 :\n- 시련의 빛 18개\n- 관조의 빛무리 1개\n- [빛의 창, 질서의 수정, 광휘의 구]🎲\n더보기 (900G):\n- 시련의 빛 18개\n- 관조의 빛무리 1개\n- [빛의 창, 질서의 수정, 광휘의 구]🎲", inline:true},
        {name:"하드2 빛의요람", value:"보상 :\n- 시련의 빛 18개\n- 관조의 빛무리 2개\n- [빛의 창, 질서의 수정, 광휘의 구]🎲\n- 에스더의 기운🎴\n더보기 (1100G):\n- 시련의 빛 18개\n- 관조의 빛무리 2개\n- [빛의 창, 질서의 수정, 광휘의 구]🎲", inline:true},
        
        {name:"하드3 클리어 시 획득 보상", value:"정제된 파괴강석, 정제된 수호강석, 명예의 파편, 찬란한 명예의 돌파석, 에스더의 기운🎴, 탈것: 날개🎴", inline:false},
        {name:"하드3 넬라시아", value:"보상 :\n- 시련의 빛 20개\n- 관조의 빛무리 2개\n- [빛의 창, 질서의 수정, 광휘의 구, 심판의 서]🎲\n더보기 (1100G):\n- 시련의 빛 20개\n- 관조의 빛무리 2개\n- [빛의 창, 질서의 수정, 광휘의 구, 심판의 서]🎲", inline:true},
        {name:"하드3 빛의요람", value:"보상 :\n- 시련의 빛 30개\n- 관조의 빛무리 3개\n- [빛의 창, 질서의 수정, 광휘의 구, 심판의 서]🎲\n- 에스더의 기운🎴\n- 탈것: 고요의 날개, 금기의 날개🎴\n더보기 (1400G):\n- 시련의 빛 30개\n- 관조의 빛무리 3개\n- [빛의 창, 질서의 수정, 광휘의 구, 심판의 서]🎲\n- 탈것: 고요의 날개, 금기의 날개🎴", inline:true},
    ],
    // 일리
    [
        {name:"노말 클리어 시 획득 보상", value:"5,500G, 눈동자 11개, 질병의 표식 250개, 에스더의 기운🎴 [더보기 눈동자 11개]", inline:false},
        {name:"노말 1관문", value:"골드 : 1,500G\n보상: 눈동자 3개, 표식 75개\n더보기 (900G): 눈동자 3개", inline:true},
        {name:"노말 2관문", value:"골드 : 1,750G\n보상: 눈동자 3개, 표식 75개\n더보기 (1,100G): 눈동자 3개", inline:true},
        {name:"노말 3관문", value:"골드 : 2,250G\n보상: 눈동자 5개, 표식 100개\n+ 에스더의 기운🎴\n더보기 (1,500G): 눈동자 5개", inline:true},
        {name:"하드 클리어 시 획득 보상", value:"7,500G, 눈동자 22개, 표식 250개, 에스더의 기운🎴 [더보기 눈동자 22개]", inline:false},
        {name:"하드 1관문", value:"골드 : 1,750G\n보상: 눈동자 7개, 표식 75개\n더보기 (1,200G): 눈동자 7개", inline:true},
        {name:"하드 2관문", value:"골드 : 2,000G\n보상: 눈동자 7개, 표식 75개\n더보기 (1,400G): 눈동자 7개", inline:true},
        {name:"하드 3관문", value:"골드 : 3,750G\n보상: 눈동자 8개, 표식 100개\n+ 에스더의 기운🎴\n더보기 (1,900G): 눈동자 8개", inline:true},
    	{name:"에피데믹 클리어 시 획득 보상", value:"질병의 표식 250개", inline:false},
    ]
]
function errorHandling(userid, exp, error) {
  const today = new Date(+new Date() + 3240 * 10000)
  const date = today.toISOString().split("T")[0];
  const ts = today.toISOString().replace("T", " ").replace(/\..*/, '');

  const filePath = `/home/container/log/log_${date}.csv`;
  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, 'timestamp,userid,exp,error') : null;
  fs.appendFileSync(filePath, `\r\n${ts},${userid},${exp},${error.stack.replace(/\n|\r/g, '\t')}`);
}