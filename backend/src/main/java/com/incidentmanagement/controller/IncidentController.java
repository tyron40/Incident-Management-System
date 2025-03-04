package com.incidentmanagement.controller;

import com.incidentmanagement.dto.IncidentDTO;
import com.incidentmanagement.dto.IncidentStatisticsDTO;
import com.incidentmanagement.model.Incident;
import com.incidentmanagement.model.IncidentEvent;
import com.incidentmanagement.service.IncidentEventService;
import com.incidentmanagement.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;
    private final IncidentEventService eventService;

    @GetMapping
    public ResponseEntity<Page<Incident>> getAllIncidents(Pageable pageable) {
        return ResponseEntity.ok(incidentService.getAllIncidents(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.getIncidentById(id));
    }

    @GetMapping("/incident-id/{incidentId}")
    public ResponseEntity<Incident> getIncidentByIncidentId(@PathVariable String incidentId) {
        return ResponseEntity.ok(incidentService.getIncidentByIncidentId(incidentId));
    }

    @PostMapping
    public ResponseEntity<Incident> createIncident(@Valid @RequestBody IncidentDTO incidentDTO) {
        return new ResponseEntity<>(incidentService.createIncident(incidentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable Long id, @Valid @RequestBody IncidentDTO incidentDTO) {
        return ResponseEntity.ok(incidentService.updateIncident(id, incidentDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<Incident>> getIncidentsByStatus(
            @PathVariable Incident.IncidentStatus status, Pageable pageable) {
        return ResponseEntity.ok(incidentService.getIncidentsByStatus(status, pageable));
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<Page<Incident>> getIncidentsByPriority(
            @PathVariable Incident.IncidentPriority priority, Pageable pageable) {
        return ResponseEntity.ok(incidentService.getIncidentsByPriority(priority, pageable));
    }

    @GetMapping("/assignee/{assigneeId}")
    public ResponseEntity<Page<Incident>> getIncidentsByAssignee(
            @PathVariable Long assigneeId, Pageable pageable) {
        return ResponseEntity.ok(incidentService.getIncidentsByAssignee(assigneeId, pageable));
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<Page<Incident>> getIncidentsByService(
            @PathVariable Long serviceId, Pageable pageable) {
        return ResponseEntity.ok(incidentService.getIncidentsByService(serviceId, pageable));
    }

    @GetMapping("/{incidentId}/events")
    public ResponseEntity<Page<IncidentEvent>> getIncidentEvents(
            @PathVariable Long incidentId, Pageable pageable) {
        return ResponseEntity.ok(eventService.getEventsByIncident(incidentId, pageable));
    }

    @GetMapping("/statistics")
    public ResponseEntity<IncidentStatisticsDTO> getIncidentStatistics() {
        return ResponseEntity.ok(incidentService.getIncidentStatistics());
    }
}