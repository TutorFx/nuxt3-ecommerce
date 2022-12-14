import Product from "../../../models/product";

import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      name,
      description,
      price,
      slug,
      images,
      colors,
      sizes,
      highlights,
      details,
    } = body;

    const product = await Product.create({
      name,
      description,
      price,
      slug,
      images,
      colors,
      sizes,
      highlights,
      details,
      user: event.context.userId,
    });

    await product.save();
    return { product };
  } catch (err) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: err })
    );
  }
});
