import { sendError } from "h3";
import User from "../../models/user";
import { transport } from "../../utils/mailer";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email }: { email: string } = body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: "User not found" })
      );

    //Cria um token e define um tempo de expiração de 1 hora
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });
    transport.sendMail(
      {
        to: email,
        from: "ridefyapp@gmail.com",
        subject: "Redefinição de senha",
        template: "auth/recuperacao",
        context: { token }
      },
      (err) => {
        if (err)
          // Se tudo der errado, retorna um erro
          return sendError(
            event,
            createError({
              statusCode: 400,
              statusMessage: "Cannot send forgot password email",
            })
          );
        // Se tudo der certo, retorna um status 200
      }
      );
    return { statusCode: 200, statusMessage: "Email sent" };
  } catch (err) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Cannot send forgot password email",
      })
    );
  }
});
