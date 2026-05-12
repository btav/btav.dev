---
title: "My notes on frontend system design interviews"
description: "Frontend system design notes covering data loading, component architecture, performance, accessibility, and UX tradeoffs."
pubDate: "Sept 1 2024"
---

For more common system design interviews that focus on backend or full-stack topics, see my [system design interview notes](/blog/system-design-interviews). These notes are for frontend system design interviews, which are less common.

The interview is still about requirements, tradeoffs, and communication. The difference is that the design should focus more on user flows, data loading, state, rendering, performance, accessibility, and how the UI is broken into components.

As the interviewee, lead the conversation through these sections:

- Clarifying questions
- Communication with the backend
- Data and state model
- Component architecture
- Performance
- Accessibility
- Security
- Review the design against the requirements

## Clarifying Questions

You will usually get a vague prompt like "design a photo feed" or "design a dashboard." Start by turning that prompt into a small set of requirements. Do not try to design the entire real product.

There are two types of requirements: functional and non-functional. Write them down as you discuss them so you can refer back to them later.

### Functional Requirements

Functional requirements describe what the user needs to do.

- What are we expected to build?
- What are the main screens or flows?
- What are the must-haves versus nice-to-haves?
- Are users viewing, creating, editing, deleting, or sharing content?
- Do we need file uploads or other assets?
- What empty states, loading states, and error states do we need?
- What edge cases should we handle?
- What is out of scope for this interview?

The scope should be small enough to cover in 45 minutes while still showing good judgment. A focused answer is better than trying to cover every possible feature.

### Non-functional Requirements

Non-functional requirements describe the quality of the frontend experience.

- Which devices should we support? Desktop web, mobile web, or both?
- What is the primary device for user access?
- Is SEO important?
- Do we need multilingual support?
- Is content order important for right-to-left languages?
- Do we need Progressive Web App features like notifications, offline support, or caching?
- Are we matching an existing native app, building a PWA, or building a standalone web app?
- What are the security requirements?
- How important is performance?
- Do we need to prioritize speed, smoothness, or both?
- What accessibility requirements matter for this product?

If SEO matters, Server-Side Rendering (SSR) may be useful. If the app is behind authentication and does not need search indexing, a Single Page Application (SPA) may be enough. Tie the rendering choice back to the product requirements.

## Communication With Backend

Frontend system design usually depends on how the frontend gets data. Start with the main data needed for the page, then explain how the UI fetches, caches, updates, and handles errors.

There are several common ways to communicate with a backend. Depending on the question, you may need a combination of them.

### HTTPS APIs

For most use cases, calling HTTPS endpoints is enough.

- Simple request/response model
- Works well with REST APIs
- Easy to cache at the browser, CDN, or application layer
- Good default for dashboards, feeds, forms, and search pages

Mention pagination, filtering, sorting, and error responses where they matter.

### Real-time Updates

Use real-time communication only when the product needs it. Examples include chat, collaboration tools, live dashboards, notifications, and delivery tracking.

- Polling: Simple and reliable, but can waste requests.
- Long polling: Useful when updates are less frequent.
- WebSockets: Good for two-way real-time communication.
- Server-Sent Events: Good when the server pushes updates to the client.

One caveat with WebSockets is that each active client keeps an open TCP connection, and servers have limits on how many TCP connections they can hold open at once. That can be fine at smaller scale, but at large scale you need to think about connection limits, load balancing, horizontal scaling, and what happens when clients reconnect. Depending on the product, polling or Server-Sent Events may be simpler and good enough.


### Backend for Frontend

A Backend for Frontend (BFF) can be useful when the frontend needs data from several services.

- Calls relevant backend services
- Combines data into the shape the UI needs
- Hides backend complexity from the client
- Keeps client code smaller and simpler

This is especially useful when mobile and web clients need different response shapes.

### GraphQL

GraphQL lets clients request exactly the data they need. It can help when multiple clients share the same backend but need different fields.

A common GraphQL setup sends requests as HTTP `POST` calls to one endpoint. This is flexible, but normal HTTP caching can be harder than REST, and you still need to think about authorization, request cost, schema design, and error handling. GraphQL is useful when it fits, but it adds tradeoffs.

## Data and State Model

A strong frontend design separates different kinds of state.

