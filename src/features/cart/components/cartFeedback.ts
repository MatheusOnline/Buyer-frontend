export type CartFeedbackDetail={status:"success"|"error";message:string;productTitle?:string};

const eventName="compraslocal:cart-feedback";

export function publishCartFeedback(detail:CartFeedbackDetail) {
    if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent<CartFeedbackDetail>(eventName,{detail}));
}

export function subscribeCartFeedback(listener:(detail:CartFeedbackDetail)=>void) {
    const handler=(event:Event)=>listener((event as CustomEvent<CartFeedbackDetail>).detail);
    window.addEventListener(eventName,handler);
    return ()=>window.removeEventListener(eventName,handler);
}
