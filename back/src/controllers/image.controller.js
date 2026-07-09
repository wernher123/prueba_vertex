import cloudinary from '../utils/cloudinary.js';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No hay archivo" });
        }

        // Subir a Cloudinary usando buffer
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'productos', // Carpeta en Cloudinary
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(req.file.buffer);
        });

        res.json({
            url: result.secure_url,
            message: "Imagen subida correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al subir la imagen",
            error: error.message
        });
    }
};