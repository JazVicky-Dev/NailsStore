package com.nailmuse.backend.config;

import com.nailmuse.backend.model.AdminUser;
import com.nailmuse.backend.model.ServiceEntity;
import com.nailmuse.backend.repository.AdminUserRepository;
import com.nailmuse.backend.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ServiceRepository serviceRepository,
                               AdminUserRepository adminUserRepository,
                               PasswordEncoder passwordEncoder) {
        return args -> {
            if (serviceRepository.count() == 0) {
                ServiceEntity manicura = new ServiceEntity();
                manicura.setName("Manicura");
                manicura.setActive(true);
                manicura.setAllowsNailRepair(false);

                ServiceEntity semi = new ServiceEntity();
                semi.setName("Esmaltado semipermanente");
                semi.setActive(true);
                semi.setAllowsNailRepair(true);

                ServiceEntity capping = new ServiceEntity();
                capping.setName("Capping");
                capping.setActive(true);
                capping.setAllowsNailRepair(true);

                ServiceEntity esculpidas = new ServiceEntity();
                esculpidas.setName("Esculpidas");
                esculpidas.setActive(true);
                esculpidas.setAllowsNailRepair(false);

                serviceRepository.save(manicura);
                serviceRepository.save(semi);
                serviceRepository.save(capping);
                serviceRepository.save(esculpidas);
            }

            if (adminUserRepository.count() == 0) {
                AdminUser admin = new AdminUser();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setActive(true);
                adminUserRepository.save(admin);
            }
        };
    }
}