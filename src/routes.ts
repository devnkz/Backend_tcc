import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

//imports Usuarios

import { CreateUserController } from './controllers/users/createUserController';
import { ListUserController } from './controllers/users/listUserController';
import { DeleteUserController } from './controllers/users/deleteUserController';
import { LoginUserController } from './controllers/users/loginUserController';
import { UpdateUserController } from './controllers/users/updateUserController';

//imports Perguntas

import { CreatePerguntaController } from './controllers/pergunta/createPergunta';
import { ListPeguntaController } from './controllers/pergunta/listPergunta';
import { DeletePerguntaController } from './controllers/pergunta/deletePergunta';
import { UpdatePerguntaController } from './controllers/pergunta/updatePergunta';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //Rotas de Usuario

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUserController().handle(request, reply)
    })

    fastify.delete("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply)
    })

    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return new LoginUserController().handle(request, reply)
    })

    fastify.put("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateUserController().handle(request, reply)
    })

    //Rotas de Pergunta

    fastify.post("/pergunta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePerguntaController().handle(request, reply)
    })

    fastify.get("/pergunta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPeguntaController().handle(request, reply)
    })

    fastify.delete("/pergunta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePerguntaController().handle(request, reply)
    })

    fastify.put("/pergunta/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdatePerguntaController().handle(request, reply)
    })

}