# Pagamento com cartão

A página usa o checkout autenticado como fonte do valor e mantém os dados sensíveis nos campos do Mercado Pago. O envio contém apenas o token do cartão, o método identificado pelo SDK e o identificador do checkout. Nenhum dado do formulário é registrado no console.

- `api`: envio e consulta autenticados.
- `hooks`: solicitação sem repetição automática e acompanhamento do status.
- `components`: formulário protegido, com referências estáveis para evitar reinicialização durante a digitação.
- `utils`: estados e mensagens do pagamento.
- `pages`: fluxo, endereço, produtos e resumo.

Pagamento à vista em 1x. A chave pública pode ser definida por `VITE_MERCADOPAGO_PUBLIC_KEY`; o fallback é a chave pública de testes já existente no projeto. Ela deve corresponder ao ambiente da credencial privada do backend. Nunca colocar access token em variável VITE.

O backend bloqueia o checkout durante o envio e usa uma chave de idempotência por checkout. Apenas `approved` marca a compra como paga. Uma recusa exige um novo checkout pelo carrinho; a mesma compra não cria outra cobrança. Em falha de comunicação, consultar o pagamento antes de iniciar outra compra.

Validação sem cobrança: `npm run test:card` no frontend; `node --test tests/card-payment.test.cjs tests/pix-read.test.cjs` no backend. Os testes de backend substituem o SDK por um provedor em memória.
