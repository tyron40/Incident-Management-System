package com.incidentmanagement.repository;

import com.incidentmanagement.model.Service;
import com.incidentmanagement.model.SystemMetric;
import com.incidentmanagement.model.SystemMetric.MetricType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SystemMetricRepository extends JpaRepository<SystemMetric, Long> {

    List<SystemMetric> findByServiceAndMetricTypeAndTimestampBetweenOrderByTimestampAsc(
            Service service, MetricType metricType, LocalDateTime start, LocalDateTime end);

    @Query("SELECT AVG(m.value) FROM SystemMetric m WHERE m.service.id = :serviceId " +
           "AND m.metricType = :metricType AND m.timestamp >= :since")
    Double getAverageMetricValue(Long serviceId, MetricType metricType, LocalDateTime since);

    @Query("SELECT MAX(m.value) FROM SystemMetric m WHERE m.service.id = :serviceId " +
           "AND m.metricType = :metricType AND m.timestamp >= :since")
    Double getMaxMetricValue(Long serviceId, MetricType metricType, LocalDateTime since);

    @Query("SELECT FUNCTION('date_trunc', 'hour', m.timestamp) as hour, AVG(m.value) " +
           "FROM SystemMetric m " +
           "WHERE m.service.id = :serviceId " +
           "AND m.metricType = :metricType " +
           "AND m.timestamp >= :startDate " +
           "GROUP BY hour " +
           "ORDER BY hour")
    List<Object[]> getMetricsByHour(Long serviceId, MetricType metricType, LocalDateTime startDate);
}