import { prisma } from "@/config";
import { Payment } from "@/protocols";

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

async function createPayment(price: number, paymentData: Payment) {
  const { ticketId, cardData } = paymentData
  const cardLastDigits = cardData.number.slice(-4)

  return prisma.payment.create({
   data: {
    ticketId,
    value: price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardLastDigits
  }
  });
}

const paymentRepository = {
  findPayment,
  createPayment
};

export default paymentRepository;