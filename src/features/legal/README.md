# Documentos públicos do comprador

Rotas públicas: `/termos-de-uso` e `/politica-de-privacidade`. Os textos são uma minuta inicial da operação atual e precisam de validação do responsável e revisão jurídica antes da publicação definitiva.

Variáveis de build Vite (valores públicos, sem segredos):

- VITE_LEGAL_NAME: razão social/nome completo do responsável.
- VITE_LEGAL_DOCUMENT: CNPJ/CPF do responsável.
- VITE_LEGAL_ADDRESS: endereço comercial completo.
- VITE_PRIVACY_EMAIL: canal de privacidade; usa VITE_SUPPORT_EMAIL ou o contato existente do rodapé como alternativa.

Sem identificação completa, as páginas mostram aviso de revisão. Não há aceite persistido no backend nem consentimento genérico de privacidade. O aviso no cadastro permite ler os documentos antes de criar a conta, sem alterar o contrato das APIs de autenticação.

Antes de publicar: confirmar identidade jurídica, canal de atendimento, fornecedores e transferências internacionais, prazos de retenção e processo operacional para devoluções e direitos de titulares. Se for necessário registrar aceite com valor probatório, implementar separadamente versão e data no backend, inclusive no cadastro social; um checkbox isolado no navegador não comprova esse registro.

Fontes consultadas em 27/10/2026: LGPD (Lei 13.709/2018), CDC (Lei 8.078/1990) e Decreto 7.962/2013, disponíveis nos links das páginas. As descrições operacionais foram baseadas no código existente do ComprasLocal.

Identificação fornecida pelo responsável em 27/10/2026: ComprasLocal LTDA, CNPJ 56.031.460/0001-31, Rua Alexandre Ceranto, 2898. Canal informado: suporte@compraslocal.com. Esses valores são o padrão público e podem ser substituídos pelas variáveis de build. A identificação foi preenchida; isso não representa validação jurídica dos documentos.
