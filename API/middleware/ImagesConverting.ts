import { NextFunction, Response } from 'express';
import Image from '~/models/Image';
import logger from '~/util/Logger';


// export const imagesConvert = async(req, res, next) => {
//     if (!req.body.images || !req.body.images.length ) {
//         return next();
//     }

//     const images = await createImages(req);

//     let imageIds: Array<String> = [];
//     try {
//         for (let i=0; i < images.length; i++) {
//             let image = await images[i].save();
//             imageIds.push(image._id);
//         }
//     }
//     catch (err) {
//         logger.error(err)
//         res.status(500).json({ message: `Error when creating images` })
//         return err;
//     }
//     req.body.images = imageIds;
//     return next()
// }

// const createImages = (req) => {
//     let imageModels: Array<any> = [];
//     try {
//         for (let i=0; i < req.body.images.length; i++) {
//             imageModels.push(new Image(req.body.images[i]));
//         }
//     } catch (err) {
//         logger.error(err);
//         return err;
//     }

//     return imageModels;
// }

const isImage = (file: any) => {
    const ext = file.detectedFileExtension
    return (ext === '.png' || ext === '.jpg' || ext === '.jpeg')
}

export const imagesConvert = (req: any, res: Response, next: NextFunction) => {
    console.log("This is the request: ", req)
    // console.log("This is the req.file: ", req.file);
    // console.log("This is the body: ", req.body)
    if (!req.file) {
        return next();
    }

     if(isImage(req.file)) {
        // Upload image
        next();
     }else {
        res.status(400).json({message: "Only images are allowed"});
     }
     res.end();

}