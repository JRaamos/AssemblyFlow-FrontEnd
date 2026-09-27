const transitionBlock = (id, time, title, content, tone = "default") => ({
  id,
  time,
  title,
  content,
  tone,
});

const programRow = (id, title, durationMin, speaker = "", congregation = "", type = "part") => ({
  id,
  type,
  title,
  durationMin,
  speaker,
  congregation,
  confirmation: false,
  notes: "",
});

const timedProgramRow = (
  id,
  time,
  title,
  durationMin,
  speaker = "",
  congregation = "",
  type = "part",
  hideTime = false
) => ({
  ...programRow(id, title, durationMin, speaker, congregation, type),
  scheduledTime: time,
  hideTime,
});

const discourseReminders = `
  <section class="document-section keep-together">
    <h2>LEMBRETES</h2>
    <p><strong>1) APRESENTAÇÃO:</strong> No dia da designação, comparecer na presidência uma hora antes do início do programa. Também apresente-se 30 min antes do seu discurso ao presidente de sessão, junto com os que participarão em sua parte.</p>
  </section>
  <section class="document-section">
    <p><strong>2) PREPARAÇÃO:</strong> Reserve tempo suficiente para preparar-se bem; não deixe para a última hora. A preparação é especialmente importante quando há entrevistas ou demonstrações. As entrevistas devem ser naturais, realistas e práticas, e devem ser apresentadas de modo conversante. Sempre mantenha a dignidade cristã. Algumas entrevistas parecem monótonas, artificiais ou formais porque os entrevistados se esforçam para fazer uma apresentação decorada, ou leem suas experiências. O entrevistador deve ter em mente o que deseja que os entrevistados relatem e fazer-lhes perguntas apropriadas para que seus comentários sejam naturais e espontâneos. Só se consegue isso com boa preparação e ensaios.</p>
    <p>Vivemos em “tempos críticos”. (2 Tim. 3:1) Muitos de nossos irmãos enfrentam severas pressões e testes de fé. Eles vão aos congressos e assembleias para serem espiritualmente revigorados e fortalecidos. A boa preparação e a apresentação eficaz de sua parte podem contribuir muito para encorajá-los.</p>
    <p>Siga de perto a matéria e o desenrolar das ideias, visando salientar o tema e os pontos principais. Não é necessário usar todos os pormenores da matéria, apenas o que for pertinente à sua parte. Dê tempo suficiente para que a assistência encontre os textos e acompanhe a explicação e a aplicação. Pode-se também desenvolver e enriquecer o esboço com argumentos e ilustrações, mas sem interferir nos pontos principais e dentro do tempo concedido. Não introduza matéria secular ou ideias pessoais. Evite ilustrações questionáveis, dramáticas ou ofensivas. Explique, raciocine sobre os textos e mostre como se aplicam.</p>
  </section>
  <section class="document-section keep-together">
    <p><strong>3) MODO DE FALAR:</strong> Fale de modo espontâneo, claro, entusiástico, com convicção e bom volume. Não tente memorizar as palavras nem use notas muito detalhadas. Concentre-se nas ideias, não em palavras. Não transforme seu esboço num manuscrito.</p>
    <p><strong>4) TEMPO:</strong> É melhor terminar um ou dois minutos antes do que ultrapassar o tempo.</p>
    <p><strong>5) ENTREVISTAS, MONÓLOGOS E DEMONSTRAÇÕES:</strong> Se sua parte incluí-los, observe as orientações abaixo.</p>
  </section>
  <section class="document-section">
    <p><strong>a) ESCOLHA DOS PARTICIPANTES E VESTIMENTA:</strong> Devem ser usados apenas publicadores batizados que sejam exemplares em todos os sentidos. Verifique primeiro com a Comissão de Serviço da congregação se os possíveis participantes são exemplares. Escolha apenas aqueles cuja presença no palco contribuirá de forma positiva para o programa. Relembre aos participantes os princípios da modéstia e do bom juízo no vestuário e na aparência.</p>
    <p><strong>b) ENSAIO:</strong> Realize os ensaios com a devida antecedência. Não deixe para a última hora. Entregue o quanto antes as informações que os participantes necessitam.</p>
    <p><strong>c) ENTREVISTAS:</strong> Evite perguntas que exijam respostas longas. Faça mais perguntas para obter respostas curtas. Em geral, cada resposta não deve demorar mais do que 30 a 60 segundos. O entrevistado deve falar olhando para o orador. As expressões devem ser espontâneas e cativantes.</p>
    <p>Torne sua apresentação assunto de oração a Jeová e estamos certos de que Ele abençoará seus esforços.</p>
  </section>
`;

const discourseTemplate = (eventPath) => `
  <header class="document-letterhead">
    <p><em>{{traveler.name}} - {{traveler.phone}} - {{traveler.email}}</em></p>
    <p class="document-date">{{documentMeta.letterDate}}</p>
  </header>
  <section class="document-recipient keep-together">
    <p><strong>{{record.speaker}}</strong><br />C. <strong><em>{{record.congregation}}</em></strong></p>
    <p>Prezado irmão:</p>
    <p>Pela presente, temos o prazer de designá-lo para participar no programa espiritual de nossa assembleia de circuito, conforme detalhes informados abaixo e esboço, em anexo. Pedimos que confirme o quanto antes sua aceitação por e-mail ou pela caixa de entrada do site jw.org.</p>
  </section>
  <dl class="document-facts keep-together">
    <div><dt>TEMA DO EVENTO:</dt><dd>{{event.${eventPath}.theme}}</dd></div>
    <div><dt>DATA DA REALIZAÇÃO:</dt><dd>{{event.${eventPath}.date}}</dd></div>
    <div><dt>LOCAL DO EVENTO:</dt><dd>{{event.${eventPath}.venue}}</dd></div>
    <div><dt>DESIGNAÇÃO:</dt><dd>DISCURSO</dd></div>
    <div><dt>TEMPO:</dt><dd>{{record.durationMin}} min</dd></div>
    <div><dt>INÍCIO:</dt><dd>{{record.time}}</dd></div>
    <div><dt>TEMA DO DISCURSO:</dt><dd><strong><em>{{record.title}}</em></strong></dd></div>
  </dl>
  <p class="document-outline-note"><strong>Veja esboço, em anexo.</strong></p>
  ${discourseReminders}
  <footer class="document-signature keep-together">
    <p>Seu irmão,</p>
    <p><strong><em>{{traveler.name}} / {{traveler.circuitNumber}}</em></strong></p>
  </footer>
`;

