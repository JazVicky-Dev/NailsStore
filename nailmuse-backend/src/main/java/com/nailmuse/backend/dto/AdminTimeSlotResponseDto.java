package com.nailmuse.backend.dto;

import com.nailmuse.backend.enums.SlotStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdminTimeSlotResponseDto {

    private Long id;
    private String date;
    private String time;
    private SlotStatus status;
    private String clientName;
    private String serviceName;
}