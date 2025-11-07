import { FastifyRequest, FastifyReply } from "fastify";
import { CheckEmailService } from "../../services/users/checkEmailService";

class CheckEmailController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const email = (request.query as any)?.email as string;

    if (!email) return reply.status(400).send({ message: "Email is required" });

    try {
      const service = new CheckEmailService();
      const result = await service.execute(email);
      return reply.send(result);
    } catch (error: any) {
      console.error("CheckEmailController error:", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export { CheckEmailController };
