package com.backend.marktplace.service.search;

import com.backend.marktplace.entity.SearchLogEntity;
import com.backend.marktplace.repository.SearchLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class SearchLogService {

    @Autowired
    private SearchLogRepository searchLogRepository;

    @Async
    public void saveSearchLog(SearchLogEntity log) {
        searchLogRepository.save(log);
    }
}