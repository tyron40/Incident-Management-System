package com.incidentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentStatisticsDTO {

    private long openIncidents;
    private long inProgressIncidents;
    private long resolvedToday;
    private double averageResolutionTimeHours;
    private List<Object[]> statusCounts;
    private List<Object[]> priorityCounts;
    private List<Object[]> incidentsByDay;
}