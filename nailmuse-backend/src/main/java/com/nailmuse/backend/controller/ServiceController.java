package com.nailmuse.backend.controller;

import com.nailmuse.backend.dto.ServiceResponseDto;
import com.nailmuse.backend.service.ServiceEntityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ServiceController {

    private final ServiceEntityService serviceEntityService;

    public ServiceController(ServiceEntityService serviceEntityService) {
        this.serviceEntityService = serviceEntityService;
    }

    @GetMapping("/api/services")
    public List<ServiceResponseDto> getServices() {
        return serviceEntityService.getAllActiveServices();
    }
}