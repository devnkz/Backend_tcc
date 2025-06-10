import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserController } from './controllers/users/createUserController';
import { ListUserController } from './controllers/users/listUserController';
import { DeleteUserController } from './controllers/users/deleteUserController';
import { LoginUserController } from './controllers/users/loginUserController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

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
        return new LoginUserController().handle(request, reply)
    })

}