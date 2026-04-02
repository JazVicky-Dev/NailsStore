package com.nailmuse.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequestCreateDto {

    private String fullName;
    private String phone;
    private Long serviceId;
    private Boolean previousWorkRemoval;
    private Boolean nailRepair;
    private String referenceImageUrl;
    private String notes;
    private Long timeSlotId;
}