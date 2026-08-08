 ##   Async Js (Under the Hood ) MODULE 1 :
    ---- Synchronous vs. Asynchronous (Non-blocking principle) 
JavaScript is a **single-threaded**, **synchronous** programming language by default. It possesses a single **Call Stack**, meaning it can execute only one piece of code at a time.

---

## 1. Synchronous vs. Asynchronous Execution

* **Synchronous (Blocking):** Code is executed line-by-line in sequential order.
 A long-running task blocks all subsequent execution until it completes.
* **Asynchronous (Non-Blocking):** Time-consuming operations (e.g., Network Requests, Timers)
 are delegated to background browser threads, allowing the main thread to continue executing code without freezing the UI.

---

## 2. V8 Runtime Architecture & The Event Loop

The JavaScript runtime consists of four main components:

1. **Call Stack:** Executes code sequentially using LIFO (Last In, First Out) stack order.
2. **Web APIs:** Container provided by the browser (C++ environment) handling background operations like `setTimeout`, `fetch()`, and DOM events.
3. **Callback Queues:**
   * **Microtask Queue:** High-priority queue reserved exclusively for **Promises** (`.then`, `async/await`) and `queueMicrotask`.
   * **Macrotask (Task) Queue:** Lower-priority queue for timers (`setTimeout`, `setInterval`) 
   and I/O events.
4. **Event Loop:** A continuous process monitoring the Call Stack. Once the Call Stack 
is completely empty, it pushes callbacks from the queues into the stack using strict priority rules.

> **Golden Rule of Priority:**
> `Microtask Queue` has absolute priority over `Macrotask Queue`. The Event Loop empties the entire Microtask Queue before processing a single Macrotask.

---

## 3. Code Example: Execution Order & Queue Priority

```js
console.log('1. Synchronous Start');

// Macrotask (Scheduled in Web APIs -> Macrotask Queue)
setTimeout(() => {
  console.log('4. Macrotask: setTimeout Callback');
}, 0);

// Microtask (Scheduled directly in Microtask Queue)
Promise.resolve().then(() => {
  console.log('3. Microtask: Promise Callback');
});

console.log('2. Synchronous End');

/*
Output Order:
1. Synchronous Start
2. Synchronous End
3. Microtask: Promise Callback
4. Macrotask: setTimeout Callback
*/


  ## MODULE 2: The Evolution of Async Code

Async JavaScript evolved through three main eras to address code 
readability, maintainability, and error handling.

---

## 1. Callbacks & Callback Hell

A **Callback** is a function passed as an argument to 
another function to be executed once an async operation finishes.

* **Issue:** Nesting multiple asynchronous callbacks leads to
 **Callback Hell** (Pyramid of Doom), making error handling extremely complex and code unreadable.

---

## 2. Promises (ES6)

A **Promise** is a JavaScript object representing the
 eventual completion (or failure) of an asynchronous operation.

### Lifecycle States:
* **`Pending`:** Initial state, operation is ongoing.
* **`Fulfilled`:** Operation succeeded (`resolve()` called) -> triggers `.then()`.
* **`Rejected`:** Operation failed (`reject()` called) -> triggers `.catch()`.

```javascript
// Promise Chaining
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```
  ## 3  . Async / Await (ES2017)
 **   async/await is Syntactic Sugar built on top of Promises, allowing asynchronous code to be written and read like  synchronous code.
 
  async Keyword: Applied to a function declaration; guarantees the function always returns a Promise.
    await Keyword: Pauses function execution until the Promise settles, returning its resolved value. Requires a try... catch block for clean error handling.

const fetchProduct = (id) => new Promise((resolve, reject) => {
  setTimeout(() => id ? resolve({ id, title: 'Laptop' }) : reject('Invalid ID'), 1000);
});

```js
// Modern Async/Await Implementation
async function getProductData(productId) {
  try {
    const product = await fetchProduct(productId);
    console.log('Product Loaded:', product.title);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Execution Finished.');
  }
}
getProductData(101);

```

# Section 3: HTTP Protocol & Web APIs Fundamentals

Communication between Client (Frontend) and Server (Backend) relies on the **HTTP (Hypertext Transfer Protocol)** architecture based on Requests and Responses.

---

## 1. Structure of an HTTP Request

An HTTP Request consists of four core building blocks:

1. **Endpoint / URL:** The target address hosted on the server.
2. **HTTP Methods:**
   * **`GET`:** Retrieves resources (No request body).
   * **`POST`:** Creates new resources.
   * **`PUT`:** Completely replaces an existing resource.
   * **`PATCH`:** Partially updates an existing resource.
   * **`DELETE`:** Removes a resource.
3. **Headers:** Metadata key-value pairs (e.g., `Content-Type: application/json`, `Authorization: Bearer <token>`).
4. **Body (Payload):** Raw data sent to the server (used in `POST`, `PUT`, `PATCH`).

---

## 2. HTTP Response Status Codes

Server responses return a 3-digit status code classifying the result:

* **`2xx` (Success):** `200 OK` (Successful request), `201 Created` (Resource created).
* **`3xx` (Redirection):** `301 Moved Permanently`, `304 Not Modified`.
* **`4xx` (Client Errors):** 
  * `400 Bad Request` (Invalid payload)
  * `401 Unauthorized` (Unauthenticated user)
  * `403 Forbidden` (Authenticated but lacks permissions)
  * `404 Not Found` (Endpoint does not exist)
* **`5xx` (Server Errors):** `500 Internal Server Error`, `503 Service Unavailable`.

---

## 3. Data Serialization (JSON)

Data transmitted across the network must be formatted as plain text strings.

* **`JSON.stringify(obj)`:** Converts a JavaScript Object into a JSON-formatted String before transmission.
* **`JSON.parse(str)`:** Converts an incoming JSON String back into a usable JavaScript Object.

---

## 4. Fully Documented Code Example

The following code illustrates proper HTTP handling, request configuration, status checking, and error isolation:

```js
// HTTP connection server example
console.log("HTTP connection server example");

