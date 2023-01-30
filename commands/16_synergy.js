const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("시너지")
    .setDescription("시너지 관련 정보를 제공합니다.")
    .addSubcommand(subcommand =>
      subcommand.setName('표').setDescription('시너지 표'))
    .addSubcommand(subcommand =>
      subcommand.setName('종류').setDescription('선택한 시너지를 가진 직업을 검색합니다.')
        .addIntegerOption(option => option.setName('선택')
          .setDescription('시너지를 선택해주세요.')
          .setRequired(true)
          .addChoices(
            { name: '치적', value: 0 },
            { name: '공증/공버프', value: 1 },
            { name: '받피증', value: 2 },
            { name: '방깎', value: 3 },
            { name: '백헤드', value: 4 },
            { name: '무력', value: 5 },
            { name: '공이속', value: 6 },
            { name: '피증/낙인', value: 7 },
            { name: '면역', value: 8 },
            { name: '마나회복증가', value: 9 },
            { name: '정화', value: 10 },
          )))
    .addSubcommand(subcommand =>
      subcommand.setName('직업').setDescription('해당 직업이 가진 시너지를 알려드립니다.')
        .addIntegerOption(option => option.setName('선택')
          .setDescription('직업을 선택해주세요.')
          .setRequired(true)
          .addChoices(
            { name: '건슬링어', value: 11 },
            { name: '기공사', value: 12 },
            { name: '기상술사', value: 13 },
            { name: '데모닉', value: 14 },
            { name: '데빌헌터', value: 15 },
            { name: '도화가', value: 16 },
            { name: '디스트로이어', value: 17 },
            { name: '리퍼', value: 18 },
            { name: '바드', value: 19 },
            { name: '배틀마스터', value: 20 },
            { name: '버서커', value: 21 },
            { name: '블래스터', value: 22 },
            { name: '블레이드', value: 23 },
            { name: '서머너', value: 24 },
            { name: '소서리스', value: 25 },
            { name: '스카우터', value: 26 },
            { name: '스트라이커', value: 27 },
            { name: '아르카나', value: 28 },
            { name: '워로드', value: 29 },
            { name: '인파이터', value: 30 },
            { name: '창술사', value: 31 },
            { name: '호크아이', value: 32 },
            { name: '홀리나이트', value: 33 },
          ))),
  async execute(interaction) {
    const userid = interaction.user.id;
    try {
      const selection = interaction.options.getInteger("선택")
      let exampleEmbed = new EmbedBuilder()
        .setColor('#A6FF4D')
        .setTitle('[ 시너지 정보 ]')
      if (selection == null) {
        exampleEmbed.setImage("https://media.discordapp.net/attachments/948917805653315614/990570456287428669/unknown.png");
      } else if (selection < 11) {
        exampleEmbed.setFooter({ text: '⭐ 상시 시너지 / ⚡ 각성기 / 🧼 아이덴티티 스킬' })
        exampleEmbed.addFields({ name: `${synInfo[selection][0]}`, value: synInfo[selection][1] })
      } else {
        exampleEmbed.setFooter({ text: '⚡ 각성기 / 🧼 아이덴티티 스킬' })
        exampleEmbed.addFields({ name: `${jobInfo[selection-11][0]} 보유 시너지 스킬`, value: jobInfo[selection-11][1] })
      }

      await interaction.reply({ embeds: [exampleEmbed] })
    } catch (err) {
      errorHandling(userid, '32_synergy 01 execute', err)
    }
  }
}

const synInfo = [
  ['치명타 적중률/치적', `18% [배틀마스터, 창술사, 스트라이커]\n12% [도화가⚡]\n10% [건슬링어⭐, 데빌헌터⭐, 아르카나⭐, 기상술사⭐, 워로드⚡]`],
  ['공격력 증가/공증', `6% [스카우터, 기공사, 바드, 홀리나이트, 도화가]\n서폿은 15%로 적용됨`],
  ['받는 피해 증가/받피증', `6% [버서커⭐, 호크아이⭐, 인파이터⭐, 소서리스⭐, 데모닉⭐]`],
  ['방어력 감소/방깎', `12% [블래스터⭐, 디스트로이어⭐, 워로드⭐, 서머너⭐, 리퍼⭐]`],
  ['백헤드 어택 피해 증가/백헤드', `12% [워로드, 블레이드⭐]`],
  ['무력 시너지/무력', `20% [블래스터, 인파이터, 디스트로이어]`],
  ['공이속 증가/공이속', `공이속 [배틀마스터(공5.5% 이11%), 블레이드(공25% 이19.8%), 도화가(공8% 이30%)]\n공속 [홀리나이트(19.8%), 스트라이커(8%), 바드(3.5%+강인한연주8%) 워로드(25%)]\n이속 [기상술사🧼(12~12.5%), 호크아이🧼(4%, 두동8%)]`],
  ['주는 피해 증가/피증/낙인', `10% [홀리나이트, 도화가, 바드]\n5~15% [바드🧼]`],
  ['디버프 면역/면역', `상태이상면역 [바드]\n피격면역 [도화가]`],
  ['마나 회복 증가', `40% [서머너] 12% [바드]\n50% [홀리나이트] 21% [도화가]`],
  ['정화', `[기공사, 서머너, 홀리나이트, 워로드, 도화가]`],];
