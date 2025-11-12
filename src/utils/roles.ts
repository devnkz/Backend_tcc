export const ADMIN_EMAILS = ["lilvhx@gmail.com"]; 

export function isAdmin(role?: string | null, email?: string | null): boolean {
  if (role && role.toLowerCase() === "administrador") return true;
  if (email && ADMIN_EMAILS.includes(email.toLowerCase())) return true;
  return false;
}
