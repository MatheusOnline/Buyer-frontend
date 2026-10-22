export function cardState(status?:string) {
    if (status === 'approved') return 'approved';
    if (status === 'rejected') return 'rejected';
    if (status === 'cancelled') return 'cancelled';
    if (['refunded','charged_back'].includes(status ?? '')) return 'refunded';
    if (['pending','in_process','authorized','in_mediation'].includes(status ?? '')) return 'processing';
    return 'unknown';
}
export const cardMessages = {
    approved: {title:'Pagamento aprovado',description:'Sua compra foi confirmada. Acompanhe os próximos passos em Minhas compras.'},
    rejected: {title:'Cartão não aprovado',description:'O emissor não aprovou este pagamento. Confira os dados e o limite com seu banco. Para escolher outra forma de pagamento, volte ao carrinho e inicie um novo checkout.'},
    cancelled: {title:'Pagamento cancelado',description:'Este pagamento foi cancelado. Confira sua compra antes de iniciar um novo checkout.'},
    refunded: {title:'Pagamento devolvido ou contestado',description:'Acompanhe os detalhes em sua conta e consulte o emissor do cartão.'},
    processing: {title:'Pagamento em análise',description:'Aguardamos a confirmação do emissor. Esta página atualiza automaticamente. Aguarde antes de tentar pagar novamente.'},
    unknown: {title:'Confirmação indisponível',description:'Atualize o status antes de tentar novamente. Se houve cobrança, acompanhe a compra na sua conta.'},
};
