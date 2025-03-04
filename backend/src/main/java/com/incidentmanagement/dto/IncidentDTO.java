package com.incidentmanagement.dto;

import com.incidentmanagement.model.Incident;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentDTO {

    private Long id;
    private String incidentId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Status is required")
    private Incident.IncidentStatus status;
    
    @NotNull(message = "Priority is required")
    private Incident.IncidentPriority priority;
    
    private Long assigneeId;
    private String assigneeName;
    private Long reporterId;
    private String reporterName;
    private Set<Long> affectedServiceIds;
    private Set<String> affectedServiceNames;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;
}