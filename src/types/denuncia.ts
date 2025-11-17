export interface Denuncia {
  id_denuncia: string;
  status?: string;
  resultado?: string;
  revisadoTipo?: string;
  item_denunciado?: string;
  fkId_conteudo_denunciado?: string;
  fkId_usuario_conteudo?: string;
  dataCriacao_denuncia?: string | Date;
  nivel_denuncia?: number;
  descricao?: string;
  tipo_conteudo?: string;
  usuario?: {
    id_usuario: string;
    nome_usuario?: string;
    apelido_usuario?: string;
    credibilidade_usuario?: number;
  };
}
