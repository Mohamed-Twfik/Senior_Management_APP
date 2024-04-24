import Tag from "../../models/Tag.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const validTagId = catchError(async (req, res, next)=>{
    const tagId = req.params.tagId;
    const tag = await Tag.findById(tagId);
    if (!tag) return next(ErrorMessage(403, "Invalid Id"));
    req.tag = tag;
    next();
});