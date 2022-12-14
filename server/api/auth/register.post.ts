import { sendError } from "h3";
import User from "../../models/user";
import {generateToken} from "../../utils/token"

/* return sendError(
  e, createError({ statusCode: 400, statusMessage: "Parâmetros inválidos" })
); */
export default defineEventHandler(async (event) =>  {
  const body = await readBody(event);
  const { username, email, password, name }:{username:string, email:string, password:string, name:string} = body;
  try {
    if (await User.findOne({ email }))
      return sendError(
        event, createError({ statusCode: 400, statusMessage: "User alredy exists" })
      );

    const user = await User.create(body);

    user.password = undefined!;

    const token = generateToken({ id: user.id })
    setCookie(event, 'token', token )

    return { user, token };
  } catch (err) {
    return sendError(
      event, createError({ statusCode: 400, statusMessage: "Registration failed" })
    );
  }
})