import { FastifyReply, FastifyRequest } from "fastify";
import { CheckApelidoService } from "../../services/users/checkApelidoService";

class CheckApelidoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const apelido = (request.query as any)?.apelido;
    try {
      const service = new CheckApelidoService();
      const result = await service.execute(String(apelido || ""));
      return reply.code(200).send(result);
    } catch (err: any) {
      const status = err?.status || 400;
      return reply.code(status).send({ message: err?.message || "Erro" });
    }
  }
}

export { CheckApelidoController };
