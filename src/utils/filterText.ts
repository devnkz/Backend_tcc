import words from "./badWordsPT.json"

export type ResultadoAnalise = {
  textoOriginal: string;
  textoFiltrado: string;
  contemPalavraOfensiva: boolean;
};

const palavras: string[] = [...words.words]

function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[@4]/g, "a")
    .replace(/3/g, "e")
    .replace(/[1!]/g, "i")
    .replace(/0/g, "o")
    .replace(/\$/g, "s")
    .replace(/(\w)\1{2,}/g, "$1"); // reduz repetições de 3+ letras
}

export function filtrarTexto(texto: string): ResultadoAnalise {
  const textoNormalizado = normalizarTexto(texto);

  // Corrigido: verificar se existe palavra no array usando some
  const contemPalavraOfensiva = palavras.some(palavra =>
    textoNormalizado.includes(palavra)
  );

  let textoFiltrado = texto;
  if (contemPalavraOfensiva) {
    textoFiltrado = texto.replace(/\b(\w+)\b/g, (palavra) =>
      palavras.some(p => normalizarTexto(palavra) === normalizarTexto(p))
        ? "*****"
        : palavra
    );
  }

  return {
    textoOriginal: texto,
    textoFiltrado,
    contemPalavraOfensiva,
  };
}

export function validarTextoOuErro(texto: string): ResultadoAnalise {
  const resultado = filtrarTexto(texto);

  if (resultado.contemPalavraOfensiva) {
    throw new Error(
      "Conteúdo impróprio detectado. Remova palavras ofensivas antes de enviar."
    );
  }

  return resultado;
}
