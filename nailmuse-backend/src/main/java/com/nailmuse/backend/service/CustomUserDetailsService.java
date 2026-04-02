package com.nailmuse.backend.service;

import com.nailmuse.backend.model.AdminUser;
import com.nailmuse.backend.repository.AdminUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminUserRepository adminUserRepository;

    public CustomUserDetailsService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser adminUser = adminUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin no encontrado"));

        return new User(
                adminUser.getUsername(),
                adminUser.getPassword(),
                Boolean.TRUE.equals(adminUser.getActive()),
                true,
                true,
                true,
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
        );
    }
}