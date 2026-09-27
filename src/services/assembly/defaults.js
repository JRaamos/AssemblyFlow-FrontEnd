import { OFFICIAL_DOCUMENT_OVERRIDES } from "./officialOverrides";

export const ASSEMBLY_STORAGE_KEY = "assembly_project_v1";

const createProgramRow = (id, time, title, durationMin, speaker = "", congregation = "", extra = {}) => ({
  id,
  type: extra.type || "part",
  time,
  title,
  durationMin,
  speaker,
  congregation,
  confirmation: extra.confirmation || false,
  notes: extra.notes || "",
});

const traveler = {
  circuitNumber: "BA-033",
  name: "Ronivaldo Silva Ramos",
  phone: "74 99194-3388",
  email: "ronivaldoeleilce@hotmail.com",
};

const sharedAssemblyTheme = "“Ouça o Que o Espírito Diz às Congregações”— Apocalipse 3:22";
const sharedVenue = "Salão de Assembleias de Amélia Rodrigues";

const defaultEvent = (overrides = {}) => ({
  date: "06 de dezembro de 2026",
  theme: sharedAssemblyTheme,
  venue: sharedVenue,
  venueAddress: "",
  rehearsalVenue: "Congregação Norte/Central de Coité",
  rehearsalAddress: "",
  rehearsalDateTime: "",
  ...overrides,
});

