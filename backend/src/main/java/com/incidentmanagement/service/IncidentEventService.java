package com.incidentmanagement.service;

import com.incidentmanagement.model.Incident;
import com.incidentmanagement.model.IncidentEvent;
import com.incidentmanagement.model.User;
import com.incidentmanagement.repository.IncidentEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class IncidentEventService {

    private final IncidentEventRepository eventRepository;

    @Transactional
    public IncidentEvent createEvent(Incident incident, User user, IncidentEvent.EventType eventType, 
                                     String description, String oldValue, String newValue) {
        IncidentEvent event = IncidentEvent.builder()
                .incident(incident)
                .user(user)
                .eventType(eventType)
                .description(description)
                .oldValue(oldValue)
                .newValue(newValue)
                .build();
        
        return eventRepository.save(event);
    }

    @Transactional(readOnly = true)
    public Page<IncidentEvent> getEventsByIncident(Long incidentId, Pageable pageable) {
        return eventRepository.findByIncidentIdOrderByTimestampDesc(incidentId, pageable);
    }
}