import { notFoundError, badRequestError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

 async function getTicketsTypes() {

    const result = await ticketRepository.findTicketsTypes();

    return result;
  }

async function getTickets(userId: number) {

    const result = await ticketRepository.findTicketByUserId(userId);

    if (!result) {
      throw notFoundError();
    }

    return result;
}

async function createTicket(userId: number, ticketTypeId: number) {

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

  if(!enrollment) {
    throw notFoundError()
  }

  const ticket = await ticketRepository.createTicket(enrollment.id, ticketTypeId);

  return ticket;
}

  const ticketsService = {
    getTicketsTypes,
    getTickets,
    createTicket
  };
  
  export default ticketsService;