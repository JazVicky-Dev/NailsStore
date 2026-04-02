package com.nailmuse.backend.repository;

import com.nailmuse.backend.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findByDateOrderByTimeAsc(LocalDate date);
}