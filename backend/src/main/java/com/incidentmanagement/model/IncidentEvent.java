package com.incidentmanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "incident_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "incident_id", nullable = false)
    private Incident incident;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private String description;
    private String oldValue;
    private String newValue;
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    public enum EventType {
        CREATED, STATUS_CHANGED, PRIORITY_CHANGED, ASSIGNEE_CHANGED, 
        COMMENT_ADDED, SERVICE_ADDED, SERVICE_REMOVED
    }
}