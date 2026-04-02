package com.nailmuse.backend.service;

import com.nailmuse.backend.dto.ServiceResponseDto;
import com.nailmuse.backend.model.ServiceEntity;
import com.nailmuse.backend.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceEntityService {

    private final ServiceRepository serviceRepository;

    public ServiceEntityService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceResponseDto> getAllActiveServices() {
        List<ServiceEntity> services = serviceRepository.findAll();

        return services.stream()
                .filter(service -> Boolean.TRUE.equals(service.getActive()))
                .map(service -> new ServiceResponseDto(
                        service.getId(),
                        service.getName(),
                        service.getActive(),
                        service.getAllowsNailRepair()
                ))
                .toList();
    }
}