import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarCodigo(email: string, codigo: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "suporte@etecestudare.top",
      to: [email],
      subject: "Seu código de verificação",
      html: `<p>Seu código é: <strong>${codigo}</strong>. Ele expira em 5 minutos.</p>`,
      text: `Seu código é: ${codigo}. Ele expira em 5 minutos.`,
    });

    if (error) throw error;
    return { sucesso: true };
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return { sucesso: false, erro: err };
  }
}

export async function enviarTokenRedefinicao(email: string, token: string) {
  try {
    const link = `${process.env.FRONTEND_URL}/forgot-password/reset-password?token=${token}`;
    const html = `
        <p>Você solicitou uma redefinição de senha.</p>
        <p>Clique no link abaixo para criar uma nova senha (válido por 15 minutos):</p>
        <a href="${link}" target="_blank">Clique aqui para redefinir sua senha</a>
        <br/><br/>
        <p>Se você não fez essa solicitação, ignore este email.</p>
      `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "suporte@etecestudare.top",
      to: [email],
      subject: "Redefinição de senha",
      html: html,
      text: `Use o link para redefinir sua senha (15min): ${link}`,
    });

    if (error) throw error;
    return { sucesso: true };
  } catch (err) {
    console.error("Erro ao enviar email de redefinição:", err);
    return { sucesso: false, erro: err };
  }
}
