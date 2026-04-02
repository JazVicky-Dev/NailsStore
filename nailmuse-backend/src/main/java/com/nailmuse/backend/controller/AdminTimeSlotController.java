package com.nailmuse.backend.controller;

import com.nailmuse.backend.service.AdminTimeSlotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/time-slots")
public class AdminTimeSlotController {

    private final AdminTimeSlotService adminTimeSlotService;

    public AdminTimeSlotController(AdminTimeSlotService adminTimeSlotService) {
        this.adminTimeSlotService = adminTimeSlotService;
    }

    @PutMapping("/{id}/block")
    public void blockSlot(@PathVariable Long id) {
        adminTimeSlotService.blockSlot(id);
    }

    @PutMapping("/{id}/unblock")
    public void unblockSlot(@PathVariable Long id) {
        adminTimeSlotService.unblockSlot(id);
    }
}