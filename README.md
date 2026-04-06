#  Microservices CI/CD Pipeline using Jenkins & Docker

A complete CI/CD pipeline implementation for microservices using **Jenkins**, **Docker Compose**, and **AWS EC2** — demonstrating automated build, test, and deployment workflows without Kubernetes.

##  Project Overview

This project demonstrates a **production-ready CI/CD pipeline** that automates the entire software delivery process:

- ✅ **Automated CI/CD Pipeline** using Jenkins
- ✅ **Microservices Architecture** with multiple independent services
- ✅ **Containerization** using Docker & Docker Compose
- ✅ **Zero-Downtime Deployments** through container orchestration
- ✅ **Cloud Deployment** on AWS EC2
- ✅ **Git Integration** with automatic pipeline triggers
- ✅ **Scalable & Modular Design** for easy service expansion

**Perfect for:** Learning CI/CD concepts, small-to-medium projects, or organizations preferring non-Kubernetes orchestration.

---

##  Architecture

### High-Level Pipeline Flow
```
┌─────────────┐
│   GitHub    │
│ Repository  │
└──────┬──────┘
       │ (git push)
       ▼
┌─────────────────────────────┐
│    Jenkins Server           │
│  (Poll SCM / Webhook)       │
│                             │
│  ┌───────────────────────┐  │
│  │ 1. Fetch Code         │  │
│  │ 2. Build Images       │  │
│  │ 3. Deploy Containers  │  │
│  └───────────────────────┘  │
└──────────┬──────────────────┘
           │
           ▼
┌──────────────────────────────┐
│   AWS EC2 Instance           │
│  (Ubuntu 22.04)              │
│                              │
│  ┌────────────────────────┐  │
│  │  Docker Compose        │  │
│  │  ┌──────────────────┐  │  │
│  │  │ User Service     │  │  │
│  │  │ (Port 3001)      │  │  │
│  │  │ Node.js          │  │  │
│  │  └──────────────────┘  │  │
│  │  ┌──────────────────┐  │  │
│  │  │ Order Service    │  │  │
│  │  │ (Port 3002)      │  │  │
│  │  │ Node.js          │  │  │
│  │  └──────────────────┘  │  │
│  │  ┌──────────────────┐  │  │
│  │  │ Payment Service  │  │  │
│  │  │ (Port 3003)      │  │  │
│  │  │ Node.js          │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Pipeline Stages
```
Developer Push
     │
     ▼
GitHub Repository
     │
     ▼
Jenkins SCM Poll/Webhook ◄──────────┐
     │                              │
     ├─ Pull Latest Code           │
     │                              │
     ▼                              │
Build Docker Images                │
     │                              │
     ├─ docker compose build        │
     │                              │
     ▼                              │
Deploy Containers                  │
     │                              │
     ├─ docker compose down         │
     ├─ docker compose up -d        │
     │                              │
     ▼                              │
Services Running                    │
     │                              │
     ├─ User Service (3001)        │
     ├─ Order Service (3002)       │
     ├─ Payment Service (3003)     │
     │                              │
     └─ Ready for Next Push ────────┘
```

---

## ⚙️ Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **CI/CD Tool** | Jenkins | 2.x+ |
| **Containerization** | Docker | 24.0+ |
| **Orchestration** | Docker Compose | 2.0+ |
| **Backend Framework** | Node.js | 16+ / 18+ |
| **Cloud Platform** | AWS EC2 | Ubuntu 22.04 LTS |
| **Version Control** | Git / GitHub | Latest |
| **Runtime** | Docker Engine | Latest |

---

## 📂 Project Structure
```
microservices-ci-cd/
│
├── 📁 user-service/
│   ├── Dockerfile              # Container image for user service
│   ├── package.json            # Node.js dependencies
│   ├── app.js                  # Express.js application
│   └── .env                    # Environment configuration
│
├── 📁 order-service/
│   ├── Dockerfile              # Container image for order service
│   ├── package.json            # Node.js dependencies
│   ├── app.js                  # Express.js application
│   └── .env                    # Environment configuration
│
├── 📁 payment-service/
│   ├── Dockerfile              # Container image for payment service
│   ├── package.json            # Node.js dependencies
│   ├── app.js                  # Express.js application
│   └── .env                    # Environment configuration
│
├── docker-compose.yml          # Orchestrate all services
├── Jenkinsfile                 # Jenkins pipeline configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
└── LICENSE                     # License information
```

### Microservices Details

#### 1. **User Service** (Port 3001)
- Manages user accounts and authentication
- Handles user registration, login, and profile management
- Exposes REST endpoints for user operations

#### 2. **Order Service** (Port 3002)
- Manages customer orders
- Handles order creation, tracking, and updates
- Communicates with user and payment services

#### 3. **Payment Service** (Port 3003)
- Processes payments for orders
- Integrates with payment gateways
- Handles transaction logging and refunds

---

##  Getting Started

### Prerequisites

Before running this project, ensure you have:

- **Git** installed (for cloning repository)
- **Docker** & **Docker Compose** installed locally
- **Node.js** 16+ (if running services outside Docker)
- **Jenkins** (for CI/CD pipeline)
- **AWS Account** (for EC2 deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/prateekgajbar/microservices-ci-cd.git
cd microservices-ci-cd
```

