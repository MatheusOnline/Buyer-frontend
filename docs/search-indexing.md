# Sitemap e rastreamento

Arquivos publicados pelo Vite diretamente na raiz:
- https://compraslocal.com.br/robots.txt
- https://compraslocal.com.br/sitemap.xml

O sitemap contém páginas públicas estáveis: início, termos e privacidade. Não inclui pesquisa, autenticação ou áreas privadas. Não há lista automática dos produtos nesta versão: essa etapa exige gerar URLs canônicas de anúncios ativos a partir do catálogo, com atualização após inclusão/remoção de produtos.

`robots.txt` orienta o rastreamento. Não substitui autenticação nem garante remoção de URLs já indexadas. Na Vercel, `X-Robots-Tag: noindex, nofollow` é enviado nas rotas de conta, autenticação, checkout, favoritos, carrinho e pesquisa. O fallback SPA preserva os arquivos públicos de SEO.

Após publicar, verificar respostas 200, o XML e o texto nas URLs acima e enviar `/sitemap.xml` no Google Search Console da propriedade correta. Se o domínio canônico mudar para www ou outro domínio, atualizar os dois arquivos públicos. Não foi realizado envio ao Search Console nesta alteração.

Referência: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec

## Acesso direto e recarregamento na Vercel

O `vercel.json` fica na raiz do comprador, ao lado do `package.json`, com framework Vite, saída `dist` e rewrite `/(.*)` para `/index.html`, conforme a orientação oficial para Vite SPA. Arquivos existentes são servidos pelo filesystem da Vercel antes do fallback; isso preserva assets, robots e sitemap.

A configuração precisa estar no commit implantado. Na Vercel, a Root Directory deve apontar para a pasta que contém esse `package.json` e `vercel.json` (vazia se o repositório já é o comprador). Publicar novamente e testar abrir diretamente e recarregar `/auth/login`, `/termos-de-uso` e `/profile/orders` (esta última exige login). Verificar também `/robots.txt` e `/sitemap.xml`. Não há alteração da API.

Fonte: https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas
