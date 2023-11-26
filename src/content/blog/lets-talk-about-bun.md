---
title: "Let's talk about Bun 1.0"
description: "This is a written version of the talk I gave at React Ottawa, breaking down the 1.0 release of Bun at a high level."
pubDate: "Oct 18 2023"
heroImage: "/blog-lets-talk-about-bun/cover.jpg"
---

[Bun](https://bun.sh/) is an all-in-one toolkit for running, building, testing and debugging JavaScript and TypeScript applications. It focuses on performance and developer experience, aiming to unify the fragmented JavaScript tooling ecosystem.

## What exactly is Bun?

At its core, Bun is a JavaScript runtime, similar to [Node](https://nodejs.org/en) and [Deno](https://deno.com/). Which allows JavaScript to interact with lower-level system resources like the file system and network services.

Bun focuses on developer experience and performance.

The state of tooling in the JavaScript ecosystem is somewhat fragmented. A lot of tools are required when your starting a project for bundling, testing, etc. Bun attempts to improve the developer experience by reducing the number of additional tools you need.

### JavaScript runtime

```bash
bun index.ts
```

### Bundler

```bash
bun build ./index.tsx --outdir ./out
```

### Test runner

```bash
bun test
```

### Package manager and runner

```bash
bun install
bunx my-cli
```

<br/>

## Comparing Bun and Node runtimes

Bun uses [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore), the JavaScript engine used in Safari. This engine offers quicker startup time compared to [V8](https://v8.dev/) used by Node.

Previously, JavaScriptCore was also used in [React-Native](https://reactnative.dev/) due to its faster startup times. Ever since React-Native has transitioned to an engine named [Hermes](https://hermesengine.dev/), which is specifically designed for the React-Native use-case.

The API layer of Bun is written in [ZIG](https://ziglang.org/), a low-level programming language. In contrast, Node's API layer is primarily written in C++. ZIG, often hailed as the next generation of the C programming language, simplifies memory management and is known for its speed.

![image breaking down the the bun and node runtimes](/blog-lets-talk-about-bun/1.jpg)

I believe that the performance improvements in Bun are due to its use of JavaScriptCore and a performance-focused API layer. Utilizing JavaScriptCore can lead to faster startup times when installing packages, running tests, and executing code. Unlike Node, Bun's API layer is fundamentally designed for performance. Unlike Node, it does not have a codebase that's over a decade old.

## Features

- Supports TypeScript and JSX out of the box
- Includes built-in SQLite database
- Built-in support environment variables
- Buit-in support for Web Socket support

### Node compatibility

Bun is [compatible with the Node API](https://bun.sh/docs/runtime/nodejs-apis), enabling easy replacement of Node with Bun in your project. This gives you access to all the packages available on NPM.

### CommonJS and ES module support

One of the most exciting features of Bun is the ability to use both CommonJS and ES modules in the same file, relieving developers from having to choose between the two.

```jsx
import lodash from "lodash";
const _ = require("underscore");
```

<br/>

## Final Thoughts

Bun introduces many innovative features to the JavaScript ecosystem and pushes Node to improve. While I believe that Node isn't going anywhere, it's exciting to see how Bun's fresh ideas might influence Node's future development.

Ultimately, Bun aims to improve the developer experience by reducing the number of tools required in a project. It's a promising addition to the JavaScript ecosystem that's worth keeping an eye on.
