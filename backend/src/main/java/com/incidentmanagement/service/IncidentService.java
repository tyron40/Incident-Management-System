package com.incidentmanagement.service;

import com.incidentmanagement.dto.IncidentDTO;
import com.incidentmanagement.dto.IncidentStatisticsDTO;
import com.incidentmanagement.exception.ResourceNotFoundException;
import com.incidentmanagement.model.Incident;
import com.incidentmanagement.model.IncidentEvent;
import com.incidentmanagement.model.Service;
import com.incidentmanagement.model.User;
import com.incidentmanagement.repository.IncidentRepository;
import com.incidentmanagement.repository.ServiceRepository;
import com.incidentmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class IncidentService {

    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final IncidentEventService eventService;

    @Transactional(readOnly = true)
    public Page<Incident> getAllIncidents(Pageable pageable) {
        return incidentRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incident not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public Incident getIncidentByIncidentId(String incidentId) {
        return incidentRepository.findByIncidentId(incidentId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident not found with id: " + incidentId));
    }

    @Transactional
    public Incident createIncident(IncidentDTO incidentDTO) {
        User currentUser = getCurrentUser();
        
        Incident incident = Incident.builder()
                .title(incidentDTO.getTitle())
                .description(incidentDTO.getDescription())
                .status(incidentDTO.getStatus())
                .priority(incidentDTO.getPriority())
                .reporter(currentUser)
                .build();
        
        // Set assignee if provided
        if (incidentDTO.getAssigneeId() != null) {
            User assignee = userRepository.findById(incidentDTO.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + incidentDTO.getAssigneeId()));
            incident.setAssignee(assignee);
        }
        
        // Set affected services if provided
        if (incidentDTO.getAffectedServiceIds() != null && !incidentDTO.getAffectedServiceIds().isEmpty()) {
            Set<Service> services = incidentDTO.getAffectedServiceIds().stream()
                    .map(serviceId -> serviceRepository.findById(serviceId)
                            .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId)))
                    .collect(Collectors.toSet());
            incident.setAffectedServices(services);
        }
        
        Incident savedIncident = incidentRepository.save(incident);
        
        // Create incident creation event
        eventService.createEvent(savedIncident, currentUser, IncidentEvent.EventType.CREATED, 
                "Incident created", null, null);
        
        return savedIncident;
    }

    @Transactional
    public Incident updateIncident(Long id, IncidentDTO incidentDTO) {
        User currentUser = getCurrentUser();
        Incident incident = getIncidentById(id);
        
        // Track changes for event logging
        Incident.IncidentStatus oldStatus = incident.getStatus();
        Incident.IncidentPriority oldPriority = incident.getPriority();
        User oldAssignee = incident.getAssignee();
        
        // Update basic fields
        incident.setTitle(incidentDTO.getTitle());
        incident.setDescription(incidentDTO.getDescription());
        incident.setPriority(incidentDTO.getPriority());
        
        // Update status if changed
        if (oldStatus != incidentDTO.getStatus()) {
            incident.setStatus(incidentDTO.getStatus());
            eventService.createEvent(incident, currentUser, IncidentEvent.EventType.STATUS_CHANGED,
                    "Status changed", oldStatus.name(), incidentDTO.getStatus().name());
        }
        
        // Update priority if changed
        if (oldPriority != incidentDTO.getPriority()) {
            eventService.createEvent(incident, currentUser, IncidentEvent.EventType.PRIORITY_CHANGED,
                    "Priority changed", oldPriority.name(), incidentDTO.getPriority().name());
        }
        
        // Update assignee if changed
        if (incidentDTO.getAssigneeId() != null) {
            User newAssignee = userRepository.findById(incidentDTO.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + incidentDTO.getAssigneeId()));
            
            if (oldAssignee == null || !oldAssignee.getId().equals(newAssignee.getId())) {
                incident.setAssignee(newAssignee);
                eventService.createEvent(incident, currentUser, IncidentEvent.EventType.ASSIGNEE_CHANGED,
                        "Assignee changed", 
                        oldAssignee != null ? oldAssignee.getUsername() : "Unassigned", 
                        newAssignee.getUsername());
            }
        } else if (oldAssignee != null) {
            // Unassign
            incident.setAssignee(null);
            eventService.createEvent(incident, currentUser, IncidentEvent.EventType.ASSIGNEE_CHANGED,
                    "Assignee removed", oldAssignee.getUsername(), "Unassigned");
        }
        
        // Update affected services
        if (incidentDTO.getAffectedServiceIds() != null) {
            Set<Service> oldServices = new HashSet<>(incident.getAffectedServices());
            Set<Service> newServices = incidentDTO.getAffectedServiceIds().stream()
                    .map(serviceId -> serviceRepository.findById(serviceId)
                            .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId)))
                    .collect(Collectors.toSet());
            
            // Find services to add
            for (Service service : newServices) {
                if (!oldServices.contains(service)) {
                    eventService.createEvent(incident, currentUser, IncidentEvent.EventType.SERVICE_ADDED,
                            "Service added", null, service.getName());
                }
            }
            
            // Find services to remove
            for (Service service : oldServices) {
                if (!newServices.contains(service)) {
                    eventService.createEvent(incident, currentUser, IncidentEvent.EventType.SERVICE_REMOVED,
                            "Service removed", service.getName(), null);
                }
            }
            
            incident.setAffectedServices(newServices);
        }
        
        return incidentRepository.save(incident);
    }

    @Transactional
    public void deleteIncident(Long id) {
        Incident incident = getIncidentById(id);
        incidentRepository.delete(incident);
    }

    @Transactional(readOnly = true)
    public Page<Incident> getIncidentsByStatus(Incident.IncidentStatus status, Pageable pageable) {
        return incidentRepository.findByStatus(status, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Incident> getIncidentsByPriority(Incident.IncidentPriority priority, Pageable pageable) {
        return incidentRepository.findByPriority(priority, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Incident> getIncidentsByAssignee(Long assigneeId, Pageable pageable) {
        return incidentRepository.findByAssigneeId(assigneeId, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Incident> getIncidentsByService(Long serviceId, Pageable pageable) {
        return incidentRepository.findByAffectedServiceId(serviceId, pageable);
    }

    @Transactional(readOnly = true)
    public IncidentStatisticsDTO getIncidentStatistics() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        
        long openIncidents = incidentRepository.countByStatus(Incident.IncidentStatus.OPEN);
        long inProgressIncidents = incidentRepository.countByStatus(Incident.IncidentStatus.IN_PROGRESS);
        long resolvedToday = incidentRepository.countByStatusSince(Incident.IncidentStatus.RESOLVED, LocalDateTime.now().withHour(0).withMinute(0).withSecond(0));
        Double avgResolutionTime = incidentRepository.getAverageResolutionTimeInHours(thirtyDaysAgo);
        
        List<Object[]> statusCounts = incidentRepository.countByStatusGroup();
        List<Object[]> priorityCounts = incidentRepository.countByPriorityForOpenIncidents();
        List<Object[]> incidentsByDay = incidentRepository.countIncidentsByDay(thirtyDaysAgo);
        
        return IncidentStatisticsDTO.builder()
                .openIncidents(openIncidents)
                .inProgressIncidents(inProgressIncidents)
                .resolvedToday(resolvedToday)
                .averageResolutionTimeHours(avgResolutionTime != null ? avgResolutionTime : 0.0)
                .statusCounts(statusCounts)
                .priorityCounts(priorityCounts)
                .incidentsByDay(incidentsByDay)
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }
}