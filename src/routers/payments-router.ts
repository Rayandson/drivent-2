import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postPayment, getPayment } from "@/controllers";
import { paymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(paymentSchema), postPayment);

export { paymentsRouter };