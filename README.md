Group ID: S2-SE-WE-37

# MicroLearn System Deployment Guide

This guide provides step-by-step instructions to deploy the system locally for development or testing purposes.

## Prerequisites

- Visual Studio Code (for frontend)
- IntelliJ IDEA (for backend)
- Docker Desktop
- Node.js (for npm)

## Deployment Steps

1. **Backend Setup**
   - Open the backend directory in IntelliJ IDEA.
   - Ensure Docker Desktop is installed and running.
   - Navigate to each service directory and run:
     mvn clean install
   - This will build the backend services.

2. **Frontend Setup**
   - Open the frontend directory in Visual Studio Code.
   - Ensure Node.js and npm are installed.
   - Run the following commands in the terminal:
     npm i
     npm start
   - This will deploy the frontend application.


3. **Docker Configuration**
   - Open a terminal in the main backend directory.
   - Run the following command to build and start Docker containers:
     docker-compose up --build
   - Wait for the containers to start.

4. **Verify Deployment**
   - Once the Docker containers are up and running, open a web browser and navigate to:
     http://localhost:8761/
   - This should open the Eureka service dashboard, indicating that the services are running.

## Notes
- Make sure all services are successfully built and running before accessing the application.
- Troubleshoot any errors encountered during the deployment process.
- For production deployment, additional configurations and steps may be required.

