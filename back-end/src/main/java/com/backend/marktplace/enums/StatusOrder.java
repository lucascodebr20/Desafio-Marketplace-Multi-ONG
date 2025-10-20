package com.backend.marktplace.enums;

public enum StatusOrder {
    AWAITING_PAYMENT("Aguardando Pagamento"),
    PAYMENT_FAILED("Falha no Pagamento"),
    PAID("Pagamento Aprovado"),
    PROCESSING("Em Processamento"),
    SHIPPED("Enviado"),
    DELIVERED("Entregue"),
    CANCELED("Cancelado");

    private final String description;

    StatusOrder(String descricao) {
        this.description = descricao;
    }

    public String getDescription() {
        return description;
    }

}