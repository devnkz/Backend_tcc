import { FastifyRequest, FastifyReply } from "fastify";
import { filtrarTexto } from "../../utils/filterText";

class CheckTextController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { text } = request.body as { text?: string };
    if (!text) return reply.status(400).send({ message: "Text is required" });

    try {
      const result = filtrarTexto(text);
      return reply.send({ containsOffensive: result.contemPalavraOfensiva, filtered: result.textoFiltrado });
    } catch (error: any) {
      console.error("CheckTextController error:", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export { CheckTextController };
