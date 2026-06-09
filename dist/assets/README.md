# SEVEN Services — Pacote de Assets

Pacote completo de identidade visual e configuração PWA para o backoffice SEVEN Services.

---

## Como usar

### 1. Descompactar dentro do projeto

Extraia o conteúdo deste ZIP para **dentro da pasta do seu projeto** (a mesma pasta que está sincronizada com o GitHub), de modo que a estrutura fique assim:

```
seu-projeto/
├── index.html
├── manifest.json            ← fica na RAIZ do projeto
├── assets/
│   ├── logos/
│   ├── parceiros/
│   └── social/
└── ...
```

**Importante:** o `manifest.json` precisa ficar na **raiz** do projeto (mesmo nível do `index.html`), não dentro de `assets/`. Já a pasta `assets/` inteira vai no lugar dela.

### 2. Integrar as tags no HTML

Abra o arquivo `_snippet-head.html` incluído neste pacote. Copie todo o conteúdo dele e cole dentro da tag `<head>` do seu `index.html`. Pronto — favicon, PWA e previews de partilha já estão configurados.

### 3. Colores e fontes da marca

- **Azul marinho (primário):** `#0A1C44`
- **Dourado (accent):** `#F1C46B` — variações: `#F8D378` (claro), `#D9974B` (médio), `#A36A3F` (escuro)
- **Tipografia:** Moraco Regular (títulos) / Industry (texto)

---

## Inventário de arquivos

### `/logos/` — Logos da SEVEN

| Arquivo | Quando usar |
|---|---|
| `seven-logo-horizontal.png` | **Logo principal.** Header, rodapé, papel timbrado. Fundo transparente, cores originais (azul + dourado). |
| `seven-logo-horizontal-fundo-azul.png` | Quando o design já tem fundo escuro e você quer o bloco fechado com moldura azul. |
| `seven-logo-horizontal-fundo-dourado.png` | Destaques, banners promocionais, capas de apresentação. |
| `seven-logo-horizontal-preto.png` | Monocromática — uso em faxes, impressões P&B, documentos oficiais. |
| `seven-icon.png` | Ícone isolado (sem texto). Uso em espaços pequenos ou quando a marca já está identificada. |
| `seven-icon-preto.png` | Versão monocromática do ícone. |
| `seven-selo-circular.png` | Perfil de redes sociais (Instagram, LinkedIn, WhatsApp Business). |

### `/logos/favicons/` — Ícones do navegador

| Arquivo | Função |
|---|---|
| `favicon.ico` | Favicon multi-tamanho (16/32/48). Compatibilidade universal. |
| `favicon-16x16.png` | Aba do navegador. |
| `favicon-32x32.png` | Aba do navegador (ecrãs retina). |
| `favicon-48x48.png` | Atalho do Windows. |
| `apple-touch-icon.png` | Ícone quando adicionado à home screen do iPhone/iPad (180×180). |

### `/logos/pwa-icons/` — Ícones de instalação como app

| Arquivo | Função |
|---|---|
| `icon-72x72.png` → `icon-512x512.png` | Tamanhos padrão do PWA. O Chrome escolhe o apropriado automaticamente. |
| `icon-maskable-192x192.png` / `icon-maskable-512x512.png` | **Android Adaptive Icons.** Têm margem extra para o sistema poder recortar em círculo, quadrado ou pétala sem cortar o logo. |

### `/parceiros/` — Logos dos organismos públicos

| Arquivo | Organismo |
|---|---|
| `at-autoridade-tributaria.png` | Autoridade Tributária e Aduaneira |
| `aima.png` | Agência para a Integração, Migrações e Asilo |
| `imt.png` | Instituto da Mobilidade e dos Transportes |
| `seguranca-social.png` | Segurança Social |

Uso: secção de serviços do site, para identificar visualmente cada categoria (AT, AIMA, IMT, SS).

### `/social/` — Partilha em redes sociais

| Arquivo | Função |
|---|---|
| `og-image.jpg` | Imagem 1200×630 que aparece quando alguém partilha o link do site em WhatsApp, LinkedIn, Facebook, etc. |

### Arquivos na raiz do pacote

| Arquivo | Função |
|---|---|
| `manifest.json` | Configuração PWA — mover para a raiz do projeto. |
| `_snippet-head.html` | Snippet HTML pronto para colar no `<head>`. **Não é para servir como página** — é só referência. |

---

## Testar se o PWA ficou instalável

Após publicar o site:

1. Abra o site no **Chrome** (desktop ou Android).
2. Clique no ícone de instalação que aparece na barra de endereço (ícone de monitor com seta para baixo), ou no menu ⋮ → "Instalar SEVEN Services".
3. O app é instalado e passa a ter ícone no desktop/home screen dos colaboradores.

**Requisito técnico:** o site precisa estar servido via HTTPS (GitHub Pages e Vercel já fazem isso automaticamente).

Se o ícone de instalar não aparecer, abra o DevTools (F12) → aba "Application" → "Manifest" — lá ele diz exatamente o que está em falta.
