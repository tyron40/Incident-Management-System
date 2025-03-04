package com.incidentmanagement.repository;

import com.incidentmanagement.model.Service;
import com.incidentmanagement.model.Service.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    Optional<Service> findByName(String name);

    List<Service> findByStatus(ServiceStatus status);

    @Query("SELECT s.status, COUNT(s) FROM Service s GROUP BY s.status")
    List<Object[]> countByStatusGroup();

    @Query("SELECT s FROM Service s ORDER BY s.uptime ASC")
    List<Service> findServicesWithLowestUptime(org.springframework.data.domain.Pageable pageable);
}