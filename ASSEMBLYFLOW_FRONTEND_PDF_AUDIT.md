# AssemblyFlow — auditoria do front-end, conteúdo e PDF

**STATUS: PARTIAL**  
**Data:** 27 de setembro de 2026  
**Escopo:** somente `AssemblyFlow-FrontEnd`; backend, merge em `main` e instalador Windows ficaram fora do trabalho.  
**Branch:** `feat/assemblyflow-content-pdf-polish`  
**Base auditada:** `bfb5fde3efc64a59d18475f5b46fd20cdc4432cb`  
**Commit de implementação:** `d7ce32c47f9fd00391a69b06c798f0d32f97a16f` (`Build AssemblyFlow document and PDF workflows`)  
**Atualização Excel/PDF:** `Use current workbook data and spreadsheet-style PDFs`  
**Fonte editorial:** `/Users/jonathanfebraio/Downloads/Zapli Assembleia 2026 (1).xlsm`  
**SHA-256 da fonte:** `e05c0c9f54e9e4f37cab80728fd998b1498919364ebba1ac8f30b50cf8606ebf`

## Conclusão executiva

O front-end foi reorganizado como aplicação local AssemblyFlow com 17 documentos isolados, identidade visual própria, persistência local versionada, edição rica sanitizada e exportação PDF A4 vetorial. As 15 planilhas oficiais da pasta de trabalho foram cadastradas com suas áreas de impressão; `T-T` e `T-T-br` têm conteúdo, metadados e chaves de armazenamento diferentes. Todas as rotas abriram sem erro e o build e os 15 testes de componente passaram.

O status permanece **PARTIAL**, e não `PASS`, porque ainda falta uma conferência editorial humana, célula a célula e PDF a PDF, dos 15 documentos longos contra a apresentação visual da pasta de trabalho. Também não existe fonte oficial no `.xlsm` para `T-M` e `T-M-br`, e algumas células da própria planilha têm fórmulas sem valor editorial utilizável. Nenhum conteúdo fictício foi criado para preencher essas lacunas.

## Estado inicial encontrado

- O diretório pai `AssemblyFlow` não é repositório Git; o repositório correto é `AssemblyFlow-FrontEnd`.
- O trabalho começou em `develop`, na base `bfb5fde3efc64a59d18475f5b46fd20cdc4432cb`, com alterações locais relacionadas ao fluxo de assembleias já presentes. Elas foram preservadas e consolidadas no branch isolado.
- A compilação inicial funcionava.
- A suíte Cypress inicial não iniciava corretamente por configuração de component testing incompatível.
- Havia ambiguidade real no menu: a verificação por `includes()` fazia `/t-t-br` também corresponder a `t-t`.
- O gerador de PDF existente rasterizava a interface; isso prejudicava texto selecionável, paginação e qualidade de impressão.

## Fonte Excel e áreas oficiais

| Documento | Planilha | Área de impressão | Estado |
|---|---|---:|---|
| Carta Geral | `CG` | `D8:S49` | oficial |
| Carta Donativos | `DM` | `B5:J46` | oficial |
| Pioneiros | `Pio` | `B3:I64` | oficial; data da fórmula sem valor utilizável |
| Programa CA-co | `Ass-co` | `C3:P69` | oficial |
| Discurso CA-co | `Disc-co` | `D3:U42` | oficial |
| Discurso B CA-co | `DiscB-co` | `D3:U42` | oficial |
| Presidência/Oração CA-co | `Pr-Or-co` | `C2:T55` | oficial |
| Presidência/Oração B CA-co | `Pr-Or-B-co` | `C2:T55` | oficial |
| Transição tarde CA-co | `T-T` | `C3:U61` | oficial |
| Programa CA-br | `Ass-br` | `C3:P57` | oficial |
| Discurso CA-br | `Disc-br` | `D3:U42` | oficial |
| Discurso B CA-br | `DiscB-br` | `D3:U42` | oficial |
| Presidência/Oração CA-br | `Pr-Or-br` | `C2:T55` | oficial |
| Presidência/Oração B CA-br | `Pr-Or-B-br` | `C2:T55` | oficial |
| Transição tarde CA-br | `T-T-br` | `C3:U59` | oficial |

`T-M` e `T-M-br` foram mantidos para não quebrar o produto existente, mas estão marcados no registro como `legacy-unverified`: essas planilhas não existem na fonte recebida e precisam de definição editorial oficial.

## Implementação realizada

### Modelo, isolamento e persistência

- Registro central com ID, rota, variante, planilha, área de impressão, papel, orientação, versão e estado da fonte.
- Chaves independentes no formato `assemblyflow:document:<id>:v3`, incluindo as chaves distintas `assemblyflow:document:t-t:v3` e `assemblyflow:document:t-t-br:v3`.
- Metadados do projeto em `assemblyflow:project:v3`; dados pessoais e composição do circuito da versão anterior são preservados, enquanto datas e programas passam a usar os valores correntes da fonte oficial.
- Restauração limitada ao documento selecionado; não apaga os demais.
- Horários normalizados para `HH:mm`, com preservação dos horários fixos da planilha quando eles incluem ajustes que não correspondem à soma simples das durações.
- Conteúdo oficial crítico de `T-T` e `T-T-br` reconciliado separadamente, incluindo datas, presidentes, anúncios e encerramentos.
- Campos quebrados da fonte não foram copiados como `0`, `#NAME?` ou `#REF!`; quando necessário foi usado `Data a confirmar` ou campo editável.

