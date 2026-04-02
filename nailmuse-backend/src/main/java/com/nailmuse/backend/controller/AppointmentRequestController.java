package com.nailmuse.backend.controller;

import com.nailmuse.backend.dto.AppointmentRequestCreateDto;
import com.nailmuse.backend.dto.AppointmentRequestResponseDto;
import com.nailmuse.backend.service.AppointmentRequestService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointment-requests")
public class AppointmentRequestController {

    private final AppointmentRequestService appointmentRequestService;

    public AppointmentRequestController(AppointmentRequestService appointmentRequestService) {
        this.appointmentRequestService = appointmentRequestService;
    }

    @PostMapping
    public AppointmentRequestResponseDto createRequest(@RequestBody AppointmentRequestCreateDto dto) {
        return appointmentRequestService.createRequest(dto);
    }
}