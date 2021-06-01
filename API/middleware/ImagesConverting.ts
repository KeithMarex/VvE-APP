import 'dotenv/config'
import { NextFunction, Response } from 'express';
import Image from '~/models/Image';
import logger from '~/util/Logger';
import path from 'path'
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios'

const uploadImages = async(base64) => {
    let form = new FormData();
    form.append("image", base64);
    console.log(form);
    let response;
    try {
        response = await axios.post(process.env.URL_IMGBB, form, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
            }
        })
    }catch (err) {
        logger.error(err);
        return err;
    }
    return {image: response.data.data.display_url, delete: response.data.data.delete_url};
}

const createImages = async(files) => {
    let imageIds: Array<any> = [];
    try {
        for(let key in files) {
            if (files.hasOwnProperty(key)) {
                let file = files[key]
                let base64 = fs.readFileSync(file.path, {encoding: 'base64'});
                let imageUrl = await uploadImages(base64);
                let image = new Image({ "name": file.name, "image_url": imageUrl.image, "delete_url": imageUrl.delete })
                let imageModel = await image.save();
                imageIds.push(imageModel._id);
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
        console.log('IS BESTAND');
        const imageIds = await createImages(req.files);
        console.log(imageIds)
        if (imageIds.err === true) {
            return res.status(500).json({message: imageIds.message})
        }
        res.locals.images = imageIds.images;
        return next();
    }else {
        return res.status(400).json({message: "Only images are allowed"});
    }
}
