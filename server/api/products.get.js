import Product from "../models/product"
export default defineEventHandler(async (event) => {
  try {
    const products = await Product.find()
    return products 
  } catch (err) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: err })
    );
  }
});
