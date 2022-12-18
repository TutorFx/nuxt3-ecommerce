import Product from "../../../models/product";
import { uploadToCloudinary } from "../../../utils/cloudinary.js";

import formidable from "formidable";

import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const form = formidable();
    const response = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });
    const { fields, files } = response
    const body = JSON.parse(fields.dados);
    body.images = [];

    const filePromises = Object.keys(files).map(async key => {
      const file = files[key]

      const cloudinaryResource = await uploadToCloudinary(file.filepath)
      console.log(cloudinaryResource)
      body.images.push({src: cloudinaryResource.url, id: cloudinaryResource.public_id})
    })
    await Promise.all(filePromises)

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
