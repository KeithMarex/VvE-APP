import { NextFunction, Response } from 'express';
import Image from '~/models/Image';
import logger from '~/util/Logger';
import path from 'path'

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

const createImages = (files) => {
    let imageModels: Array<any> = [];
    try {
        for(let key in files) {
            if (files.hasOwnProperty(key)) {
                let file = files[key]
                // imageModels.push(new Image(files[key][i]));
            }
        }
    } catch (err) {
        logger.error(err);
        return err;
    }

    return imageModels;
}

const isImage = (files: any) => {
    for(let key in files) {
        if (files.hasOwnProperty(key)) {
            var file = files[key];
            let ext = path.extname(file.name).substr(1);
            console.log("This is the file: ", file)
            if (!(ext === 'png' || ext === 'jpg' || ext === 'jpeg')) {
                return false
            }
          }
    }
    return true;
}

export const imagesConvert = (req: any, res: Response, next: NextFunction) => {

    if (JSON.stringify(req.files)==JSON.stringify({})) {
        return next();
    }

    if(isImage(req.files)) {
        // Upload image
        next();
    }else {
        res.status(400).json({message: "Only images are allowed"});
    }
    res.end();

}