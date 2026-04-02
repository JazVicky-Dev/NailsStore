package com.nailmuse.backend.controller;

import com.nailmuse.backend.dto.LoginRequestDto;
import com.nailmuse.backend.dto.LoginResponseDto;
import com.nailmuse.backend.service.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        String token = jwtService.generateToken(dto.getUsername());
        return new LoginResponseDto(token);
    }
}