const prayerOpening = `
  <p><strong>INSTRUÇÕES PARA A ORAÇÃO INICIAL:</strong> Deve ser específica e breve. O irmão deve se concentrar nas bênçãos para o programa espiritual, quanto à atenção da assistência e à transmissão do ensino pelos participantes. Evite excesso de palavras e generalidades. Em virtude do tempo limitado, sua oração não deveria ultrapassar 2 minutos.</p>
`;

const presidencyInstructions = `
  <p><strong>OBSERVAÇÕES PARA A PRESIDÊNCIA:</strong> Os dizeres do presidente lhe serão entregues oportunamente. No dia da sua designação, com pelo menos 30 minutos de antecedência, verifique se tudo está em ordem para o início do programa: palco arrumado, luzes acesas, equipe do som presente, cenários ordeiros, cadeiras posicionadas, marcas no piso, microfone adicional na tribuna e relógio com horário correto.</p>
  <h2>INSTRUÇÕES ADICIONAIS</h2>
  <ol>
    <li>Leia exatamente o que está escrito na folha que receberá. Não faça acréscimos ou omissões por conta própria. Ensaie bem o esboço fornecido para lê-lo com naturalidade e entusiasmo.</li>
    <li>Acerte seu relógio com o relógio do palco e com a presidência.</li>
    <li>Após anunciar o programa musical, poderá ficar sentado no palco, pois sua presença encoraja os irmãos a se sentarem.</li>
    <li>Certifique-se de que o orador seguinte está presente e ciente de sua parte pelo menos 30 minutos antes do início.</li>
    <li>Todos os dizeres e anúncios devem ser feitos com a devida entonação, pausa e clareza.</li>
    <li>Nenhum anúncio deve ser dado fora da sessão de anúncios sem autorização do presidente do evento.</li>
    <li>Quando anunciar o número do cântico, repita duas vezes o mesmo.</li>
    <li>Mantenha contato com o encarregado do palco e confirme luzes, mobília e necessidades de demonstrações e entrevistas.</li>
    <li>Mantenha contato com o encarregado do som e confirme microfones, equipamentos e horários.</li>
    <li>Certifique-se de que ninguém não autorizado circule na frente do palco ou permaneça nas imediações durante as sessões.</li>
    <li>Confirme com os oradores os horários, a pronúncia dos nomes e temas, as transições e o uso correto do microfone.</li>
  </ol>
`;

const prayerTemplate = (eventPath, content) => `
  <header class="document-letterhead">
    <p><strong><em>{{traveler.name}} - {{traveler.phone}} - {{traveler.email}}</em></strong></p>
    <p class="document-date">{{documentMeta.letterDate}}</p>
  </header>
  <section class="document-recipient keep-together">
    <p><strong><em>{{record.speaker}}</em></strong><br />C. <strong><em>{{record.congregation}}</em></strong></p>
    <p>Prezado irmão:</p>
    <p>Pela presente, temos o prazer de designá-lo para participar no programa espiritual de nossa assembleia de circuito, conforme detalhes informados abaixo. Pedimos que confirme o quanto antes sua aceitação por e-mail ou pela caixa de entrada do site jw.org.</p>
  </section>
  <dl class="document-facts keep-together">
    <div><dt>TEMA:</dt><dd>{{event.${eventPath}.theme}}</dd></div>
    <div><dt>DATA DA REALIZAÇÃO:</dt><dd>{{event.${eventPath}.date}}</dd></div>
    <div><dt>LOCAL DO EVENTO:</dt><dd>{{event.${eventPath}.venue}}</dd></div>
    <div><dt>DESIGNAÇÃO:</dt><dd><strong>{{record.title}}</strong></dd></div>
    <div><dt>SESSÃO:</dt><dd><strong>{{record.session}}</strong></dd></div>
  </dl>
  <section class="document-section">${content}</section>
  <p>Torne sua apresentação assunto de oração a Jeová e estamos certos de que Ele abençoará seus esforços.</p>
  <footer class="document-signature keep-together"><p>Seu irmão,</p><p><strong><em>{{traveler.name}} / {{traveler.circuitNumber}}</em></strong></p></footer>
`;

