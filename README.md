# AssemblyFlow

Front-end local para organizar, editar, visualizar e imprimir documentos de assembleia. O workbook de referência é usado somente durante o desenvolvimento; o aplicativo funciona sem Excel e sem conexão com a internet.

## Requisitos

- Node.js 20.19.6 ou compatível
- pnpm 10.20.0

Instale as dependências uma vez:

```sh
pnpm install --frozen-lockfile
```

## Web

Inicie o servidor web em `http://localhost:3000`:

```sh
pnpm dev
```

Gere o build web de produção:

```sh
pnpm build
```

## Desktop em desenvolvimento

O comando abaixo inicia o Rsbuild e abre o Electron com o runtime seguro usado pelo aplicativo:

```sh
pnpm desktop:dev
```

## Windows 10/11 x64

Em um host Windows, gere o instalador NSIS unsigned:

```sh
pnpm desktop:win
```

O arquivo final é criado em:

```text
release/AssemblyFlow-Setup-1.0.0-x64.exe
```

Para criar apenas o diretório desempacotado da plataforma atual ou a distribuição padrão:

```sh
pnpm desktop:pack
pnpm desktop:dist
```

O aplicativo instalado carrega `dist/index.html` diretamente, usa rotas hash no protocolo `file://` e mantém as rotas normais no build web. Os dados editados permanecem no perfil persistente do Electron, fora do `app.asar`. A geração de PDF usa uma ponte nativa restrita para abrir a janela **Salvar como**.

## Testes e verificação

```sh
pnpm test
pnpm build
pnpm desktop:verify
```

`desktop:verify` confirma assets relativos, arquivos emitidos, flags de segurança, single-instance e a remoção do Electron legado duplicado.

## GitHub Actions

1. Abra **Actions** no repositório.
2. Selecione **Build Windows installer**.
3. Clique em **Run workflow** e escolha a branch desejada.
4. Ao concluir, baixe o artifact **AssemblyFlow-Windows-1.0.0-x64**.
5. Extraia o `.exe` e o `windows-artifact.json`, que contém tamanho e SHA-256.

O workflow também roda automaticamente em tags `v*`. Ele não publica em loja nem assina o binário. Sem certificado Authenticode, o Windows pode apresentar **Unknown publisher** ou um aviso do SmartScreen.

## Documentação e Storybook

```sh
pnpm storybook
```
