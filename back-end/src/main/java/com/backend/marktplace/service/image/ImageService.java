package com.backend.marktplace.service.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageService {

    private final Path uploadDir = Paths.get("./uploads/images");

    public String saveImage(MultipartFile imageFile) throws IOException {

        String uniqueFileName = UUID.randomUUID().toString() + ".webp";

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path destinationFile = this.uploadDir.resolve(uniqueFileName).toAbsolutePath();
        try (InputStream inputStream = imageFile.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }

        return uniqueFileName;
    }

    public void deleteImage(String imageName) {
        try {
            Path imagePath = uploadDir.resolve(imageName).toAbsolutePath();
            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao deletar a imagem: " + imageName, e);
        }
    }

    public byte[] getImageAsBytes(String imageName) {

        try {
            Path imagePath = uploadDir.resolve(imageName).toAbsolutePath();
            if (!Files.exists(imagePath)) {
                throw new RuntimeException("Imagem não encontrada: " + imageName);}
            return Files.readAllBytes(imagePath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao ler a imagem: " + imageName, e);
        }
    }

}
