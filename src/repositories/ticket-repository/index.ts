import { prisma } from "@/config";

export async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

// export async function findTicketWithType(ticketId: number) {
//   return prisma.ticketType.findMany();
// }

export async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true,
      TicketType: true
    }
  });
}


export async function findTicketByUserId(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }
    },
    include: {
      TicketType: true
    }
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
   data: {
    status: "RESERVED",
    ticketTypeId,
    enrollmentId
  },
  include: {
    TicketType: true
  }
  });
}

const ticketRepository = {
    findTicketsTypes,
    findTicketById,
    findTicketByUserId,
    createTicket
  };

  export default ticketRepository;