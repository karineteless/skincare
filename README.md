# Nécessaire

App web para a rotina de skincare, o cabelo e o estoque de cosméticos. Funciona instalado na tela inicial do celular e também sem internet.

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `necessaire`) e envie **todos** os arquivos desta pasta para a raiz, incluindo a pasta `icons/`.
2. No repositório, abra **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**, depois a branch `main` e a pasta `/ (root)`. Salve.
3. Em 1 ou 2 minutos o endereço `https://SEU-USUARIO.github.io/necessaire/` fica no ar.

## Instalar no celular

- **iPhone (Safari):** abra o endereço → botão Compartilhar → **Adicionar à Tela de Início**.
- **Android (Chrome):** abra o endereço → menu ⋮ → **Instalar app** (ou *Adicionar à tela inicial*).

## Onde ficam os dados

- Na primeira abertura, o app carrega `dados-iniciais.json` (seus produtos e a rotina da planilha).
- Depois disso, tudo o que você marca fica salvo **no próprio aparelho**. Não é enviado para o GitHub.
- Para guardar uma cópia ou passar os dados para outro aparelho, use **Rotina → Backup dos dados → Exportar / Importar**.
- Apagar os dados do site no navegador ou desinstalar o app apaga os registros. Exporte um backup de vez em quando.

## Atualizar o app

Substitua o `index.html` no repositório e aumente o número em `sw.js` (ex.: `necessaire-v3` → `necessaire-v4`). Assim o celular baixa a versão nova. Seus dados continuam no aparelho.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro |
| `dados-iniciais.json` | Produtos e rotina importados da planilha (usado só na primeira abertura) |
| `manifest.webmanifest` | Nome, cores e ícone do app instalado |
| `sw.js` | Faz o app abrir sem internet |
| `icons/` | Ícones da tela inicial |
