# StarWarsMinimalApi

StarWarsMinimalApi is a full-stack web application built with ASP.NET Core Minimal API for the backend and React for the frontend client. The project demonstrates a simple yet modern approach to building RESTful APIs and a responsive client application, using best practices for maintainability and scalability.

## Table of Contents

- [Overview](#overview)
- [Backend: ASP.NET Core Minimal API](#backend-aspnet-core-minimal-api)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Database](#database)
- [Frontend: React ClientApp](#frontend-react-clientapp)
  - [Features](#features-1)
  - [Project Structure](#project-structure-1)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Application](#running-the-application)
- [License](#license)

---

## Overview

StarWarsMinimalApi provides a simple API for managing Star Wars starships, including CRUD operations and data transfer using DTOs. The React client consumes the API and provides a user-friendly interface for interacting with the starship data.

## Backend: ASP.NET Core Minimal API

The backend is built using ASP.NET Core Minimal API, leveraging Entity Framework Core for data access and SQL Server as the database provider.

### Features

- Minimal API endpoints for CRUD operations on Starships
- Entity Framework Core integration
- DTOs for data transfer
- Auto-mapping between entities and DTOs
- Database migrations and seeding
- Environment-based configuration
- Logging

### Project Structure

- `Program.cs`: Entry point and API endpoint definitions
- `Models/`: Contains entity and DTO classes (`Starship.cs`, `StarshipDto.cs`, `UpdateStarshipDto.cs`)
- `Data/`: Database context (`AppDbContext.cs`)
- `Mappings/`: Extension methods for mapping between entities and DTOs
- `Migrations/`: Entity Framework Core migrations
- `appsettings.json`: Configuration files

### Database

- Uses SQL Server (localdb or configured connection string)
- Migrations managed via Entity Framework Core

## Frontend: React ClientApp

The frontend is a React application located in the `ClientApp/` directory. It is built with Vite for fast development and uses Tailwind CSS for styling.

### Features

- Fetches and displays starship data from the API
- Create, update, and delete starships
- Shows Starship Name, Model, and Manufacturer in sortable table
- Includes filtering by Name, Model, and Manufacturer
- Complete details view for each starship available via Edit Modal
- Responsive UI with Tailwind CSS
- Modern React features (hooks, functional components)

### Project Structure

- `src/`: React source code (components, pages, API calls)
- `public/`: Static assets
- `vite.config.js`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `package.json`: Client dependencies and scripts

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (for the React client)

### The React Client Application is currently running here:
`http://stevenduncan.runasp.net/`

### Running the Application

1. **Backend**

   - Restore dependencies and run migrations:
     ```pwsh
     dotnet restore
     dotnet ef database update
     dotnet run
     ```
   - The API will be available at `https://localhost:5001` (or as configured).

2. **Frontend**
   - Navigate to the `ClientApp` directory:
     ```pwsh
     cd ClientApp
     npm install
     npm run dev
     ```
   - The React app will be available at `http://localhost:5173` (or as configured by Vite).

### The React Client Application

The React client application is responsible for providing a user-friendly interface for interacting with the Star Wars API. It is built using modern React features and best practices.
It can be viewed at `http://stevenduncan.runasp.net/`


## License

This project is licensed under the MIT License.