- Server state: Data fetched from the backend, like users, posts, comments, and permissions.
- Local UI state: Modal state, selected tabs, expanded rows, and temporary UI details.
- Form state: Draft input values, validation errors, touched fields, and submission state.
- URL state: Filters, search terms, pagination, and selected views that should be shareable or restorable.
- Global client state: Auth session, theme, feature flags, and app-wide preferences.

Do not put everything in global state. Keep state close to where it is used unless multiple parts of the app truly need it.

Also talk through the main data lifecycle:

- Initial load
- Loading state
- Success state
- Empty state
- Error state
- Refetching or refreshing
- Updating after a user action

This helps the interviewer see that you are designing the actual user experience, not just the happy path.

## Component Architecture

Break down the UI into components the way you would in React or another frontend framework. Sketch these components on the whiteboard or in the collaborative tool you are using.

Start with the page-level layout, then break it down into smaller pieces. For a feed, that might be page shell, feed list, feed item, composer, media preview, comment list, and action buttons.

- Components should hide complexity behind a clear interface.
- Reuse components when they represent the same concept.
- Avoid forcing reuse when two things only look similar by accident.
- Think about props, defaults, and controlled versus uncontrolled behavior.
- Each component should own only the state it needs.
- Multiple instances of the same component should be able to coexist on one page.
- Prefer composition when it keeps the component flexible.

## Performance

Focus on both smoothness and speed. Smoothness is about how the app feels during interaction. Speed is about how fast useful content appears.

### Smoothness Improvements

- Keep back navigation fast with cached page data or a page stack.
- Show skeletons or loading indicators during forward navigation.
- Give fast feedback after user actions.
- Use optimistic UI when failure is rare and recovery is clear.
- Use passive listeners where they help scrolling and gestures.
- Keep animations short, purposeful, and interruptible.
- Use progressive images with blurred placeholders where images are central to the experience.

For user actions, make sure the app feels responsive even when the network is slow. A disabled button, spinner, toast, or optimistic update can make the state of the app clear.

### Speed Improvements

- Preload or prefetch important resources.
- Lazy-load code and assets that are not needed immediately.
- Use code splitting.
- Render only visible content in long lists with windowing or virtualization.
- Minify HTML, CSS, and JavaScript.
- Reduce unnecessary HTTP requests.
- Cache static resources with a CDN.
- Optimize images and media.
- Use service workers for offline caching when the product needs it.
- Use pagination or infinite loading where appropriate.
- Use SSR or an initial data feed to improve the first useful render.
- Enable browser caching through HTTP headers.
- Enable compression.
- Use scalable SVGs for icons.

For long lists, virtualization is often worth mentioning. Rendering thousands of DOM nodes can slow down the page even if the data fetch is fast.

## Accessibility

Accessibility should be part of the design from the start.

- Use semantic HTML to give structure and meaning to content: `<section>`, `<header>`, `<nav>`, `<main>`, and similar elements.
- Use the right HTML element first, then use ARIA when native semantics are not enough.
- Ensure sufficient contrast between foreground and background colors.
- Make interactive elements keyboard-accessible.
- Use real buttons and links when possible.
- Make sure custom controls can receive focus.
- Include descriptive `alt` text for meaningful images.
- Use empty `alt` text for decorative images.
- Use `aria-label` for icon buttons without visible text.
- Provide transcripts or captions for audio and video content.
- Manage focus when opening modals, drawers, and menus.

For an interview, you do not need to list every accessibility rule. Show that keyboard users, screen reader users, and users with low vision are part of the design.

## Security

Frontend security is usually not the whole interview, but it should be mentioned when it affects the design.

- Use `HTTPS` for all communication.
- Guard against cross-site scripting (XSS), especially when rendering user input.
- Avoid unsafe rendering methods like `.innerHTML` or `dangerouslySetInnerHTML` unless the content is sanitized.
- Protect sensitive actions against Cross-Site Request Forgery (CSRF) when cookies are used.
- Prevent clickjacking with appropriate headers.
- Do not store sensitive tokens in places that increase exposure.

Keep this practical. The frontend can reduce risk, but the backend still needs to enforce authentication, authorization, and data validation.

## Review the Design

End by walking through the design with the interviewer. Use the functional requirements from the beginning as your checklist.

For each main flow, explain:

- What the user sees
- Which components render
- What data is fetched
- Where state lives
- What happens while loading
- What happens on error
- How the UI stays accessible
- What performance tradeoffs you made

This final review ties the design together. It shows that the component tree, data loading, and performance choices all support the same product requirements.
