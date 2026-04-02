package com.nailmuse.backend.controller;

import com.nailmuse.backend.dto.AdminAppointmentRequestResponseDto;
import com.nailmuse.backend.service.AppointmentRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/appointment-requests")
public class AdminAppointmentRequestController {

    private final AppointmentRequestService appointmentRequestService;

    public AdminAppointmentRequestController(AppointmentRequestService appointmentRequestService) {
        this.appointmentRequestService = appointmentRequestService;
    }

    @GetMapping
    public List<AdminAppointmentRequestResponseDto> getAllRequests() {
        return appointmentRequestService.getAllRequests();
    }

    @GetMapping("/pending")
    public List<AdminAppointmentRequestResponseDto> getPendingRequests() {
        return appointmentRequestService.getPendingRequests();
    }

    @PutMapping("/{id}/accept")
    public AdminAppointmentRequestResponseDto acceptRequest(@PathVariable Long id) {
        return appointmentRequestService.acceptRequest(id);
    }

    @PutMapping("/{id}/reject")
    public AdminAppointmentRequestResponseDto rejectRequest(@PathVariable Long id) {
        return appointmentRequestService.rejectRequest(id);
    }
}