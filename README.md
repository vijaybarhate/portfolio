# 🚀 Vijay Barhate | Interactive 3D Engineering Portfolio

A modern, high-performance personal portfolio website built with **React**, **Three.js**, **GSAP**, and **Tailwind CSS**. This platform serves as a visual showcase of my engineering skills, featuring smooth 3D interactions, scroll-triggered animations, and optimized load footprints.

---

## 📸 Portfolio Preview

![Portfolio Desktop Preview](https://github.com/user-attachments/assets/f3500b4b-6b46-4af2-9d7d-f9e3b201e975)

🌐 **Live Website**: [https://vijaybarhate.github.io/portfolio/](https://vijaybarhate.github.io/portfolio/)

---

## ✨ Key Features

* **Interactive 3D Graphics**: Integrates a responsive 3D avatar / scene rendered in real-time using React Three Fiber.
* **Cinematic Scroll Transitions**: Leverages GSAP ScrollTrigger to orchestrate smooth, hardware-accelerated animations synchronized with the browser scrollbar.
* **Dynamic Projects Grid**: Renders projects dynamically from source configurations, linking directly to repositories and live deployments.
* **PDF Resume Integration**: Contains a self-hosted LaTeX-compiled professional resume viewer.
* **Performance Engineered**: Uses Draco compression on GLTF/GLB 3D models and modern WebP imagery to keep page loading times under 2 seconds.
* **Tailwind Fluid Layouts**: Fully responsive grid systems optimized across mobile, tablet, and ultra-wide desktop monitors.

---

## 🧰 Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend Core** | React 18 + Vite | Modular UI components & fast HMR development |
| **Language** | TypeScript | Strong typing & interface safety |
| **3D Rendering** | Three.js + @react-three/fiber | Canvas management and asset loaders |
| **3D Utilities** | @react-three/drei | Camera controls, lighting presets, & Draco loader |
| **Animations** | GSAP + Framer Motion | ScrollTrigger camera motions & UI transitions |
| **Styling** | Tailwind CSS | Utility-first clean typography and sizing |

---

## 🏗️ Rendering Architecture

The portfolio utilizes a layered UI-Canvas layout, separating interactive HTML elements from the WebGL rendering context:

```mermaid
graph TD
    User([User Screen]) --> Scroll[Scroll Listener]
    
    subgraph Browser DOM Layout
        Scroll --> GSAP["GSAP ScrollTrigger (Animation Driver)"]
        GSAP --> CanvasTransform["Camera Translation / Rotation"]
        
        subgraph WebGL Context (R3F Layer)
            CanvasTransform --> Camera["Perspective Camera Controller"]
            Camera --> Scene["3D Canvas Scene"]
            Scene --> Avatar["Draco Compressed GLB Model"]
        end
        
        subgraph HTML DOM Layer (React Overlay)
            Scene -.-> Overlay["Text Panels & Responsive Project Cards"]
        end
    end
```

### Architectural Breakdown
* **Layer Separation**: The 3D Canvas is locked in the background (`fixed inset-0 z-0`), while the standard HTML sections scroll on top (`relative z-10`), ensuring clean touch events and interaction.
* **GSAP Scroll Driver**: Instead of frame-based updates, camera angles and lighting properties are interpolated based on scroll-offsets, generating smooth transitions.
* **Draco Mesh Compression**: The 3D avatar is parsed through a WASM decoder script, reducing raw file size by over 70% and accelerating GPU upload.

---

## 📦 How to Run

### Prerequisites
* **Node.js** v20 or newer
* **npm** or **yarn**

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vijaybarhate/portfolio.git
   cd portfolio
   ```

2. **Install Packages**
   ```bash
   npm install
   ```

3. **Launch Local Dev Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build Compilation**
   To test optimized assets compression and compile production bundles:
   ```bash
   npm run build
   ```
   *Output files will be generated under the `dist/` directory.*

---

## 🧠 Challenges Faced

* **WebGL Mobile Performance bottlenecks**: Loading uncompressed GLTF models on low-power mobile devices caused high interaction latency and frame drops. We resolved this by compressing our `.glb` files using the `gltf-pipeline` utility with Draco compression, loading the mesh asynchronously inside a React `<Suspense>` wrapper with a custom HTML loader.
* **Responsive Canvas Ratios**: Fitting 3D scenes on ultra-wide desktop monitors vs. narrow mobile screens often causes models to clip at the edges. We implemented a responsive camera hook that adjusts the camera FOV (Field of View) and position coordinates based on window size.
* **Scroll Desynchronization**: Heavy DOM content scrolling on top of WebGL rendering can trigger render lag. We decoupled scroll triggers, setting GSAP's `scrub` value to `1.5` to smoothly ease transitions and eliminate visual judder.

---

## 🔮 Future Improvements

- [ ] **Interactive Model Controls**: Enable WASD key commands to control the avatar's gestures or movement in an interactive landing zone.
- [ ] **Dynamic Shader Themes**: Add custom GLSL shaders to change materials based on day/night cycles or user click-effects.
- [ ] **Multi-Language Support**: Integrate `react-i18next` to support toggling between English and other languages.

---

Built with 🖤 by [Vijay Barhate](https://github.com/vijaybarhate)
