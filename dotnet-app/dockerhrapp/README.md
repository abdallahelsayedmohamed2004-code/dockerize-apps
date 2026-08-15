#  HR Management System - Full-Stack .NET 10 & Dockerized Infrastructure

A full-stack HR Management web application engineered manually from scratch using **ASP.NET Core 10 (MVC)** and fully containerized using **Docker Multi-Stage Build** best practices.

Developed and architected as an end-to-end portfolio project demonstrating both **Application Software Engineering** and **DevOps Infrastructure Standards**.

---

## Project Ownership & Responsibilities

As the sole developer and DevOps engineer for this project, I handled the full lifecycle:
* **Application Development:** Built the web application manually using C# and ASP.NET Core 10 MVC architecture, defining controllers, Razor views, and routing logic.
* **Architecture & Networking:** Designed the traffic flow from the client host through Docker network bridges to the Kestrel application server.
* **Containerization:** Wrote an optimized, hardened multi-stage `Dockerfile` enforcing security standards and build caching.

---

## System Architecture

The following diagram illustrates how incoming traffic is routed from the host network into the isolated, non-root application container:

```mermaid
graph TD
    Client([ Client Browser]) -->|HTTP: http://localhost:8080| HostPort[ Host Interface - Port 8080]
    
    subgraph Docker_Engine [" Docker Engine (Linux Kernel)"]
        HostPort -->|Port Forwarding -p 8080:8080| ContainerPort[ Container Port 8080]
        
        subgraph Container_Environment [" Container: hrapp (Non-Root User: app)"]
            ContainerPort --> Kestrel[⚡ ASP.NET Core Kestrel Web Server]
            Kestrel --> AppLogic[ HR System Logic / MVC Controllers]
        end
    end
