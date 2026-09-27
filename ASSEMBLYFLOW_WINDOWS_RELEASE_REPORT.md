# AssemblyFlow 1.0.0 — Relatório da versão Windows

## Resumo

- **STATUS:** PASS técnico para código, testes, build web, pacote Electron e geração do instalador Windows x64. A validação visual e operacional completa em um computador Windows 10/11 permanece pendente.
- **Branch:** `feat/windows-desktop-installer`
- **SHA base:** `a8f237314b15d05da41f6503976a58367c5d1f3f`
- **SHA da implementação validada pelo CI:** `276071cd2f01102ab81b34437fce54cee0a26418`
- **Tag do artefato validado:** `v1.0.0-windows-rc.4`
- **Workflow:** [Build Windows installer #4](https://github.com/JRaamos/AssemblyFlow-FrontEnd/actions/runs/36347538405)
- **Installer:** `AssemblyFlow-Setup-1.0.0-x64.exe`
- **Tamanho:** `93.034.971 bytes` (aproximadamente 88,7 MiB)
- **SHA-256 do EXE:** `a789fbdf708896385567eadae28408fe2f7ca68bf59beda51e8f9f08539f283b`
- **Assinatura:** não assinado (`signed: false`)

O commit posterior ao SHA validado pelo CI adiciona apenas este relatório. O SHA final da branch deve ser consultado com `git rev-parse HEAD` ou na resposta de entrega, pois um arquivo não consegue conter o hash do próprio commit sem alterá-lo.

## Ambiente e versões

| Componente | Versão/configuração |
| --- | --- |
| Node.js do projeto/CI | `20.19.6` |
| pnpm | `10.20.0` |
| Electron | `37.7.1` |
| electron-builder | `26.15.3` |
| Rsbuild | `1.6.0` observado no build |
| Aplicativo | `AssemblyFlow 1.0.0` |
| Plataforma alvo | Windows 10/11 x64 |
| Instalador | NSIS assistido, por usuário |
| App ID | `com.assemblyflow.desktop` |

O GitHub Actions avisou que suas próprias actions JavaScript passaram a executar internamente em Node 24. Isso não altera o Node `20.19.6` configurado para instalar, testar e compilar o projeto.

## Implementação entregue

### Runtime Electron

- Existe um único ecossistema Node/Electron, controlado pelo `package.json` raiz.
- Os antigos `electron/package.json`, lockfile e arquivos do aplicativo de exemplo foram removidos.
- Produção usa `loadFile(.../dist/index.html)`; `localhost` existe somente no fluxo explícito `desktop:dev`.
- `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true` e `webSecurity: true` permanecem ativos.
- O preload expõe somente `isDesktop` e a operação específica `savePdf`; não expõe `require`, `fs`, `child_process` ou IPC genérico.
- Navegação externa, novas janelas e webviews são bloqueados.
- DevTools são fechados quando o aplicativo está empacotado.
- `app.requestSingleInstanceLock()` impede uma segunda instância e restaura/foca a primeira.
- O menu padrão foi removido e a janela recebeu título, ícone e dimensões mínimas.

### Router e assets

- O build web preserva `BrowserRouter`.
- O aplicativo carregado por `file:` usa `HashRouter`, evitando quebra ao navegar ou reabrir rotas internas.
- O Rsbuild usa `output.assetPrefix: './'`.
- Referências locais a ícones, imagens, favicon e manifesto foram convertidas para caminhos relativos.
- `pnpm desktop:verify` confere os arquivos emitidos, os caminhos relativos, a ausência de assets HTML remotos e os controles essenciais do Electron.

### Offline e persistência

- Os fluxos principais de assembleia/documentos são empacotados no `app.asar` e não dependem de servidor local.
- O pacote de produção foi aberto com o servidor de desenvolvimento desligado, sem tela branca e com assets locais funcionando.
- A partição persistente `persist:assemblyflow` mantém o mesmo armazenamento entre execuções e futuras versões que preservem o `appId`/partition.
- Foi editado um valor no aplicativo empacotado, o processo foi encerrado completamente e, após reabrir, o valor continuou presente; o dado de teste foi restaurado depois.
- Nenhum dado do usuário é gravado dentro de `resources/app.asar`.

### PDF

- Downloads web continuam usando o comportamento do jsPDF.
- No Electron, PDFs passam por uma bridge restrita e um `Save As` nativo.
- O processo principal valida origem, tamanho máximo, cabeçalho `%PDF-`, extensão e nome seguro para Windows antes da gravação.
- Testes cobrem cartas, pioneiros, programas, A4, texto selecionável e nomes compatíveis com Windows.
- Um PDF real foi salvo pelo pacote de produção, renderizado e inspecionado em duas páginas A4, com fontes, acentuação e conteúdo legíveis, sem cortes observados.

### electron-builder e ícone

- `electron-builder.yml` define `appId`, produto, saída `release/`, ASAR, arquivos incluídos e target NSIS x64.
- O instalador permite escolher diretório, cria atalhos na área de trabalho e menu Iniciar e configura o desinstalador.
- `deleteAppDataOnUninstall: false` evita apagar automaticamente as edições locais do usuário.
- O artefato tem o nome determinístico `AssemblyFlow-Setup-1.0.0-x64.exe`.
- O `.ico` é um recurso Windows real com múltiplas resoluções; sua presença e uso no executável/installer são verificados pelo build. A aparência em Explorer, taskbar e atalhos ainda precisa de inspeção humana no Windows.
- A publicação implícita do electron-builder está desativada; tags geram somente o artifact do workflow.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `pnpm dev` | aplicação web em desenvolvimento |
| `pnpm build` | build web de produção |
| `pnpm desktop:dev` | Rsbuild local + Electron de desenvolvimento |
| `pnpm desktop:verify` | auditoria dos inputs do pacote desktop |
| `pnpm desktop:pack` | pacote Electron sem installer |
| `pnpm desktop:dist` | distribuição local sem publicação automática |
| `pnpm desktop:win` | installer NSIS Windows x64 sem publicação automática |

## CI e artefato

O arquivo `.github/workflows/build-windows.yml` suporta `workflow_dispatch` e tags `v*`. Ele executa em `windows-latest`:

1. checkout;
2. pnpm e Node configurados;
3. instalação com lockfile congelado;
4. testes de componentes;
5. build web;
6. auditoria desktop;
7. electron-builder NSIS x64;
8. cálculo de tamanho e SHA-256;
9. upload do EXE e do `windows-artifact.json`.

O workflow #4 passou em `4m52s`. O artifact `AssemblyFlow-Windows-1.0.0-x64` tem ID `10941495740` e retenção de 30 dias. O ZIP do artifact também possui digest próprio `42e047c4904340c6bf2f284da0af4f8dd7a4668f743b4ea429dc74e5cf3d7abf`; ele não deve ser confundido com o SHA-256 do EXE registrado no resumo.

O arquivo foi baixado depois do CI. O metadata e o cálculo local sobre o EXE coincidiram exatamente:

```text
file: AssemblyFlow-Setup-1.0.0-x64.exe
bytes: 93034971
sha256: a789fbdf708896385567eadae28408fe2f7ca68bf59beda51e8f9f08539f283b
signed: false
```

O arquivo foi reconhecido como executável PE GUI/instalador autoextraível Nullsoft. O executável bootstrap do NSIS pode ser PE32; o payload do Electron foi produzido explicitamente com arquitetura `x64`.

## Validações executadas

| Validação | Resultado |
| --- | --- |
| `git diff --check` | PASS |
| `pnpm test` local | PASS — 32/32 |
| `pnpm build` local | PASS |
| `pnpm desktop:verify` local | PASS |
| Electron em desenvolvimento | PASS — abriu, navegou e respeitou instância única |
| Pacote Electron de produção no macOS | PASS — abriu via `file:`, navegou, persistiu e salvou PDF |
| `electron-builder --dir` local | PASS |
| Build cruzado NSIS no macOS ARM | não aplicável: `makensis` x86_64 não executou no host ARM |
| Testes no runner Windows | PASS — 32/32 |
| Build web no runner Windows | PASS |
| Auditoria desktop no runner Windows | PASS |
| Build NSIS Windows x64 | PASS |
| Upload e download do artifact | PASS |
| SHA-256 do EXE | PASS — runner e arquivo baixado coincidem |

## Checklist de Windows real

O CI prova compilação, testes e criação do installer, mas não substitui uma sessão visual em Windows. Situação do checklist obrigatório:

1. Executar o installer — **PENDENTE Windows real**.
2. Escolher diretório — **CONFIGURADO; PENDENTE validação humana**.
3. Concluir instalação — **PENDENTE Windows real**.
4. Verificar atalho — **CONFIGURADO; PENDENTE inspeção**.
5. Abrir pelo atalho — **PENDENTE Windows real**.
6. Verificar ícone — **ICO e build validados; PENDENTE Explorer/taskbar/atalho**.
7. Navegar — **PASS no pacote de produção macOS; PENDENTE Windows real**.
8. Abrir `T-T` — **PASS no pacote de produção macOS; PENDENTE Windows real**.
9. Editar — **PASS no pacote de produção macOS; PENDENTE Windows real**.
10. Fechar — **PASS no pacote de produção macOS; PENDENTE Windows real**.
11. Reabrir — **PASS no pacote de produção macOS; PENDENTE Windows real**.
12. Confirmar persistência — **PASS no pacote de produção macOS; PENDENTE Windows real**.
13. Abrir `T-T-br` — **PASS no pacote de produção macOS; PENDENTE Windows real**.
14. Confirmar isolamento — **PASS em teste automatizado e pacote macOS; PENDENTE Windows real**.
15. Gerar PDF — **PASS em testes e pacote macOS; PENDENTE Windows real**.
16. Abrir PDF — **PASS com renderização local; PENDENTE Windows real**.
17. Testar `Disc-br` — **PASS em teste/preview empacotado macOS; PENDENTE Windows real**.
18. Testar Parte A/Parte B — **PASS automatizado; PENDENTE Windows real**.
19. Testar Restaurar textos — **PASS automatizado; PENDENTE Windows real**.
20. Testar sem internet — **PASS estrutural e sem servidor local no pacote macOS; PENDENTE Windows real com rede desligada**.
21. Fechar/reabrir — **PASS no pacote macOS; PENDENTE Windows real**.
22. Desinstalar — **PENDENTE Windows real**.
23. Confirmar desinstalador — **CONFIGURADO; PENDENTE Windows real**.

## Como baixar

1. Abra [Build Windows installer #4](https://github.com/JRaamos/AssemblyFlow-FrontEnd/actions/runs/36347538405).
2. Na seção **Artifacts**, baixe `AssemblyFlow-Windows-1.0.0-x64`.
3. Extraia o ZIP.
4. Confira o SHA-256 do `AssemblyFlow-Setup-1.0.0-x64.exe` antes de instalar.

Uma cópia já foi baixada e conferida localmente em:

```text
/Users/jonathanfebraio/Downloads/AssemblyFlow-Setup-1.0.0-x64.exe
```

## Assinatura e limitações

Não foi criado ou incorporado certificado. O Windows pode mostrar **Unknown publisher** e o SmartScreen pode exibir alerta por ausência de assinatura/reputação. Nenhum PFX, senha, token ou segredo foi adicionado ao repositório.

A entrega não deve ser marcada como aprovação visual final até a conclusão dos 23 itens acima em Windows 10/11 real. O instalador, o target x64, o desinstalador, os atalhos e os recursos de ícone foram produzidos/configurados, mas a aparência e a integração do shell exigem verificação no sistema alvo.

## Próximos passos

1. Executar o checklist em Windows 10 e/ou 11 x64 e registrar evidências.
2. Após aprovação, fazer merge da branch na `main`; nenhum merge foi feito nesta entrega.
3. Configurar assinatura Authenticode em GitHub Secrets quando houver certificado oficial.
4. Gerar uma tag final aprovada e considerar uma Release, mantendo o workflow separado de publicação automática.