export const defaultAssemblyProject = {
  settings: {
    circuitMode: "single",
  },
  traveler,
  events: {
    co: {
      partA: defaultEvent({
        date: "28 de fevereiro de 2027",
        rehearsalVenue: "Salão do Reino das congregações Norte/Central de Coité",
        rehearsalDateTime: "09 de janeiro de 2027",
      }),
      partB: defaultEvent({
        date: "28 de fevereiro de 2027",
        rehearsalVenue: "Salão do Reino das congregações Norte/Central de Coité",
        rehearsalDateTime: "09 de janeiro de 2027",
      }),
    },
    br: {
      partA: defaultEvent({
        date: "06 de dezembro de 2026",
        rehearsalVenue: "Salão do Reino das Congregações Norte/Central de Conceição do Coité",
        rehearsalDateTime: "09 de novembro 2026, às 19:30",
      }),
      partB: defaultEvent({
        date: "06 de dezembro de 2026",
        rehearsalVenue: "Salão do Reino das Congregações Norte/Central de Conceição do Coité",
        rehearsalDateTime: "09 de novembro 2026, às 19:30",
      }),
    },
    pioneers: {
      partA: defaultEvent({
        date: "Data a confirmar",
        theme: "“Eu os reanimarei” — Mat. 11:28",
        venue: "(Às 19:30)",
        rehearsalVenue: "Salão do Reino das congregações Norte/Central de Coité",
        rehearsalDateTime: "21 de dezembro de 2025, às 15 horas",
      }),
      partB: defaultEvent({
        date: "Data a confirmar",
        theme: "‘Acompanhe o passo do carro de Jeová’",
        rehearsalVenue: "",
        rehearsalDateTime: "",
      }),
    },
  },
  circuitComposition: {
    partA: [
      "Jardim Perseverança",
      "Saboeiro",
      "Ventosa",
      "Quinze de Maio",
      "Arenoso",
      "Tanquinho",
    ],
    partB: [
      "Gangorra",
      "Central de Riachão",
      "Salgadália",
      "Jardim Neópolis",
      "Barrocas",
      "Norte de Coité",
    ],
  },
  documents: {
    cg: {
      templateHtml: `
        <p><strong>À todas as congregações</strong></p>
        <p>Prezados irmãos,</p>
        <p>É com prazer que lhes falamos sobre a nossa próxima assembleia de circuito, conforme detalhes abaixo:</p>
        <p><strong>Tema:</strong> {{event.br.partA.theme}}</p>
        <p><strong>Data:</strong> {{event.br.partA.date}}</p>
        <p><strong>Local:</strong> {{event.br.partA.venue}}</p>
        <p>Pedimos que todos façam os preparativos necessários para estar presentes e apoiar plenamente este arranjo teocrático. Também lembramos a importância de adaptar esta carta segundo as circunstâncias locais de cada circuito.</p>
        <p>Em caso de dúvida, entrem em contato com {{traveler.name}} pelo telefone {{traveler.phone}} ou e-mail {{traveler.email}}.</p>
        <p>Com amor cristão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: {
        title: "Carta Geral às Congregações",
        description: "Modelo da carta geral para as congregações - ASS Co / Ass Br.",
      },
      records: [],
    },
    dm: {
      templateHtml: `
        <p><strong>ADMINISTRAÇÃO DA ASSEMBLEIA</strong></p>
        <p><strong>A TODOS OS CORPOS DE ANCIÃOS</strong></p>
        <p>Prezados irmãos,</p>
        <p>Escrevemo-lhes para agradecer seus donativos voluntários para o pagamento das despesas de nossa última assembleia. Apreciamos muito o espírito voluntário demonstrado por todos.</p>
        <p>Estamos certos de que também conseguiremos cumprir com esta responsabilidade para a assembleia vindoura. Cabe aos corpos de anciãos estabelecer o valor a ser proposto em resolução para a congregação, sempre preservando o espírito voluntário de nossas contribuições.</p>
        <p>Pedimos, por favor, que o comprovante bancário seja entregue logo cedo pela manhã ao departamento de contas da assembleia.</p>
        <p>Oramos pela bênção de Jeová sobre este arranjo.</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: {
        title: "Carta sobre Donativos",
        description: "Carta aos corpos de anciãos sobre a resolução dos donativos.",
      },
      records: [],
    },
    pio: {
      templateHtml: "",
      templateBlocks: [],
      meta: {
        title: "Programa — Reunião com Pioneiros",
        sections: {
          partA: {
            code: "BA-033",
            title: "REUNIÃO ESPECIAL COM PIONEIROS REGULARES, ESPECIAIS E MISSIONÁRIOS",
            date: "Data a confirmar",
            theme: "‘Deus lhes dá tanto o desejo como o poder de agir’ — Fil. 2:13",
            start: "08:30",
          },
          partB: {
            code: "BA-033",
            title: "REUNIÃO ESPECIAL COM PIONEIROS REGULARES, ESPECIAIS E MISSIONÁRIOS",
            date: "Data a confirmar",
            theme: "‘Acompanhe o passo do carro de Jeová’",
            start: "08:30",
          },
        },
      },
      records: {
        partA: [
          createProgramRow("pio-a-1", "08:30", "Cântico 58 / oração inicial", 5, "Ednaldo Ariane", "Cardeal"),
          createProgramRow("pio-a-2", "08:35", "“Vão e façam discípulos”", 10, "Moisés Balbino", "BA-009"),
          createProgramRow("pio-a-3", "08:45", "Desenvolva confiança e comprometimento", 20, "Tiago Santos", "Norte Capivari"),
          createProgramRow("pio-a-4", "09:05", "Faça dos estudos bíblicos um assunto de oração", 20, "André Guerra", "Itapuã"),
          createProgramRow("pio-a-5", "09:25", "Continue otimista", 20, "Tiago Nascimento", "Mombuca"),
          createProgramRow("pio-a-6", "09:45", "Demos atenção às necessidades dos pioneiros", 20, "Moisés Balbino", "Taquaral"),
          createProgramRow("pio-a-7", "10:05", "INTERVALO", 20, "", "", { type: "interval" }),
          createProgramRow("pio-a-8", "10:25", "Abordagem direta", 20, "Guilherme", "Paulista"),
          createProgramRow("pio-a-9", "10:45", "Pessoas contatadas por indicação ou que assistem a uma reunião", 20, "Guilherme", "Arenoso"),
          createProgramRow("pio-a-10", "11:05", "Pessoas que já conhecemos", 20, "Reginaldo Pereira", "Resgate"),
          createProgramRow("pio-a-11", "11:25", "Jeová pode dar a você o desejo e o poder", 15, "Moisés Balbino", "BA-009"),
          createProgramRow("pio-a-12", "11:40", "Cântico 70 / oração final", 5, "Moisés Balbino", "BA-009"),
        ],
        partB: [
          createProgramRow("pio-b-1", "08:30", "Cântico 58 / oração inicial", 5, "Moisés Balbino", "BA-009"),
          createProgramRow("pio-b-2", "08:35", "“Vão e façam discípulos”", 15, "Moisés Balbino", "BA-009"),
          createProgramRow("pio-b-3", "08:50", "Desenvolva confiança e comprometimento", 15, "", ""),
          createProgramRow("pio-b-4", "09:05", "Faça dos estudos bíblicos um assunto de oração", 15, "", ""),
          createProgramRow("pio-b-5", "09:20", "Continue otimista", 15, "", ""),
          createProgramRow("pio-b-6", "09:35", "Demos atenção às necessidades dos pioneiros", 15, "Moisés Balbino", "BA-009"),
          createProgramRow("pio-b-7", "09:50", "INTERVALO", 20, "", "", { type: "interval" }),
          createProgramRow("pio-b-8", "10:10", "Abordagem direta", 15, "", ""),
          createProgramRow("pio-b-9", "10:25", "Pessoas contatadas por indicação ou que assistem a uma reunião", 15, "", ""),
          createProgramRow("pio-b-10", "10:40", "Pessoas que já conhecemos", 15, "", ""),
          createProgramRow("pio-b-11", "10:55", "Jeová pode dar a você o desejo e o poder", 15, "Moisés Balbino", "BA-009"),
          createProgramRow("pio-b-12", "11:10", "Cântico 70 / oração final", 5, "Moisés Balbino", "BA-009"),
        ],
      },
    },
    "ass-co": {
      templateHtml: "",
      templateBlocks: [],
      meta: {
        title: "Programa da Assembleia — CA-co",
        sections: {
          partA: {
            code: "BA-033",
            title: "PROGRAMA ESPIRITUAL DA ASSEMBLEIA DE CIRCUITO",
            date: "28 de fevereiro de 2027",
            theme: "Como as boas novas estão mudando a vida das pessoas?",
            start: "09:40",
          },
          partB: {
            code: "BA-033",
            title: "PROGRAMA ESPIRITUAL DA ASSEMBLEIA DE CIRCUITO",
            date: "28 de fevereiro de 2027",
            theme: "Nós nos recomendamos como ministros de Deus pela perseverança",
            start: "09:40",
          },
        },
      },
      records: {
        partA: [
          createProgramRow("ass-co-a-1", "09:40", "Presidência da sessão / cântico 40", 7, "GUALBERT", ""),
          createProgramRow("ass-co-a-2", "09:47", "Oração inicial", 3, "Ronivaldo S. Ramos", "BA-033"),
          createProgramRow("ass-co-a-3", "09:50", "Como as boas novas estão mudando a vida das pessoas?", 15, "Ronivaldo S. Ramos", "BA-033"),
          createProgramRow("ass-co-a-4", "10:05", "Estevão", 12, "Jeferson", "Saboeiro", { confirmation: true }),
          createProgramRow("ass-co-a-5", "10:17", "Felipe", 12, "Eric", "Jardim Perseverança", { confirmation: true }),
          createProgramRow("ass-co-a-6", "10:29", "Áquila e Priscila", 12, "Fábio Monteiro", "Saboeiro", { confirmation: true }),
          createProgramRow("ass-co-a-7", "10:41", "Tito", 12, "Tiago Nascimento", "Jardim Perseverança", { confirmation: true }),
          createProgramRow("ass-co-a-8", "10:53", "Cântico 76 e anúncios", 10, "", ""),
          createProgramRow("ass-co-a-9", "11:03", "Continuem a praticar “atos de devoção a Deus”", 20, "Moisés", ""),
          createProgramRow("ass-co-a-10", "11:23", "Dedic. Batismo: “Continuem a ser submissos às boas novas”", 29, "Leandro", "Jardim Cabula"),
          createProgramRow("ass-co-a-11", "11:52", "Cântico 7 e intervalo", 5, "", ""),
          createProgramRow("ass-co-a-12", "11:57", "INTERVALO", 75, "", "", { type: "interval" }),
          createProgramRow("ass-co-a-13", "13:12", "Presidência da sessão / cântico 56 / oração", 5, "Adeneilton S. Silva", ""),
          createProgramRow("ass-co-a-14", "13:17", "Disc. público: Já pensou por que você acredita no que acredita?", 29, "Neilton", "Nova Narandiba"),
          createProgramRow("ass-co-a-15", "13:46", "Resumo de A Sentinela", 29, "Nailton", "Narandiba", { confirmation: true }),
          createProgramRow("ass-co-a-16", "14:15", "Cântico 69 e anúncios", 10, "", ""),
          createProgramRow("ass-co-a-17", "14:25", "Perseverança", 14, "Tiago Santos", "Quinze de Maio", { confirmation: true }),
          createProgramRow("ass-co-a-18", "14:39", "Bondade", 14, "Jadson", "Ventosa", { confirmation: true }),
          createProgramRow("ass-co-a-19", "14:53", "Honestidade", 15, "Guilherme", "Arenoso"),
          createProgramRow("ass-co-a-20", "15:08", "O que está treinando você?", 30, "Ronivaldo S. Ramos", "BA-009", { confirmation: true }),
          createProgramRow("ass-co-a-21", "15:38", "Cântico 4 e oração final", 10, "Ronivaldo S. Ramos", "BA-033"),
        ],
        partB: [
          createProgramRow("ass-co-b-1", "09:40", "Presidência da sessão / cântico 40", 7, "", ""),
          createProgramRow("ass-co-b-2", "09:47", "Oração inicial", 3, "", ""),
          createProgramRow("ass-co-b-3", "09:50", "Como as boas novas estão mudando a vida das pessoas?", 15, "Ronivaldo S. Ramos", "BA-033"),
          createProgramRow("ass-co-b-4", "10:05", "Estevão", 12, "", ""),
          createProgramRow("ass-co-b-5", "10:17", "Felipe", 12, "", ""),
          createProgramRow("ass-co-b-6", "10:29", "Áquila e Priscila", 12, "", ""),
          createProgramRow("ass-co-b-7", "10:41", "Tito", 12, "", ""),
          createProgramRow("ass-co-b-8", "10:53", "Cântico 76 e anúncios", 10, "", ""),
          createProgramRow("ass-co-b-9", "11:03", "Continuem a praticar “atos de devoção a Deus”", 20, "", ""),
          createProgramRow("ass-co-b-10", "11:23", "Dedic. Batismo: Continue andando na verdade", 29, "", ""),
          createProgramRow("ass-co-b-11", "11:52", "Cântico 7 e intervalo", 5, "", ""),
          createProgramRow("ass-co-b-12", "11:57", "INTERVALO", 75, "", "", { type: "interval" }),
          createProgramRow("ass-co-b-13", "13:12", "Presidência da sessão / cântico 56 / oração", 10, "", ""),
          createProgramRow("ass-co-b-14", "13:22", "Disc. público", 29, "Ronivaldo S. Ramos", "BA-033"),
          createProgramRow("ass-co-b-15", "13:51", "Resumo de A Sentinela", 29, "", ""),
          createProgramRow("ass-co-b-16", "14:20", "Cântico 69 e anúncios", 10, "", ""),
          createProgramRow("ass-co-b-17", "14:30", "Perseverança", 13, "", ""),
          createProgramRow("ass-co-b-18", "14:43", "Bondade", 14, "", ""),
          createProgramRow("ass-co-b-19", "14:57", "Honestidade", 14, "", ""),
          createProgramRow("ass-co-b-20", "15:11", "O que está treinando você?", 17, "", ""),
          createProgramRow("ass-co-b-21", "15:28", "Cântico 4 e oração final", 10, "Ronivaldo S. Ramos", "BA-033"),
        ],
      },
    },
    "ass-br": {
      templateHtml: "",
      templateBlocks: [],
      meta: {
        title: "Programa da Assembleia — CA-br",
        sections: {
          partA: {
            code: "BA-033",
            title: "PROGRAMA ESPIRITUAL DA ASSEMBLEIA DE CIRCUITO",
            date: "06 de dezembro de 2026",
            theme: sharedAssemblyTheme,
            start: "09:40",
          },
          partB: {
            code: "BA-033",
            title: "PROGRAMA ESPIRITUAL DA ASSEMBLEIA DE CIRCUITO",
            date: "06 de dezembro de 2026",
            theme: "Empenhe-se pela paz",
            start: "09:40",
          },
        },
      },
      records: {
        partA: [
          createProgramRow("ass-br-a-1", "09:40", "Presidência da sessão / cântico 1", 7, "Elenilson Rocha Cunha", "Norte de Coité"),
          createProgramRow("ass-br-a-2", "09:47", "Oração inicial", 3, "Ronivaldo Silva Ramos", "Sup. de Circuito"),
          createProgramRow("ass-br-a-3", "09:50", "“Ouça o que o espírito diz” - Como?", 14, "Fábio Cuco", "Betel"),
          createProgramRow("ass-br-a-4", "10:04", "Você está mostrando perseverança sem se casar", 14, "Celso Gandarela", "Central de Coité"),
          createProgramRow("ass-br-a-5", "10:18", "“Não tenha medo”", 24, "Ronivaldo Silva Ramos", "BA-033"),
          createProgramRow("ass-br-a-6", "10:42", "Cântico 73 e anúncios", 10, "", ""),
          createProgramRow("ass-br-a-7", "10:52", "Você não negou sua fé em mim", 29, "Fábio Cuco", "Betel"),
          createProgramRow("ass-br-a-8", "11:21", "Dedic. Batismo: O significado do seu batismo", 29, "Elton Reis", "Barrocas"),
          createProgramRow("ass-br-a-9", "11:50", "Cântico 79", 5, "", ""),
          createProgramRow("ass-br-a-10", "11:55", "INTERVALO", 75, "", "", { type: "interval" }),
          createProgramRow("ass-br-a-11", "13:10", "Presidência da sessão / cântico 126", 5, "Roberto Lima", "Central de Riachão"),
          createProgramRow("ass-br-a-12", "13:15", "Experiências", 10, "Hítalo Silva", "Salgadália"),
          createProgramRow("ass-br-a-13", "13:25", "Resumo de A Sentinela", 29, "João Goulart", "Jardim Neópolis"),
          createProgramRow("ass-br-a-14", "13:54", "Apeguem-se ao que vocês têm", 14, "Alex Silva", "Gangorra"),
          createProgramRow("ass-br-a-15", "14:08", "Seja vigilante e fortaleça o que resta", 14, "Jonathan Ramos Febraio", "Tanquinho"),
          createProgramRow("ass-br-a-16", "14:22", "Coloquei diante de você uma porta aberta", 15, "Gustavo Barbosa", "Salgadália"),
          createProgramRow("ass-br-a-17", "14:37", "Cântico 76 e anúncios", 10, "", ""),
          createProgramRow("ass-br-a-18", "14:47", "Seja zeloso", 35, "Fábio Cuco", "Betel"),
          createProgramRow("ass-br-a-19", "15:22", "Cântico 129 e oração final", 10, "Fábio Cuco", "Betel"),
        ],
        partB: [
          createProgramRow("ass-br-b-1", "09:40", "Presidência da sessão / cântico 40", 7, "", ""),
          createProgramRow("ass-br-b-2", "09:47", "Oração inicial", 3, "", ""),
          createProgramRow("ass-br-b-3", "09:50", "Jeová - a fonte de verdadeira paz", 14, "", ""),
          createProgramRow("ass-br-b-4", "10:04", "Proteja sua paz com Jeová", 14, "", ""),
          createProgramRow("ass-br-b-5", "10:18", "Continue a procurar os “amigos da paz”", 24, "Ronivaldo Silva Ramos", "BA-033", { confirmation: true }),
          createProgramRow("ass-br-b-6", "10:42", "Cântico 96 e anúncios", 10, "", ""),
          createProgramRow("ass-br-b-7", "10:52", "A paz de Deus ... excede todo o pensamento - Como?", 29, "Gilson Silva", "Betel"),
          createProgramRow("ass-br-b-8", "11:21", "Dedic. Batismo: Jeová vai ajudar você a herdar o Reino", 29, "", ""),
          createProgramRow("ass-br-b-9", "11:50", "Cântico 27", 5, "", ""),
          createProgramRow("ass-br-b-10", "11:55", "INTERVALO", 75, "", "", { type: "interval" }),
          createProgramRow("ass-br-b-11", "13:10", "Presidência da sessão / cântico 65", 5, "", ""),
          createProgramRow("ass-br-b-12", "13:15", "Experiências", 10, "", ""),
          createProgramRow("ass-br-b-13", "13:25", "Resumo de A Sentinela", 29, "", ""),
          createProgramRow("ass-br-b-14", "13:54", "Empenhe-se pela paz na juventude", 14, "", ""),
          createProgramRow("ass-br-b-15", "14:08", "Empenhar-se pela paz traz alegria", 14, "", ""),
          createProgramRow("ass-br-b-16", "14:22", "Cântico 39 e anúncios", 10, "", ""),
          createProgramRow("ass-br-b-17", "14:32", "Os que se empenham pela paz obtêm a aprovação de Jeová", 35, "Gilson Silva", "Betel", { confirmation: true }),
          createProgramRow("ass-br-b-18", "15:07", "Cântico 77 e oração final", 10, "Gilson Silva", "Betel", { confirmation: true }),
        ],
      },
    },
    "disc-co": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Pela presente, temos o prazer de designá-lo para participar no programa espiritual de nossa assembleia de circuito, conforme detalhes abaixo.</p>
        <p><strong>Tema do evento:</strong> {{event.co.partA.theme}}</p>
        <p><strong>Data:</strong> {{event.co.partA.date}}</p>
        <p><strong>Local:</strong> {{event.co.partA.venue}}</p>
        <p><strong>Designação:</strong> Discurso</p>
        <p><strong>Tema do discurso:</strong> {{record.title}}</p>
        <p><strong>Tempo:</strong> {{record.durationMin}} min</p>
        <p><strong>Início:</strong> {{record.time}}</p>
        <p><strong>Congregação:</strong> {{record.congregation}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Designações de Discurso — CA-co" },
      records: [
        { id: "disc-co-1", speaker: "Tiago Nascimento", congregation: "Jardim Perseverança", title: "Tito", durationMin: 12, time: "10:41", confirmation: true, notes: "Quarto discurso do simpósio da manhã." },
        { id: "disc-co-2", speaker: "Jeferson", congregation: "Saboeiro", title: "Estevão", durationMin: 12, time: "10:05", confirmation: true, notes: "Primeiro discurso do simpósio da manhã." },
        { id: "disc-co-3", speaker: "Eric", congregation: "Jardim Perseverança", title: "Felipe", durationMin: 12, time: "10:17", confirmation: true, notes: "Segundo discurso do simpósio da manhã." },
        { id: "disc-co-4", speaker: "Fábio Monteiro", congregation: "Saboeiro", title: "Áquila e Priscila", durationMin: 12, time: "10:29", confirmation: true, notes: "Terceiro discurso do simpósio da manhã." },
      ],
    },
    "discb-co": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Você foi designado para a parte <strong>{{record.title}}</strong> em nossa assembleia de circuito (Parte B).</p>
        <p><strong>Tema do evento:</strong> {{event.co.partB.theme}}</p>
        <p><strong>Data:</strong> {{event.co.partB.date}}</p>
        <p><strong>Local:</strong> {{event.co.partB.venue}}</p>
        <p><strong>Tempo:</strong> {{record.durationMin}} min</p>
        <p><strong>Início:</strong> {{record.time}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Designações de Discurso — CA-co Parte B" },
      records: [
        { id: "discb-co-1", speaker: "Leandro", congregation: "Jardim Cabula", title: "Dedic. Batismo: Continue andando na verdade", durationMin: 29, time: "11:23", confirmation: false, notes: "Veja esboço em anexo." },
      ],
    },
    "disc-br": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Pela presente, temos o prazer de designá-lo para participar no programa espiritual de nossa assembleia de circuito, conforme detalhes abaixo.</p>
        <p><strong>Tema do evento:</strong> {{event.br.partA.theme}}</p>
        <p><strong>Data:</strong> {{event.br.partA.date}}</p>
        <p><strong>Local:</strong> {{event.br.partA.venue}}</p>
        <p><strong>Tema do discurso:</strong> {{record.title}}</p>
        <p><strong>Tempo:</strong> {{record.durationMin}} min</p>
        <p><strong>Início:</strong> {{record.time}}</p>
        <p><strong>Congregação:</strong> {{record.congregation}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Designações de Discurso — CA-br" },
      records: [
        { id: "disc-br-1", speaker: "Jonathan Ramos Febraio", congregation: "Tanquinho", title: "“seja vigilante e fortaleça o que resta”", durationMin: 14, time: "14:08", confirmation: false, notes: "Veja esboço em anexo." },
        { id: "disc-br-2", speaker: "Alex Silva", congregation: "Gangorra", title: "“Apeguem-se ao que vocês têm”", durationMin: 14, time: "13:54", confirmation: false, notes: "Veja esboço em anexo." },
        { id: "disc-br-3", speaker: "Gustavo Barbosa", congregation: "Salgadália", title: "“Coloquei diante de você uma porta aberta”", durationMin: 15, time: "14:22", confirmation: false, notes: "Veja esboço em anexo." },
      ],
    },
    "discb-br": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Você foi designado para a parte <strong>{{record.title}}</strong> em nossa assembleia de circuito (Parte B).</p>
        <p><strong>Tema do evento:</strong> {{event.br.partB.theme}}</p>
        <p><strong>Data:</strong> {{event.br.partB.date}}</p>
        <p><strong>Local:</strong> {{event.br.partB.venue}}</p>
        <p><strong>Tempo:</strong> {{record.durationMin}} min</p>
        <p><strong>Início:</strong> {{record.time}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Designações de Discurso — CA-br Parte B" },
      records: [
        { id: "discb-br-1", speaker: "", congregation: "", title: "Proteja sua paz com Jeová", durationMin: 14, time: "10:04", confirmation: false, notes: "Veja esboço em anexo." },
      ],
    },
    "pr-or-co": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Pela presente, temos o prazer de designá-lo para participar no programa espiritual de nossa assembleia de circuito.</p>
        <p><strong>Designação:</strong> {{record.title}}</p>
        <p><strong>Sessão:</strong> {{record.session}}</p>
        <p><strong>Data:</strong> {{event.co.partA.date}}</p>
        <p><strong>Local:</strong> {{event.co.partA.venue}}</p>
        <p><strong>Horário:</strong> {{record.time}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Presidência e Oração — CA-co" },
      records: [
        { id: "pr-or-co-1", speaker: "GUALBERT", congregation: "", title: "Presidência", session: "Manhã", time: "09:40", durationMin: 7, notes: "Presidência da sessão da manhã." },
        { id: "pr-or-co-2", speaker: "Ronivaldo S. Ramos", congregation: "BA-033", title: "Oração inicial", session: "Manhã", time: "09:47", durationMin: 3, notes: "Oração de abertura da manhã." },
      ],
    },
    "pr-or-b-co": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Você foi designado para <strong>{{record.title}}</strong> na Parte B da assembleia.</p>
        <p><strong>Sessão:</strong> {{record.session}}</p>
        <p><strong>Data:</strong> {{event.co.partB.date}}</p>
        <p><strong>Local:</strong> {{event.co.partB.venue}}</p>
        <p><strong>Horário:</strong> {{record.time}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Presidência e Oração — CA-co Parte B" },
      records: [
        { id: "pr-or-b-co-1", speaker: "", congregation: "", title: "Presidência e oração para a conferência pública", session: "Tarde", time: "13:12", durationMin: 10, notes: "Inclui ajustes prévios e orientação ao orador." },
      ],
    },
    "pr-or-br": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Você foi designado para <strong>{{record.title}}</strong> na Assembleia de Circuito CA-br.</p>
        <p><strong>Sessão:</strong> {{record.session}}</p>
        <p><strong>Data:</strong> {{event.br.partA.date}}</p>
        <p><strong>Local:</strong> {{event.br.partA.venue}}</p>
        <p><strong>Horário:</strong> {{record.time}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Presidência e Oração — CA-br" },
      records: [
        { id: "pr-or-br-1", speaker: "Elenilson Rocha Cunha", congregation: "Norte de Coité", title: "Presidência", session: "Manhã", time: "09:40", durationMin: 7, notes: "Presidência da sessão da manhã." },
        { id: "pr-or-br-2", speaker: "Ronivaldo Silva Ramos", congregation: "Sup. de Circuito", title: "Oração inicial", session: "Manhã", time: "09:47", durationMin: 3, notes: "Oração de abertura da manhã." },
        { id: "pr-or-br-3", speaker: "Roberto Lima", congregation: "Central de Riachão", title: "Presidência", session: "Tarde", time: "13:10", durationMin: 5, notes: "Presidência da sessão da tarde." },
      ],
    },
    "pr-or-b-br": {
      templateHtml: `
        <p>Prezado irmão {{record.speaker}},</p>
        <p>Você foi designado para <strong>{{record.title}}</strong> na Parte B da Assembleia de Circuito CA-br.</p>
        <p><strong>Sessão:</strong> {{record.session}}</p>
        <p><strong>Data:</strong> {{event.br.partB.date}}</p>
        <p><strong>Local:</strong> {{event.br.partB.venue}}</p>
        <p><strong>Horário:</strong> {{record.time}}</p>
        <p>{{record.notes}}</p>
        <p>Seu irmão,</p>
        <p><strong>{{traveler.name}}</strong><br />{{traveler.circuitNumber}}</p>
      `,
      templateBlocks: [],
      meta: { title: "Presidência e Oração — CA-br Parte B" },
      records: [
        { id: "pr-or-b-br-1", speaker: "", congregation: "", title: "Oração", session: "Manhã (início)", time: "09:47", durationMin: 3, notes: "Oração inicial da parte B." },
      ],
    },
    "t-m": {
      templateHtml: "",
      templateBlocks: [],
      meta: { title: "Transição Manhã — CA-co" },
      records: {
        partA: [
          { id: "t-m-a-1", title: "Boas-vindas iniciais", time: "09:28", content: "Bom dia a todos os presentes. É uma alegria estarmos juntos para mais um evento teocrático. Dentro de instantes teremos o programa musical que indica a hora de ocuparmos nossos lugares e nos prepararmos para o início da sessão da manhã." },
          { id: "t-m-a-2", title: "Abertura da sessão", time: "09:40", content: "É com muito prazer que damos início a nossa Assembleia de Circuito. Estendemos nossas calorosas boas-vindas a todos os irmãos e convidados presentes." },
          { id: "t-m-a-3", title: "Apresentação do discurso de abertura", time: "09:50", content: "Jesus Cristo nos exortou em Mateus 6:33 a buscar primeiro o Reino e a sua justiça. O discurso de abertura mostrará o que é essa justiça e como buscá-la." },
          { id: "t-m-a-4", title: "Apresentação do simpósio", time: "10:05", content: "Apreciamos esta primeira consideração e agora teremos o primeiro simpósio de nossa assembleia. O tema central dele focaliza o precioso privilégio de ajudar outros a seguir as orientações justas de Jeová." },
          { id: "t-m-a-5", title: "Transição para o cântico 76", time: "10:53", content: "Agradecemos a todos que participaram neste simpósio tão instrutivo. Temos agora a oportunidade de nos levantar para juntos entoarmos louvores a Jeová por meio do cântico 76." },
          { id: "t-m-a-6", title: "Anúncios da manhã", time: "11:03", content: "Pedimos sua atenção para os seguintes anúncios: assentos para idosos, orientações aos batizandos e lembretes práticos sobre o andamento do programa." },
          { id: "t-m-a-7", title: "Apresentação do batismo", time: "11:23", content: "Agora chegamos a um dos momentos mais alegres e solenes de nossa assembleia, o discurso bíblico especialmente preparado para os candidatos ao batismo." },
          { id: "t-m-a-8", title: "Início do intervalo", time: "11:57", content: "Teremos agora o intervalo para o lanche, que proverá excelentes oportunidades para conversarmos sobre o que aprendemos na manhã de hoje." },
        ],
        partB: [
          { id: "t-m-b-1", title: "Boas-vindas iniciais", time: "09:28", content: "Bom dia a todos os presentes. É uma alegria estarmos juntos para mais um evento teocrático. Dentro de instantes teremos o programa musical que indica a hora de ocuparmos nossos lugares e nos prepararmos para o início da sessão da manhã." },
          { id: "t-m-b-2", title: "Abertura da sessão", time: "09:40", content: "É com muito prazer que damos início a nossa Assembleia de Circuito. Estendemos nossas calorosas boas-vindas a todos os irmãos e convidados presentes." },
          { id: "t-m-b-3", title: "Apresentação do discurso de abertura", time: "09:50", content: "O que é a verdadeira paz? Qual é a sua fonte e como podemos obtê-la? Estes e outros pontos serão abordados neste discurso de abertura da assembleia." },
          { id: "t-m-b-4", title: "Transição para a demonstração", time: "10:04", content: "Na sequência de nosso programa teremos um discurso alertador que incluirá uma demonstração muito prática e interessante." },
          { id: "t-m-b-5", title: "Anúncios da manhã", time: "10:42", content: "Pedimos sua atenção para os seguintes anúncios: assentos para idosos, orientações aos batizandos e lembretes práticos sobre o andamento do programa." },
          { id: "t-m-b-6", title: "Apresentação do batismo", time: "11:21", content: "Agora chegamos a um dos momentos mais alegres e solenes de nossa assembleia, o discurso bíblico especialmente preparado para os candidatos ao batismo." },
          { id: "t-m-b-7", title: "Início do intervalo", time: "11:55", content: "Teremos agora o intervalo para o lanche. Nosso programa reiniciará no início da tarde com um programa musical." },
        ],
      },
    },
    "t-t": {
      templateHtml: "",
      templateBlocks: [],
      meta: { title: "Transição Tarde — CA-co" },
      records: {
        partA: [
          { id: "t-t-a-1", title: "Boas-vindas da tarde", time: "13:00", content: "Boa tarde a todos. Relembramos que dentro de instantes ouviremos o belo prelúdio musical que introduzirá o programa espiritual desta tarde." },
          { id: "t-t-a-2", title: "Abertura da tarde", time: "13:12", content: "Chegou a hora para iniciarmos o programa conclusivo de nossa Assembleia de Circuito. Renovamos nossas calorosas boas-vindas e convidamos todos os fisicamente aptos a se levantarem respeitosamente." },
          { id: "t-t-a-3", title: "Apresentação do discurso público", time: "13:17", content: "Ouviremos agora o discurso público programado para esta tarde. O discurso vai enfatizar a importância de confiarmos nos padrões de Jeová de conduta." },
          { id: "t-t-a-4", title: "Convite ao estudo de A Sentinela", time: "13:46", content: "Na sequência de nosso programa, teremos agora o estudo da revista A Sentinela, um dos principais veículos de nutrição espiritual do povo de Jeová." },
          { id: "t-t-a-5", title: "Transição para o segundo simpósio", time: "14:25", content: "Podem sentar-se. Teremos agora o segundo simpósio de nossa assembleia. O tema central focaliza aspectos de nosso comportamento que podem revelar o quanto nos empenhamos ou não pela justiça de Jeová." },
          { id: "t-t-a-6", title: "Discurso conclusivo", time: "15:08", content: "Chegamos agora à parte conclusiva de nossa assembleia. O discurso final mostrará o que precisamos fazer para louvar a Jeová para sempre como pessoas justas." },
          { id: "t-t-a-7", title: "Encerramento", time: "15:38", content: "Na verdade, nos sentimos plenamente revigorados e gratos por todo o banquete espiritual servido nesta assembleia. Só nos resta, portanto, agradecermos a Jeová com sinceros louvores e oração." },
        ],
        partB: [
          { id: "t-t-b-1", title: "Boas-vindas da tarde", time: "13:00", content: "Boa tarde a todos. Relembramos que dentro de instantes ouviremos o belo prelúdio musical que introduzirá o programa espiritual desta tarde." },
          { id: "t-t-b-2", title: "Abertura da tarde", time: "13:12", content: "Chegou a hora para iniciarmos o programa conclusivo de nossa Assembleia de Circuito. Renovamos nossas calorosas boas-vindas e convidamos todos os fisicamente aptos a se levantarem respeitosamente." },
          { id: "t-t-b-3", title: "Apresentação do discurso público", time: "13:17", content: "O programa da tarde terá início com o discurso público programado para esta sessão, destacando a importância de confiarmos nos padrões de Jeová." },
          { id: "t-t-b-4", title: "Convite ao estudo de A Sentinela", time: "13:46", content: "Na sequência de nosso programa, teremos agora o estudo da revista A Sentinela, um dos principais veículos de nutrição espiritual do povo de Jeová." },
          { id: "t-t-b-5", title: "Transição para o discurso jovem", time: "14:25", content: "Obrigado pela consideração tão instrutiva de A Sentinela. Teremos agora um discurso preparado especialmente para os nossos jovens." },
          { id: "t-t-b-6", title: "Discurso conclusivo", time: "14:47", content: "Matéria muito alertadora foi reservada para este discurso conclusivo do programa de nossa assembleia, os momentos finais para refletirmos sobre nossa posição perante Jeová." },
          { id: "t-t-b-7", title: "Encerramento", time: "15:22", content: "Nos sentimos plenamente revigorados por todo o banquete espiritual servido nesta assembleia e pelo excelente companheirismo cristão que usufruímos ao longo deste dia." },
        ],
      },
    },
    "t-m-br": {
      templateHtml: "",
      templateBlocks: [],
      meta: { title: "Transição Manhã — CA-br" },
      records: {
        partA: [
          { id: "t-m-br-a-1", title: "Boas-vindas iniciais", time: "09:28", content: "Bom dia a todos os presentes. É uma alegria estarmos juntos para mais um evento teocrático. Dentro de instantes teremos o programa musical que indica a hora de ocuparmos nossos lugares." },
          { id: "t-m-br-a-2", title: "Abertura da sessão", time: "09:40", content: "É com muito prazer que damos início à nossa Assembleia de Circuito. Estendemos nossas calorosas boas-vindas a todos os irmãos e convidados presentes." },
          { id: "t-m-br-a-3", title: "Apresentação do discurso inicial", time: "09:50", content: "O que é a verdadeira paz? Qual é a sua fonte e como podemos obtê-la? Estes e outros pontos serão abordados no discurso de abertura de nossa assembleia." },
          { id: "t-m-br-a-4", title: "Transição para a demonstração", time: "10:04", content: "Na sequência de nosso programa teremos um discurso alertador que incluirá uma demonstração muito prática e interessante." },
          { id: "t-m-br-a-5", title: "Anúncios da manhã", time: "10:42", content: "Pedimos sua atenção para os seguintes anúncios: assentos para idosos, orientações aos batizandos e lembretes práticos sobre o andamento do programa." },
          { id: "t-m-br-a-6", title: "Apresentação do batismo", time: "11:21", content: "Agora chegamos a um dos momentos mais alegres e solenes de nossa assembleia, o discurso bíblico especialmente preparado para os candidatos ao batismo." },
          { id: "t-m-br-a-7", title: "Início do intervalo", time: "11:55", content: "Teremos agora o intervalo para o lanche. Nosso programa reiniciará às 13h00 com um programa musical." },
        ],
        partB: [
          { id: "t-m-br-b-1", title: "Boas-vindas iniciais", time: "09:28", content: "Bom dia a todos os presentes. É uma alegria estarmos juntos para mais um evento teocrático. Dentro de instantes teremos o programa musical que indica a hora de ocuparmos nossos lugares." },
          { id: "t-m-br-b-2", title: "Abertura da sessão", time: "09:40", content: "É com muito prazer que damos início à nossa Assembleia de Circuito. Estendemos nossas calorosas boas-vindas a todos os irmãos e convidados presentes." },
          { id: "t-m-br-b-3", title: "Apresentação do discurso inicial", time: "09:50", content: "O que é a verdadeira paz? Qual é a sua fonte e como podemos obtê-la? Estes e outros pontos serão abordados no discurso de abertura de nossa assembleia." },
          { id: "t-m-br-b-4", title: "Transição para o discurso de batismo", time: "11:21", content: "Agradecemos ao irmão Gilson Silva e ao Escravo Fiel por esta matéria tão consoladora sobre a paz de Deus. Agora chegamos a um dos momentos mais alegres e solenes de nossa assembleia." },
        ],
      },
    },
    "t-t-br": {
      templateHtml: "",
      templateBlocks: [],
      meta: { title: "Transição Tarde — CA-br" },
      records: {
        partA: [
          { id: "t-t-br-a-1", title: "Boas-vindas da tarde", time: "13:00", content: "Boa tarde a todos. Relembramos que dentro de instantes ouviremos o belo prelúdio musical que introduzirá o programa espiritual desta tarde." },
          { id: "t-t-br-a-2", title: "Abertura da tarde", time: "13:10", content: "Chegou a hora para iniciarmos o programa conclusivo de nossa Assembleia de Circuito. Renovamos nossas calorosas boas-vindas." },
          { id: "t-t-br-a-3", title: "Experiências teocráticas", time: "13:15", content: "O programa da tarde terá início, como de costume, com a sempre animadora e apreciada parte de experiências teocráticas." },
          { id: "t-t-br-a-4", title: "Convite ao estudo de A Sentinela", time: "13:25", content: "Na sequência de nosso programa, teremos agora o estudo da revista A Sentinela, um dos principais veículos de nutrição espiritual do povo de Jeová." },
          { id: "t-t-br-a-5", title: "Discurso para jovens", time: "13:54", content: "Teremos agora um discurso preparado especialmente para os nossos jovens. A matéria vai mostrar como os jovens podem se empenhar pela paz." },
          { id: "t-t-br-a-6", title: "Discurso conclusivo", time: "14:47", content: "Matéria muito alertadora foi reservada para este discurso conclusivo do programa de nossa assembleia, os momentos finais para refletirmos sobre nossa posição perante Jeová, o Deus de paz." },
          { id: "t-t-br-a-7", title: "Encerramento", time: "15:22", content: "Na verdade, nos sentimos plenamente revigorados por todo o banquete espiritual servido nesta assembleia e pelo excelente companheirismo cristão que usufruímos ao longo deste dia." },
        ],
        partB: [
          { id: "t-t-br-b-1", title: "Boas-vindas da tarde", time: "13:00", content: "Boa tarde a todos. Relembramos que dentro de instantes ouviremos o belo prelúdio musical que introduzirá o programa espiritual desta tarde." },
          { id: "t-t-br-b-2", title: "Abertura da tarde", time: "13:10", content: "Chegou a hora para iniciarmos o programa conclusivo de nossa Assembleia de Circuito. Renovamos nossas calorosas boas-vindas." },
          { id: "t-t-br-b-3", title: "Experiências teocráticas", time: "13:15", content: "O programa da tarde terá início, como de costume, com a sempre animadora e apreciada parte de experiências teocráticas." },
          { id: "t-t-br-b-4", title: "Convite ao estudo de A Sentinela", time: "13:25", content: "Na sequência de nosso programa, teremos agora o estudo da revista A Sentinela, um dos principais veículos de nutrição espiritual do povo de Jeová." },
          { id: "t-t-br-b-5", title: "Discurso para jovens", time: "13:54", content: "Teremos agora um discurso preparado especialmente para os nossos jovens. A matéria vai mostrar como os jovens podem se empenhar pela paz." },
          { id: "t-t-br-b-6", title: "Discurso conclusivo", time: "14:47", content: "Matéria muito alertadora foi reservada para este discurso conclusivo do programa de nossa assembleia, os momentos finais para refletirmos sobre nossa posição perante Jeová, o Deus de paz." },
          { id: "t-t-br-b-7", title: "Encerramento", time: "15:22", content: "Na verdade, nos sentimos plenamente revigorados por todo o banquete espiritual servido nesta assembleia e pelo excelente companheirismo cristão que usufruímos ao longo deste dia." },
        ],
      },
    },
  },
};

const mergeOfficialDefaults = (base, override) => {
  if (Array.isArray(override)) return JSON.parse(JSON.stringify(override));
  if (!override || typeof override !== "object") return override;

  return Object.entries(override).reduce(
    (next, [key, value]) => ({
      ...next,
      [key]:
        value && typeof value === "object" && !Array.isArray(value)
          ? mergeOfficialDefaults(next?.[key] || {}, value)
          : JSON.parse(JSON.stringify(value)),
    }),
    { ...base }
  );
};

Object.entries(OFFICIAL_DOCUMENT_OVERRIDES).forEach(([documentId, override]) => {
  defaultAssemblyProject.documents[documentId] = mergeOfficialDefaults(
    defaultAssemblyProject.documents[documentId],
    override
  );
});

Object.values(defaultAssemblyProject.documents).forEach((document) => {
  document.defaultsVersion = 3;
});

export const cloneAssemblyProject = (value = defaultAssemblyProject) =>
  JSON.parse(JSON.stringify(value));
