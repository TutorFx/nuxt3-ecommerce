import { sendError } from "h3";
import User from "../../models/user";
import {generateToken} from "../../utils/token"
import bcrypt from "bcryptjs"

import {typedUser} from "~/types/common/user"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  const user:typedUser = await User.findOne({ email }).select("+password");

  if (user == null) {
    console.log("User not found");
    return sendError(
      event, createError({ statusCode: 400, statusMessage: "User not found" })
    );
  } else {
    //
    if (!(await bcrypt.compare(password, user.password))) {
      return sendError(
        event, createError({ statusCode: 400, statusMessage: "Invalid login or password" })
      );
    } else {
      //Generate token
      const token = generateToken({ id: user.id })
      setCookie(event, 'token', token )
      user.password = undefined!;
      return { user, token };
    }
  }

});
