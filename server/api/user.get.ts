import User from "../models/user";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  if (event.context.userId) {
    try {
      let user = await User.findById(event.context.userId);
      return { user };
    } catch (err) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "You have no permission to access this page",
        })
      );
    }
  } else {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid token" })
    );
  }
});
