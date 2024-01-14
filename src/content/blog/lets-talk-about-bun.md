---
title: "Let's talk about Bun v1.0"
description: "This is a written version of the talk I gave at React Ottawa, breaking down the 1.0 release of Bun at a high level."
pubDate: "Oct 18 2023"
heroImage: "/blog-lets-talk-about-bun/cover.jpg"
---

[Bun](https://bun.sh/) is an all-in-one toolkit for running, building, testing and debugging JavaScript and TypeScript applications. It focuses on performance and developer experience, aiming to unify the fragmented JavaScript tooling ecosystem.

## What exactly is Bun?

At its core, Bun is a JavaScript runtime, similar to [Node](https://nodejs.org/en) and [Deno](https://deno.com/). Which allows JavaScript to interact with lower-level system resources like the file system and network services. Before JavaScript runtimes like these existed, JavaScript was confined to running only in web browsers. It was simply a programming language for the web.

Bun focuses on developer experience and performance.

The state of tooling in the JavaScript ecosystem is somewhat fragmented. A lot of tools are required when your starting a project for transpiling, bundling, testing, etc. Bun attempts to improve the developer experience by reducing the number of additional tools you need.

### Running JavaScript or TypeScript

```bash
bun index.ts
```

### Bundling code

```bash
bun build ./index.tsx --outdir ./out
```

### Running tests

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

The API layer of Bun is written in [ZIG](https://ziglang.org/), a low-level programming language, whereas the API layer of Node is mainly written in C++. ZIG, which was released in 2016, didn't exist when Node was created. Often referred as the next generation alternative to the C programming language, ZIG is recognized for its speed and simplified memory management.

![image breaking down the the bun and node runtimes](/blog-lets-talk-about-bun/1.jpg)

I believe that the performance improvements in Bun are due to its use of JavaScriptCore and a performance-focused API layer. Utilizing JavaScriptCore can lead to faster startup times when installing packages, running tests, and executing code. Unlike Node, Bun's API layer is fundamentally designed for performance. Unlike Node, it does not have a codebase that's over a decade old.

Node is a mature project, over a decade old, and currently in version 20. In contrast, Bun is a newcomer that does not maintain a similarly aged codebase. Node, being battle-tested and relied upon by a considerable amount of global code, cannot afford to be as experimental with its runtime. On the other hand, Bun, being in its early stages, has the freedom to be more experimental.

## List of built-in features

- Supports TypeScript and JSX natively
- Includes a built-in SQLite database
- Provides built-in support for environment variables
- Features built-in support for Web Sockets

### Node compatibility

Bun is [compatible with the Node API](https://bun.sh/docs/runtime/nodejs-apis), enabling easy replacement of Node with Bun in your project. This gives you access to all the packages available on NPM.

### CommonJS and ES module support

One of the most exciting features of Bun is the ability to use both CommonJS and ES modules in the same file, relieving developers from having to choose between the two.

```jsx
import lodash from "lodash";
const _ = require("underscore");
```

<br/>

<!-- ## Bun in Practice

In practice, Bun is fast and easy to use. Installation is straightforward, and the CLI helps you navigate its various commands. In my testing, I decided to conduct my own benchmarks to validate or challenge the benchmarks stated on the Bun website.

I focused on the following three tests. **This is not a comprehensive comparison of Bun and Node performance, but rather an observation of areas where I might see the impact of Bun's claimed performance gains.** All of the following tests were conducted on an M2 MacBook Air. -->

<!-- ### Package manager benchmarks

At the time of release, Bun claims that its package manager is

### Rendering React components using Nextjs

placeholder

### HTTP request benchmarks

placeholder -->

## Final Thoughts

Bun introduces many innovative features to the JavaScript ecosystem and pushes Node to improve. While I believe that Node isn't going anywhere, it's exciting to see how Bun's fresh ideas might influence Node's future development.

Ultimately, Bun aims to improve the developer experience by reducing the number of tools required in a project. It's a promising addition to the JavaScript ecosystem that's worth keeping an eye on.