const tTCo = [
  transitionBlock("t-t-1", "12:58", "Prelúdio musical", "Boa tarde a todos. Relembramos que dentro de instantes ouviremos o belo prelúdio musical que introduzirá o programa espiritual desta tarde. Pedimos a gentileza de ocuparem agora seus assentos no auditório."),
  transitionBlock("t-t-2", "12:58", "Orientação ao presidente", "Pause 10 segundos e repita todo o anúncio, exceto a expressão inicial “boa tarde a todos”. Combine este horário com o sistema sonoro, de modo que a música comece sem falta às 13h00. Após isso, queira sentar-se no palco durante todo o prelúdio musical que finalizará às 13h10, pois isto vai encorajar os irmãos a tomarem seus lugares. Assim que a música terminar, dirija-se à tribuna e diga o texto abaixo.", "instruction"),
  transitionBlock("t-t-3", "13:28", "Abertura da tarde", "Chegou a hora para iniciarmos o programa conclusivo de nossa Assembleia de Circuito, cujo tema é: ________. Renovamos nossas calorosas boas-vindas e estimulamos todos os que são fisicamente aptos a se levantarem respeitosamente. Vamos louvar o nosso majestoso Deus Jeová com o cântico nº 72, que tem como tema ________, baseado no texto ________. Após o cântico teremos uma oração. Ouçamos a introdução melódica para o cântico nº 72."),
  transitionBlock("t-t-4", "13:33", "Discurso público", "O presidente da sessão fará a oração para o discurso público e depois dirá o seguinte para apresentar o orador: Podem sentar-se. Ouviremos agora o discurso público programado para esta tarde. O discurso vai enfatizar a importância de confiarmos nos padrões de Jeová de conduta e não nos nossos próprios padrões. Mostrará também as vantagens de se identificar e aplicar os princípios bíblicos em cada aspecto de nossa vida. Por isso, pedimos sua indivisa atenção para este tema: “Diferença entre o certo e o errado?”. Será proferido por nosso superintendente de circuito, irmão Ronivaldo S. Ramos."),
  transitionBlock("t-t-5", "14:03", "Estudo de A Sentinela", "Certamente somos muito gratos por estas informações tão oportunas, apresentadas pelo orador. Se algum dos presentes quiser fazer uma consideração da Bíblia, sem nenhum custo e num local e horário que lhe forem convenientes, poderá dar seu nome e endereço a um dos indicadores. Teremos prazer em providenciar que uma Testemunha de Jeová o ajude a aumentar seu entendimento das promessas bíblicas. Na sequência de nosso programa, teremos agora o estudo da revista A Sentinela, que é um dos principais veículos de nutrição espiritual do povo de Jeová. Apreciamos muito que o Escravo Fiel o tenha incluído no programa espiritual de nossa assembleia. Vamos acompanhar com muito prazer e, detidamente, o resumo desta importante matéria que foi preparado pelo irmão Nemias, que serve na congregação São Domingos."),
  transitionBlock("t-t-6", "14:33", "Cântico 56 e anúncios", "Pedimos agora a gentileza de se levantarem, se for possível, para juntos louvarmos a Jeová com o cântico nº 56. Seu tema é ________ e está baseado no texto ________. Depois do cântico, poderão permanecer em pé para uma breve sessão de anúncios. Ouçamos a música introdutória do cântico 56. É com prazer que informamos o número dos que simbolizaram sua dedicação pelo batismo em água na manhã de hoje: ________. Lembramos que haverá, como de costume, uma reunião do superintendente da assembleia com todos os anciãos do circuito. Será realizada hoje às ________, em ________. Sentimo-nos muito felizes de poder participar no que Romanos 1:12 descreve como “intercâmbio de encorajamento” e de ser espiritualmente revigorados pelas instruções oportunas recebidas nestas ocasiões. Todos nós somos gratos pelo uso deste local e estamos certos de que os irmãos reconhecem que há diversas despesas na realização de uma assembleia. Assim, seus donativos são necessários para cobrir os custos envolvidos neste evento e para apoiar a obra mundial. Além disso, fazer donativos é uma das maneiras de demonstrarmos nosso apreço pela bondade de Jeová. Para isso, há neste local caixas de donativos claramente identificadas para os que desejarem ajudar. Agradecemos sua amorosa colaboração. Saibam que seus esforços abnegados são muito apreciados. Teremos agora um último anúncio que será feito por nosso superintendente de circuito."),
  transitionBlock("t-t-7", "14:43", "Segundo simpósio", "Podem sentar-se. Teremos agora o segundo simpósio de nossa assembleia. O tema central dele é: ________. O simpósio está dividido em quatro partes e focalizará aspectos de nosso comportamento que podem revelar o quanto nos empenhamos ou não pela justiça de Jeová. A primeira parte está aos cuidados do irmão Flávio Ferreira, da congregação Central Riachão. Ele nos falará sob o tema adjacente: “Na família”. Vamos apreciar atentamente."),
  transitionBlock("t-t-8", "15:58", "Transição conclusiva", "Agradecemos a todos que participaram neste simpósio tão prático e proveitoso. O discurso a seguir destacará o quanto Jeová ama aqueles que se empenham por Sua justiça. Também nos dará a oportunidade de refletirmos até que ponto estamos imitando a Jeová em mostrar o mesmo tipo de amor. Acompanhemos com toda a atenção o irmão ________, da congregação ________, ao passo que ele desenvolve o tema: “________”."),
  transitionBlock("t-t-9", "15:59", "Discurso final", "Chegamos agora à parte conclusiva de nossa assembleia, os momentos finais para refletirmos sobre nossa posição perante Jeová, o Deus de justiça. O discurso final mostrará o que precisamos fazer para louvar a Jeová para sempre como pessoas justas. Teremos também a recapitulação final do inteiro programa de nossa assembleia. Assim, de forma bem apropriada, o tema final será: “________”. Para esta última consideração convidamos novamente o irmão ________, superintendente de nosso circuito."),
  transitionBlock("t-t-10", "16:00", "Encerramento", "Agradecemos ao nosso superintendente de circuito por esta excelente matéria. Na verdade, nos sentimos plenamente revigorados e gratos por todo o banquete espiritual servido nesta assembleia, além do excelente companheirismo cristão que usufruímos ao longo deste dia. Agradecemos aos ________ presentes e a todos os voluntários que trabalharam arduamente e ainda vão trabalhar em prol deste evento teocrático. Principalmente, somos muito gratos a Jeová e ao seu Escravo Fiel e Discreto por este rico e nutritivo alimento espiritual. Só nos resta, portanto, agradecermos a Jeová com sinceros louvores e oração. Por isso, convidamos todos os que puderem a se pôr de pé para entoarmos com muito apreço o cântico nº 29, cujo tema é ________, baseado no texto ________. Após o cântico, o irmão Ronivaldo S. Ramos retornará para a oração de encerramento. Ouçamos a introdução musical do cântico 29."),
];

