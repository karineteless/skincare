# Nécessaire da Karine

PWA estático (um `index.html`, sem build) para estoque de cosméticos por validade e rotina diária de skincare/haircare. Dados iniciais vêm da planilha `Cosméticos.xlsb` (abas Produtos + Esmaltes, 110 itens).

## Publicar no GitHub Pages
1. Crie o repo (ex.: `necessaire`) e suba estes arquivos na raiz.
2. Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)`.
3. Abra `https://<usuario>.github.io/necessaire/` no celular dela → Compartilhar → **Adicionar à Tela de Início**.
   - Instalado como app, o iOS não apaga o `localStorage` por inatividade (no Safari comum ele pode apagar após 7 dias sem uso).

## Modelo de dados (`localStorage['necessaire.v1']`)
| Campo | Uso |
|---|---|
| `produtos[]` | `id, regiao, tipo, etapa, marca, nome, qtd, status(fechado/uso/acabou), validade, aberto, pao, ativo` |
| `plano.noite[7]` | foco por dia da semana: `acido / retinol / hidrat / argila` |
| `plano.cabelo[7]` | `null / lavagem / tratamento` |
| `plano.anchor` | domingo de referência do cronograma capilar (Acidificação → Nutrição → Reconstrução) |
| `log[YYYY-MM-DD][manha/noite/cabelo]` | `{mode, sel{etapa:id/'skip'}, done{etapa:true}}` |
| `last[rotina:etapa]` | última escolha → vira sugestão padrão |

Validade efetiva = `min(VAL da embalagem, data de abertura + PAO)`.
Sugestão automática por etapa: indicado para o foco do dia > última escolha > FEFO (o que vence primeiro), nunca vencido.

## Roadmap
| Fase | Entrega | Como |
|---|---|---|
| 1 ✅ | Estoque, rotina visual, plano semanal, backup por texto | este repo |
| 2 | Leitura de código de barras para cadastrar | `html5-qrcode` + Open Beauty Facts (`/api/v2/product/{EAN}.json`) para preencher marca/nome |
| 3 | Sincronizar entre celulares | `data.json` no próprio repo via GitHub REST (`PUT /repos/{owner}/{repo}/contents/data.json`) com token fine-grained guardado no aparelho |
| 4 | Alerta de vencimento | GitHub Actions agendado lê `data.json` e manda e-mail/Telegram com o que vence em 30 dias |
| 5 | Etapas editáveis por rotina e rotina de corpo/unhas | trocar a função `etapas()` por modelos salvos em `plano` |
