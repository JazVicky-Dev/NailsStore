package com.nailmuse.backend.service;

import com.nailmuse.backend.dto.AppointmentRequestCreateDto;
import com.nailmuse.backend.dto.AppointmentRequestResponseDto;
import com.nailmuse.backend.enums.RequestStatus;
import com.nailmuse.backend.enums.SlotStatus;
import com.nailmuse.backend.model.AppointmentRequest;
import com.nailmuse.backend.model.Client;
import com.nailmuse.backend.model.ServiceEntity;
import com.nailmuse.backend.model.TimeSlot;
import com.nailmuse.backend.repository.AppointmentRequestRepository;
import com.nailmuse.backend.repository.ClientRepository;
import com.nailmuse.backend.repository.ServiceRepository;
import com.nailmuse.backend.repository.TimeSlotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nailmuse.backend.dto.AdminAppointmentRequestResponseDto;
import java.util.List;
import com.nailmuse.backend.exception.BusinessRuleException;
import com.nailmuse.backend.exception.ResourceNotFoundException;


@Service
public class AppointmentRequestService {

    private final AppointmentRequestRepository appointmentRequestRepository;
    private final ClientRepository clientRepository;
    private final ServiceRepository serviceRepository;
    private final TimeSlotRepository timeSlotRepository;

    public AppointmentRequestService(
            AppointmentRequestRepository appointmentRequestRepository,
            ClientRepository clientRepository,
            ServiceRepository serviceRepository,
            TimeSlotRepository timeSlotRepository
    ) {
        this.appointmentRequestRepository = appointmentRequestRepository;
        this.clientRepository = clientRepository;
        this.serviceRepository = serviceRepository;
        this.timeSlotRepository = timeSlotRepository;
    }
    @Transactional
    public AppointmentRequestResponseDto createRequest(AppointmentRequestCreateDto dto) {
        System.out.println("DTO RECIBIDO:");
        System.out.println("fullName: " + dto.getFullName());
        System.out.println("phone: " + dto.getPhone());
        System.out.println("serviceId: " + dto.getServiceId());
        System.out.println("timeSlotId: " + dto.getTimeSlotId());

        Client client = clientRepository.findByPhone(dto.getPhone())
                .orElseGet(() -> {
                    Client newClient = new Client();
                    newClient.setFullName(dto.getFullName());
                    newClient.setPhone(dto.getPhone());
                    return clientRepository.save(newClient);
                });

        if (client.getId() != null) {
            client.setFullName(dto.getFullName());
            clientRepository.save(client);
        }

        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));

        TimeSlot timeSlot = timeSlotRepository.findById(dto.getTimeSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado"));
        System.out.println("SLOT ENCONTRADO:");
        System.out.println("id: " + timeSlot.getId());
        System.out.println("date: " + timeSlot.getDate());
        System.out.println("time: " + timeSlot.getTime());
        System.out.println("status: " + timeSlot.getStatus());
        if (timeSlot.getStatus() != SlotStatus.AVAILABLE) {
            throw new BusinessRuleException("El horario seleccionado no está disponible");
        }

        timeSlot.setStatus(SlotStatus.RESERVED_PENDING);
        timeSlotRepository.save(timeSlot);

        AppointmentRequest request = new AppointmentRequest();
        request.setClient(client);
        request.setService(service);
        request.setTimeSlot(timeSlot);
        request.setPreviousWorkRemoval(Boolean.TRUE.equals(dto.getPreviousWorkRemoval()));
        request.setNailRepair(Boolean.TRUE.equals(dto.getNailRepair()));
        request.setReferenceImageUrl(dto.getReferenceImageUrl());
        request.setNotes(dto.getNotes());
        request.setStatus(RequestStatus.PENDING);

        AppointmentRequest savedRequest = appointmentRequestRepository.save(request);

        return new AppointmentRequestResponseDto(
                savedRequest.getId(),
                savedRequest.getClient().getFullName(),
                savedRequest.getClient().getPhone(),
                savedRequest.getService().getName(),
                savedRequest.getTimeSlot().getDate().toString(),
                savedRequest.getTimeSlot().getTime().toString(),
                savedRequest.getStatus()
        );
    }
    public List<AdminAppointmentRequestResponseDto> getAllRequests() {
        return appointmentRequestRepository.findAllByOrderByIdDesc()
                .stream()
                .map(this::mapToAdminDto)
                .toList();
    }

    public List<AdminAppointmentRequestResponseDto> getPendingRequests() {
        return appointmentRequestRepository.findByStatusOrderByIdDesc(RequestStatus.PENDING)
                .stream()
                .map(this::mapToAdminDto)
                .toList();
    }

    @Transactional
    public AdminAppointmentRequestResponseDto acceptRequest(Long requestId) {
        AppointmentRequest request = appointmentRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitud no encontrada"));

        request.setStatus(RequestStatus.ACCEPTED);
        request.getTimeSlot().setStatus(SlotStatus.OCCUPIED);

        appointmentRequestRepository.save(request);

        return mapToAdminDto(request);
    }

    @Transactional
    public AdminAppointmentRequestResponseDto rejectRequest(Long requestId) {
        AppointmentRequest request = appointmentRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        request.setStatus(RequestStatus.REJECTED);
        request.getTimeSlot().setStatus(SlotStatus.AVAILABLE);

        appointmentRequestRepository.save(request);

        return mapToAdminDto(request);
    }

    private AdminAppointmentRequestResponseDto mapToAdminDto(AppointmentRequest request) {
        return new AdminAppointmentRequestResponseDto(
                request.getId(),
                request.getClient().getFullName(),
                request.getClient().getPhone(),
                request.getService().getName(),
                request.getTimeSlot().getDate().toString(),
                request.getTimeSlot().getTime().toString(),
                request.getPreviousWorkRemoval(),
                request.getNailRepair(),
                request.getReferenceImageUrl(),
                request.getNotes(),
                request.getStatus()
        );
    }
}