const tTBr = [
  transitionBlock("t-t-br-1", "13:18", "Prelúdio musical", "Boa tarde a todos. Relembramos que dentro de instantes ouviremos o belo prelúdio musical que introduzirá o programa espiritual desta tarde. Pedimos a gentileza de ocuparem agora seus assentos no auditório."),
  transitionBlock("t-t-br-2", "13:18", "Orientação ao presidente", "Pause 10 segundos e repita todo o anúncio, exceto a expressão inicial “boa tarde a todos”. Combine este horário com o sistema sonoro, de modo que a música comece sem falta às 13h00. Após isso, queira sentar-se no palco durante todo o prelúdio musical que finalizará às 13h10, pois isto vai encorajar os irmãos a tomarem seus lugares. Assim que a música terminar, dirija-se à tribuna e diga o texto abaixo.", "instruction"),
  transitionBlock("t-t-br-3", "13:30", "Abertura da tarde", "Chegou a hora para iniciarmos o programa conclusivo de nossa Assembleia de Circuito, cujo tema é: ________. Renovamos nossas calorosas boas-vindas e estimulamos todos os que são fisicamente aptos a se levantarem respeitosamente. Vamos louvar o nosso majestoso Deus Jeová com o cântico nº 126, que tem como tema ________, baseado no texto ________. Ouçamos a introdução melódica para o cântico nº 126."),
  transitionBlock("t-t-br-4", "13:35", "Experiências teocráticas", "Podem sentar-se. O programa da tarde terá início, como de costume, com a sempre animadora e apreciada parte de experiências teocráticas. Para dirigi-la convidamos com muito prazer o nosso irmão Caio Diego, da congregação Valente. Apreciemos atentamente."),
  transitionBlock("t-t-br-5", "13:45", "Estudo de A Sentinela", "Na sequência de nosso programa, teremos agora o estudo da revista A Sentinela, que é um dos principais veículos de nutrição espiritual do povo de Jeová. Apreciamos muito que o Escravo Fiel o tenha incluído no programa espiritual de nossa assembleia. Vamos acompanhar com muito prazer e, detidamente, o resumo desta importante matéria que foi preparado pelo irmão Givanildo, que serve na congregação C. Santa Bárbara."),
  transitionBlock("t-t-br-6", "14:15", "Discurso para jovens", "Obrigado, irmão Givanildo, por esta consideração tão instrutiva de A Sentinela. Teremos agora um discurso preparado especialmente para os nossos jovens. A matéria vai mostrar como os jovens podem se empenhar pela paz na família, na escola, na congregação, com eles mesmos e com Jeová. Vamos acompanhar atentamente o irmão Hítalo Silva, que serve na congregação Salgadália."),
  transitionBlock("t-t-br-7", "14:30", "Discurso sobre a família", "Obrigado, irmão Hítalo Silva, por esta parte tão animadora para os nossos queridos jovens. O próximo discurso vai se concentrar no âmbito familiar, na parte que cada um de nós tem em manter a paz e a alegria na família. Convidamos com satisfação o irmão Josmar, que serve na congregação Barreiros, para conduzir este proferimento, cujo tema é: “Bons amigos”."),
  transitionBlock("t-t-br-8", "15:00", "Cântico 88 e anúncios", "Pedimos agora a gentileza de se levantarem, se for possível, para juntos louvarmos a Jeová com o cântico nº 88. Seu tema é ________ e está baseado no texto ________. Depois do cântico, poderão permanecer em pé para uma breve sessão de anúncios. Ouçamos a música introdutória do cântico 88. É com prazer que informamos o número dos que simbolizaram sua dedicação pelo batismo em água na manhã de hoje: ________ pessoas. Lembramos que haverá, como de costume, uma reunião do superintendente da assembleia com todos os anciãos do circuito. Será realizada hoje às ________, em ________. Sentimo-nos muito felizes de poder participar no que Romanos 1:12 descreve como “intercâmbio de encorajamento” e de ser espiritualmente revigorados pelas instruções oportunas recebidas nestas ocasiões. Todos nós somos gratos pelo uso deste local e estamos certos de que os irmãos reconhecem que há diversas despesas na realização de uma assembleia. Assim, seus donativos são necessários para cobrir os custos envolvidos neste evento e para apoiar a obra mundial. Além disso, fazer donativos é uma das maneiras de demonstrarmos nosso apreço pela bondade de Jeová. Para isso, há neste local caixas de donativos claramente identificadas para os que desejarem ajudar. Agradecemos sua amorosa colaboração. Saibam que seus esforços abnegados são muito apreciados. Teremos agora um último anúncio que será feito por nosso superintendente de circuito."),
  transitionBlock("t-t-br-9", "15:10", "Discurso conclusivo", "Matéria muito alertadora foi reservada para este discurso conclusivo do programa de nossa assembleia, os momentos finais para refletirmos sobre nossa posição perante Jeová, o Deus de paz. O discurso vai mostrar a relação vital de nossos empenhos pela paz com a nossa salvação. Convidamos novamente com muito prazer o orador visitante da família de Betel, o irmão Brandon Stephenson. Seu tema: “Feliz o povo cujo Deus é Jeová”. Vamos apreciar com a máxima atenção."),
  transitionBlock("t-t-br-10", "15:45", "Encerramento", "Agradecemos ao nosso irmão Brandon Stephenson por esta excelente matéria. Na verdade, nos sentimos plenamente revigorados por todo o banquete espiritual servido nesta assembleia e pelo excelente companheirismo cristão que usufruímos ao longo deste dia. Os irmãos apreciariam que o irmão Brandon Stephenson fosse portador para a família de Betel do nosso amor cristão? Aproveitamos para agradecer aos ________ presentes e a todos os voluntários que trabalharam arduamente e ainda vão trabalhar em prol deste evento teocrático. E é claro, somos principalmente gratos a Jeová e ao seu Escravo Fiel e Discreto por este rico e nutritivo alimento espiritual. Só nos resta, portanto, agradecermos com sinceros louvores e oração. Por isso, convidamos todos os que puderem a se pôr de pé para entoarmos com muito apreço o cântico nº 129, cujo tema é ________, baseado no texto ________. Após o cântico, o irmão Brandon Stephenson retornará para a oração de encerramento. Ouçamos a introdução musical do cântico 129."),
];

