import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

function title(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function main() {
  const allowed = ["aluno", "professor", "admin"] as const;

  // Ensure allowed roles exist
  const ensure: Record<(typeof allowed)[number], string> = {
    aluno: "",
    professor: "",
    admin: "",
  } as any;

  for (const role of allowed) {
<<<<<<< HEAD
    const titled = role.charAt(0).toUpperCase() + role.slice(1);
    const found = await prisma.tipousuario.findFirst({
      where: { nome_tipousuario: { in: [role, titled] } },
=======
    const found = await prisma.tipoUsuario.findFirst({
      where: { nome_tipousuario: role }, // MySQL já é case-insensitive
>>>>>>> bfc6349e475dc2fec3a5a08c1559e44e79e62429
    });

    if (found) {
      ensure[role] = found.id_tipousuario;
    } else {
      const created = await prisma.tipousuario.create({
        data: { id_tipousuario: randomUUID(), nome_tipousuario: title(role) },
      });
      ensure[role] = created.id_tipousuario;
    }
  }

<<<<<<< HEAD
  // Reassign users of non-allowed roles to a default/canonical role, then delete the extras
  const allTipos = await prisma.tipousuario.findMany();
=======
  // Reassign users of non-allowed roles to a default/canonical role, then delete extras
  const allTipos = await prisma.tipoUsuario.findMany();
>>>>>>> bfc6349e475dc2fec3a5a08c1559e44e79e62429
  const allowedIds = new Set(Object.values(ensure));
  const nonAllowed = allTipos.filter((t) => !allowedIds.has(t.id_tipousuario));

  if (nonAllowed.length > 0) {
    const defaultId = ensure["aluno"]; // fallback

    for (const t of nonAllowed) {
      const name = (t.nome_tipousuario || "").toLowerCase();
      let target = defaultId;

      if (["adm", "admin", "administrador"].includes(name)) target = ensure["admin"];
      if (["prof", "professor"].includes(name)) target = ensure["professor"];
      if (["aluno", "estudante", "estudantes"].includes(name)) target = ensure["aluno"];

      await prisma.usuarios.updateMany({
        where: { fkIdTipoUsuario: t.id_tipousuario },
        data: { fkIdTipoUsuario: target },
      });
    }

    for (const t of nonAllowed) {
      await prisma.tipousuario.delete({ where: { id_tipousuario: t.id_tipousuario } });
    }
  }

  console.log("Seed concluído: tipos válidos garantidos (Aluno, Professor, Admin)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
