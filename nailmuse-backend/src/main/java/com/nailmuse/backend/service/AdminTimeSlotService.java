package com.nailmuse.backend.service;

import com.nailmuse.backend.enums.SlotStatus;
import com.nailmuse.backend.model.TimeSlot;
import com.nailmuse.backend.repository.TimeSlotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nailmuse.backend.exception.BusinessRuleException;
import com.nailmuse.backend.exception.ResourceNotFoundException;

@Service
public class AdminTimeSlotService {

    private final TimeSlotRepository timeSlotRepository;

    public AdminTimeSlotService(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    @Transactional
    public void blockSlot(Long slotId) {
        TimeSlot slot = timeSlotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado"));

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new BusinessRuleException("Solo se pueden bloquear horarios disponibles");
        }

        slot.setStatus(SlotStatus.BLOCKED);
        timeSlotRepository.save(slot);
    }

    @Transactional
    public void unblockSlot(Long slotId) {
        TimeSlot slot = timeSlotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));

        if (slot.getStatus() != SlotStatus.BLOCKED) {
            throw new BusinessRuleException("Solo se pueden desbloquear horarios bloqueados");
        }

        slot.setStatus(SlotStatus.AVAILABLE);
        timeSlotRepository.save(slot);
    }
}