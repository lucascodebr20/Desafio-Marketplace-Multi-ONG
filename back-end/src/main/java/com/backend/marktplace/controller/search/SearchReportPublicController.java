package com.backend.marktplace.controller.search;

import com.backend.marktplace.dto.response.search.SearchDTO;
import com.backend.marktplace.entity.SearchLogEntity;
import com.backend.marktplace.mapper.SearchMapper;
import com.backend.marktplace.repository.SearchLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchReportPublicController {

    @Autowired
    SearchLogRepository searchLogRepository;

    @GetMapping("/report")
    public ResponseEntity<List<SearchDTO>> getSearchDto() {
        Sort sortByNewest = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(0, 200, sortByNewest);
        List<SearchLogEntity> searchLogEntityList = searchLogRepository.findAll(pageable).getContent();
        List<SearchDTO> searchDTOS = searchLogEntityList.stream()
                .map(SearchMapper::toSearchDTO)
                .toList();
        return ResponseEntity.ok(searchDTOS);
    }

}



