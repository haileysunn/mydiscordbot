const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder().setName("명령어").setDescription("명령어 리스트를 보여드립니다."),
    async execute(interaction) {
        const userid = interaction.user.id;
        
        try {
            const exampleEmbed = new EmbedBuilder()
            .setColor('#A6FF4D')
            .setTitle('[ 명령어 리스트 ]')
            .addFields(
                { name: '❤️', value: '로학원생 봇 명령어', inline: false })
            .addFields(
                { name: '/도움말', value: '로학원생 봇 명령어의 자세한 사용방법 확인 가능', inline: true },
                { name: '/거래소', value: '거래소 내 판매가 확인 /거래소 경이로운 -> 경명돌 판매가 확인 가능', inline: true },
                { name: '/모험섬', value: '오늘의 모험섬 스케줄 확인 가능', inline: true },
                { name: '/사사게', value: '사사게 정보 확인 가능', inline: true },
                { name: '/시세', value: '크리스탈 시세 확인 가능', inline: true },
                { name: '/정보', value: '캐릭터 정보 확인 가능', inline: true })
            .addFields(
                { name: '🧡', value: '모코콤퍼니 봇 명령어', inline: false })
            .addFields(
                { name: '/신고', value: '모코콤퍼니 대나무숲', inline: true },
                { name: '/컨닝', value: '레이드 컨닝페이퍼를 띄워줍니다.', inline: true },
                { name: '/떠상', value: '떠상 위치 검색 기능', inline: true },
                { name: '/가자', value: '정기선 최저가 루트를 찾아줍니다.', inline: true },
                { name: '/쿠폰', value: '현재 등록 가능한 쿠폰 정보 제공', inline: true },
                { name: '/시너지', value: '시너지 정보를 알려줍니다.', inline: true },
                { name: '/회랑', value: '회랑 보상 정보를 제공합니다.', inline: true },
                { name: '/큐브', value: '큐브 보상 정보를 제공합니다.', inline: true },
                { name: '-', value: '-', inline: true })
            .addFields(
                { name: '💛', value: '기타 다른 명령어', inline: false })
            .addFields(
                { name: '/보상', value: '[너튜브 봇] 던전 및 레이드 보상 정보', inline: true },
                { name: '/경매', value: '[너트뷰 봇] 전리품 경매 시 입찰을 돕기 위해 손익분기점을 알려드립니다.', inline: true },
                { name: '/자원', value: '[노맨즈스카이] 자원 습득 정보 검색', inline: true },)
            .setFooter({ text: "/명령어 후 탭을 누르면 안정적으로 명령어를 실행합니다." });
            await interaction.reply({ embeds: [exampleEmbed] })	
        } catch (err) {
            errorHandling(userid, '00_info 01 execute', err)
        }
    }
}

function errorHandling(userid, exp, error) {
    const today = new Date(+new Date() + 3240 * 10000)
    const date = today.toISOString().split("T")[0];
    const ts = today.toISOString().replace("T", " ").replace(/\..*/, '');

    const filePath = `./log/log_${date}.csv`;
    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, 'timestamp,userid,exp,error') : null;
    fs.appendFileSync(filePath, `\r\n${ts},${userid},${exp},${error.stack.replace(/\n|\r/g, '\t')}`);
}
