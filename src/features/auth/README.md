# Autenticação do comprador

- `api/authApi.ts`: contratos HTTP de login, sessão e logout.
- `model/authStore.ts`: estado da sessão em memória e restauração inicial.
- `hooks/useLogin.ts`: mutation, atualização da sessão e limpeza de cache privado.
- `hooks/useLoginForm.ts`: campos, validação e envio do formulário.
- `components/`: formulário, proteção de rotas e estilos da tela.
- `pages/`: composição do login e cadastro e navegação após autenticação.
- `hooks/useRegisterForm.ts`: máscara, validação e envio do cadastro.
- `utils/`: validação, mensagens de erro e destinos internos permitidos.
- `types.ts`: contratos da feature.

As entradas antigas em `Pages/auth/login`, `Pages/auth/register`, `stores/useAuthStore` e o hook
`useLogin` de `service/authService` são compatíveis com os consumidores existentes.
Cadastro e login compartilham os estilos e a finalização de sessão.
A recuperação de senha continua nas páginas atuais e pode ser migrada posteriormente. Não há autenticação social conectada no login.
A sessão usa o cookie HTTP-only do backend; a senha não é persistida no navegador.

Validação: `npx vitest run --config vitest.auth.config.ts`.

## Login com Google e Apple

`SocialLoginButtons` aparece abaixo dos formulários de login e cadastro. `SocialAuthPage` conclui os dados obrigatórios do comprador ou confirma a senha para vincular uma conta existente. O retorno autenticado utiliza `completeAuthentication` e preserva o destino interno. As credenciais ficam somente no backend; `VITE_API_URL` continua sendo a única configuração necessária no comprador. Consulte `backend-compraslocal/docs/buyer-social-login.md` para os callbacks e variáveis dos provedores.

## Recuperação de senha

A página `ForgotPasswordPage` compõe etapas em `components/password-reset`, usa `usePasswordReset` para o fluxo em memória e `passwordResetApi` para as chamadas. Validações e mensagens ficam em `utils/passwordResetValidation`. O antigo store global e as etapas de `Pages` foram substituídos; a entrada antiga apenas reexporta a feature. Consulte `backend-compraslocal/docs/password-recovery.md` para contratos, prazos, fila de e-mail e invalidação de sessões.
