import { notFoundError, badRequestError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment } from "@/protocols";
import ticketsService from "../tickets-service";

 async function getPayment(ticketId: number, userId: number) {

        const ticket = await ticketRepository.findTicketById(ticketId)

        if(!ticket) {
          throw notFoundError();
        }

        if(ticket.Enrollment.userId !== userId) {
          throw unauthorizedError(401, "Unauthorized")
        }

        const result = await paymentRepository.findPayment(ticketId);
        
        if (!result) {
          throw notFoundError();
        }

        return result;
  }

  async function createPayment(userId: number, paymentData: Payment) {

    const ticket = await ticketRepository.findTicketById(paymentData.ticketId);

     if(!ticket) {
      throw notFoundError()
    }

    if(ticket.Enrollment.userId !== userId) {
      throw unauthorizedError(401, "Unauthorized")
    }

    const payment = await paymentRepository.createPayment(ticket.TicketType.price, paymentData)
    await ticketRepository.updateStatus(ticket.id)
  
    return payment;
  }

  const paymentsService = {
    getPayment,
    createPayment
  };
  
  export default paymentsService;