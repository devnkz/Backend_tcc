import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from './utils/verifyToken';
import { upload } from './config/multer';

// Import da autenticação
import { authenticate } from './middleware/auth';

//imports Usuarios

import { CreateUserController } from './controllers/users/createUserController';
import { ListUserController } from './controllers/users/listUserController';
import { ListUserIdController } from './controllers/users/listUserIdController';
import { DeleteUserController } from './controllers/users/deleteUserController';
import { LoginUserController } from './controllers/users/loginUserController';
import { UpdateUserController } from './controllers/users/updateUserController';
import { UpdateFotoPerfilController } from './controllers/users/UpdateFotoPerfilController';
import { DeleteFotoPerfilController } from './controllers/users/deleteFotoPerfilController';
import { CheckEmailController } from './controllers/users/checkEmailController';
import { CheckTextController } from './controllers/users/checkTextController';
import { CheckApelidoController } from './controllers/users/checkApelidoController';

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

//imports Resposta

import { CreateRespostaController } from './controllers/resposta/createResposta';
import { ListRespostaController } from './controllers/resposta/listResposta';
import { UpdateRespostaController } from './controllers/resposta/updateResposta';
import { DeleteRespostaController } from './controllers/resposta/deleteResposta';

//imports Grupo

import { CreateGrupoController } from './controllers/grupo/createGrupo';
import { ListGruposDoUsuarioController } from './controllers/grupo/listGrupoByUser';
import { ListGruposByIdController } from './controllers/grupo/listGrupoById';
import { ListGrupoController } from './controllers/grupo/listGrupo';
import { UpdateGrupoController } from './controllers/grupo/updateGrupo';
import { DeleteGrupoController } from './controllers/grupo/deleteGrupo';
import { RemoveMembroController } from './controllers/grupo/removerMembroController';
import { LeaveGrupoController } from './controllers/grupo/leaveGrupoController';

//imports Curso

import { CreateCursoController } from './controllers/curso/createCurso';
import { ListCursoController } from './controllers/curso/listCurso';
import { UpdateCursoController } from './controllers/curso/updateCurso';
import { DeleteCursoController } from './controllers/curso/deleteCurso';

//imports denuncias

import { CreateDenunciaController } from './controllers/denuncias/createDenunciaController';
import { UpdateDenunciaController } from './controllers/denuncias/updateDenunciaController';
import { ListDenunciaController } from './controllers/denuncias/listDenunciaController';
import { DeleteDenunciaController } from './controllers/denuncias/deleteDenunciaController';
import { CheckDenunciaController } from './controllers/denuncias/checkDenunciaController';
import { GetDenunciaByIdController } from './controllers/denuncias/getDenunciaByIdController';

//imports penalidades

import { CreatePenalidadeController } from './controllers/penalidades/createPenalidadeController';
import { ListPenalidadeController } from './controllers/penalidades/listPenalidadeController';
import { UpdatePenalidadeController } from './controllers/penalidades/updatePenalidadeController';
import { DeletePenalidadeController } from './controllers/penalidades/deletePenalidadeController';

// Notificações

import { CreateNotificacaoController } from './controllers/notificacoes/createNotificacaoController';
import { ListNotificacaoByUserController } from './controllers/notificacoes/listNotificacaoByUserController';
import { DeleteNotificacaoController } from './controllers/notificacoes/deleteNotificacaoController';
import { UpdateNotificacaoController } from './controllers/notificacoes/updateNotificacaoController';

interface RequestParams {
  id: string;
}

export async function routes(
    fastify: FastifyInstance,
) {
    // Healthcheck simples para verificar disponibilidade do servidor
    fastify.get("/health", async (_req: FastifyRequest, reply: FastifyReply) => {
        return reply.code(200).send({ status: "ok" });
    });

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

    fastify.get("/user/check-email", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CheckEmailController().handle(request, reply)
    })

    fastify.get("/user/check-apelido", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CheckApelidoController().handle(request, reply)
    })

    fastify.post("/user/validate-text", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CheckTextController().handle(request, reply)
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

    fastify.put("/user/:id", { preHandler: [authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateUserController().handle(request, reply)
    })

    fastify.post("/user/:id/foto", { preHandler: upload.single("foto") }, async (request, reply) => {
        return new UpdateFotoPerfilController().handle(request, reply);
    });
    fastify.delete("/user/:id/foto", async (request, reply) => {
        return new DeleteFotoPerfilController().handle(request, reply);
    });

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

    fastify.delete("/pergunta/delete/:id", { preHandler: [authenticate] } ,async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePerguntaController().handle(request, reply)
    })

    fastify.put("/pergunta/:id", { preHandler: [authenticate] } ,async (request: FastifyRequest, reply: FastifyReply) => {
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

    fastify.delete("/resposta/delete/:id",{ preHandler: [authenticate] } , async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteRespostaController().handle(request, reply)
    })

    //Rotas de Grupo

    fastify.post("/grupo", async (request, reply) => {
        return new CreateGrupoController().handle(request, reply);
    });

    fastify.get("/grupo/user", { preHandler: [authenticate] }, async (req, reply) => {
        return new ListGruposDoUsuarioController().handle(req, reply);
    });

    fastify.get<{ Params: RequestParams }>("/grupo/:id",
      async (request, reply) => {
        return new ListGruposByIdController().handle(request, reply);
    });

    fastify.get("/grupo", async (request, reply) => {
        return new ListGrupoController().handle(request, reply);
    });

    fastify.put("/grupo/:id", { preHandler: [authenticate] }, async (request, reply) => {
        return new UpdateGrupoController().handle(request, reply);
    });

    fastify.delete("/grupo/:id", { preHandler: [authenticate] }, async (request, reply) => {
        return new DeleteGrupoController().handle(request, reply);
    });

    fastify.delete("/grupo/:grupoId/membro/:membroId", { preHandler: [authenticate] }, async (request, reply) => {
        return new RemoveMembroController().handle(request as any, reply);
    });

    fastify.delete("/grupo/:grupoId/sair", { preHandler: [authenticate] }, async (request, reply) => {
        return new LeaveGrupoController().handle(request as any, reply);
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

    //Rotas denuncias 

    fastify.post("/denuncia", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateDenunciaController().handle(request, reply)
    })

    fastify.get("/denuncia", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListDenunciaController().handle(request, reply)
    })

    fastify.get("/denuncia/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetDenunciaByIdController().handle(request, reply)
    })

    fastify.get("/denuncia/check", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CheckDenunciaController().handle(request, reply)
    })

    fastify.delete("/denuncia/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteDenunciaController().handle(request, reply)
    })

    fastify.put("/denuncia/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateDenunciaController().handle(request, reply)
    })

    //Rotas Notificações

    fastify.post("/notificacao", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNotificacaoController().handle(request, reply);
    })

    fastify.get("/notificacao/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListNotificacaoByUserController().handle(request, reply);
    })

    fastify.put("/notificacao/:id_notificacao", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateNotificacaoController().handle(request, reply);
    })

    fastify.delete("/notificacao/:id_notificacao", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteNotificacaoController().handle(request, reply);
    })


    //Rotas Penalidades

     fastify.post("/penalidade", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePenalidadeController().handle(request, reply)
    })

    fastify.get("/penalidade", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPenalidadeController().handle(request, reply)
    })

    fastify.put("/penalidade/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdatePenalidadeController().handle(request, reply)
    })

    fastify.delete("/penalidade/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePenalidadeController().handle(request, reply)
    })

}