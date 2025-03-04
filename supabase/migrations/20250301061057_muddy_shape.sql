-- Insert sample users
INSERT INTO users (username, email, password, full_name, created_at, updated_at)
VALUES 
('admin', 'admin@example.com', '$2a$10$eDIJO.xBGAJkxA2wbw/BwOX3NX.No3XUmANzHKGQwE0QV6zs.DRPK', 'Admin User', NOW(), NOW()),
('jsmith', 'jsmith@example.com', '$2a$10$eDIJO.xBGAJkxA2wbw/BwOX3NX.No3XUmANzHKGQwE0QV6zs.DRPK', 'Jane Smith', NOW(), NOW()),
('jdoe', 'jdoe@example.com', '$2a$10$eDIJO.xBGAJkxA2wbw/BwOX3NX.No3XUmANzHKGQwE0QV6zs.DRPK', 'John Doe', NOW(), NOW()),
('ajohnson', 'ajohnson@example.com', '$2a$10$eDIJO.xBGAJkxA2wbw/BwOX3NX.No3XUmANzHKGQwE0QV6zs.DRPK', 'Alice Johnson', NOW(), NOW()),
('bwilliams', 'bwilliams@example.com', '$2a$10$eDIJO.xBGAJkxA2wbw/BwOX3NX.No3XUmANzHKGQwE0QV6zs.DRPK', 'Bob Williams', NOW(), NOW());

-- Insert user roles
INSERT INTO user_roles (user_id, role)
VALUES 
(1, 'ROLE_ADMIN'),
(2, 'ROLE_SUPPORT'),
(3, 'ROLE_SUPPORT'),
(4, 'ROLE_USER'),
(5, 'ROLE_USER');

-- Insert sample services
INSERT INTO services (name, description, status, version, owner, health_endpoint, uptime, created_at, updated_at)
VALUES 
('OrderService', 'Handles order processing and management', 'HEALTHY', '1.5.2', 'Jane Smith', '/api/orders/health', 99.98, NOW(), NOW()),
('AuthService', 'Authentication and authorization service', 'HEALTHY', '2.1.0', 'John Doe', '/api/auth/health', 99.95, NOW(), NOW()),
('PaymentService', 'Processes payments and refunds', 'HEALTHY', '1.2.1', 'Alice Johnson', '/api/payments/health', 99.9, NOW(), NOW()),
('CustomerPortal', 'Customer-facing web application', 'HEALTHY', '3.0.1', 'Bob Williams', '/health', 99.8, NOW(), NOW()),
('InventoryService', 'Manages product inventory', 'DEGRADED', '1.3.4', 'Jane Smith', '/api/inventory/health', 98.5, NOW(), NOW()),
('NotificationService', 'Sends emails, SMS, and push notifications', 'HEALTHY', '1.0.5', 'John Doe', '/api/notifications/health', 99.99, NOW(), NOW()),
('ReportingService', 'Generates business reports and analytics', 'UNHEALTHY', '1.1.0', 'Alice Johnson', '/api/reports/health', 95.2, NOW(), NOW());

-- Insert sample incidents
INSERT INTO incidents (incident_id, title, description, status, priority, assignee_id, reporter_id, created_at, updated_at)
VALUES 
('INC-1001', 'Database connection timeout', 'Production database connections are timing out intermittently, causing service disruptions for users.', 'IN_PROGRESS', 'HIGH', 2, 1, NOW() - INTERVAL '1 day', NOW() - INTERVAL '6 hour'),
('INC-1002', 'Memory leak in production', 'Memory usage is gradually increasing in the order processing service', 'OPEN', 'CRITICAL', 3, 4, NOW() - INTERVAL '12 hour', NOW() - INTERVAL '12 hour'),
('INC-1003', 'API response latency', 'Customer-facing API endpoints are experiencing increased latency', 'RESOLVED', 'MEDIUM', 4, 3, NOW() - INTERVAL '2 day', NOW() - INTERVAL '1 day'),
('INC-1004', 'Authentication service failure', 'Users unable to log in due to authentication service errors', 'OPEN', 'CRITICAL', NULL, 5, NOW() - INTERVAL '4 hour', NOW() - INTERVAL '4 hour'),
('INC-1005', 'Scheduled job failure', 'Nightly data processing job failed to complete', 'IN_PROGRESS', 'MEDIUM', 5, 2, NOW() - INTERVAL '1 day', NOW() - INTERVAL '18 hour');

