import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";
import { Payment } from "@/protocols";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
    const { ticketId }  = req.query as Record<string, string>;

    if(!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    const ticket_id = Number(ticketId)
    const { userId } = req;

  try {
    const payment = await paymentsService.getPayment(ticket_id, userId);

    return res.status(200).send(payment);
  } catch (error) {
    console.log(error.name)
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    else if(error.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentData = req.body as Payment

  try {
    const payment = await paymentsService.createPayment(userId, paymentData);

    return res.status(200).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED)
    } else {
      return res.sendStatus(500)
    }
  }
}