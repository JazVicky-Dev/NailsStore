package com.nailmuse.backend.controller;

import com.nailmuse.backend.dto.TimeSlotResponseDto;
import com.nailmuse.backend.service.TimeSlotService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nailmuse.backend.dto.AdminTimeSlotResponseDto;

import java.time.LocalDate;
import java.util.List;

@RestController
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @GetMapping("/api/time-slots")
    public List<TimeSlotResponseDto> getSlotsByDate(@RequestParam LocalDate date) {
        return timeSlotService.getSlotsByDate(date);
    }
    @GetMapping("/api/admin/time-slots")
    public List<AdminTimeSlotResponseDto> getAdminSlotsByDate(@RequestParam LocalDate date) {
        return timeSlotService.getAdminSlotsByDate(date);
    }
}