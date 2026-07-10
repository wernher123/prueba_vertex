import cloudinary from '../utils/cloudinary.js';
import sharp from 'sharp';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No hay archivo" });
        }

        // Validar tamaño
        if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).json({ message: "Archivo muy grande (máx 5MB)" });
        }

        // Comprimir imagen manteniendo formato original
        const compressedImage = await sharp(req.file.buffer)
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .toBuffer();

        // Subir a Cloudinary
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

            uploadStream.end(compressedImage);
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