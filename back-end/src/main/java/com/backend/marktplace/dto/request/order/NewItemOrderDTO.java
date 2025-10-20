package com.backend.marktplace.dto.request.order;

public record NewItemOrderDTO (
   Long productId,
   int quantity) {}
