const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("떠상")
    .setDescription("떠돌이상인 위치 제공")
    .addSubcommand(subcommand =>
      subcommand.setName('아르테미스').setDescription('아르테미스의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '로그힐', value: 0 },
            { name: '안게모스산기슭', value: 1 },
            { name: '국경지대', value: 2 })))
    .addSubcommand(subcommand =>
      subcommand.setName('유디아').setDescription('유디아의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '살란드구릉지', value: 3 },
            { name: '오즈혼구릉지', value: 4 })))
    .addSubcommand(subcommand =>
      subcommand.setName('루테란서부').setDescription('루테란 서부의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '자고라스산', value: 5 },
            { name: '레이크바', value: 6 },
            { name: '메드리닉수도원', value: 7 },
            { name: '빌브린숲', value: 8 },
            { name: '격전의평야', value: 9 })))
    .addSubcommand(subcommand =>
      subcommand.setName('루테란동부').setDescription('루테란 동부의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '디오리카평원', value: 10 },
            { name: '해무리언덕', value: 11 },
            { name: '배꽃나무자생지', value: 12 },
            { name: '흑장미교회당', value: 13 },
            { name: '라이아단구', value: 14 },
            { name: '보레아영지', value: 15 },
            { name: '크로커니스해변', value: 16 })))
    .addSubcommand(subcommand =>
      subcommand.setName('토토이크').setDescription('토토이크의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '바다향기숲', value: 17 },
            { name: '달콤한숲', value: 18 },
            { name: '성큼바위숲', value: 19 },
            { name: '침묵하는거인의숲', value: 20 })))
    .addSubcommand(subcommand =>
      subcommand.setName('애니츠').setDescription('애니츠의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '델파이현', value: 21 },
            { name: '등나무언덕', value: 22 },
            { name: '소리의숲', value: 23 },
            { name: '거울계곡', value: 24 },
            { name: '황혼의연무', value: 25 })))
    .addSubcommand(subcommand =>
      subcommand.setName('아르데타인').setDescription('아르데타인의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '메마른통로', value: 26 },
            { name: '갈라진땅', value: 27 },
            { name: '네벨호른', value: 28 },
            { name: '바람결구릉지', value: 29 },
            { name: '토트리치', value: 30 },
            { name: '리제폭포', value: 31 })))
    .addSubcommand(subcommand =>
      subcommand.setName('베른북부').setDescription('베른 북부의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '크로나항구', value: 31 },
            { name: '파르나숲', value: 32 },
            { name: '페르나스고원', value: 33 },
            { name: '베르닐삼림', value: 34 },
            { name: '발란카르산맥', value: 35 })))
    .addSubcommand(subcommand =>
      subcommand.setName('슈샤이어').setDescription('슈샤이어의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '얼어붙은바다', value: 37 },
            { name: '칼날바람언덕', value: 38 },
            { name: '서리감옥고원', value: 39 },
            { name: '머무른시간의호수', value: 40 },
            { name: '얼음나비절벽', value: 41 })))
    .addSubcommand(subcommand =>
      subcommand.setName('로헨델').setDescription('로헨델의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '은빛물결호수', value: 42 },
            { name: '유리연꽃호수', value: 43 },
            { name: '바람향기언덕', value: 44 },
            { name: '파괴된제나일', value: 45 },
            { name: '엘조윈의그늘', value: 46 })))
    .addSubcommand(subcommand =>
      subcommand.setName('욘').setDescription('욘의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '시작의땅', value: 47 },
            { name: '미완의정원', value: 48 },
            { name: '검은모루작업장', value: 49 },
            { name: '무쇠망치작업장', value: 50 },
            { name: '기약의땅', value: 51 })))
    .addSubcommand(subcommand =>
      subcommand.setName('페이튼').setDescription('페이튼의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '칼라자마을', value: 52 })))
    .addSubcommand(subcommand =>
      subcommand.setName('파푸니카').setDescription('파푸니카의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '얕은바닷길', value: 53 },
            { name: '별모래해변', value: 54 },
            { name: '티카티카군락지', value: 55 },
            { name: '비밀의숲', value: 56 })))
    .addSubcommand(subcommand =>
      subcommand.setName('베른남부').setDescription('베른 남부의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '칸다리아영지', value: 57 },
            { name: '벨리온유적지', value: 58 })))
    .addSubcommand(subcommand =>
      subcommand.setName('로웬').setDescription('로웬의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '어금니의강', value: 59 },
            { name: '웅크린늑대의땅', value: 60 })))
    .addSubcommand(subcommand =>
      subcommand.setName('엘가시아').setDescription('엘가시아의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '헤스테라정원', value: 61 },
            { name: '필레니소스산 ', value: 62 })))
    .addSubcommand(subcommand =>
      subcommand.setName('플레체').setDescription('플레체의 떠돌이 상인 위치를 검색합니다.')
        .addIntegerOption(option => option.setName('위치')
          .setDescription('지역을 선택해주세요.')
          .setRequired(true)
          .addChoices({ name: '프리힐리아평원', value: 63 }))),
  async execute(interaction) {
    const userid = interaction.user.id;
    try {
      await interaction.deferReply();
      const index = interaction.options.getInteger("위치");
      // let result = await connection(interaction.options.getInteger("위치"))

      const exampleEmbed = new EmbedBuilder()
        .setColor('#A6FF4D')
        .setTitle('[ 떠돌이 상인 위치 정보 ]')
        // .addFields(
        //   { name: '위치', value: result.coordinate, inline: true },
        // )
        // .setImage(result.address);
        .addFields(
          { name: '위치', value: ddumap[index][0], inline: true },
        )
        .setImage(ddumap[index][1]);

      await interaction.editReply({ embeds: [exampleEmbed] })
    } catch (err) {
      errorHandling(userid, '91_trader 01 exectue', err)
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

const ddumap =
  [
    ['아르테미스 로그힐', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbdf2ss%2FbtrgCGZ78rO%2F4XgUQf0Hy848LiKxRrSEI0%2Fimg.png'],
    ['아르테미스 안게모스산기슭', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbPrSSr%2FbtrgJZjOnfT%2FHBcvrwFiccf54tt0kt9K40%2Fimg.png'],
    ['아르테미스 국경지대', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcSQQrw%2Fbtrb2bRdRP6%2Ff2dgZW979VxoVYL9WLc5wk%2Fimg.png'],
    ['유디아 살란드구릉지', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FESBPl%2Fbtrb82skjLn%2FvtozukwjmRy03iBnMISTm1%2Fimg.png'],
    ['유디아 오즈혼구릉지', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcDRqOJ%2Fbtrcb70XxGC%2F1Yg4GLnftmry4QY5seJAm0%2Fimg.png'],
    ['루테란서부 자고라스산', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FSTfvA%2FbtrcxIHBN64%2F7XPbD4jcYWkQKfPxUNfpOK%2Fimg.png'],
    ['루테란서부 레이크바', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FsPhTB%2FbtrcA2E2o4r%2FzBxK7bE4FHOmrNcr8Zs8y0%2Fimg.png'],
    ['루테란서부 메드리닉수도원', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FtgHlA%2FbtrcvyrIThc%2F0MrrKb9K2cUbB5mlVDqFx1%2Fimg.png'],
    ['루테란서부 빌브린숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbT7oT6%2FbtrcAbWxOUC%2FB5ZOJutSlMDemidQQWzlS1%2Fimg.png'],
    ['루테란서부 격전의평야', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbg2xTB%2FbtrcusSN1nU%2F0miKDCxH6NaFSZ8iuAvhRK%2Fimg.png'],
    ['루테란동부 디오리카평원 (모리스)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblFPFc%2Fbtrc7PeAHHg%2FkgQwHyMtob0Bv3OQrthjB0%2Fimg.png'],
    ['루테란동부 해무리언덕 (모리스)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbdSDQk%2Fbtrc2KZhQey%2F0uqsrEQINvuWJMyR1Wvo01%2Fimg.png'],
    ['루테란동부 배꽃나무자생지 (모리스)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8veo1%2Fbtrc8AH6QJN%2FKPkrlQ2jdvREkuSey3sQNK%2Fimg.png'],
    ['루테란동부 흑장미교회당 (버트)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDMh4c%2Fbtrc2KZhQE2%2Fbp8kKOAq5QdySiPWQp3cm1%2Fimg.png'],
    ['루테란동부 라이아단구 (버트)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxjUND%2FbtrhVZYgffx%2FWF8VaHlfHJBWm9f7c0he11%2Fimg.png'],
    ['루테란동부 보레아영지 (버트)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdUbUFn%2Fbtrc4DZ59Ol%2FTKLbzN0kVWWNi3L2nraShK%2Fimg.png'],
    ['루테란동부 크로커니스해변 (버트)', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcSuv9M%2FbtrinzLiM4M%2FK0vP9gR48jJRyAkQyKUIkk%2Fimg.png'],
    ['토토이크 바다향기숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FWHR7E%2FbtrdqKqnX3w%2Fq1eR2mbM8VuVVyjCEieQT1%2Fimg.png'],
    ['토토이크 달콤한숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxOLLb%2FbtrdprZqeKn%2FgsTSKZKulhlOqEnKPUw1b1%2Fimg.png'],
    ['토토이크 성큼바위숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F15yb2%2FbtrdtLa1Hb6%2F5GXzKWQNNhR74PsXaP0u01%2Fimg.png'],
    ['토토이크 침묵하는거인의숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F82HFz%2FbtrdmBhpfkX%2FLATHEHbSxYaDKjkOKRzxX0%2Fimg.png'],
    ['애니츠 델파이현', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbTsCHR%2Fbtreye53tXp%2FtzVvF58Dfx4cl6fggfSck0%2Fimg.png'],
    ['애니츠 등나무언덕', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbxdncd%2Fbtrewfxoteu%2FZbFthI7T6NmkDiUTERN4h0%2Fimg.png'],
    ['애니츠 소리의숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb59N4Q%2FbtreCsbopP4%2FQ7fR9KnToJukAYXPUrxr40%2Fimg.png'],
    ['애니츠 거울계곡', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRdGQl%2FbtrhBNc7bG3%2FLKrOP7fFkRMAnOmKY4j9DK%2Fimg.png'],
    ['애니츠 황혼의연무', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZQwwA%2FbtrhFiKLJzq%2FGlMOp8cdbE55rXEJLNzWT0%2Fimg.png'],
    ['아르데타인 메마른통로', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbc1f6J%2FbtreB9XsxjH%2FLUYBtkCEbp86jRN6NOMg4k%2Fimg.png'],
    ['아르데타인 갈라진땅', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbulLyE%2FbtreDTzz6SQ%2FeOkgg77988h43xZOv4d4G1%2Fimg.png'],
    ['아르데타인 네벨호른', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FxylPY%2FbtreEKI9PNv%2F7GuxDYJLq9L1AL2y5PQS91%2Fimg.png'],
    ['아르데타인 바람결구릉지', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbvSbcG%2FbtreAJLuVzI%2F9LxnMe9PiagBekn93UMSqk%2Fimg.png'],
    ['아르데타인 토트리치', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbgDson%2FbtrewxdXMqz%2FTlWkytNq2hxbai0DHo0gq1%2Fimg.png'],
    ['아르데타인 리제폭포', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FtCzlh%2FbtreyfjyCrR%2FMP8Q8CCuzHVSzmrtMB5w50%2Fimg.png'],
    ['베른북부 크로나항구', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcG6vA3%2Fbtrf1iqSoyP%2F4K2oQJ9Oa9aE5IP7YgOQ71%2Fimg.png'],
    ['베른북부 파르나숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGroS6%2FbtrfU4t5J3f%2FILnGcgktNGg4xw4jbRCd11%2Fimg.png'],
    ['베른북부 페르나스고원', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FW8njP%2FbtrfZqCHAI3%2FbPbbPzsnmEhHxUvmQ2RBg1%2Fimg.png'],
    ['베른북부 베르닐삼림', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FM2q34%2FbtrfRpFzjC4%2FKZJXY88VnLYYEjXQ1DkBD1%2Fimg.png'],
    ['베른북부 발란카르산맥', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4U0J7%2FbtrfWKOY8WW%2F7wSKYFyXhZgs6m55pyQtK1%2Fimg.png'],
    ['슈샤이어 얼어붙은바다', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FNmHGn%2Fbtrexc1t1Z1%2FZYf3Dt5iy6qIwMdMQXi51k%2Fimg.png'],
    ['슈샤이어 칼날바람언덕', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2F2Iz4v%2FbtreCtaiPow%2Fst8GhS1k7gg6znV46EkBQ1%2Fimg.png'],
    ['슈샤이어 서리감옥고원', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbwasPy%2FbtreEKbky0M%2FftQtl2N5TmMpLB7kdiktZ1%2Fimg.png'],
    ['슈샤이어 머무른시간의호수', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbh83m3%2FbtrexlEo5Nf%2FgZEKqx4dZqgS0qiaX7pkkk%2Fimg.png'],
    ['슈샤이어 얼음나비절벽', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fej58v7%2FbtreAIMzuQg%2FSOoWB1K3vAmA1M5dVBv9Hk%2Fimg.png'],
    ['로헨델 은빛물결호수', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fcg4h3u%2FbtreI8ZiVyf%2FWL3ikCS3KiDAgh0mDP5lIk%2Fimg.png'],
    ['로헨델 유리연꽃호수', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2F1rS4a%2FbtreRSzPLsC%2F8wsAJguIKxsVoKeErKkGRK%2Fimg.png'],
    ['로헨델 바람향기언덕', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbLW64B%2FbtrePWiccSF%2FjTD7aMp1Xvfktx7THQzkfk%2Fimg.png'],
    ['로헨델 파괴된제나일', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fdzo5ra%2FbtreOtN5SxC%2FhK4Kh0IhPmZESKKpI6x3Uk%2Fimg.png'],
    ['로헨델 엘조윈의그늘', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FScFfX%2FbtreMEh2Zd9%2Fp7Y4y5oARqwaWr0Ch1IFg0%2Fimg.png'],
    ['욘 시작의땅', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fba9AAu%2FbtrfiblU2DQ%2F7O5cBNJi2a9NvkfnILNLkK%2Fimg.png'],
    ['욘 미완의정원', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbe90xE%2Fbtrfhb731aS%2FQCzfyWPjdMokJiznOiJGQk%2Fimg.png'],
    ['욘 검은모루작업장', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FzxM1J%2Fbtrfi3udrom%2F4OQ3tmvDwJKMhCPMuKKNhK%2Fimg.png'],
    ['욘 무쇠망치작업장', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FstMlB%2FbtrfgFawmif%2FdyHbPJDTCGOSyXBpiX3Sqk%2Fimg.png'],
    ['욘 기약의땅', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fdv8n1Q%2FbtrfixWCTuX%2FqITdf3skPCsBV5nOVq1OH0%2Fimg.png'],
    ['페이튼 칼라자마을', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fo8FoZ%2FbtrfWMTLIx0%2FPgYD8XksHkTc3fINFrSn91%2Fimg.png'],
    ['파푸니카 얕은바닷길', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblcPY5%2FbtreKxv3lov%2FVrwGRcQyWDdswmJGGckwD0%2Fimg.png'],
    ['파푸니카 별모래해변', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcEkyEX%2FbtreFTgxq17%2FmNBotCyCfjA1LbQLhRnkL1%2Fimg.png'],
    ['파푸니카 티카티카군락지', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlAcNM%2FbtreHCZRGJk%2Fer4Up41De9ayaWgGLUO7K1%2Fimg.png'],
    ['파푸니카 비밀의숲', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FT1tXH%2FbtreHCFyVZa%2FXMUuzD7xblZ5sRSgLNooKK%2Fimg.png'],
    ['베른남부 칸다리아영지', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdmAkMB%2FbtrfZqipEYZ%2FpTVs4tNH1v2ex7uoEM3Rv0%2Fimg.png'],
    ['베른남부 벨리온유적지', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fcne3Cd%2FbtrfTGggEIT%2FIrNOCZ1pUgkyl4w5u82XFk%2Fimg.png'],
    ['로웬 어금니의강', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0VcQx%2FbtrpgyrD8Hv%2FKIgPg5nJjHNKOJefKfMRz0%2Fimg.png'],
    ['로웬 웅크린늑대의땅', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdr2NzW%2Fbtrpjwm31iC%2FaC1d5vEy4FjWkgcdsajnZK%2Fimg.png'],
    ['엘가시아 헤스테라정원', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FekTI1m%2FbtrAAcyP7t0%2FvLoTGOHZG5DQxgNFN4UfrK%2Fimg.png'],
    ['엘가시아 필레니소스산 ', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FboTj5Q%2FbtrABZ0dggu%2FjEOkPe7RdfsrAVFBzXf0L1%2Fimg.png'],
    ['플레체 프리힐리아 평원', 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkFVrt%2FbtrPy9AhFKb%2F7OGUihPzKVCYlQH5lsvII0%2Fimg.png']
  ];