package com.backend.marktplace.infra.log;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LoggingInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        long startTime = (Long) request.getAttribute("startTime");
        long latency = System.currentTimeMillis() - startTime;
        String userId = "anonymous";
        String organizationId = "none";

        try {
            MDC.put("method", request.getMethod());
            MDC.put("path", request.getRequestURI());
            MDC.put("status", String.valueOf(response.getStatus()));
            MDC.put("latency_ms", String.valueOf(latency));
            MDC.put("userId", userId);
            MDC.put("organization_id", organizationId);
            logger.info("Request handled: {} {}", request.getMethod(), request.getRequestURI());
        } finally {
            MDC.clear();
        }
    }
}