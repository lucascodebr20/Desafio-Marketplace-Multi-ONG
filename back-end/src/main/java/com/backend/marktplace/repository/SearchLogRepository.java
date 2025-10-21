package com.backend.marktplace.repository;

import com.backend.marktplace.entity.SearchLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchLogRepository extends JpaRepository<SearchLogEntity,Long> {

}
