---
title: "Guide to System Design Interviews"
description: "Guide for preparing for system design interviews"
pubDate: "Mar 17 2024"
heroImage: "/blog-guide-to-system-design-interviews/cover.png"
---

System design interviews are an integral part of the hiring process for software engineering roles. They provide an opportunity to showcase your understanding of systems at scale and your ability to design robust, efficient solutions. Here's a post to help you prepare for system design interviews.

## 1. Understand the Problem

You will be given a vaguely defined system design problem. Start with clarifying questions to gather functional and non-functional requirements. This part of the interview is used to evaluate your requirement gathering skills, an essential part of being a software engineer.

Functional requirements define the system's purpose, its users, use cases and edge cases. To understand these, ask clarifying questions about:

- The system's main features.
- The system's primary users.
- The interaction between users and the system.
- Specific requirements for data input and output.
- Edge cases that the system should handle.

Non-functional requirements, on the other hand, concern system scale, latency, consistency, reliability, and geographical distribution.

- What is the expected load on the system?
- What are the performance requirements (e.g., response time, throughput, latency) of the system?
- How important is data consistency in the system?
- How reliable does the system need to be?
- Will the system be accessed by users worldwide or in a specific region?

## 2. Design the Schemas

Once you understand the problem, design the schemas for your system. This involves writing a rough draft of the database schema and API contracts that will be used to interact with your system.

## 3. Create a System Diagram

Next, design a system diagram. This diagram is a blueprint of how all the parts of your system will work together. While every problem will be unique, there are several common components that are applicable to most system design problems.

Understanding these common components can help you create effective system design diagrams.

### Load Balancers

Load balancers distribute traffic to different servers to improve throughput latency and scalability. They allow your service to scale horizontally rather than vertically, which avoids a single point of failure. Examples of load balancers include NGINX and HAProxy. Additionally, cloud providers have their own load balancers.

You can also use DNS load balancing, which routes requests to different IPs based on a URL or domain. While it offers limited customizability, it can be useful in certain scenarios.

### Caching

Caching can alleviate some of the load on your database, especially in READ heavy applications.

By using caching, you can store frequently accessed data in a way that allows for much quicker retrieval than would be possible if you had to interact with the database every time. This is because caching stores data in-memory, which is faster to access than on-disk storage.

You can use caching systems like Memcache or Redis to store data in-memory versus on-disk.

### Content Delivery Networks

Static files like images, CSS files, JavaScript files, videos and other multimedia content can be stored on a CDN.

CDNs cache static assets globally. They improve the speed of content delivery by serving content from the server closest to the user geographically. Examples of Content Delivery Networks (CDNs) include Amazon CloudFront, Google Cloud CDN, Cloudflare CDN and Akamai.

### Object Storage

Object storage is used to store media. It helps store and replicate data reliably, without worrying about disk space on application servers. Examples of Object Storage include Amazon S3, Google Cloud Storage, and Cloudflare R2, among others.

For optimization, you should connect your object storage to a Content Delivery Network (CDN).

### Databases

For databases, indexes are crucial for improving READ times significantly. However, they can be costly in terms of data as they occupy disk space. An index in a database is a data structure that speeds up data retrieval. It functions like a book index by quickly locating data without searching every row in a database table.

Database sharding is a strategy used to improve database performance. Sharding involves splitting a larger database into smaller components called shards, distributed across multiple servers. This method helps in improving the speed and reliability of heavy-write applications. However, it requires careful planning to ensure data is evenly distributed.

You should choose between a NoSQL or SQL/Relational database according to your system's specific requirements.

Examples of SQL databases include MySQL, PostgreSQL, SQLite and more. Examples of NoSQL databases include MongoDB, Apache Cassandra and more.

### Client / Server Communication

Choose between REST API, GraphQL, or Protocol buffers such as gRPC for client-server and server-server communication. The choice ultimately depends on the specific problem at hand.

### Study problems

Finally, prepare for common system design questions such as designing a messenger/chat application, a photo-sharing app like Instagram, or a streaming service like Netflix. Having a solid understanding of these common systems can give you a strong foundation for tackling system design problems in interviews.

Remember, system design interviews are not about getting the "right" answer but about demonstrating your problem-solving skills, communication ability, and understanding of systems at scale!
