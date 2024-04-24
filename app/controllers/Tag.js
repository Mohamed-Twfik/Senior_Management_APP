import Tag from "../models/Tag.js";
import { catchError } from "../utils/catchAsyncError.js";
import { ApiFeature } from "../utils/ApiFeature.js";



export const searchAllTags = catchError(async (req, res, next) => {
    const str = req.query.search || ""

    if(str.length === 0) return res.status(200).json({
        message: "All Tags",
        tags: [],
    });

    const tags = await Tag.find({tag: { $regex: '.*' + str + '.*', '$options': 'i' } });
    res.status(200).json({
        message: "All Tags",
        tags,
    });
});

export const getAllTags = catchError(async (req, res, next) => {
    
const page = req.params.page || 1;

const totalCount = await Tag.countDocuments();

const apiFeature = new ApiFeature(Tag.find(), {page}).paginate();

const tags = await apiFeature.mongooseQuery.sort({createdAt:"desc"})

res.status(200).json({
  message: "All tags",
  totalCount,
  tags,
});

});

export const getTagById = catchError(async (req, res, next) => {
    const tag = req.tag
    res.status(200).json({
        message: "Tag Found",
        tag,
    });
});

export const createTag = catchError(async (req, res, next) => {
    const { tag, description } = req.body;
    const newTag = new Tag({ tag, description, user: req.user._id });
    await newTag.save();
    res.status(200).json({
        message: "Tag Created",
        tag: newTag,
    });
});

export const updateTag = catchError(async (req, res, next) => {
    const tag = req.tag;
    const newTag = await Tag.findByIdAndUpdate(tag._id, { ...req.body }, { new: true });
    res.status(200).json({
        message: "Update Successfully",
        tag: newTag,
    });
});

export const deleteTag = catchError(async (req, res, next) => {
    const tag = req.tag;
    await Tag.findByIdAndDelete(tag._id);
    res.status(200).json({
        message: "Delete Successfully",
    });
});