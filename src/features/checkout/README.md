# Checkout do comprador

- `api/checkoutApi.ts`: leitura da compra e operações de endereço.
- `hooks/useCheckout.ts`: consultas e invalidação dos dados após seleção/cadastro.
- `components/`: produtos, formulário de endereço, seleção de endereço, pagamento e estilos.
- `pages/CheckoutPage.tsx`: composição das etapas, estado da compra e navegação.
- `utils/checkoutValidation.ts`: validação de endereço, normalização e mensagens.
- `types.ts`: contratos do checkout e dos endereços.

A página mantém os preços e nomes de variações registrados pelo servidor.
Cadastro de endereço e seleção no checkout são operações distintas: se apenas a
vinculação falhar, o endereço criado continua na lista para nova seleção.
Campos opcionais vazios são omitidos para respeitar a validação do backend.
Checkouts pagos, cancelados, expirados ou com pagamento iniciado ficam protegidos
contra alteração de endereço. A interface mostra o estado e oferece navegação adequada.
Pix e cartão usam a integração de pagamentos existente. Os testes não realizam cobranças.
Não há consulta automática a serviços externos de CEP.

Frontend: `npm run test:checkout`.
Backend: `npm run test:cart` inclui os testes de endereço, propriedade e expiração.
