---
title: "My notes on system design interviews"
description: "A simple flow for clarifying requirements, sketching architecture, and reasoning through tradeoffs in system design interviews."
pubDate: "Aug 20 2024"
---

These are my notes for tackling system design interviews. The goal is not to cover every concept in depth. The goal is to have a simple flow you can follow when the prompt is vague and the clock is running.

System design interviews are mostly a conversation. Do not jump straight into drawing boxes. Start by making the problem smaller and clearer, then design the system around the requirements you agreed on.

As the interviewee, lead the conversation through these four parts:

1. Ask clarifying questions
2. Design the database and API schemas
3. Draw the system diagram
4. Review the diagram against the requirements

## 1. Clarifying Questions

You will usually get a vague prompt like "design YouTube" or "design Twitter." Start by turning that prompt into requirements. This part of the interview evaluates how you handle ambiguity, which is a real part of engineering work.

There are two types of requirements: functional and non-functional. Write them down as you discuss them so you can refer back to them later.

### Functional Requirements

Functional requirements describe what the system needs to do.

- What are the core features of the system?
- Who are the users? Are there different user types?
- How will users interact with the system?
- Are we designing only the backend, or the frontend as well?
- Does the system need to handle media assets like images or videos?
- What edge cases should we handle?
- What is out of scope for this interview?

Try to leave this section with a short list of features. For example, in a video app, you might scope it to uploading videos, watching videos, and searching videos. You do not need to design every feature the real product has.

### Non-functional Requirements

Non-functional requirements describe the quality of the system: scale, speed, reliability, and tradeoffs.

- What scale does the system need to support?
- Is low latency important?
- How important is data consistency?
- What level of reliability do we need?
- Is the system read-heavy or write-heavy?
- Will users access the system from one region or from around the world?

Do not treat every non-functional requirement as equally important. A chat app cares about real-time delivery. A banking system cares more about consistency. A news feed might care more about read scale and caching. Say which requirements matter most for the prompt you were given.

![image of an example of requirements](/blog-system-design-interview-notes/requirements.png)

### Calculations

For more advanced interviews, you may need to do rough calculations. Keep them simple. The point is to show that your design fits the scale of the problem, not to get every number perfect.

Useful estimates include:

- Daily active users
- Requests per second
- Read/write ratio
- Storage growth per day
- Bandwidth for large assets like images and videos

Use round numbers and explain your assumptions. If the interviewer gives you numbers, use theirs. If not, make reasonable assumptions and keep moving.

![image breaking down some quick calculations on users](/blog-system-design-interview-notes/calculations.png)

## 2. Design the Database and API Schemas

Once you understand the problem, sketch the main data model and the API contracts. You do not need every column or every endpoint. Focus on the parts that support the requirements you agreed on.

Start with the nouns in the problem. For a video app, those might be users, videos, comments, likes, and channels. Then think through how they relate to each other.

### Database Schema Design

- Primary keys: Every table should have a stable way to identify records.
- Foreign keys: Use foreign keys when relationships between tables matter.
- Data types: Choose data types that match the data and avoid waste.
- Constraints: Use constraints like `NOT NULL`, `UNIQUE`, and `CHECK` to protect data integrity.
- Query optimization: Design around the queries the app needs to run often.
- Read/write patterns: Match the schema to the expected read and write behavior.

Indexes are worth calling out early. They make reads faster, but they add storage cost. A good interview answer explains which fields need indexes and why.

### Example of a Video App Database Schema

![image of an example database schema](/blog-system-design-interview-notes/db-schema.png)

### API Design

Keep API design boring unless the problem needs something special. REST is usually fine for client-server communication. GraphQL can be useful when different clients need different shapes of the same data. gRPC can be useful for internal service-to-service calls.

For REST APIs, design around resources instead of actions. Use `/videos` instead of `/addVideo`. Also mention request and response shapes for the most important endpoints if time allows.

### Example Routes

```
// Retrieve all videos.
GET /videos

// Create a new video.
POST /videos

// Retrieve details of a specific video by its ID.
GET /videos/{videoId}

// Update the details of a specific video by its ID.
PUT /videos/{videoId}

// Delete a specific video by its ID.
DELETE /videos/{videoId}

// Retrieve a paginated list of videos sorted by a field.
GET /videos?page={pageNumber}&limit={pageSize}&sort={sortBy}

// Search for videos by criteria such as title or channel.
GET /videos/search?title={title}&channel={channel}
```

### Security

Security should show up in the design, not as an afterthought.

- Authentication: How does the system know who the user is?
- Authorization: What is the user allowed to do?
- Rate limiting: How do we protect the system from abuse?
- Input validation: How do we avoid accepting bad or unsafe data?

