package com.nailmuse.backend.dto;

import com.nailmuse.backend.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdminAppointmentRequestResponseDto {

    private Long id;
    private String clientName;
    private String phone;
    private String serviceName;
    private String date;
    private String time;
    private Boolean previousWorkRemoval;
    private Boolean nailRepair;
    private String referenceImageUrl;
    private String notes;
    private RequestStatus status;
}