# Ep. 16: JS Engine EXPOSED (Google's V8 Architecture)

### 1. The JS Runtime Environment (JRE)

The **`JavaScript Engine`** does not exist in isolation. It runs inside a larger container called the **`JavaScript Runtime Environment (JRE)**.`

**What's inside the JRE?**

1. **`JS Engine:`** The heart of the runtime (e.g., V8, SpiderMonkey).
2. **`Web APIs:**` (setTimeout, fetch, DOM, etc.).
3. **`Callback Queue:`** For async callbacks.
4. **`Microtask Queue:**` For Promises.
5. **`Event Loop:`** Orchestrates everything.

> `Note: Browsers and Node.js are both JREs. They both contain the JS Engine but provide different APIs.`

### 2. Architecture of the JS Engine

The JS Engine takes your high-level code and converts it into machine code that the computer can execute. This happens in three major steps:

#### Step 1: Parsing

- **`Tokenization:**` The code is broken down into small units called **`tokens** (e.g., var, a, =, 7).`
- **`Syntax Parser:`** The parser checks the code for syntax errors.
- **`AST (Abstract Syntax Tree):**` If the syntax is correct, it generates an AST. This is a tree-like structure representing the code logic.

#### Step 2: Compilation (JIT)

- **Interpreter vs. Compiler:**
    - **`Interpreter:`** Executes code line-by-line. Fast to start, but execution can be slow if the same code runs many times.
    - **`Compiler:`** Scans the whole code and produces an `optimized version (machine code).` Takes longer to start, but execution is faster.
- **`JIT (Just-In-Time) Compilation:**` JavaScript uses **both**. It is a `JIT-compiled language.` It interprets the code initially but monitors it `("Profiling").` Code that runs frequently `("Hot Code")` is sent to the Compiler to be optimized on the fly.

#### Step 3: Execution

- **`Memory Heap:`** Where variables and objects are stored.
- **`Call Stack:**` Where code is executed.
- **`Garbage Collector:**` Frees up memory space using the **`Mark and Sweep** algorithm.`

### 3. Google's V8 Engine (Specifics)

V8 is the engine used in `Chrome and Node.js.` It is written in **C++**.

**Key Components:**

- **`Ignition (Interpreter):`** Takes the AST and converts it into **`Bytecode**.`
- **`TurboFan (Optimizing Compiler):`** Takes the `Bytecode` and `"Hot Code"` data from Ignition and produces `highly optimized **Machine Code**.`
- **`Orinoco (Garbage Collector):**` Handles memory cleanup efficiently so the main thread isn't blocked for too long.

### Summary Flow

1. **`Code** -> **Parser** -> **AST**.`
2. **`AST** -> **Ignition** (Interpreter) -> **Bytecode**.`
3. **`Bytecode** runs.`
4. **`Profiler`** watches for `"Hot Code".`
5. **`TurboFan** (Compiler)` optimizes `"Hot Code"` -> `**Machine Code**.`