# Ep. 14: Async vs Defer in JavaScript

## Overview

This document summarizes the differences between `async` and `defer` attributes for the `<script>` tag, based on the concepts explained by **Akshay Saini**. These attributes control how external JavaScript files are fetched and executed relative to HTML parsing.

# 1. Normal Script Loading (Default)

## 🔹 The Behavior

When the browser encounters a standard `<script src="...">` tag:

1. **HTML Parsing Pauses** immediately.
2. The script is fetched from the network.
3. The script is executed.
4. **HTML Parsing Resumes** only after execution finishes.

## 🔹 The Problem

- **Blocks Rendering:** The user sees a blank or incomplete screen while the script loads.
- **Poor UX:** Increases the time to First Contentful Paint (FCP).

# 2. The `async` Attribute

## 🔹 What is it?

`<script async src="...">` tells the browser to download the script **in parallel** (background) without blocking HTML parsing.

## 🔹 Execution Behavior

- **Download:** Asynchronous (non-blocking).
- **Execution:** Happens **immediately** as soon as the download finishes.
- **Parsing:** HTML parsing **pauses** temporarily during the script's execution.

## 🔹 Key Characteristics

- **Order Not Guaranteed:** Scripts execute whenever they finish downloading. A smaller script might run before a larger one, even if it appears later in the code.
- **Use Case:** Independent scripts that do not rely on the DOM or other scripts (e.g., **Google Analytics**, **Ads**, **Tracking Pixels**).

# 3. The `defer` Attribute

## 🔹 What is it?

`<script defer src="...">` also downloads the script **in parallel**, but schedules execution for later.

## 🔹 Execution Behavior

- **Download:** Asynchronous (non-blocking).
- **Execution:** Deferred until **after** HTML parsing is completely finished (but before the `DOMContentLoaded` event).
- **Parsing:** Never blocked by the script.

## 🔹 Key Characteristics

- **Order Guaranteed:** Scripts execute in the exact order they appear in the HTML document.
- **Use Case:** Core application logic, libraries, or scripts that need to manipulate the DOM.

# 4. Comparison Summary

| Feature | `<script>` (Normal) | `<script async>` | `<script defer>` |
| --- | --- | --- | --- |
| **Download** | Blocks Parsing | Parallel (Background) | Parallel (Background) |
| **Execution** | Immediate | Immediate (Pauses Parsing) | After HTML Parsing |
| **Order** | Guaranteed | **Random** (Network dependent) | Guaranteed |
| **DOM Access** | Blocked | Unsafe (DOM might not be ready) | Safe (DOM is ready) |
| **Best For** | Critical/Legacy | Ads, Analytics, Trackers | App Logic, UI Interactive Code |

# 5. Cheat Sheet / Best Practices

- **Default to `defer`:** It mimics placing scripts at the bottom of `<body>` but with the benefit of early downloading (parallel fetch).
- **Use `async`:** Only for third-party scripts that don't care about the DOM or other code (e.g., `analytics.js`).
- **Head vs Body:** With `defer`, you can safely put scripts in the `<head>` to start the download early without blocking the UI.

### Code Example

```html
<!-- Recommended Pattern -->
<head>
  <!-- Analytics: Load as fast as possible, order doesn't matter -->
  <script src="analytics.js" async></script>

  <!-- App Logic: Load early, execute after HTML is parsed -->
  <script src="app-bundle.js" defer></script>
</head>
```
