# Meus endereços

A rota `/profile/address` usa cadastro, edição, definição do principal e remoção autenticados. API, hooks, componentes, tipos e validação ficam separados nesta feature.

Os formulários validam os campos e mantêm os valores em caso de falha. A lista mostra o limite de três ativos. A remoção exige confirmação; diálogos usam foco modal nativo e Escape, com fechamento bloqueado durante o envio. As mutações atualizam as consultas de endereços e checkout.

Editar pode retornar um novo ID: o backend preserva a versão antiga para as compras existentes. A tela sempre atualiza a lista após salvar. Nenhuma alteração deve sobrescrever o endereço de uma compra anterior.

Validação: `npm run test:addresses`, `npm run test:checkout`, build e ESLint dos arquivos alterados. A revisão visual utiliza dados fictícios e não altera contas reais. A implantação da API requer a migration de arquivamento documentada no backend.