### Interface e identidade

- Navegação por igualdade exata de rota, eliminando a seleção ambígua entre `T-T` e `T-T-br`.
- Área de edição separada da prévia A4 e ações explícitas de restaurar e baixar PDF.
- Seletor de estrutura do circuito com os modos `Único` e `Partes A e B`; `Ass-br` inicia como circuito único, enquanto a Parte B permanece preservada e reaparece apenas ao escolher o modo dividido.
- Layout desktop responsivo e sem largura mínima fixa.
- Editor rico com barra reduzida, saneamento por lista permitida e limpeza de listeners.
- Identidade AssemblyFlow aplicada a título, manifesto, favicons e ícones de 16 a 1024 px, incluindo `.ico` preparado para uso futuro no Windows.
- Arial com fallback para Helvetica em toda a aplicação e nos documentos; nenhuma dependência de Google Fonts.
- O identificador técnico legado `Bravul` permanece apenas em `src/services/storage.js` para não invalidar armazenamento antigo. Ele não aparece na interface ou nos artefatos visuais.

### PDF

- Geração com `jsPDF`; cartas e designações usam A4 retrato com margens estáveis, quebra de páginas e rodapé com paginação.
- Os programas `Ass-co` e `Ass-br` usam A4 paisagem e tabela vetorial própria, reproduzindo a grade operacional da planilha: faixas bege, manhã/tarde, designado, congregação, controles de tempo e quadro de ensaio.
- No modo único, o PDF remove qualquer indicação de Parte A/B e usa o rodapé `ENSAIO DO PROGRAMA DA ASSEMBLEIA`.
- Elementos de interface, toolbars e controles são excluídos; valores de inputs viram texto de impressão.
- Texto permanece selecionável e extraível.
- Nomes de arquivo são previsíveis e sanitizados para Windows.
- O smoke PDF verificado apresentou `595.28 x 841.89 pt`, uma página A4, rotação 0, sem JavaScript incorporado e com toda a camada de texto extraída pelo `pdftotext`.

### Electron

- Título, ícone e tamanho mínimo atualizados para AssemblyFlow.
- `contextIsolation: true`, `nodeIntegration: false` e `sandbox: true`.
- Desenvolvimento usa `ASSEMBLYFLOW_DEV_URL` ou `http://localhost:3000`; pacote futuro aponta para `dist/index.html`.
- Nenhum instalador foi gerado, conforme solicitado.

## Verificações executadas

- `pnpm build`: **PASS**.
- `pnpm test`: **PASS — 15/15 testes**, em cinco specs.
- `git diff --check`: **PASS**.
- `node --check electron/main.js`: **PASS**.
- PDF `Ass-br` Parte A: **PASS** para A4 paisagem (`841.89 x 595.28 pt`), uma página, texto selecionável, grade vetorial, nomes, horários, quadro de ensaio e ausência de JavaScript incorporado.
- Rotas: início e os 17 documentos abriram sem erro de aplicação.
- Resoluções `1280x720`, `1366x768`, `1440x900` e `1920x1080`: sem overflow horizontal e com ação de PDF visível.
- `T-T` e `T-T-br`: datas, presidentes, horários, conteúdo, IDs e armazenamento comprovadamente distintos.

Observação do ambiente: o Cypress emitiu avisos não fatais sobre um binário auxiliar `term-size` de arquitetura incompatível e sobre não conseguir mover resultados antigos para a lixeira. O runner concluiu normalmente e retornou código 0 na execução final.

## Pendências para `PASS`

1. Fazer prova editorial humana, célula a célula, e prova visual, página a página, dos 15 PDFs oficiais contra o `.xlsm`, registrando aceite para cada documento.
2. Definir fonte oficial, textos e áreas de impressão de `T-M` e `T-M-br`, ou removê-los por decisão de produto.
3. Confirmar os valores editoriais ausentes nas fórmulas da fonte, em especial a data de `Pio` e o tema da Carta Geral, antes de congelar defaults definitivos.
4. Executar smoke test offline real após reinício da máquina e sem rede; a implementação não depende de fontes ou CDN, mas o cenário completo não foi certificado neste ciclo.
5. Em uma etapa futura e separada, definir empacotador Electron, `appId`, assinatura, instalador, atualização e QA em Windows. O ícone já está preparado, mas nenhum pacote deve ser produzido antes dessa decisão.

## Controle de entrega

- Branch separado criado; não houve merge em `main`/`develop`.
- Nenhum push ou publicação foi executado.
- Nenhum arquivo do backend foi alterado.
- A pasta de trabalho original foi apenas lida; não foi salva nem modificada.
