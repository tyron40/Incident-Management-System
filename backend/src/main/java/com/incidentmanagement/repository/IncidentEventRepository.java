package com.incidentmanagement.repository;

import com.incidentmanagement.model.IncidentEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentEventRepository extends JpaRepository<IncidentEvent, Long> {

    Page<IncidentEvent> findByIncidentIdOrderByTimestampDesc(Long incidentId, Pageable pageable);
}