For an interview, you usually do not need to go deep here. Just show that sensitive operations have clear access control.

## 3. System Diagram

Next, draw the system diagram. Start simple: client, load balancer, application servers, database. Then add components only when they solve a requirement.

Every box on the diagram should have a reason to exist. If you add Redis, explain what it caches. If you add a queue, explain what work becomes asynchronous. If you add a CDN, explain which assets it serves.

### Load Balancers

- Distribute traffic across servers to improve throughput, latency, and scalability.
- Support horizontal scaling by letting you add more application servers.
- Reduce the risk of one server becoming a bottleneck.
- Common routing algorithms include round-robin and least-load.

Horizontal scaling means deploying multiple nodes that share the work. Vertical scaling means making one node bigger. Vertical scaling can help for a while, but it also creates a larger single point of failure.

### DNS Load Balancing

DNS load balancing routes requests to different IPs based on a domain. It is useful for regional traffic routing, but it gives you less control than an application load balancer.

### Caching

Caching reduces database load and improves response time, especially in read-heavy systems.

- Cache frequently read data.
- Use a time-to-live (TTL) so stale data eventually expires.
- Decide what happens when data changes.
- Use in-memory stores like Redis or Memcached for fast access.

Caching is a tradeoff. It improves speed, but it can make consistency harder. In an interview, say what can be slightly stale and what must always be fresh.

### Content Delivery Networks

CDNs cache static assets globally. They are useful for images, videos, JavaScript, CSS, and other files that can be served from locations closer to the user.

### Object Storage

Object storage is commonly used for media files and large assets.

- Stores images, videos, documents, and other blobs.
- Keeps large files out of the database.
- Reduces disk pressure on application servers.
- Usually provides durability and replication.

For a video app, users might upload video files to object storage. The database stores metadata like title, owner, status, and file location.

### Databases

The database choice should follow the access pattern.

- Use indexes for common filters, joins, and lookup fields.
- Avoid designing queries that require scanning large tables.
- Keep frequently accessed data easy to retrieve.

Most interviews are fine with a relational database unless the prompt gives you a reason to use something else.

### Replication

Replication improves read scalability and reliability by copying data from a primary database to read replicas.

- Reads can go to replicas.
- Writes usually go to the primary node.
- Replication can create brief inconsistency because replicas may lag behind.

This works well when the system can tolerate slightly stale reads. It is riskier when the user expects to read their own write immediately.

### Sharding

Sharding splits data horizontally across multiple database nodes. It can help when a single database can no longer handle the write load or data size.

One simple sharding approach is using the modulo operator. For example, with a user table, you could use `(userID mod number_of_nodes)` to decide where data goes.

Sharding adds complexity. Queries across shards are harder, migrations are harder, and choosing the wrong shard key can create hot spots. Do not introduce it unless the scale requires it.

### Queues and Background Jobs

Queues are useful when work does not need to happen during the request.

- Sending emails
- Processing uploads
- Generating thumbnails
- Encoding videos
- Delivering notifications

A queue lets the API respond quickly while workers process jobs in the background. Mention retries and idempotency if the job might run more than once.

### NoSQL vs SQL/Relational Databases

NoSQL databases can be useful when you need flexible schemas, high write throughput, or data that naturally fits a document or key-value model.

For interviews, default to SQL/relational databases unless the problem clearly benefits from NoSQL. Relational databases are easier to reason about for relationships, constraints, and transactions.

The main interview difference is schema shape. Relational databases split data across tables. Document databases often keep related data together in one record.

### Client/Server Communication

- Use HTTP and REST for most client-server communication.
- Consider GraphQL when many clients need different data shapes from the same backend.
- Consider gRPC for server-to-server communication where strong contracts and smaller payloads help.
- Consider WebSockets or Server-Sent Events when the system needs real-time updates.

Pick the simplest option that supports the requirements.

### Typical Web Application Setup

This is a simple system diagram with components that apply to many web applications. Depending on the prompt, add or remove nodes based on the requirements from the start of the interview.

- Client
- Load balancer
- Web servers running the API
- Database
- Cache such as Redis or Memcached
- Object storage for files
- CDN for static assets
- Queue and workers for slow background work

![image of a system diagram for a typical web app setup](/blog-system-design-interview-notes/system-diagram.png)

## 4. Review the Diagram

End by walking through the system step by step. Use the functional requirements from the beginning of the interview as your checklist.

For each main flow, explain:

- What the client calls
- Which services handle the request
- What data is read or written
- What is cached
- What happens asynchronously
- What can fail
- Which tradeoffs you made

This final review is important. It shows the interviewer that your diagram is not just a collection of boxes. It is a system that supports the requirements you agreed on.
