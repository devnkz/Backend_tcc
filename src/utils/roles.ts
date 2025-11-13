// Lista vazia - verificação será apenas por tipo_usuario do banco
export const ADMIN_EMAILS: string[] = []; 

export function isAdmin(role?: string | null, email?: string | null): boolean {
  if (!role) return false;
  const normalized = role.toLowerCase();
  // Aceita "admin" ou "administrador" como tipos válidos
  if (normalized === "admin" || normalized === "administrador") return true;
  if (email && ADMIN_EMAILS.includes(email.toLowerCase())) return true;
  return false;
}
