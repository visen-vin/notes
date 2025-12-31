# Ep 1: How JavaScript Works & Execution Context

## 1. The Fundamental Rule

The most important concept to remember is this:

> Everything in JavaScript happens inside an Execution Context.

You can imagine the **Execution Context** as a big container or a box where your entire JavaScript code is executed. It is the environment that allows your code to run.

## 2. Anatomy of the Execution Context

This `Big Box` is divided into two distinct components:

### A. Memory Component (Variable Environment)

- **Location:** The left side of the container.
- **Function:** This is the storage unit of the context.
- **How it works:** It stores all variables and functions as `Key-Value Pairs`.
    - **Variables:** `key` is the variable name, `value` is the data assigned to it (e.g., `a: 10`).
    - **Functions:** `key` is the function name, `value` is the actual code of the function.
- **Technical Name:** It is technically called the `Variable Environment`.

### B. Code Component (Thread of Execution)

- **Location:** The right side of the container.
- **Function:** This is the _engine room_ where the work happens.
- **How it works:** This is the place where code is actually executed, **one line at a time**.
- **Technical Name:** It is technically called the _Thread of Execution_.

---

## 3. The Nature of JavaScript

JavaScript is defined as a **Synchronous Single-Threaded Language**. Let's break down what that means:

- **Single-Threaded:**
    - JavaScript has only **one call stack** and **one memory heap**.
    - It can only execute **one command at a time**. It cannot run multiple lines of code in parallel (unlike multi-threaded languages).
- **Synchronous:**
    - It executes code in a **specific order** (sequentially).
    - It must finish executing the current line of code before it moves to the next line. It waits for the current operation to complete.

## Summary

When you run a JS program, the engine creates a `Global Execution Context`. It allocates memory for your data on the left side and executes your logic line-by-line on the right side.
