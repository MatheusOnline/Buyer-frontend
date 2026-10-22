# Pagamento Pix

- `api/pixApi.ts`: consulta autenticada do pagamento existente; não gera cobranças.
- `hooks/usePixPayment.ts`: cache por compra/usuário e atualização automática de status.
- `components/`: QR Code, cópia do código e estilos da tela.
- `pages/PixPage.tsx`: composição, estados e navegação para rotas existentes.
- `utils/pixPayment.ts`: estados, validade, imagem e comportamento de cópia.
- `types.ts`: contrato da resposta de pagamento.

A confirmação depende do status retornado pela consulta ao provedor. Eventos de
socket não marcam pagamentos como aprovados no cliente. A tela consulta novamente
a cada 15 segundos enquanto o status não for terminal e permite consulta manual.
Ao expirar, o código deixa de ser oferecido para pagamento, mantendo a opção de
consultar o status para quem já pagou. Um QR pode ser renderizado localmente a
partir do código existente quando a imagem fornecida estiver indisponível.
Não são chamados serviços externos de geração de QR Code.

Frontend: `npm run test:pix`.
Backend: `node --test tests/pix-read.test.cjs` usa um provedor simulado, sem cobranças.
