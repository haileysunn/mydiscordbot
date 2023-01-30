const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
  
module.exports = {
    data: new SlashCommandBuilder().setName("경매").setDescription("전리품 경매 시 입찰을 돕기 위해 손익분기점을 알려드립니다.")
    .addIntegerOption(option => option.setName('가격')
                      .setDescription('화면에 나타난 거래소 최저가를 입력하세요.').setRequired(true)),
    async execute(interaction) {
        const cost = interaction.options.getInteger('가격');
        
        try {
            await interaction.deferReply();
            
            const embed = new EmbedBuilder()
            .setColor('#A6FF4D')
            .setTitle(`경매 입찰가 계산기 (${cost.toLocaleString('ko-KR')}G)`)
            .addFields(getBreakEvenPoint(cost))
            .setFooter({text:"수익금/분배금은 1골드정도 오차가 있을 수 있습니다. 아몰루🙃"})
            
            await interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.log('error' + err);
            await interaction.editReply('fail');
        }
    }
}

function getBreakEvenPoint(cost){
    const exceptSusuryo = cost * 0.95
    const bePoint4 = exceptSusuryo * 3/4;
    const minePoint4 = bePoint4 / 1.1;
    const share4 = bePoint4/3;
    const bePoint8 = exceptSusuryo * 7/8;
    const minePoint8 = bePoint8 / 1.1;
    const share8 = bePoint8/7;
    
    return  [{name:"4인 레이드", value:`손익분기점: ${costStr(bePoint4)}G\n선점입찰가: ${costStr(minePoint4)}G\n수익금: ${costStr(exceptSusuryo-Math.floor(bePoint4))}G\n분배금: ${costStr(share4)}G`, inline:true},
            {name:"8인 레이드", value:`손익분기점: ${costStr(bePoint8)}G\n선점입찰가: ${costStr(minePoint8)}G\n수익금: ${costStr(exceptSusuryo-Math.floor(bePoint8))}G\n분배금: ${costStr(share8)}G`, inline:true}];
}

function costStr(cost){
    return Math.floor(cost).toLocaleString('ko-KR');
}