# Java Incident Management System

A comprehensive full-stack application for monitoring, tracking, and resolving incidents in Java applications. This system provides tools for application troubleshooting, incident management, performance analysis, and system health monitoring.

![screencapture-wondrous-squirrel-9e394e-netlify-app-system-health-2025-03-27-17_51_04](https://github.com/user-attachments/assets/83d27497-ce78-46cc-87f0-c13fca56b069)
![screencapture-wondrous-squirrel-9e394e-netlify-app-database-console-2025-03-27-17_51_16](https://github.com/user-attachments/assets/2d788a5c-1e2e-49f0-912d-c399eca29d73)
![screencapture-wondrous-squirrel-9e394e-netlify-app-container-status-2025-03-27-17_51_32](https://github.com/user-attachments/assets/a0a95981-fdbf-4637-8a39-e69a86a34996)
![screencapture-wondrous-squirrel-9e394e-netlify-app-2025-03-27-17_50_11](https://github.com/user-attachments/assets/2108a2eb-3e39-4774-b2b7-5ef5f4cb9f74)
![screencapture-wondrous-squirrel-9e394e-netlify-app-incidents-2025-03-27-17_50_35](https://github.com/user-attachments/assets/3434743f-7791-4360-9d10-47b5ab5c7a96)
![screencapture-wondrous-squirrel-9e394e-netlify-app-create-incident-2025-03-27-17_50_45](https://github.com/user-attachments/assets/883c024b-8106-49d3-8b13-e3cdc172af1e)


## 🚀 Features

### Incident Management
- Create, track, and resolve incidents
- Assign incidents to team members
- Prioritize incidents based on severity
- Track incident history and resolution time
- Add comments and updates to incidents

### System Monitoring
- Real-time system health monitoring
- CPU, memory, and response time metrics
- Error rate tracking
- Service status monitoring

### Database Management
- SQL query console for database interaction
- Database table management
- Performance monitoring for database queries

### Container Management
- Monitor container status and health
- Track container metrics
- Restart and manage containers

### Reporting & Analytics
- Incident statistics and trends
- Resolution time analysis
- Service performance metrics
- Error frequency analysis

## 🛠️ Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Chart.js for data visualization
- Lucide React for icons
- React Router for navigation

### Backend
- Java Spring Boot
- Spring Security with JWT authentication
- JPA/Hibernate for database interaction
- Actuator for application monitoring
- Prometheus integration for metrics

### Database
- PostgreSQL for production
- H2 for development and testing
- Flyway for database migrations

### DevOps
- Docker for containerization
- Docker Compose for multi-container deployment
- Prometheus for metrics collection
- Grafana for metrics visualization

## 📋 System Requirements

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 14 or higher (for production)
- Docker and Docker Compose (for containerized deployment)

## 🔧 Setup & Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/incident-management-system.git
   cd incident-management-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   The backend will be available at http://localhost:8080

3. **Frontend Setup**
   ```bash
   cd ..  # Return to project root
   npm install
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3001 (admin/admin)

## 🔐 Authentication

The system uses JWT-based authentication with the following default users:

| Username | Password | Role |
|----------|----------|------|
| admin | password | Admin |
| jsmith | password | Support |
| jdoe | password | Support |
| ajohnson | password | User |
| bwilliams | password | User |

> Note: These are development credentials. In production, use secure passwords and proper user management.

## 📊 API Documentation

API documentation is available via Swagger UI at http://localhost:8080/swagger-ui.html when the backend is running.

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
npm test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

