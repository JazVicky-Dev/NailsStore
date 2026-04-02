package com.nailmuse.backend.service;

import com.nailmuse.backend.dto.TimeSlotResponseDto;
import com.nailmuse.backend.enums.SlotStatus;
import com.nailmuse.backend.model.TimeSlot;
import com.nailmuse.backend.repository.TimeSlotRepository;
import org.springframework.stereotype.Service;
import com.nailmuse.backend.dto.AdminTimeSlotResponseDto;
import com.nailmuse.backend.model.AppointmentRequest;
import com.nailmuse.backend.repository.AppointmentRequestRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;
    private final AppointmentRequestRepository appointmentRequestRepository;

    public TimeSlotService(TimeSlotRepository timeSlotRepository,
                           AppointmentRequestRepository appointmentRequestRepository) {
        this.timeSlotRepository = timeSlotRepository;
        this.appointmentRequestRepository = appointmentRequestRepository;
    }

    public List<TimeSlotResponseDto> getSlotsByDate(LocalDate date) {
        List<TimeSlot> existingSlots = timeSlotRepository.findByDateOrderByTimeAsc(date);

        if (existingSlots.isEmpty()) {
            existingSlots = createDefaultSlotsForDate(date);
        }

        return existingSlots.stream()
                .map(slot -> new TimeSlotResponseDto(
                        slot.getId(),
                        slot.getDate(),
                        slot.getTime(),
                        slot.getStatus()
                ))
                .toList();
    }

    private List<TimeSlot> createDefaultSlotsForDate(LocalDate date) {
        List<LocalTime> defaultTimes = List.of(
                LocalTime.of(9, 0),
                LocalTime.of(10, 30),
                LocalTime.of(12, 0),
                LocalTime.of(14, 30),
                LocalTime.of(16, 0),
                LocalTime.of(17, 30)
        );

        List<TimeSlot> newSlots = new ArrayList<>();

        for (LocalTime time : defaultTimes) {
            TimeSlot slot = new TimeSlot();
            slot.setDate(date);
            slot.setTime(time);
            slot.setStatus(SlotStatus.AVAILABLE);
            newSlots.add(slot);
        }

        return timeSlotRepository.saveAll(newSlots);
    }
    public List<AdminTimeSlotResponseDto> getAdminSlotsByDate(LocalDate date) {
        List<TimeSlot> existingSlots = timeSlotRepository.findByDateOrderByTimeAsc(date);

        if (existingSlots.isEmpty()) {
            existingSlots = createDefaultSlotsForDate(date);
        }

        return existingSlots.stream()
                .map(slot -> {
                    AppointmentRequest request = appointmentRequestRepository
                            .findByTimeSlotId(slot.getId())
                            .orElse(null);

                    String clientName = request != null ? request.getClient().getFullName() : null;
                    String serviceName = request != null ? request.getService().getName() : null;

                    return new AdminTimeSlotResponseDto(
                            slot.getId(),
                            slot.getDate().toString(),
                            slot.getTime().toString(),
                            slot.getStatus(),
                            clientName,
                            serviceName
                    );
                })
                .toList();
    }
}