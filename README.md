# Java Incident Management System

A comprehensive full-stack application for monitoring, tracking, and resolving incidents in Java applications. This system provides tools for application troubleshooting, incident management, performance analysis, and system health monitoring.

![Dashboard Screenshot](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)

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

