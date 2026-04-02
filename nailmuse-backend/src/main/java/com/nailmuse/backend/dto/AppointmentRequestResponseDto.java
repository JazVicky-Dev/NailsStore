package com.nailmuse.backend.dto;

import com.nailmuse.backend.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AppointmentRequestResponseDto {

    private Long id;
    private String clientName;
    private String phone;
    private String serviceName;
    private String date;
    private String time;
    private RequestStatus status;
}