# Perfil do comprador

A rota `/profile` usa a API autenticada `/user`. A página permite editar nome, e-mail e celular; CPF e sobrenome permanecem em leitura conforme o contrato atual do backend.

- `api`: leitura e atualização, com tratamento de sessão expirada.
- `hooks`: consultas por usuário e sincronização do cadastro com a sessão após salvar.
- `components`: formulário e estilos com raios de 4 a 8px.
- `utils`: normalização, validação e mensagens.
- `pages`: layout da conta e visão geral.

O formulário preserva a digitação em falhas e não substitui os campos durante atualizações da consulta. Descartar restaura o último cadastro salvo. Dados pessoais não são registrados no console.

Os atalhos usam as rotas existentes de compras, endereços, favoritos e recuperação de senha. As implementações dessas páginas não fazem parte desta alteração. O antigo modal que afirmava ter enviado um e-mail sem executar uma solicitação foi substituído pelo acesso ao fluxo de recuperação existente.

Validação: `npm run test:profile`, build e ESLint dos arquivos alterados. A revisão visual usa dados fictícios e API substituída localmente, sem alterar contas reais.
