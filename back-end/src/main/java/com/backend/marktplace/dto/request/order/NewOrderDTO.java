package com.backend.marktplace.dto.request.order;

import java.util.List;

public record NewOrderDTO (
    List <NewItemOrderDTO> listItemOrder) { }