-- Link incidents to affected services
INSERT INTO incident_affected_services (incident_id, service_id)
VALUES 
(1, 1), -- INC-1001 affects OrderService
(1, 4), -- INC-1001 affects CustomerPortal
(2, 1), -- INC-1002 affects OrderService
(3, 1), -- INC-1003 affects OrderService
(3, 4), -- INC-1003 affects CustomerPortal
(4, 2), -- INC-1004 affects AuthService
(5, 7); -- INC-1005 affects ReportingService

-- Insert sample comments
INSERT INTO comments (incident_id, user_id, content, created_at, updated_at)
VALUES 
(1, 2, 'Investigating connection pool settings. Current max connections is set to 100, which might be insufficient for peak load.', NOW() - INTERVAL '12 hour', NOW() - INTERVAL '12 hour'),
(1, 3, 'I noticed similar issues last week. Check if there are any long-running transactions that might be holding connections.', NOW() - INTERVAL '10 hour', NOW() - INTERVAL '10 hour'),
(2, 3, 'Initial analysis shows a potential memory leak in the order processing module. Heap dumps show accumulation of Order objects.', NOW() - INTERVAL '10 hour', NOW() - INTERVAL '10 hour'),
(3, 4, 'Identified the issue as a missing index on the products table causing full table scans on high-volume queries.', NOW() - INTERVAL '36 hour', NOW() - INTERVAL '36 hour'),
(3, 2, 'Added the missing index and response times have returned to normal levels.', NOW() - INTERVAL '30 hour', NOW() - INTERVAL '30 hour');

-- Insert sample incident events
INSERT INTO incident_events (incident_id, user_id, event_type, description, old_value, new_value, timestamp)
VALUES 
(1, 1, 'CREATED', 'Incident created', NULL, NULL, NOW() - INTERVAL '1 day'),
(1, 1, 'ASSIGNEE_CHANGED', 'Assignee changed', 'Unassigned', 'Jane Smith', NOW() - INTERVAL '23 hour'),
(1, 2, 'STATUS_CHANGED', 'Status changed', 'OPEN', 'IN_PROGRESS', NOW() - INTERVAL '22 hour'),
(1, 2, 'COMMENT_ADDED', 'Comment added', NULL, NULL, NOW() - INTERVAL '12 hour'),
(1, 3, 'COMMENT_ADDED', 'Comment added', NULL, NULL, NOW() - INTERVAL '10 hour'),
(2, 4, 'CREATED', 'Incident created', NULL, NULL, NOW() - INTERVAL '12 hour'),
(2, 1, 'ASSIGNEE_CHANGED', 'Assignee changed', 'Unassigned', 'John Doe', NOW() - INTERVAL '11 hour'),
(2, 3, 'COMMENT_ADDED', 'Comment added', NULL, NULL, NOW() - INTERVAL '10 hour'),
(3, 3, 'CREATED', 'Incident created', NULL, NULL, NOW() - INTERVAL '2 day'),
(3, 3, 'ASSIGNEE_CHANGED', 'Assignee changed', 'Unassigned', 'Alice Johnson', NOW() - INTERVAL '47 hour'),
(3, 4, 'STATUS_CHANGED', 'Status changed', 'OPEN', 'IN_PROGRESS', NOW() - INTERVAL '46 hour'),
(3, 4, 'COMMENT_ADDED', 'Comment added', NULL, NULL, NOW() - INTERVAL '36 hour'),
(3, 2, 'COMMENT_ADDED', 'Comment added', NULL, NULL, NOW() - INTERVAL '30 hour'),
(3, 4, 'STATUS_CHANGED', 'Status changed', 'IN_PROGRESS', 'RESOLVED', NOW() - INTERVAL '1 day'),
(4, 5, 'CREATED', 'Incident created', NULL, NULL, NOW() - INTERVAL '4 hour'),
(5, 2, 'CREATED', 'Incident created', NULL, NULL, NOW() - INTERVAL '1 day'),
(5, 2, 'ASSIGNEE_CHANGED', 'Assignee changed', 'Unassigned', 'Bob Williams', NOW() - INTERVAL '23 hour'),
(5, 5, 'STATUS_CHANGED', 'Status changed', 'OPEN', 'IN_PROGRESS', NOW() - INTERVAL '20 hour');

