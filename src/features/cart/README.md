# Carrinho do comprador

- `api/cartApi.ts`: contratos HTTP e tratamento de sessão expirada.
- `hooks/useCart.ts`: consultas, mutações e invalidação do cache.
- `components/`: item do carrinho e estilos compartilhados.
- `pages/CartPage.tsx`: seleção de itens e composição da tela.
- `utils/cartTotals.ts`: cálculo em centavos e mensagens de erro.
- `types.ts`: item identificado pela linha do carrinho, com produto e SKU separados.

Os serviços antigos reexportam os hooks para manter compatibilidade com os cards.
O backend valida estoque, propriedade e preço atual; o checkout recebe `cart_item_ids`.
O total exibido considera apenas produtos selecionados e disponíveis, sem frete.

Frontend: `npm run test:cart`.
Backend: `npm run test:cart` com o servidor local rodando e catálogo populado.
O teste integrado cria compradores temporários, remove seus registros ao finalizar
e não realiza pagamentos. Migração necessária: `20261021210000-cart-sku-support.js`.
