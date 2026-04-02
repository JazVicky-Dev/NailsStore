package com.nailmuse.backend.model;

import com.nailmuse.backend.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "appointment_requests")
@Getter
@Setter
@NoArgsConstructor
public class AppointmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "service_id")
    private ServiceEntity service;

    @Column(nullable = false)
    private Boolean previousWorkRemoval;

    @Column(nullable = false)
    private Boolean nailRepair;

    @Column(length = 500)
    private String referenceImageUrl;

    @Column(length = 1000)
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne(optional = false)
    @JoinColumn(name = "time_slot_id")
    private TimeSlot timeSlot;
}