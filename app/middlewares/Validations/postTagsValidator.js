import Tag from "../../models/Tag.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export default catchError(async (req, res, next)=>{
    
    const tags = (req.method === "GET")? JSON.parse(req.query.tags):req.body.tags;
    const tagsIds = [];

    if(Array.isArray(tags) && tags.length > 0){
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            const tagData = await Tag.findById(tag._id);
            if(!tagData){
                return next(ErrorMessage(403, "tags invalid"));
            }
            tagsIds.push(tagData._id);
        }
        req.tags = tagsIds;
    }
    next();
});