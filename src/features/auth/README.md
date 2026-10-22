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
