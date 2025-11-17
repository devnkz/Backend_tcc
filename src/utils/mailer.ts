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

    console.log("Email enviado:", data);
    return { sucesso: true };
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return { sucesso: false, erro: err };
  }
}
