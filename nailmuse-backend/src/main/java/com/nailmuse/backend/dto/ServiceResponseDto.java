package com.nailmuse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceResponseDto {

    private Long id;
    private String name;
    private Boolean active;
    private Boolean allowsNailRepair;
}