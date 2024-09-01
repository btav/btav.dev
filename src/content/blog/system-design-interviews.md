---
title: "Notes on system design interviews"
description: "System design interviews"
pubDate: "Aug 20 2024"
---

These are my notes for tackling system design interviews. Many technical concepts are mentioned here without extensive detail. As the interviewee, lead the conversation through these four parts:

1. Ask clarifying questions
2. Design the database and API schemas
3. Design the system diagram
4. Review the system diagram for each functional requirement

<br/>

## 1. Clarifying Questions

You will be given a vaguely defined system design problem. Start with clarifying questions to gather requirements. This part of the interview is used to evaluate your requirement-gathering skills, a very important part of being a software engineer.

There are two types of requirements: functional and non-functional. Be sure to write them down as you discuss them.

### Functional Requirements

- What are the system's core functions?
- Who are the intended users?
- How will users interact with the system?
- Are we designing only the backend or the frontend as well?
- Will the system handle media assets (e.g., images, videos)?
- Try to think of additional edge cases...

### Non-functional Requirements

- What scale should the system operate at?
- Is low latency important?
- How important is data consistency?
- What level of reliability is required?
- Ask questions to determine if the system is read-heavy or write-heavy.
  - This refers to whether users will primarily be retrieving data or creating new data.
- Will the system be accessed by users worldwide or in a specific region?

![image of an example of requirements](/blog-system-design-interview-notes/requirements.png)

<br/>

### Calculations (optional)

For more advanced system design interviews, you might need to break down some high-level calculations based on the requirements. However, this isn't very common. Do not spend much time on this section.

![image breaking down some quick calculations on users](/blog-system-design-interview-notes/calculations.png)

## 2. Design the Database and API Schemas

Once you understand the problem, design the schemas for your system. This involves writing a draft of the database schema and API contracts that will be used to interact with your system.

### Database Schema Design

- Primary Keys: Ensure every table has a primary key to uniquely identify records.
- Foreign Keys: Use foreign keys to enforce referential integrity between tables.
- Data Types: Choose appropriate data types for columns to optimize storage and performance.
- Constraints: Apply constraints such as NOT NULL, UNIQUE, CHECK to maintain data integrity.
- Query Optimization: Design schemas that facilitate fast queries, avoiding complex joins where possible.
- Read/Write Patterns: Tailor schema design to match expected read/write patterns of the application.

### Example of a Video App Database Schema

![image of an example database schema](/blog-system-design-interview-notes/db-schema.png)

### RESTful Principles

When designing API contracts consider RESTful principles and security.

- Resources: Design around resources, not actions. Use `/videos` instead of `/addVideo`.
- HTTP Methods: Use appropriate HTTP methods (GET, POST, PUT, DELETE) for CRUD operations.
- Stateless: Include all necessary information in each request; avoid relying on server-side session state.

### Example Routes

```
// Retrieve a list of all videos.
GET /videos

// Create a new video.
POST /videos

// Retrieve details of a specific video by its ID.
GET /videos/{videoId}

// Update the details of a specific video by its ID.
PUT /videos/{videoId}

// Delete a specific video by its ID.
DELETE /videos/{videoId}

// Retrieve a paginated list of videos sorted by a specific field.
GET /videos?page={pageNumber}&limit={pageSize}&sort={sortBy}

// Search for videos based on various criteria (e.g., title, channel). This route accepts query parameters to filter the search results.
GET /videos/search?title={title}&channel={channel}
```

### Security

- Authentication and Authorization: Implement authentication mechanisms (e.g., OAuth, JWT) and clearly define roles and permissions.
- Rate Limiting: Safeguard against abuse by restricting the number of requests per user or IP address.

## 3. System Diagram

Next, design a system diagram. This diagram is a blueprint of how all the parts of your system will work together. While every problem will be unique, there are several common components and concepts that are applicable to most system design problems.

### Load Balancers (e.g. NGINX, Envoy, HAProxy, etc)

- Distribute traffic across servers to improve throughput, latency, and scalability.
- Enable horizontal scaling instead of vertical scaling.
  - Vertical scaling (adding more resources to a single node) creates a single point of failure.
- When a user accesses your API or backend services, they first hit the load balancer, which then routes the request to a node.
- There are various routing algorithms, such as round-robin or least-load.
- Horizontal scaling involves deploying multiple smaller nodes to share the load. You can add more nodes as demand increases.

### DNS Load Balancing

- Routes requests to different IPs based on URL or domain. However, it offers limited customization options.

### Caching (e.g. Memcache, Redis, etc)

- Reduces database load, especially in read-heavy applications.
- Example: A news website might cache its homepage for a set period, serving the same content to all users without repeated database queries.
- Uses in-memory storage for faster access compared to on-disk storage.

### Content Delivery Networks (CDNs)

- Cache static assets globally, reducing load on your servers.
- Improve user experience by serving content from geographically closer servers, resulting in faster load times.
- The "pull" technique caches content on first request, leading to slower initial loads but faster subsequent ones.
- The "push" technique pre-loads all files to CDNs, eliminating slow first-time loads but potentially increasing costs due to unnecessary data distribution.

### Object Storage

- Used for media storage.
- Provides reliable data storage and replication.
- Eliminates concerns about disk space on application servers.

### Databases

- Indexes are important for fast queries and improving read times.
- Examples of indexes include primary keys and data frequently used in joins or specific queries.
- Indexes can be data-intensive, occupying a lot of disk space, especially with large datasets.

### Database Consistency, Reliability, and Performance

- Improve performance and reliability by using read-only database nodes synchronized with the main node.
- This approach may result in slight data inconsistencies, as changes might not immediately reflect across all nodes.
- The lag in data synchronization depends on the volume of write operations.

### Database Sharding

- Sharding enhances performance for write-heavy applications.
- Involves horizontally sharding data across multiple database nodes.
- One sharding algorithm uses the modulo operator. For example, with a user table, you'd use `(userID mod number_of_nodes)` to determine data placement.

### NoSQL vs SQL/Relational Databases

- NoSQL databases often simplify the implementation of sharding.
- Consider using NoSQL databases when you need flexibility in your database schema.
- For interviews, default to SQL/Relational databases unless the system design problem specifically calls for NoSQL advantages.
- The difference between NoSQL and SQL/Relational databases in an interview context lies in schema design. With relational databases, you typically distribute data across multiple tables. In contrast, NoSQL databases often keeping related data together in a single document or record.

### Client/Server Communication

- In most cases, use HTTP and REST for client-server communication.
- Consider using GraphQL when you may have multiple clients communicating with the same server(s).
- Consider using gRPC for server-to-server interactions due to its smaller message sizes, strong type support through protocol buffers, and great streaming capabilities.

### Typical Web Application Setup

Note: This is a simple system diagram with components applicable to many system design problems. Depending on the specific problem, you would need to add additional nodes to address requirements discovered during the earlier stages of the interview.

- Web Server running an API
  - Scale using load balancers
- Database
  - Caching (Redis, Memcache, etc.)
  - Indexes
  - Replication
- Asset/Image Server
  - Use CDN to distribute content worldwide with low latency

![image of a system diagram for a typical web app setup](/blog-system-design-interview-notes/system-diagram.png)

## 4. Last part!

Review the system diagram with the interviewer, step by step, to confirm that you have addressed all the functional requirements scoped at the beginning of the interview.
