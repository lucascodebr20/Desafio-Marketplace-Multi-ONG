package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.search.SearchDTO;
import com.backend.marktplace.entity.SearchLogEntity;

public class SearchMapper {

    public static SearchDTO toSearchDTO (SearchLogEntity searchLogEntity) {
        return new SearchDTO(
                searchLogEntity.getSearchInput(),
                searchLogEntity.getGeneratedFilters(),
                searchLogEntity.isSuccess(),
                searchLogEntity.isWasFallbackApplied(),
                searchLogEntity.getItemCount(),
                searchLogEntity.getCreatedAt()
        );
    }

}