export const OFFICIAL_DOCUMENT_OVERRIDES = {
  cg: {
    meta: { letterDate: "19 de setembro de 2026" },
    templateHtml: `
      <header class="document-letterhead"><p><em>{{traveler.name}} - Tel. {{traveler.phone}} - {{traveler.email}}</em></p><p class="document-date">{{documentMeta.letterDate}}</p></header>
      <p><strong>A todas as congregações:</strong></p>
      <p>Prezados irmãos:</p>
      <p>É com prazer que lhes falamos sobre a nossa próxima assembleia, conforme detalhes abaixo:</p>
      <dl class="document-facts keep-together">
        <div><dt>TEMA:</dt><dd><strong>{{event.co.partA.theme}}</strong></dd></div>
        <div><dt>LOCAL:</dt><dd><strong>{{event.co.partA.venue}}</strong></dd></div>
        <div><dt>DATA:</dt><dd><strong>{{event.co.partA.date}}</strong></dd></div>
      </dl>
      <p><strong>PROGRAMA ESPIRITUAL:</strong> Iniciará às 9h40 e finalizará por volta das 16h.</p>
      <p>Nosso congresso regional nos ajudou a entender a importância de Declarar as boas novas. Agora, nesta assembleia, consideraremos outras maneiras de declarar as boas novas - pela nossa conduta. “Comportem-se de uma Maneira Digna das Boas Novas” Filipenses 1:27. Muitas pessoas fingem respeitar padrões do que é certo e errado, mas tentam mudá-los sempre que lhes é conveniente. Como podemos nos comportar de um modo aprovado por Deus? (Rom. 12:2) E como podemos ajudar outros a fazer a mudança necessária para agradar a Jeová? Esses pontos serão considerados nas diversas partes do programa, incluindo as séries de discursos: “Como as boas novas influenciaram a vida...” e “Nós nos recomendamos como ministro de Deus pela...”. O programa com a descrição de todas as partes está disponível em nosso site jw.org e estará disponível na forma impressa no local da assembleia. Além disso, incentivamos que façam anotações significativas e que prestem “mais do que a costumeira atenção”. (He. 2:1) Circular pelos arredores e conversar durante o programa mostra desconsideração para com Jeová e para com a assistência. Os pais devem manter seus filhos sentados junto de si. - Prov. 29:15.</p>
      <p><strong>REUNIÃO COM TODOS OS PIONEIROS REGULARES, ESPECIAIS E MISSIONÁRIOS:</strong></p>
      <p><strong>LIMPEZA DO LOCAL:</strong> Como sabem, Jeová, nosso Deus, é santo e limpo (1 Pedro 1:16) e, por isso, precisamos reconhecer nosso dever e privilégio de manter limpos e esmerados os locais usados para sua adoração.</p>
      <p><strong>ALERTA:</strong> Vivemos num mundo iníquo, assim precisamos tomar os devidos cuidados quanto aos pertences pessoais, pois estaremos num local público com o afluxo de centenas de pessoas, algumas delas possivelmente mal-intencionadas.</p>
      <p><strong>ACESSO AO LOCAL:</strong> Os portões serão abertos a partir das 07h30 (apenas os voluntários poderão entrar a partir das 07h00). Queiram ter em mente esta diretriz da Organização ao programarem seu horário de partida.</p>
      <p><strong>BATISMO:</strong> Os batizandos deverão sentar-se no setor designado para eles, antes do programa da manhã. O discurso de batismo iniciará às 11h30. Devem levar uma modesta roupa de banho e toalha. Não seriam próprios trajes de banho sumários ou reveladores. Os batizandos devem ser preparados e aprovados pelos anciãos com antecedência, através do livro OD.</p>
      <p><strong>ALIMENTAÇÃO:</strong> Cada um deve levar seu próprio lanche e bebida. Os refrigerantes ou água devem ser levados em embalagens plásticas ou de alumínio. Não se recomenda levar vasilhames de vidro. Também recomendamos que tomem seu lanche no local, evitando sair da área do local da assembleia.</p>
      <p><strong>DONATIVOS VOLUNTÁRIOS:</strong> Apreciamos seus empenhos em fazer donativos e apoiar financeiramente a obra mundial. Como sabem, os donativos voluntários são a única fonte de recursos para cobrirmos as diversas despesas de nossa assembleia. Cada publicador é responsável por analisar o que realmente é capaz de contribuir voluntariamente nas caixas de donativos disponíveis no local da Assembleia ou fazer no site Donativos para Seu Circuito. Visto que nem todos têm a mesma disponibilidade financeira, os que estão em melhores condições podem seguir o princípio da reciprocidade. - 2 Cor. 8:2, 3, 14, 15.</p>
      <p><strong>TRANSMISSÃO EM FREQUÊNCIA FM:</strong> O programa da assembleia será transmitido em frequência de FM em benefício dos que possuem dificuldades auditivas e dos que trabalham em departamentos não sonorizados. Os que necessitarem devem levar seu próprio aparelho de reprodução FM com fone de ouvido.</p>
      <p><strong>DEPARTAMENTO DE PRIMEIROS SOCORROS:</strong> A finalidade é prestar primeiros socorros em casos emergenciais, tais como acidentes. Não haverá medicamentos. Os que precisarem de remédios serão conduzidos à farmácia mais próxima. Assim, é sábio trazer de casa medicamentos costumeiramente usados, em especial os irmãos que têm doença crônica, tais como hipertensão e diabetes.</p>
      <p><strong>PLANEJAMENTO ANTECIPADO E CONVIDAR ESTUDANTES:</strong> Incentivamos a todos que façam com antecedência reserva de recursos financeiros, a fim de poderem arcar com as despesas de condução, alimentação e com donativos voluntários para a obra do Reino. Não esqueçam de trazer seu exemplar de A Sentinela que será estudada na semana da assembleia. Precisamos fazer sérios esforços para que toda a nossa família esteja presente a todas as sessões deste evento. Também é muito importante encaminhar nossos estudantes à Organização, o que inclui convidá-los com entusiasmo às nossas assembleias. Estamos certos das bênçãos de Jeová sobre nossos esforços.</p>
      <footer class="document-signature keep-together"><p>Seu irmão,</p><p><strong><em>{{traveler.name}} / {{traveler.circuitNumber}}</em></strong></p></footer>
      <p><small>Obs.: Esta carta deve ser prontamente lida pelos anciãos em virtude das providências imediatas que precisam ser tomadas. Deverá ser lida nas partes cabíveis e afixada no quadro de anúncios.</small></p>
    `,
  },
  dm: {
    meta: { letterDate: "19 de setembro de 2026" },
    templateHtml: `
      <header class="document-letterhead"><p><strong><em>{{traveler.name}} / {{traveler.circuitNumber}} / {{traveler.phone}} / {{traveler.email}}</em></strong></p><p class="document-date">{{documentMeta.letterDate}}</p></header>
      <h1>ADMINISTRAÇÃO DA ASSEMBLEIA</h1>
      <p><strong>A TODOS OS CORPOS DE ANCIÃOS</strong></p>
      <p>Prezados irmãos: <span style="float:right">Ref.: Donativos para as despesas da assembleia.</span></p>
      <p>Escrevemo-lhes para agradecer-lhes por seus donativos voluntários para o pagamento das despesas de nossa última assembleia. Apreciamos muito que os corpos de anciãos seguiram o arranjo de adotar uma resolução para a congregação contribuir para a realização de nossas assembleias.</p>
      <p>Estamos certos de que também conseguiremos cumprir com esta responsabilidade para a assembleia vindoura. Cabe aos corpos de anciãos estabelecer o valor a ser proposto em resolução para a congregação. Achamos apropriado fazer estes lembretes:</p>
      <p><strong>a)</strong> Ao apresentarem o valor, não é correto estabelecer uma contribuição fixa por publicador, pois nem todos possuem as mesmas condições financeiras. Expliquem que os que possuem maiores recursos podem compensar os com menos recursos, especialmente quando se trata de casais com vários filhos. Lembrem-se do ESPÍRITO VOLUNTÁRIO DE NOSSAS CONTRIBUIÇÕES. - 2 Cor. 8:14, 15; 9:7.</p>
      <p><strong>b)</strong> Deixar de apresentar uma resolução sobre o assunto ou não fazer o devido planejamento seria desamoroso, pois causaria sobrecarga financeira às demais congregações e demonstraria um espírito não condizente com a nossa fraternidade mundial.</p>
      <p>Pedimos a gentileza de depositarem o donativo em uma das seguintes contas:</p>
      <p><strong>Associação das Testemunhas Cristãs de Jeová (ATCJ) - Banco do Brasil / Ag. 2414-7 (Empresarial Sorocaba, SP) c.c. 65.000-5</strong></p>
      <p><strong>Associação das Testemunhas Cristãs de Jeová (ATCJ) - Bradesco, Ag. 3372-3 (Empresas Sorocaba, SP) c.c. 50.450-5</strong></p>
      <p>Solicitamos, por favor, que entreguem o comprovante bancário logo cedo pela manhã, no departamento de contas da assembleia.</p>
      <p>Oramos pela bênção de Jeová Deus sobre este arranjo. Aceitem uma expressão sincera de nosso amor cristão.</p>
      <footer class="document-signature keep-together"><p>Administração da Assembleia</p><p><strong><em>{{traveler.name}} / {{traveler.circuitNumber}}</em></strong></p></footer>
      <p><strong>IMPORTANTE: Esta carta não deve ser colocada no quadro de anúncios.</strong></p>
    `,
  },
  pio: {
    meta: {
      title: "Reunião Especial com Pioneiros Regulares, Especiais e Missionários",
      sections: {
        partA: {
          code: "BA-033",
          title: "REUNIÃO ESPECIAL COM PIONEIROS REGULARES, ESPECIAIS E MISSIONÁRIOS",
          date: "Data a confirmar",
          theme: "“Eu os reanimarei” - Mat. 11:28",
          start: "08:30",
        },
      },
    },
    records: {
      partA: [
        programRow("pio-1", "Cântico 120 / oração inicial", 5),
        programRow("pio-2", "‘Venham a mim, ... e eu os reanimarei’", 15, "Ronivaldo S. Ramos"),
        programRow("pio-3", "‘Sou de temperamento brando e humilde de coração’", 15, "Elenilson Cunha", "Norte de Coité"),
        programRow("pio-4", "Sinta alegria na pregação por ser brando e humilde", 15, "Daniel Oliveira", "Central de Riachão"),
        programRow("pio-5", "Reanime outros sendo brando e humilde", 15, "André Cunha", "Teofilândia"),
        programRow("pio-6", "Tenha paz interior por ser brando e humilde", 15, "Lucas Rogério", "Retirolândia"),
        programRow("pio-7", "INTERVALO", 20, "", "", "interval"),
        programRow("pio-8", "Aceite a carga", 15, "Hítalo Silva", "Salgadália"),
        programRow("pio-9", "Escolha a carga leve", 15, "Ítalo Almeida", "São João"),
        programRow("pio-10", "Livre-se das cargas pesadas", 15, "Jonathan Febraio", "Central de Coité"),
        programRow("pio-11", "Achem revigoramento para si mesmos", 15, "Marcos Lima", "BA-033"),
        programRow("pio-12", "‘Temos um grande sumo sacerdote’", 15, "Ronivaldo S. Ramos"),
        programRow("pio-13", "Cântico 38 / oração final", 5, "Ronivaldo S. Ramos"),
      ],
    },
  },
  "ass-co": {
    meta: {
      circuitMode: "parts",
      sections: {
        partA: { terminationControl: 0 },
        partB: { terminationControl: 0 },
      },
    },
    records: {
      partA: [
        programRow("ass-co-a-1", "Música gravada", 10),
        programRow("ass-co-a-2", "Presidência da sessão / cântico 85 / oração inicial", 10, "Caio Diego de Jesus", "Valente"),
        programRow("ass-co-a-3", "‘O Pai está procurando a esses’", 15, "Ronivaldo S. Ramos", "BA-033"),
        programRow("ass-co-a-4", "Ao tentar entender as orientações de Jeová", 15, "Adelson Zucateli", "Araci"),
        programRow("ass-co-a-5", "Ao lidar com o desânimo", 15, "Adilson Lima", "Ichu"),
        programRow("ass-co-a-6", "Ao se esforçar para fazer mais no serviço de Jeová", 17, "Daniel Oliveira", "Central de Riachão"),
        programRow("ass-co-a-7", "Cântico 88 e anúncios", 10),
        programRow("ass-co-a-8", "Como tornamos conhecida a verdade?", 19, "Oderlan Sodré", "Norte de Coité"),
        programRow("ass-co-a-9", "Dedic. Batismo: ‘Continuem a ser submissos às boas novas’", 29, "Celso Gandarela", "Central de Coité"),
        programRow("ass-co-a-10", "Cântico 51", 5),
        programRow("ass-co-a-11", "INTERVALO", 75, "", "", "interval"),
        programRow("ass-co-a-12", "Música gravada", 10),
        programRow("ass-co-a-13", "Presidência da sessão / cântico 72 / oração", 5, "Jackson Rodrigues", "Ichu"),
        programRow("ass-co-a-14", "Como saber a diferença entre o certo e o errado?", 29, "Ronivaldo S. Ramos", "BA-033"),
        programRow("ass-co-a-15", "Resumo de A Sentinela", 29, "Nemias", "São Domingos"),
        programRow("ass-co-a-16", "Cântico 56 e anúncios", 10),
        programRow("ass-co-a-17", "Na família", 14, "Flávio Ferreira", "Central Riachão"),
        programRow("ass-co-a-18", "Em um mundo dividido", 14, "Ítalo Almeida", "São João"),
        programRow("ass-co-a-19", "Em tempos de crise financeira", 15, "Elenilson Cunha", "Norte Coité"),
        programRow("ass-co-a-20", "‘Compre a verdade e nunca a venda’", 30, "Ronivaldo S. Ramos", "BA-009"),
        programRow("ass-co-a-21", "Cântico 29 e oração final", 10, "Ronivaldo S. Ramos", "BA-033"),
      ],
      partB: [
        programRow("ass-co-b-1", "Música gravada", 10),
        programRow("ass-co-b-2", "Presidência da sessão / cântico 85", 7),
        programRow("ass-co-b-3", "Oração inicial", 3),
        programRow("ass-co-b-4", "‘O Pai está procurando a esses’", 15, "Ronivaldo S. Ramos", "BA-033"),
        programRow("ass-co-b-5", "Ao tentar entender as orientações de Jeová", 15),
        programRow("ass-co-b-6", "Ao lidar com o desânimo", 15),
        programRow("ass-co-b-7", "Ao se esforçar para fazer mais no serviço de Jeová", 17),
        programRow("ass-co-b-8", "Cântico 88 e anúncios", 10),
        programRow("ass-co-b-9", "Como tornamos conhecida a verdade?", 19),
        programRow("ass-co-b-10", "Dedic. Batismo: Continue andando na verdade", 29),
        programRow("ass-co-b-11", "Cântico 51 e intervalo", 5),
        programRow("ass-co-b-12", "INTERVALO", 75, "", "", "interval"),
        programRow("ass-co-b-13", "Música gravada", 10),
        programRow("ass-co-b-14", "Presidência da sessão / cântico 72 / oração", 10),
        programRow("ass-co-b-15", "Como saber a diferença entre o certo e o errado?", 29, "Ronivaldo S. Ramos", "BA-033"),
        programRow("ass-co-b-16", "Resumo de A Sentinela", 29),
        programRow("ass-co-b-17", "Cântico 56 e anúncios", 10),
        programRow("ass-co-b-18", "Na família", 13),
        programRow("ass-co-b-19", "Em um mundo dividido", 14),
        programRow("ass-co-b-20", "Em tempos de crise financeira", 14),
        programRow("ass-co-b-21", "‘Compre a verdade e nunca a venda’", 17),
        programRow("ass-co-b-22", "Cântico 29 e oração final", 10, "Ronivaldo S. Ramos", "BA-033"),
      ],
    },
  },
  "ass-br": {
    meta: {
      circuitMode: "single",
      sections: {
        partA: { terminationControl: 17 },
        partB: { terminationControl: 17 },
      },
    },
    records: {
      partA: [
        timedProgramRow("ass-br-a-1", "09:40", "Música gravada", 10),
        timedProgramRow("ass-br-a-2", "09:50", "Presidência da sessão / cântico 1", 7, "Gustavo", "Salgadália"),
        timedProgramRow("ass-br-a-3", "09:57", "Oração inicial", 3, "Ronivaldo Silva Ramos", "Sup. de Circuito", "part", true),
        timedProgramRow("ass-br-a-4", "10:00", "‘Encontre a mais plena alegria em Jeová’ - Como?", 14, "Brandon Stephenson", "Betel"),
        timedProgramRow("ass-br-a-5", "10:15", "‘Feliz aquele cujo pecado é perdoado’", 14, "Celso Gandarela", "C. Coité"),
        timedProgramRow("ass-br-a-6", "10:30", "‘Felizes são os que moram na tua casa!’", 24, "Ronivaldo Silva Ramos", "BA-033"),
        timedProgramRow("ass-br-a-7", "10:55", "Cântico 73 e anúncios", 10),
        timedProgramRow("ass-br-a-8", "11:05", "‘Você não negou sua fé em mim’", 29, "Brandon Stephenson", "Betel"),
        timedProgramRow("ass-br-a-9", "11:35", "Dedic. Batismo: ‘Seu Pai que observa em secreto o recompensará’", 29, "Isaque Cunha Santos", "Valente"),
        timedProgramRow("ass-br-a-10", "12:05", "Cântico 79", 5),
        timedProgramRow("ass-br-a-11", "12:05", "INTERVALO", 75, "", "", "interval", true),
        timedProgramRow("ass-br-a-12", "13:20", "Música gravada", 10),
        timedProgramRow("ass-br-a-13", "13:30", "Presidência da sessão / cântico 126", 5, "Jackson Rodrigues", "Ichu"),
        timedProgramRow("ass-br-a-14", "13:35", "Experiências", 10, "Caio Diego", "Valente"),
        timedProgramRow("ass-br-a-15", "13:45", "Resumo de A Sentinela", 29, "Givanildo", "C. Santa Bárbara"),
        timedProgramRow("ass-br-a-16", "14:15", "Um estilo de vida simples", 14, "Hítalo Silva", "Salgadália"),
        timedProgramRow("ass-br-a-17", "14:30", "Bons amigos", 14, "Josmar", "Barreiros"),
        timedProgramRow("ass-br-a-18", "14:45", "Uma família unida", 15, "Lucas Rogério", "Retirolândia"),
        timedProgramRow("ass-br-a-19", "15:00", "Cântico 88 e anúncios", 10),
        timedProgramRow("ass-br-a-20", "15:10", "‘Feliz o povo cujo Deus é Jeová’", 35, "Brandon Stephenson", "Betel"),
        timedProgramRow("ass-br-a-21", "15:45", "Cântico 129 e oração final", 10, "Brandon Stephenson", "Betel"),
      ],
      partB: [
        timedProgramRow("ass-br-b-1", "09:40", "Música gravada", 10),
        timedProgramRow("ass-br-b-2", "09:50", "Presidência da sessão / cântico 40", 7),
        timedProgramRow("ass-br-b-3", "09:57", "Oração inicial", 3, "", "", "part", true),
        timedProgramRow("ass-br-b-4", "10:00", "Jeová - a fonte de verdadeira paz", 14),
        timedProgramRow("ass-br-b-5", "10:15", "Proteja sua paz com Jeová", 14),
        timedProgramRow("ass-br-b-6", "10:30", "Continue a procurar os ‘amigos da paz’", 24, "Ronivaldo Silva Ramos", "BA-033"),
        timedProgramRow("ass-br-b-7", "10:55", "Cântico 96 e anúncios", 10),
        timedProgramRow("ass-br-b-8", "11:05", "‘A paz de Deus excede todo o pensamento’ - Como?", 29, "Gilson Silva", "Betel"),
        timedProgramRow("ass-br-b-9", "11:35", "Dedic. Batismo: Jeová vai ajudar você a herdar o Reino", 29),
        timedProgramRow("ass-br-b-10", "12:05", "Cântico 27", 5),
        timedProgramRow("ass-br-b-11", "12:05", "INTERVALO", 75, "", "", "interval", true),
        timedProgramRow("ass-br-b-12", "13:20", "Música gravada", 10),
        timedProgramRow("ass-br-b-13", "13:30", "Presidência da sessão / cântico 65", 5),
        timedProgramRow("ass-br-b-14", "13:35", "Experiências", 10),
        timedProgramRow("ass-br-b-15", "13:45", "Resumo de A Sentinela", 29),
        timedProgramRow("ass-br-b-16", "14:15", "Empenhe-se pela paz na juventude", 14),
        timedProgramRow("ass-br-b-17", "14:30", "Empenhar-se pela paz traz alegria", 14),
        timedProgramRow("ass-br-b-18", "15:00", "Cântico 39 e anúncios", 10),
        timedProgramRow("ass-br-b-19", "15:10", "Os que se empenham pela paz obtêm a aprovação de Jeová", 35, "Gilson Silva", "Betel"),
        timedProgramRow("ass-br-b-20", "15:45", "Cântico 77 e oração final", 10, "Gilson Silva", "Betel"),
      ],
    },
  },
  "disc-co": {
    templateHtml: discourseTemplate("co.partA"),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "disc-co-1", speaker: "Oderlan Sodré", congregation: "Norte de Coité", title: "Como tornamos conhecida a verdade?", durationMin: 19, time: "11:14", notes: "Veja esboço, em anexo." }],
  },
  "discb-co": {
    templateHtml: discourseTemplate("co.partB"),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "discb-co-1", speaker: "", congregation: "", title: "Dedic. Batismo: Continue andando na verdade", durationMin: 29, time: "11:33", notes: "Veja esboço, em anexo." }],
  },
  "disc-br": {
    templateHtml: discourseTemplate("br.partA"),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "disc-br-1", speaker: "Josmar", congregation: "Barreiros", title: "Bons amigos", durationMin: 14, time: "14:30", notes: "Veja esboço, em anexo." }],
  },
  "discb-br": {
    templateHtml: discourseTemplate("br.partB"),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "discb-br-1", speaker: "", congregation: "", title: "Proteja sua paz com Jeová", durationMin: 14, time: "10:15", notes: "Veja esboço, em anexo." }],
  },
  "pr-or-co": {
    templateHtml: prayerTemplate("co.partA", prayerOpening),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "pr-or-co-1", speaker: "Elton Reis", congregation: "Barrocas", title: "Oração", session: "Manhã (início)", time: "09:50", durationMin: 2, notes: "" }],
  },
  "pr-or-b-co": {
    templateHtml: prayerTemplate("co.partB", presidencyInstructions),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "pr-or-b-co-1", speaker: "", congregation: "", title: "Presidência e oração para a conferência pública", session: "Tarde", time: "13:28", durationMin: 2, notes: "" }],
  },
  "pr-or-br": {
    templateHtml: prayerTemplate("br.partA", presidencyInstructions),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "pr-or-br-1", speaker: "Gustavo", congregation: "Salgadália", title: "Presidência", session: "Manhã", time: "09:50", durationMin: 0, notes: "" }],
  },
  "pr-or-b-br": {
    templateHtml: prayerTemplate("br.partB", prayerOpening),
    meta: { letterDate: "19 de setembro de 2026" },
    records: [{ id: "pr-or-b-br-1", speaker: "", congregation: "", title: "Oração", session: "Manhã (início)", time: "09:50", durationMin: 2, notes: "" }],
  },
  "t-t": {
    meta: { title: "Transição Tarde - CA-co", sourceDate: "28 de fevereiro de 2027", president: "Jackson Rodrigues - Cong. Ichu" },
    records: { partA: tTCo, partB: tTCo.map((block) => ({ ...block, id: `${block.id}-b` })) },
  },
  "t-t-br": {
    meta: { title: "Transição Tarde - CA-br", sourceDate: "06 de dezembro de 2026", president: "Hítalo Silva - Cong. Salgadália" },
    records: { partA: tTBr, partB: tTBr.map((block) => ({ ...block, id: `${block.id}-b` })) },
  },
};
