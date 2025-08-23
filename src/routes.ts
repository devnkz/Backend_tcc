import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from './utils/verifyToken';

// Import da autenticação
import { authenticate } from './middleware/auth';

//imports Usuarios

import { CreateUserController } from './controllers/users/createUserController';
import { ListUserController } from './controllers/users/listUserController';
import { ListUserIdController } from './controllers/users/listUserIdController';
import { DeleteUserController } from './controllers/users/deleteUserController';
import { LoginUserController } from './controllers/users/loginUserController';
import { UpdateUserController } from './controllers/users/updateUserController';

//imports Perguntas

import { CreatePerguntaController } from './controllers/pergunta/createPergunta';
import { ListPeguntaController } from './controllers/pergunta/listPergunta';
import { ListPerguntaByIdUserController } from './controllers/pergunta/listPerguntaByIdUser';
import { DeletePerguntaController } from './controllers/pergunta/deletePergunta';
import { UpdatePerguntaController } from './controllers/pergunta/updatePergunta';

//imports Tipo Usuario

import { CreateTipoUsuarioController } from './controllers/tipoUsuario/createTipoUsuario';
import { ListTipoUsuarioController } from './controllers/tipoUsuario/listTipoUsuario';

//imports Componente

import { CreateComponenteController } from './controllers/componente/createComponente';
import { ListComponenteController } from './controllers/componente/listComponente';
import { UpdateComponenteController } from './controllers/componente/updateComponente';
import { DeleteComponenteController } from './controllers/componente/deleteComponente';

//imports Tag

import { CreateTagController } from './controllers/tag/createTag';
import { ListTagController } from './controllers/tag/listTag';
import { UpdateTagController } from './controllers/tag/updateTag';
import { DeleteTagController } from './controllers/tag/deleteTag';

//imports Artigo

import { CreateArtigoController } from './controllers/artigo/createArtigo';
import { ListArtigoController } from './controllers/artigo/listArtigo';
import { UpdateArtigoController } from './controllers/artigo/updateArtigo';
import { DeleteArtigoController } from './controllers/artigo/deleteArtigo';

//imports Resposta

import { CreateRespostaController } from './controllers/resposta/createResposta';
import { ListRespostaController } from './controllers/resposta/listResposta';
import { UpdateRespostaController } from './controllers/resposta/updateResposta';
import { DeleteRespostaController } from './controllers/resposta/deleteResposta';

//imports Comentario

import { CreateComentarioController } from './controllers/comentario/createComentario';
import { ListComentarioController } from './controllers/comentario/listComentario';
import { UpdateComentarioController } from './controllers/comentario/updateComentario';
import { DeleteComentarioController } from './controllers/comentario/deleteComentario';

//imports Grupo

import { CreateGrupoController } from './controllers/grupo/createGrupo';
import { ListGruposDoUsuarioController } from './controllers/grupo/listGrupoByUser';
import { ListGrupoController } from './controllers/grupo/listGrupo';
import { UpdateGrupoController } from './controllers/grupo/updateGrupo';
import { DeleteGrupoController } from './controllers/grupo/deleteGrupo';

//imports Curso

import { CreateCursoController } from './controllers/curso/createCurso';
import { ListCursoController } from './controllers/curso/listCurso';
import { UpdateCursoController } from './controllers/curso/updateCurso';
import { DeleteCursoController } from './controllers/curso/deleteCurso';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //Rotas de Verificação de Token

    fastify.post("/verifyToken", async (request: FastifyRequest, reply: FastifyReply) => {
        return verifyToken(request, reply);
    });

    //Rotas de Usuario

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUserController().handle(request, reply)
    })

    fastify.get("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUserIdController().handle(request, reply)
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

    //Rotas de Tipo Usuario

    fastify.post("/tipousuario", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTipoUsuarioController().handle(request, reply)
    })

    fastify.get("/tipousuario", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTipoUsuarioController().handle(request, reply)
    })

    //Rotas de Pergunta

    fastify.post("/pergunta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePerguntaController().handle(request, reply)
    })

    fastify.get("/pergunta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPeguntaController().handle(request, reply)
    })

    fastify.get("/pergunta/usuario/:id", async (request, reply) => {
        return new ListPerguntaByIdUserController().handle(request, reply);
    });

    fastify.delete("/pergunta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePerguntaController().handle(request, reply)
    })

    fastify.put("/pergunta/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdatePerguntaController().handle(request, reply)
    })

    //Rotas de Componente

    fastify.post("/componente", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateComponenteController().handle(request, reply)
    })

    fastify.get("/componente", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListComponenteController().handle(request, reply)
    })

    fastify.put("/componente/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateComponenteController().handle(request, reply)
    })

    fastify.delete("/componente/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteComponenteController().handle(request, reply)
    })

    //Rotas de Tag

    fastify.post("/tag", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTagController().handle(request, reply)
    })

    fastify.get("/tag", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTagController().handle(request, reply)
    })

    fastify.put("/tag/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateTagController().handle(request, reply)
    })

    fastify.delete("/tag/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteTagController().handle(request, reply)
    })

    //Rotas de Artigo

    fastify.post("/artigo", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateArtigoController().handle(request, reply)
    })

    fastify.get("/artigo", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListArtigoController().handle(request, reply)
    })

    fastify.put("/artigo/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateArtigoController().handle(request, reply)
    })

    fastify.delete("/artigo/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteArtigoController().handle(request, reply)
    })

    //Rotas de Resposta

    fastify.post("/resposta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateRespostaController().handle(request, reply)
    })

    fastify.get("/resposta", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListRespostaController().handle(request, reply)
    })

    fastify.put("/resposta/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateRespostaController().handle(request, reply)
    })

    fastify.delete("/resposta/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteRespostaController().handle(request, reply)
    })

    //Rotas de Comentario

    fastify.post("/comentario", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateComentarioController().handle(request, reply)
    })

    fastify.get("/comentario", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListComentarioController().handle(request, reply)
    })

    fastify.put("/comentario/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateComentarioController().handle(request, reply)
    })

    fastify.delete("/comentario/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteComentarioController().handle(request, reply)
    })

    //Rotas de Grupo

    fastify.post("/grupo", { preHandler: [authenticate] }, async (request, reply) => {
        return new CreateGrupoController().handle(request, reply);
    });

    fastify.get("/grupos", { preHandler: [authenticate] }, async (req, reply) => {
        return new ListGruposDoUsuarioController().handle(req, reply);
    });

    fastify.get("/grupo/:id", { preHandler: [authenticate] }, async (request, reply) => {
        return new ListGrupoController().handle(request, reply);
    });

    fastify.put("/grupo/:id", { preHandler: [authenticate] }, async (request, reply) => {
        return new UpdateGrupoController().handle(request, reply);
    });

    fastify.delete("/grupo/:id", { preHandler: [authenticate] }, async (request, reply) => {
        return new DeleteGrupoController().handle(request, reply);
    });


    //Rotas de Curso

    fastify.post("/curso", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCursoController().handle(request, reply)
    })

    fastify.get("/curso", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCursoController().handle(request, reply)
    })

    fastify.put("/curso/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateCursoController().handle(request, reply)
    })

    fastify.delete("/curso/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCursoController().handle(request, reply)
    })

}