package com.incidentmanagement.repository;

import com.incidentmanagement.model.LogEntry;
import com.incidentmanagement.model.LogEntry.LogLevel;
import com.incidentmanagement.model.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {

    Page<LogEntry> findByServiceOrderByTimestampDesc(Service service, Pageable pageable);

    Page<LogEntry> findByServiceAndLevelOrderByTimestampDesc(Service service, LogLevel level, Pageable pageable);

    Page<LogEntry> findByServiceAndTimestampBetweenOrderByTimestampDesc(
            Service service, LocalDateTime start, LocalDateTime end, Pageable pageable);

    @Query("SELECT l.level, COUNT(l) FROM LogEntry l WHERE l.service.id = :serviceId " +
           "AND l.timestamp >= :since GROUP BY l.level")
    List<Object[]> countByLevelForService(Long serviceId, LocalDateTime since);

    @Query("SELECT l FROM LogEntry l WHERE l.service.id = :serviceId " +
           "AND l.level IN ('ERROR', 'FATAL') " +
           "AND l.timestamp >= :since " +
           "ORDER BY l.timestamp DESC")
    List<LogEntry> findRecentErrors(Long serviceId, LocalDateTime since, Pageable pageable);

    @Query("SELECT l FROM LogEntry l WHERE " +
           "LOWER(l.message) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(l.exceptionDetails) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY l.timestamp DESC")
    Page<LogEntry> searchLogs(String searchTerm, Pageable pageable);
}