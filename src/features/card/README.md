# Pagamento com cartão

O cartão é processado de forma transparente pelo Asaas. O navegador envia os dados do cartão ao backend por HTTPS; o backend cria/localiza o cliente, processa uma cobrança à vista via API e armazena apenas a referência do pagamento. Os dados do cartão não são persistidos nem registrados nos logs da aplicação.

- `api`: envio e consulta autenticados.
- `components`: campos do cartão e validações básicas de entrada.
- `hooks`: envio sem repetição automática e acompanhamento do status.
- `utils`: estados e mensagens do pagamento.
- `pages`: fluxo, endereço, produtos e resumo.

O status definitivo é conciliado pela API/webhook Asaas; apenas pagamentos confirmados marcam a compra como paga. Em caso de timeout ou resposta inconclusiva, consulte o status antes de tentar novamente.

Configure `ASAAS_API_KEY`, `ASAAS_API_BASE_URL` e `ASAAS_WEBHOOK_TOKEN` somente no backend. Use a URL Sandbox até validar a integração. Para processar cartão, publique o checkout em HTTPS e configure o proxy confiável para que o backend receba o IP real do comprador.