-- Insert sample system metrics
INSERT INTO system_metrics (service_id, metric_type, value, unit, timestamp)
SELECT 
    s.id,
    CASE MOD(i, 6)
        WHEN 0 THEN 'CPU_USAGE'
        WHEN 1 THEN 'MEMORY_USAGE'
        WHEN 2 THEN 'DISK_USAGE'
        WHEN 3 THEN 'RESPONSE_TIME'
        WHEN 4 THEN 'ERROR_RATE'
        WHEN 5 THEN 'REQUEST_COUNT'
    END,
    CASE MOD(i, 6)
        WHEN 0 THEN 20 + (RANDOM() * 60)::NUMERIC(5,2) -- CPU usage (%)
        WHEN 1 THEN 2 + (RANDOM() * 6)::NUMERIC(5,2) -- Memory usage (GB)
        WHEN 2 THEN 30 + (RANDOM() * 40)::NUMERIC(5,2) -- Disk usage (%)
        WHEN 3 THEN 50 + (RANDOM() * 200)::NUMERIC(5,2) -- Response time (ms)
        WHEN 4 THEN (RANDOM() * 2)::NUMERIC(5,2) -- Error rate (%)
        WHEN 5 THEN 100 + (RANDOM() * 900)::NUMERIC(5,2) -- Request count
    END,
    CASE MOD(i, 6)
        WHEN 0 THEN '%'
        WHEN 1 THEN 'GB'
        WHEN 2 THEN '%'
        WHEN 3 THEN 'ms'
        WHEN 4 THEN '%'
        WHEN 5 THEN 'count'
    END,
    NOW() - (INTERVAL '1 hour' * (i % 24))
FROM services s
CROSS JOIN generate_series(0, 167) i; -- 7 days of hourly metrics for each service

-- Insert sample log entries
INSERT INTO log_entries (service_id, level, message, source, thread_name, timestamp)
VALUES 
(1, 'ERROR', 'Connection to database timed out after 30 seconds', 'OrderService', 'http-nio-8080-exec-3', NOW() - INTERVAL '1 day'),
(1, 'INFO', 'Retrying database connection (attempt 1)', 'OrderService', 'http-nio-8080-exec-3', NOW() - INTERVAL '1 day' + INTERVAL '30 second'),
(1, 'ERROR', 'Connection to database timed out after 30 seconds', 'OrderService', 'http-nio-8080-exec-3', NOW() - INTERVAL '1 day' + INTERVAL '1 minute'),
(1, 'WARN', 'Database connection pool reaching capacity (90%)', 'OrderService', 'http-nio-8080-exec-5', NOW() - INTERVAL '23 hour'),
(2, 'ERROR', 'Failed to authenticate user: Invalid credentials', 'AuthService', 'http-nio-8080-exec-2', NOW() - INTERVAL '4 hour'),
(2, 'ERROR', 'Token validation failed: JWT expired', 'AuthService', 'http-nio-8080-exec-7', NOW() - INTERVAL '3 hour'),
(5, 'ERROR', 'OutOfMemoryError: Java heap space', 'InventoryService', 'pool-3-thread-1', NOW() - INTERVAL '12 hour'),
(5, 'INFO', 'Restarting service after OutOfMemoryError', 'InventoryService', 'main', NOW() - INTERVAL '11 hour' + INTERVAL '45 minute'),
(7, 'ERROR', 'Failed to generate monthly report: Database query timeout', 'ReportingService', 'scheduler-1', NOW() - INTERVAL '1 day' + INTERVAL '2 hour'),
(7, 'ERROR', 'Unable to connect to data warehouse', 'ReportingService', 'main', NOW() - INTERVAL '1 day' + INTERVAL '1 hour');