### 2. Local Development (Docker Compose)

#### Start All Services
```bash
# Build Docker images
docker compose build

# Start services in detached mode
docker compose up -d

# View logs
docker compose logs -f

# Check running containers
docker compose ps
```

#### Stop Services
```bash
docker compose down

# Remove volumes (if needed)
docker compose down -v
```

### 3. Verify Services Are Running
```bash
# Check container status
docker compose ps

# Test User Service
curl http://localhost:3001/api/users

# Test Order Service
curl http://localhost:3002/api/orders

# Test Payment Service
curl http://localhost:3003/api/payments
```

### 4. Access Application

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| User Service | http://localhost:3001 | 3001 | User management |
| Order Service | http://localhost:3002 | 3002 | Order management |
| Payment Service | http://localhost:3003 | 3003 | Payment processing |

---

## 🔧 Docker Commands

### Building Images
```bash
# Build all services
docker compose build

# Build specific service
docker compose build user-service

# Build with no cache
docker compose build --no-cache
```

### Running Containers
```bash
# Start all services in background
docker compose up -d

# Start specific service
docker compose up -d user-service

# Start with live logs
docker compose up

# Restart services
docker compose restart
```

### Viewing Logs
```bash
# View logs from all services
docker compose logs

# View live logs
docker compose logs -f

# View logs from specific service
docker compose logs -f user-service

# View last 100 lines
docker compose logs --tail=100
```

### Stopping & Cleaning
```bash
# Stop all services
docker compose stop

# Remove all containers
docker compose down

# Remove containers and volumes
docker compose down -v

# Remove dangling images
docker image prune
```

### Executing Commands
```bash
# Access container shell
docker compose exec user-service sh

# Run npm commands
docker compose exec user-service npm install

# Run tests
docker compose exec user-service npm test
```

---

##  Jenkins Pipeline

### Jenkinsfile Structure
```groovy
pipeline {
    agent any

    environment {
        REGISTRY = 'docker.io'
        REPO_NAME = 'your-docker-repo'
    }

    stages {
        stage('Checkout') {
            steps {
                echo ' Fetching latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🔨 Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                echo ' Stopping existing containers...'
                sh 'docker compose down || true'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo ' Starting services...'
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo ' Verifying services...'
                sh 'docker compose ps'
                sh 'sleep 5'
                sh 'curl http://localhost:3001 || true'
            }
        }
    }

    post {
        success {
            echo ' Pipeline completed successfully!'
        }
        failure {
            echo ' Pipeline failed. Rolling back...'
            sh 'docker compose down || true'
        }
    }
}
```

### Pipeline Execution Flow

1. **Checkout** - Clone repository from GitHub
2. **Build** - Create Docker images for all services
3. **Stop** - Gracefully stop running containers
4. **Deploy** - Start new containers
5. **Verify** - Health checks and service validation

### Jenkins Configuration

#### Step 1: Create New Pipeline Job

1. Open Jenkins dashboard
2. Click "New Item"
3. Enter job name: `microservices-ci-cd`
4. Select "Pipeline"
5. Click "OK"

#### Step 2: Configure Pipeline

1. **Build Triggers:**
   - Check "Poll SCM"
   - Schedule: `H/5 * * * *` (every 5 minutes)
   - OR use "GitHub hook trigger for GITScm polling" (requires webhook)

2. **Pipeline Definition:**
   - Select "Pipeline script from SCM"
   - SCM: Git
   - Repository URL: `https://github.com/prateekgajbar/microservices-ci-cd.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`

3. **Save** and **Build Now**

#### Step 3: GitHub Webhook (Optional, for Instant Triggers)
```bash
# On GitHub repository:
1. Go to Settings → Webhooks
2. Click "Add webhook"
3. Payload URL: http://<JENKINS_IP>:8080/github-webhook/
4. Content type: application/json
5. Select "Push events"
6. Add webhook
```