async function createConnection() {
  const endPoint = "[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)";

  try {
    // 1. Dispatching HTTP POST Request
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Informs server of JSON payload
        "Accept": "application/json",        // Requests JSON response
        "Authorization": "Bearer MockToken",  // Authentication token header
      },
      // Serialization: Converting JS Object to JSON String
      body: JSON.stringify({
        name: "Kamal Abou eid",
        email: "kamal@example.com",
        role: "Software Engineer",
      }),
    });

    console.log("Http response status : ", response.status);

    // 2. Isolating HTTP Failure Cases (Non-2xx status codes)
    if (!response.ok) {
      if (response.status === 400) console.error("Bad Request");
      else if (response.status === 401) console.error("Unauthorized");
      else if (response.status === 403) console.error("Forbidden");
      else if (response.status === 404) console.error("Not Found");
      else if (response.status >= 500) console.error("Internal Server Error");

      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 3. Handling Success Response (Executes only if response.ok is true)
    const data = await response.json(); // Parsing JSON string to JS Object
    console.log("User Created Successfully: ", data);

    return data;

  } catch (error) {
    // Catching Network Failures & Explicitly Thrown HTTP Errors
    console.error("Registration failed: ", error.message);
  }
}

// Execution
createConnection();
```

![HTTP](Httpj.png)
![HTTP](HTTP2.png)
![HTTP](HTTP3.png)


# Module 4: The 3 Data Fetching Tools Deep Dive

This section covers the evolution of HTTP data fetching in JavaScript—from early legacy patterns to modern standards and industry-grade libraries—along with critical edge cases asked in technical interviews.

---

## 1. Architectural Comparison Matrix

| Feature | XMLHttpRequest (XHR) | Fetch API | Axios |
| :--- | :--- | :--- | :--- |
| **Type** | Native Legacy API | Native Modern Standard | Third-Party Library (`npm`) |
| **Model** | Event-driven (Callbacks) | Promises (`async/await`) | Promises (`async/await`) |
| **JSON Parsing** | Manual (`JSON.parse`) | Manual (`await res.json()`) | **Automatic** (`res.data`) |
| **HTTP Errors (404/500)** | Manual check (`xhr.status`) | **Does NOT Reject** (Requires `res.ok`) | **Automatically Rejects** |
| **Interceptors** | Not Supported | Not Supported Natively | **Supported (Request/Response)** |
| **Cancellation** | `xhr.abort()` | `AbortController` | `AbortController` / `CancelToken` |
---

## 2. Implementation Code 

### Option A: XMLHttpRequest (Legacy Event-driven)

```javascript
function fetchWithXHR(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText); // Manual Parsing
      console.log("XHR Data:", data);
    } else {
      console.error("Server Error:", xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error("Network Failure!");
  };

  xhr.send();
}
```
   ---- Fetch Api (Native Promise Based)
```js 
async function fetchWithNativeAPI(url) {
  try {
    const response = await fetch(url);

    // Critical: Fetch does NOT reject on 404/500 errors!
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const data = await response.json(); // Explicit JSON Parsing
    console.log("Fetch Data:", data);
    return data;

  } catch (error) {
    console.error("Fetch Operation Failed:", error.message);
  }
}
```
 ----->Axios 
```js 
import axios from 'axios';

async function fetchWithAxios(url) {
  try {
    // Payload is auto-parsed and directly accessible under response.data
    const response = await axios.get(url);
    console.log("Axios Data:", response.data);
    return response.data;

  } catch (error) {
    // Non-2xx status codes reject automatically and land here
    if (error.response) {
      console.error(`HTTP Error Status: ${error.response.status}`);
    } else {
      console.error("Network Error:", error.message);
    }
  }
}
```

-   ## High-Frequency Interview Topics
-- Topic 1: The Fetch Promise Rejection Trap
Question: Why doesn't a 404 Not Found or 500 Server Error trigger the .catch() block when using fetch()?

Explanation: The native fetch() API only rejects its promise on Network Failures (e.g., total loss of connectivity, invalid domain name, blocked CORS).

An HTTP response with a 404 or 500 status code is still considered a successful HTTP communication cycle by the browser engine, resolving the promise.

Solution: Manually inspect the boolean property response.ok (true for status codes in range 200–299) and throw a custom error to force rejection if necessary.

Topic 2: Interceptors Pattern (Axios)
Question: What are Interceptors, and why are they used in enterprise applications?

Interceptors act as middleware layers sitting between your application and the server. They catch outgoing Requests before transmission and incoming Responses before execution

```js 
[ Application ] ---> [ Request Interceptor ] ---> [ Server ]
[ Application ] <--- [ Response Interceptor ] <--- [ Server ]
```

- # Primary Use Cases:
 - Centralized Authorization: Injecting JWT Tokens into request headers globally without duplicating code.

 - Global Error Handling: Intercepting 401 Unauthorized responses to purge session storage and automatically redirect users to /login.

 - Global Loading Indicators: Triggering UI spinners on request start and hiding them on response completion.

``` js
import axios from 'axios';

// 1. Request Interceptor: Attach Auth Token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Global 401 Handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

![AXIOSFetch](FetchAxios.png)
