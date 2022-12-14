
import { v2 as _cloudinary } from "cloudinary"


const cloudinary = () => {

    _cloudinary.config({
        cloud_name: 'djmigxrfv', 
        api_key: '821474998742543',
        api_secret: process.env.CLOUDINARY_SECRET
    })

    return _cloudinary
}

export const uploadToCloudinary = (image) => {
    return new Promise((resolve, reject) => {
        console.log(image)
        cloudinary().uploader.upload(image, (error, data) => {
            if (error) {
                reject(error)
            }
            resolve(data)
        })
    })
}