package com.backend.marktplace.controller.product;

import com.backend.marktplace.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Blob;

@RestController
@RequestMapping("/images")
public class GetImageProductController {

    @Autowired
    ImageService imageService;

    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        byte[] imageData = imageService.getImageAsBytes(imageName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageName + "\"")
                .contentType(MediaType.valueOf("image/webp"))
                .body(imageData);
    }

}
