This project implements a **Pokemon list** using [Next.js](https://nextjs.org/), React, and the [PokeAPI](https://pokeapi.co). It follows the principles of functional components, React hooks, and component lifecycle management.


## 🚀 Installation & Usage

1. **Clone the repository** and enter the project folder.

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install axios if not already installed**:

   ```bash
   npm install axios
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser at** [http://localhost:3000](http://localhost:3000)

## 🛠️ Concepts Used

- **React Hooks:**  
  - `useState` for local state (counter, abilities, loading).
  - `useEffect` for lifecycle management (API requests).
- **Functional Components:**  
  - Clear separation of logic into reusable components.
- **List Rendering:**  
  - Use of `.map()` and proper `key` assignment.
- **Next.js App Router:**  
  - `"use client"` directive where hooks are used.
