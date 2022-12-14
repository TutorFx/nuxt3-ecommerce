import Product from "../models/product"
export default defineEventHandler(async (event) => {
  try {
    const {slug} = getQuery(event);
    const product = await Product.findOne({slug})
    return {product}
  } catch (err) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: err })
    );
  }
});
