package com.nailmuse.backend.repository;

import com.nailmuse.backend.enums.RequestStatus;
import com.nailmuse.backend.model.AppointmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRequestRepository extends JpaRepository<AppointmentRequest, Long> {
    List<AppointmentRequest> findByStatusOrderByIdDesc(RequestStatus status);
    List<AppointmentRequest> findAllByOrderByIdDesc();
    Optional<AppointmentRequest> findByTimeSlotId(Long timeSlotId);
}