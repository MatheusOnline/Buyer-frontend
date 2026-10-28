# Resultados da busca

A página está em `features/catalog/pages/SearchPage.tsx`; a rota legada apenas reexporta a feature. Consulta e filtros continuam na URL. O serviço compartilhado productsService aceita o metadado opcional search retornado pela API. A paginação reinicia quando a consulta ou os filtros mudam.

Resultados diretos seguem por relevância. Alternativas aproximadas exibem aviso explícito. Estado vazio sugere palavras mais curtas, marca ou tipo do produto; erros de validação da API são apresentados. O cabeçalho limita o campo a 120 caracteres, igual à API. APIs antigas continuam compatíveis sem o metadado.

Publicar comprador e backend atualizados, aplicando antes a migration catalog-search no banco de destino. Verificação visual com API simulada e produtos de demonstração, além do teste integrado real da API com fixtures descartáveis.
