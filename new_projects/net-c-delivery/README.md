# DinerDashboard — Enterprise Diner Kitchen POS & Delivery Fleet Dispatch Architecture

> **Modern high-volume diner kitchen POS, online delivery dispatch console, and telemetry architecture, built with tactile 3D touch push buttons and .NET 9 C# N-Tier architecture.**

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-blue)](https://dotnet.microsoft.com/apps/aspnet)
[![C#](https://img.shields.io/badge/Language-C%23%2013-239120?logo=csharp)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![Toast POS Integration](https://img.shields.io/badge/Integration-Toast%20POS%20API%20v2-ff6b00)](https://pos.toasttab.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2F%20Repository%20Pattern-green)](#architecture--solution-structure)

---

## 🥪 Executive Summary & Domain

**DinerDashboard** is a modern diner kitchen POS and delivery fleet dispatch console designed with enterprise restaurant delivery API architecture. 

This repository delivers a decoupled, enterprise-grade **.NET 9 C#** backend paired with an interactive frontend that features:
1. **Multi-Carrier Delivery Service Admin Console:** Comprehensive administration panel for connecting website orders to top demographic delivery providers (Toast POS, DoorDash Drive, Uber Direct, Grubhub, Square, and Clover) with live API verification and outward developer onboarding.
2. **Interactive Community Calendar:** Custom-programmed monthly calendar showing dining specials, live patio sessions, youth sports fundraisers, and seasonal community events.
3. **Back-Office Event Management Panel:** Full CRUD administration allowing managers to publish, customize, and manage restaurant event telemetry.
4. **RESTful Web API Endpoints:** Clean controllers managing community events and orders with thread-safe persistence and validation.
5. **Resilient Hybrid Client:** Connects to the local/hosted .NET Web API with seamless graceful fallback to `localStorage` when hosted statically on GitHub Pages.

---

## 🏛️ Architecture & Solution Structure

```
net-c-delivery/
│
├── ParmaDelivery.sln                       # Visual Studio .NET 9 Solution
│
├── ParmaDelivery.Core/                     # Pure Domain & Business Abstractions
│   ├── ParmaDelivery.Core.csproj
│   ├── Entities/
│   │   ├── CommunityEvent.cs               # Event entity (Headline, Description, Date, Custom Button CTA/Color/Link, Image)
│   │   └── DeliveryEntities.cs             # MenuItem, OrderItem, and DeliveryOrder entities
│   └── Interfaces/
│       └── IEventRepository.cs             # Core repository contract (GetAll, GetById, Create, Delete, ResetDefaults)
│
├── ParmaDelivery.Infrastructure/           # Data Access & Persistence Layer
│   ├── ParmaDelivery.Infrastructure.csproj
│   └── Repositories/
│       └── JsonEventRepository.cs          # Thread-safe persistent JSON repository with SemaphoreSlim concurrency control
│
├── ParmaDelivery.WebAPI/                   # ASP.NET Core 9 Presentation & Web API
│   ├── ParmaDelivery.WebAPI.csproj
│   ├── Program.cs                          # App bootstrap, DI registration, CORS policy, Minimal status endpoint
│   ├── Controllers/
│   │   └── EventsController.cs             # REST API endpoints (GET, POST, DELETE, RESET)
│   └── appsettings.json                    # Configuration & logging settings
│
├── index.html                              # Interactive storefront & calendar web client with .NET architectural integration
├── case-study.html                         # Comprehensive technical case study
└── README.md                               # Architectural documentation
```

---

## 🚀 REST API Endpoints

| HTTP Method | Route | Description |
|:---|:---|:---|
| `GET` | `/` | Service health ping & endpoint directory |
| `GET` | `/api/events` | List all scheduled community events (supports `?date=YYYY-MM-DD` filter) |
| `GET` | `/api/events/{id}` | Retrieve specific event by ID |
| `POST` | `/api/events` | Publish a new event post (image, headline, text, button text, color, link) |
| `DELETE` | `/api/events/{id}` | Delete a community event post |
| `POST` | `/api/events/reset` | Restore factory example community events |

---

## 💻 Running the .NET 9 Web API Locally

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)

### 1. Build the Solution
```bash
dotnet build
```

### 2. Launch the Web API
```bash
dotnet run --project ParmaDelivery.WebAPI
```
The API will start listening on `http://localhost:5000` (or `https://localhost:5001`).

### 3. Test with cURL
```bash
# Get all events
curl http://localhost:5000/api/events

# Create a new event post
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Cheesesteak Championship Night",
    "description": "Vote for the ultimate ribeye sub! Special $9.99 pricing all evening.",
    "eventDate": "2026-10-30",
    "eventTime": "5:00 PM – 9:00 PM",
    "buttonText": "Vote & RSVP",
    "buttonColor": "#ea580c",
    "buttonLink": "#events"
  }'
```
