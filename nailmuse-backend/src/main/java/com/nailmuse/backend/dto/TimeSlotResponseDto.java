package com.nailmuse.backend.dto;

import com.nailmuse.backend.enums.SlotStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class TimeSlotResponseDto {

    private Long id;
    private LocalDate date;
    private LocalTime time;
    private SlotStatus status;
}