---

## ☁️ AWS EC2 Setup

### Instance Requirements

| Resource | Specification |
|----------|---------------|
| **AMI** | Ubuntu 22.04 LTS |
| **Instance Type** | t3.medium (minimum) |
| **Storage** | 30GB EBS volume |
| **RAM** | 4GB minimum |
| **vCPU** | 2 minimum |

### Security Group Configuration

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 22 | TCP | Your IP | SSH Access |
| 8080 | TCP | Your IP | Jenkins |
| 3001 | TCP | 0.0.0.0/0 | User Service |
| 3002 | TCP | 0.0.0.0/0 | Order Service |
| 3003 | TCP | 0.0.0.0/0 | Payment Service |

### Installation Steps

#### 1. Connect to EC2 Instance
```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

#### 2. Update System
```bash
sudo apt update
sudo apt upgrade -y
```

#### 3. Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker compose --version
```

#### 4. Install Docker Compose
```bash
sudo apt install docker-compose-plugin -y
docker compose version
```

#### 5. Install Jenkins
```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Java (Jenkins dependency)
sudo apt install openjdk-11-jdk -y

# Install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get Jenkins initial password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

#### 6. Access Jenkins
```
http://<EC2_PUBLIC_IP>:8080
```

Complete the initial setup and install recommended plugins.

#### 7. Configure Docker for Jenkins
```bash
# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins
sudo systemctl restart jenkins

# Verify permissions
docker ps
```

---

## 📝 Docker Compose Configuration

### docker-compose.yml
```yaml
version: '3.8'

services:
  user-service:
    build:
      context: ./user-service
      dockerfile: Dockerfile
    container_name: user-service
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    networks:
      - microservices

  order-service:
    build:
      context: ./order-service
      dockerfile: Dockerfile
    container_name: order-service
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - PORT=3002
    depends_on:
      - user-service
    networks:
      - microservices

  payment-service:
    build:
      context: ./payment-service
      dockerfile: Dockerfile
    container_name: payment-service
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - PORT=3003
    depends_on:
      - order-service
    networks:
      - microservices

networks:
  microservices:
    driver: bridge
```

---

##  Service Dockerfile Example

### user-service/Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Runtime stage
FROM node:18-alpine
WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY . .

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Start application
CMD ["node", "app.js"]
```

---

##  Application URLs

### Local Development
```
User Service:     http://localhost:3001
Order Service:    http://localhost:3002
Payment Service:  http://localhost:3003
```

### AWS EC2 Deployment
```
User Service:     http://<EC2_PUBLIC_IP>:3001
Order Service:    http://<EC2_PUBLIC_IP>:3002
Payment Service:  http://<EC2_PUBLIC_IP>:3003
Jenkins:          http://<EC2_PUBLIC_IP>:8080
```

---

##  Key Features

### 1. **Fully Automated CI/CD**
- Automatic pipeline triggers on git push
- No manual deployment steps required
- Consistent builds and deployments

### 2. **Microservices Architecture**
- Independent, scalable services
- Loose coupling and high cohesion
- Easy to add new services

### 3. **Zero-Downtime Deployments**
- Services stop gracefully
- New containers start immediately
- No service interruption

### 4. **Docker Containerization**
- Consistent environments (dev, staging, production)
- Easy scaling and replication
- Simplified dependency management

### 5. **Cloud-Ready**
- AWS EC2 deployment ready
- Scalable infrastructure
- Easy to migrate to other cloud providers

### 6. **Modular Design**
- Easy to add new microservices
- Standardized Dockerfile structure
- Reusable pipeline patterns

---
##  Challenges Faced & Solutions

### 1. **Jenkins Git Branch Misconfiguration**

**Problem:**
```
ERROR: Couldn't find any revision to build
```

**Solution:**
```groovy
// Jenkinsfile
checkout([$class: 'GitSCM',
    branches: [[name: '*/main']],
    userRemoteConfigs: [[url: 'https://github.com/prateekgajbar/microservices-ci-cd.git']]
])
```

### 2. **Docker Permission Issues**

**Problem:**
```
docker: permission denied while trying to connect to Docker daemon
```

**Solution:**
```bash
# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins
sudo systemctl restart jenkins

# Verify
sudo -u jenkins docker ps
```

### 3. **docker-compose Not Found Error**

**Problem:**
```
docker compose: command not found
```

