import { useMutation } from "@tanstack/react-query";
import { api } from "./api.ts";

/* =========================
   TYPES
========================= */

/* =========================
   GET PAYMENT DATA
========================= */

export { usePixPayment as useGetPaymentData } from "../features/pix/hooks/usePixPayment.ts";

/* =========================
   PIX
========================= */

const fetchPixData = async (checkout_id: string) => {
  const { data } = await api.post("/payment/pix", {
    checkout_id,
  });

  return data;
};

export function usePixGenerate() {
  return useMutation({
    mutationFn: fetchPixData,
  });
}

export { useCardGenerate } from "../features/card/hooks/useCardPayment.ts";
