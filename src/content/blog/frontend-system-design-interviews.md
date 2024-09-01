---
title: "Notes on frontend system design interviews"
description: "Notes on frontend system design interviews"
pubDate: "Sept 1 2024"
---

For more common system design interviews focusing on backend or full-stack topics, refer to my [system design interview notes](/blog/system-design-interviews). These notes here are specifically tailored for frontend system design interviews, which are less common.

Many technical concepts are mentioned here without extensive detail. As the interviewee, lead the conversation through these sections:

- Clarifying questions
- Communication with backend
- Component architecture
- Performance
- Accessibility
- Go over the system diagram for each functional requirement

## Clarifying questions

You will be given a vaguely defined system design problem. Start with clarifying questions to gather requirements. This part of the interview is used to evaluate your requirement gathering skills, an important part of being a software engineer.

There are two types of requirements: functional and non-functional. Be sure to write them down as you discuss them.

### Functional requirements

- What are we expected to create?
- What are the must-haves and nice-to-haves?
- For inputs, should we support file uploads or other assets?
- What are the potential edge cases?
- The scope shouldn't aim for perfection, but the core features should impress an interviewer within 45 minutes.

### Non-functional requirements

- Which devices should we support? (e.g. desktop web, mobile web)
- What's the primary device for user access?
- Is SEO important? If yes, we'll use Server-Side Rendering (SSR); otherwise, a Single Page Application (SPA) suffices.
- Do we need multilingual support?
- Is content order crucial? Should we support right-to-left (RTL) languages like Arabic or Hebrew?
- Do we need Progressive Web App (PWA) features such as notifications, offline support, or caching?
- How does this relate to native apps? Is it a replica of an existing app, or should we create a PWA or use hybrid technologies?
- What are the security requirements?
- How important is performance? Do we need to prioritize speed and smoothness?
- Accessibility requirements:
  - Color contrast ratios
  - Keyboard navigation support
  - Screen reader compatibility
    - for users with visual or auditory impairments

## Communication with backend

There are various ways to communicate with a backend. Here's a quick list of different approaches and some use cases where they may be applicable. Depending on the question, you may need a combination of these.

**Most use cases**

- Call HTTPS endpoints

**Real-time**

- Long/short polling (client pull)
- WebSockets (server push)
- Server-Sent Events (server push)

**Backend for Frontend (BFF)**

- Call relevant microservices APIs to obtain necessary data
- Format data to match frontend representation
- Deliver formatted data to the frontend

**GraphQL**

- Allows clients to request precisely what they need

## Component architecture

Break down the components as we would in React or other frontend frameworks. Sketch these components on the whiteboard or any collaborative tool at your disposal.

- The key idea behind components is reusability and abstraction of complexities.
- Consider the configuration options (props in React) you'd allow for the component. What are reasonable defaults?
- Follow the [Open-closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) — the component should be open for extension but closed for modification.
- Each component should maintain its own independent state, allowing multiple instances to coexist on a single page.
- Lifecycle/event hooks:
  - `onClick`, `onChange`, `onBlur`, `onFocus`, etc.
- `className` or `style` props — Allow users to inject class names and/or styling attributes to inner DOM elements.

## Performance

Focus on both smoothness and speed / performance improvements.

**Smoothness improvements (remove jank)**

- Instant go back (Page Stack/Global state/API caching)
  - Cache previous page data for fast return navigation
- Instant go forward (Skeleton / Loading indicator / Above-the-fold)
  - Enable immediate forward navigation
- Instant interaction response (Accessibility — A11y, Passive listener, support Design guidelines)
- Implement native-like Animation/Transitions/Gestures
- Create native-like UI components
- Use progressive images (blurry placeholders)
- Implement Optimistic UI

**Speed / Performance improvements**

- Preload / prefetch resources
- Implement lazy-loading
- Render only visible content
  - Use windowing/virtualization — emulate long lists while rendering minimal elements
  - Avoid rendering all elements to conserve processing power and memory
- Implement code splitting
- Minify HTML, CSS & JavaScript
- Reduce HTTP requests
- Use Caching / CDN for static resources
  - Optimize assets
- Improve Time to First Byte (TTFB)
  - Measure web server responsiveness
  - Use CDN for static sites
- Implement Service Worker for offline caching
- Use auto-pager functionality
- Implement SSR / Initial data feed (improves first meaningful paint)
- Enable browser caching through HTTP headers
- Enable gzip compression
- Use sprite images
- Use scalable SVG for icons

## Accessibility

- Use semantic HTML to provide structure and meaning to content. `<section>` `<description>` `<header>`, etc.
- Ensure sufficient contrast between foreground and background colors for better readability.
- Utilize appropriate HTML tags or `aria-role` attributes to convey correct semantics.
- Make clickable items focusable with the `tabindex` attribute and use "cursor: pointer" styling to indicate interactivity.
- Include descriptive `alt` text for images to support screen readers and provide fallback information if images fail to load.
- Use `aria-labels` to provide context for non-visual users, especially for elements like icon buttons without visible text labels.
- Offer transcripts or captions for audio and visual content to ensure accessibility for all users.

## Go over system diagram for each functional requirement

Review the system diagram with the interviewer, step by step, to confirm that you have addressed all the functional requirements scoped at the beginning of the interview.

## Bonus: Security

- Ensure all connections use `HTTPS` for secure communication.
- Guard against cross-site scripting (XSS) attacks. Be cautious when rendering user input, especially via methods like `.innerHTML` or `dangerouslySetInnerHTML` in React.
- Implement protection against Cross-Site Request Forgery (CSRF) attacks.
- Prevent clickjacking by using appropriate security headers.
