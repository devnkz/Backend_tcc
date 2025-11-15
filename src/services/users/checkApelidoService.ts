import prismaClient from "../../prisma";

class CheckApelidoService {
  async execute(apelido: string) {
    const apelidoTrim = String(apelido || "").trim();
    // normalize for comparison: lowercase + remove diacritics + trim spaces
    const normalize = (s: string) =>
      String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
    const apelidoNormalized = normalize(apelidoTrim);
    // DEBUG: log values to help trace availability issues
    console.log('[DEBUG] checkApelidoService - received:', apelidoTrim);
    console.log('[DEBUG] checkApelidoService - normalized:', apelidoNormalized);
    if (!apelidoTrim || apelidoTrim.length < 3) {
      return { exists: false };
    }

    // allowed characters: letters, numbers, dot and underscore
    // special-case: trailing '.' or '_' -> return specific message
    if (/[._]$/.test(apelidoTrim)) {
      throw { status: 400, message: "Apelido inválido: não pode terminar com '.' ou '_'." };
    }
    const valid = /^(?=.{3,}$)[A-Za-z0-9](?:[A-Za-z0-9._]*[A-Za-z0-9])$/.test(
      apelidoTrim
    );
    if (!valid) {
      throw { status: 400, message: "Apelido inválido. Use letras, números, '.' ou '_' sem espaços (mínimo 3 caracteres)." };
    }

    // Compare against normalized stored values (some apelidos might have accents/case stored).
    // We normalize both sides to ensure case/diacritics-insensitive check.
    const found = await prismaClient.usuarios.findFirst({
      where: { apelido_usuario: apelidoNormalized },
    });
    // If DB contains non-normalized values, the unique constraint should be on normalized values.
    // For safety, also check raw match as a fallback.
    if (!found) {
      const fallback = await prismaClient.usuarios.findFirst({ where: { apelido_usuario: apelidoTrim } });
      console.log('[DEBUG] checkApelidoService - found (normalized):', !!found, 'fallback (raw):', !!fallback);
      return { exists: !!fallback };
    }
    console.log('[DEBUG] checkApelidoService - found (normalized):', !!found);
    return { exists: !!found };
  }
}

export { CheckApelidoService };
