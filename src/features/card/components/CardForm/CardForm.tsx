import { useEffect } from "react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export  function CardFormPage() {
  useEffect(() => {
    const mp = new window.MercadoPago(
      "TEST-ade81bb2-f6b3-477d-9aaa-455044cf3979",
      {
        locale: "pt-BR",
      }
    );

    const cardForm = mp.cardForm({
      amount: "100",

      form: {
        id: "form-checkout",

        cardNumber: {
          id: "cardNumber",
          placeholder: "Número do cartão",
        },

        expirationDate: {
          id: "expirationDate",
          placeholder: "MM/AA",
        },

        securityCode: {
          id: "securityCode",
          placeholder: "CVV",
        },

        cardholderName: {
          id: "cardholderName",
          placeholder: "Nome do titular",
        },

        installments: {
          id: "installments",
        },
      },

      callbacks: {
        onSubmit: async (event: Event) => {
          event.preventDefault();

          const data = cardForm.getCardFormData();

          console.log(data);

          await fetch("/api/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        },
      },
    });

    return () => {
      cardForm.unmount?.();
    };
  }, []);

  return (
    <form id="form-checkout">
      <div id="cardNumber"></div>

      <div id="expirationDate"></div>

      <div id="securityCode"></div>

      <input
        id="cardholderName"
        type="text"
        placeholder="Nome do titular"
      />

      <select id="installments"></select>

      <button type="submit">
        Finalizar compra
      </button>
    </form>
  );
}