import jwt from "jsonwebtoken";
import { typedToken } from "~/types/common/token";
import User from "../models/user";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const token: string | undefined = getCookie(event, "token");
    if (token) {
      const data = jwt.verify(token, process.env.PRIVATE_KEY!) as typedToken;
      if (data) {
        event.context.userId = data.id;
        try {
          let user = await User.findById(event.context.userId);
          event.context.user = user;
          //console.log(user);
          if (
            event.node.req.url?.startsWith("/api/admin") &&
            !user?.scope.includes("admin")
          )
            return sendError(
              event,
              createError({ statusCode: 401, statusMessage: "Unauthorized" })
            );
        } catch (err) {}
      } else {
        return sendError(
          event,
          createError({ statusCode: 401, statusMessage: "Invalid Token" })
        );
      }
    } else {
      if (event.node.req.url?.startsWith("/api/admin"))
        return sendError(
          event,
          createError({ statusCode: 401, statusMessage: "Unauthorized" })
        );
    }
  } catch (err) {
    return;
  }
});
