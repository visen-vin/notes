# Ep. 5: Promise APIs (all, allSettled, race, any)

When you need to handle multiple promises in parallel (e.g., calling 10 different APIs at once), you use the Promise APIs. They all take an **array** of Promises as input.

### 1. Promise.all() (Fail-Fast)

- **Goal:** Wait for **ALL** promises to resolve successfully.
- **Input:** `[P1, P2, P3]`
- **Success:** Returns an array of results `[val1, val2, val3]` after the *last* promise finishes.
- **Failure:** If *any* promise fails (e.g., P2 rejects), `Promise.all` immediately **fails** (rejects) with P2's error. It does not wait for P3.
- **Analogy:** "All or Nothing".

```javascript
// Scenario: All Success
// Output: [val1, val2, val3] (after 3s if P3 is slowest)

// Scenario: One Failure (P2 fails at 1s)
// Output: Error from P2 (immediately at 1s)
```

### 2. Promise.allSettled() (Wait-For-All)

- **Goal:** Wait for **ALL** promises to finish, regardless of success or failure.
- **Input:** `[P1, P2, P3]`
- **Success:** Returns an array of *objects* describing the outcome of each promise.
    - `{ status: "fulfilled", value: val1 }`
    - `{ status: "rejected", reason: err2 }`
- **Failure:** It **never** rejects short-circuit style. It waits for everyone.
- **Analogy:** "Report Card". You get a result for every subject, pass or fail.

### 3. Promise.race() (First-Settled Wins)

- **Goal:** Get the result of the **first** promise to settle (either resolve OR reject).
- **Input:** `[P1, P2, P3]`
- **Outcome:**
    - If P2 resolves first -> Returns P2's value.
    - If P2 rejects first -> Returns P2's error.
- **Analogy:** A real race. Whoever crosses the finish line first (winner or crash) determines the outcome.

### 4. Promise.any() (First-Success Wins)

- **Goal:** Get the result of the **first** promise to settle **successfully** (resolve).
- **Input:** `[P1, P2, P3]`
- **Outcome:**
    - If P2 fails first, it ignores it and waits for the next one.
    - If P3 resolves first, it returns P3's value.
- **Failure:** If **ALL** promises fail, it returns an **AggregateError** (an array of all errors).
- **Analogy:** "Seeking Success". You ignore failures until you find one success.

### Summary Table

| API | Behavior | Failure Handling |
| --- | --- | --- |
| **Promise.all** | Waits for all success | Fails immediately if one fails |
| **Promise.allSettled** | Waits for all to finish | Never fails fast; returns status for all |
| **Promise.race** | Returns first to finish | Returns first result (success OR fail) |
| **Promise.any** | Returns first **success** | Fails only if ALL fail (AggregateError) |