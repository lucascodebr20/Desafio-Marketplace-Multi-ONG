package com.backend.marktplace.controller.search;

import com.backend.marktplace.dto.response.search.SearchDTO;
import com.backend.marktplace.entity.SearchLogEntity;
import com.backend.marktplace.mapper.SearchMapper;
import com.backend.marktplace.repository.SearchLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard-admin/")
public class GetSearchController {

    @Autowired
    SearchLogRepository searchLogRepository;

    @GetMapping("/search-log")
    public ResponseEntity<List<SearchDTO>> getSearchDto() {
        List<SearchLogEntity> searchLogEntityList = searchLogRepository.findAll();
        List<SearchDTO> searchDTOS = searchLogEntityList.stream().map(
                SearchMapper::toSearchDTO).toList();
        return ResponseEntity.ok(searchDTOS);
    }


}