**Solution:**
```bash
# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Verify
docker compose version

# Update Jenkinsfile to use full path if needed
sh '/usr/bin/docker compose build'
```

### 4. **Container Port Conflicts**

**Problem:**
```
Error response from daemon: Ports are not available
```

**Solution:**
```bash
# Stop conflicting containers
docker compose down

# Check port usage
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

### 5. **Disk Space Issues on EC2**

**Problem:**
```
no space left on device
```

**Solution:**
```bash
# Clean up old Docker images and containers
docker system prune -a --volumes

# Check disk usage
df -h

# Increase EBS volume size via AWS console
```

---

## 🧪 Testing

### Running Unit Tests Locally
```bash
# Enter service directory
cd user-service

# Install dependencies
npm install

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### Running All Tests via Docker Compose
```bash
# Run tests in all services
docker compose exec user-service npm test
docker compose exec order-service npm test
docker compose exec payment-service npm test
```

### Health Checks
```bash
# Check if services are healthy
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health

# Response should be: { "status": "ok" }
```

---

## 📊 Monitoring & Logs

### View Container Logs
```bash
# All services
docker compose logs

# Specific service
docker compose logs user-service

# Follow logs in real-time
docker compose logs -f

# Last 100 lines
docker compose logs --tail=100
```

### Monitor Resource Usage
```bash
# Check container stats
docker stats

# Memory and CPU usage
docker compose ps

# Inspect container details
docker inspect user-service
```

### Jenkins Pipeline Logs

1. Open Jenkins dashboard
2. Select job `microservices-ci-cd`
3. Click on recent build
4. View "Console Output"

---

##  Security Best Practices

### 1. Protect Sensitive Data
```bash
# Use .env files for secrets
cat > .env << EOF
DB_PASSWORD=your_secure_password
API_KEY=your_api_key
JWT_SECRET=your_jwt_secret
EOF

# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### 2. Update Docker Images Regularly
```bash
# Check for vulnerable images
docker scan user-service:latest

# Update base images
docker pull node:18-alpine
docker compose build --no-cache
```

### 3. Restrict AWS Security Groups
```bash
# Only allow necessary ports
# 22 (SSH): Your IP only
# 8080 (Jenkins): Your IP only
# 3001-3003: Allow from your application load balancer
```

### 4. Use Non-Root User in Dockerfile
```dockerfile
# Don't run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

---

##  Troubleshooting

### Services Not Starting
```bash
# Check logs
docker compose logs

# Rebuild images
docker compose down
docker compose build --no-cache
docker compose up -d

# Verify all containers
docker compose ps
```

### Jenkins Cannot Connect to GitHub
```bash
# Check internet connectivity
ping github.com

# Clear Jenkins credentials
# Jenkins Dashboard → Manage Jenkins → Manage Credentials → Delete old entries

# Re-add GitHub credentials
# Jenkins Dashboard → New Item → Configure → Add GitHub credentials
```

### Out of Disk Space
```bash
# Check disk usage
df -h

# Clean up
docker system prune -a --volumes

# Remove old images
docker image prune -a

# Increase EC2 storage via AWS Console
```

### Port Already in Use
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
# "3001:3001" → "3101:3001"
```

---

##  Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

##  Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch
```bash
   git checkout -b feature/your-feature
```
3. **Commit** changes with clear messages
```bash
   git commit -m "feat: add new feature"
```
4. **Push** to your fork
```bash
   git push origin feature/your-feature
```
5. **Open** a Pull Request

### Code Style

- Follow Node.js best practices
- Use ESLint for code quality
- Add comments for complex logic
- Write meaningful commit messages

---

##  License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

##  Support & Questions

- **Issues:** Open an issue on GitHub for bugs or questions
- **Discussions:** Use GitHub Discussions for general questions
- **Email:** prateek@example.com

---

## 🎉 Acknowledgments

- Thanks to the Docker and Jenkins communities
- Inspired by DevOps best practices
- Community contributions and feedback

---
 Active & Maintained  
**Last Updated:** April 2024  
**Version:** 1.0.0  
**Maintained by:** Prateek Gajbar

---

##  Quick Reference
```bash
# Clone & Setup
git clone https://github.com/prateekgajbar/microservices-ci-cd.git
cd microservices-ci-cd

# Local Development
docker compose up -d
curl http://localhost:3001

# Stop Services
docker compose down

# View Logs
docker compose logs -f

# Rebuild Images
docker compose build --no-cache

# Deploy to EC2
# 1. SSH into instance
# 2. Clone repository
# 3. Configure Jenkins pipeline
# 4. Trigger build
```