const jobInfo = [
  ['건슬링어', '[치적 10%] 나선의추적자, 민첩한 사격, 이퀼리브리엄'],
  ['기공사', '[공증 6%] 내공 방출, 회선격추, 파쇄장\n[정화] 내공 방출'],
  ['기상술사', '[치적 10%] 펼치기, 내려찍기, 돌개바람\n[이속 12%] (질풍노도)여우비🧼\n[이속 12.5%] 센바람'],
  ['데모닉', '[받피증 6%] 하울링, 데모닉 슬래쉬, 루인 러쉬, 데스 클로'],
  ['데빌헌터', '[치적 10%] 나선의추적자, AT02 류탄, 이퀼리브리엄'],
  ['도화가', '[치적 12%] 진경산수⚡\n[공버프 6%] 해우물\n[공이속 8%, 30%] 난치기\n[피증/낙인 10%] 난치기, 호접몽, 먹물세례, 저무는 달🧼\n[피격면역] 환영의 문\n[마나회복증가 21%] 해우물\n[정화] 환영의 문'],
  ['디스트로이어', '[방깎 12%] 파워 스트라이크, 드레드노트, 점핑 스매쉬\n[무력 20%] 러닝 크래쉬'],
  ['리퍼', '[방깎 12%] 쉐도우 닷, 나이트 메어'],
  ['바드', '[공버프 6%] 천상의 연주\n[공속 3.5%] 천상의 연주(2트포 강인한연주 +8%)\n[피증/낙인 10%] 스티그마, 빛의 광시곡, 음표 뭉치, 천상의 연주, 사운드 쇼크, 음파 진동, 율동의 하프\n[피증/낙인 5~15%] 용맹의 연주🧼\n[상태이상면역] 수호의 연주\n[마나회복증가 12%] 천상의 연주'],
  ['배틀마스터 ', '[치적 18%] 용맹의 포효\n[공이속 5.5%, 11%] 바람의 속삭임'],
  ['버서커', '[받피증 6%] 레드 더스트, 마운틴 크래쉬'],
  ['블래스터', '[방깎 12%] 포탑소환, 강화탄, 포격: 곡사포\n[무력 20%] 네이팜탄'],
  ['블레이드', '[백헤드 12%] 스핀 커터\n[공이속 25%, 19.8%] 마엘스톰'],
  ['서머너', '[방깎 12%] 순간 폭발, 끈적이는 이끼늪, 슈르디\n[마나회복증가 40%] 슈르디\n[정화] 레이네의 가호'],
  ['소서리스', '[받피증 6%] 블레이즈, 에너지 방출, 라이트닝 볼텍스'],
  ['스카우터', '[공증 6%] 펄스 파이어, 볼릿 해일, [상시] (변신상태)'],
  ['스트라이커', '[공속 8%] 번개의 속삭임\n[치적 18%] 번개의 속삭임'],
  ['아르카나', '[치적 10%] 스크래치 딜러, 리턴'],
  ['워로드', '[치적 10%] 심판의창⚡\n[방깎 12%] 방패 격동, 배쉬, 방패 밀치기\n[백헤드 12%] 증오의 함성\n[25%] 넬라시아의 기운\n[정화] 넬라시아의 기운'],
  ['인파이터', '[받피증 6%] 파쇄의 강타, 맹호격\n[무력 20%] 회심의 일격'],
  ['창술사', '[치적 18%] 청룡진'],
  ['호크아이', '[받피증 6%] 래피드 샷, 아토믹 애로우\n[이속 4%](두동8%]) MK2 매 소환🧼'],
  ['홀리나이트', '[공버프 6%] 신의 분노\n[공속 19.8%] 천상의 축복\n[피증/낙인 10%] 신의 율법, 빛의 충격, 정의의 검, 신성한 폭발, 신성한 오라🧼\n[마나회복증가 50%] 천상의 축복\n[정화] 신성한 보호'],
];

function errorHandling(userid, exp, error) {
  const today = new Date(+new Date() + 3240 * 10000)
  const date = today.toISOString().split("T")[0];
  const ts = today.toISOString().replace("T", " ").replace(/\..*/, '');

  const filePath = `./log/log_${date}.csv`;
  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, 'timestamp,userid,exp,error') : null;
  fs.appendFileSync(filePath, `\r\n${ts},${userid},${exp},${error.stack.replace(/\n|\r/g, '\t')}`);
}