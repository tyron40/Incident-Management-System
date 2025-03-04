package com.incidentmanagement.repository;

import com.incidentmanagement.model.Incident;
import com.incidentmanagement.model.Incident.IncidentPriority;
import com.incidentmanagement.model.Incident.IncidentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    Optional<Incident> findByIncidentId(String incidentId);

    Page<Incident> findByStatus(IncidentStatus status, Pageable pageable);

    Page<Incident> findByPriority(IncidentPriority priority, Pageable pageable);

    Page<Incident> findByAssigneeId(Long assigneeId, Pageable pageable);

    Page<Incident> findByStatusAndPriority(IncidentStatus status, IncidentPriority priority, Pageable pageable);

    @Query("SELECT i FROM Incident i JOIN i.affectedServices s WHERE s.id = :serviceId")
    Page<Incident> findByAffectedServiceId(Long serviceId, Pageable pageable);

    @Query("SELECT COUNT(i) FROM Incident i WHERE i.status = :status")
    long countByStatus(IncidentStatus status);

    @Query("SELECT COUNT(i) FROM Incident i WHERE i.status = :status AND i.createdAt >= :since")
    long countByStatusSince(IncidentStatus status, LocalDateTime since);

    @Query("SELECT i.status, COUNT(i) FROM Incident i GROUP BY i.status")
    List<Object[]> countByStatusGroup();

    @Query("SELECT i.priority, COUNT(i) FROM Incident i WHERE i.status <> 'RESOLVED' GROUP BY i.priority")
    List<Object[]> countByPriorityForOpenIncidents();

    @Query("SELECT FUNCTION('date_trunc', 'day', i.createdAt) as day, COUNT(i) " +
           "FROM Incident i " +
           "WHERE i.createdAt >= :startDate " +
           "GROUP BY day " +
           "ORDER BY day")
    List<Object[]> countIncidentsByDay(LocalDateTime startDate);

    @Query("SELECT AVG(EXTRACT(EPOCH FROM (i.resolvedAt - i.createdAt))/3600) " +
           "FROM Incident i " +
           "WHERE i.resolvedAt IS NOT NULL " +
           "AND i.createdAt >= :since")
    Double getAverageResolutionTimeInHours(LocalDateTime since);
}