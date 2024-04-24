import cloudinary from "./cloudinary.js";

export const deleteFileFromCloudinary = async (path) => {
    const imagesrc = path.split("/").slice(-3).join("/").slice(0, -4)
    await cloudinary.uploader.destroy(imagesrc);
};
export const addFileToCloudinary = async (file) => {
    let { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        { folder: "Sociopedia/posts" }
    );
    return secure_url;
};