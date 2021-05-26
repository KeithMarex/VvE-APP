import { NextFunction, Response } from 'express';
import Image from '~/models/Image';
import logger from '~/util/Logger';
import path from 'path'
import fs from 'fs';
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

// function getBase64(file) {
//     file.readFileSync(encodeBase64);
//  }

const createImages = async(files) => {
    let imageIds: Array<any> = [];
    try {
        for(let key in files) {
            if (files.hasOwnProperty(key)) {
                let file = files[key]
                // let base64 = await imageToBase64(file.path);
                let base64 = fs.readFileSync(file.path, {encoding: 'base64'});
                // Kijken of base 64 opgeslagen kan worden en of ik deze terug naar image kan brengen.
                console.log("This is the base64: ",base64);
                let image = new Image({ "name": file.name, "image": base64 })
                // let imageModel = await image.save();
                // imageIds.push(imageModel._id);
            }
        }
    } catch (err) {
        logger.error(err);
        return {err: true, message: err};
    }

    return {err: false, images: imageIds};
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

export const imagesConvert = async(req: any, res: Response, next: NextFunction) => {

    if (JSON.stringify(req.files)==JSON.stringify({})) {
        return next();
    }

    if(isImage(req.files)) {
        const imageIds = await createImages(req.files);
        if (imageIds.err === true) {
            return res.status(500).json({message: imageIds.message})
        }
        return res.status(200).json({message: "Vgm werkt het"})
        // return next();
    }else {
        return res.status(400).json({message: "Only images are allowed"});
    }
    res.end();

}
