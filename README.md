# 🌤️ Liquid Glass Weather App

<img width="1920" height="1208" alt="WeatherDashboard" src="https://github.com/user-attachments/assets/f5df2443-8951-4683-9d28-54dc334d01a2" />


A premium, highly interactive Weather Dashboard built with modern web technologies. This application features a stunning "Liquid Glass" (Glassmorphism) dark-mode aesthetic, comprehensive weather analytics, interactive maps, and full Internationalization (i18n) support.

**Designed to be portfolio-ready, production-grade, and thoroughly tested.**

---

## ✨ Key Features

- **Liquid Glass UI**: A bespoke, premium dark-mode aesthetic using custom Tailwind CSS utilities, deep blurs, and subtle neon glows.
- **Comprehensive Analytics**: Displays current weather, 7-day forecasts, hourly temperature & rain probability charts, and detailed metrics (UV Index, Humidity, Pressure, Wind).
- **Interactive Weather Map**: Integrated Leaflet maps allowing users to visualize weather conditions geographically.
- **Multi-City Comparison**: Compare weather across multiple cities simultaneously with a sleek, persistant widget (saved to LocalStorage).
- **Internationalization (i18n)**: Full support for English (EN) and Thai (TH), including dynamically translated API requests.
- **Air Quality Dashboard**: Real-time AQI monitoring with dynamic color-coded indicators (No emojis, sleek CSS glowing dots).
- **Skeleton UI**: High-end `animate-pulse` skeleton loaders providing a seamless UX while fetching data.
- **End-to-End Testing**: Fully automated testing suite using Playwright covering core user flows, language switching, and edge cases.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4
- **State Management & Fetching**: `@tanstack/react-query` (v5) + Axios
- **Localization**: `react-i18next` + `i18next-browser-languagedetector`
- **Data Visualization**: `chart.js` + `react-chartjs-2`
- **Mapping**: `leaflet` + `react-leaflet`
- **Icons**: `lucide-react`
- **Testing**: Playwright (`@playwright/test`)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## 🎭 End-to-End Testing

This project uses **Playwright** to ensure all core functionalities work perfectly from a real user's perspective.

### Run tests in the background (Fast)

```bash
npx playwright test
```

### Run tests visually (UI Mode)

Highly recommended for seeing the tests execute step-by-step in a real browser instance.

```bash
npx playwright test --ui
```

**Test Coverage Includes:**

- Initial dashboard load and default city verification.
- Search functionality and dynamic updates.
- i18n language switching (EN/TH) without UI breakage.
- Adding and deleting cities from the Comparison Widget.
- Negative testing (Handling "City Not Found" errors gracefully).

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Charts, Maps, Widgets)
│   └── skeletons/    # High-end Skeleton loaders
├── hooks/            # Custom React hooks (React Query, LocalStorage)
├── lib/              # Core configurations (i18n, API instances)
├── locales/          # Translation dictionaries (en.json, th.json)
├── services/         # API fetching logic (WeatherAPI)
├── types/            # TypeScript interfaces
├── App.tsx           # Main application layout and dashboard orchestration
└── index.css         # Global styles and Liquid Glass Tailwind variables
```

---

## 🎨 Design Philosophy

The **Liquid Glass** theme was crafted to avoid generic templates. It utilizes:

- Deep `#0a0a0a` backgrounds.
- High-contrast white text (`#ffffff`) with varying opacities.
- Colorful, blurred ambient orbs in the background.
- Semi-transparent cards with `backdrop-blur` and subtle borders.
- Smooth transitions and hover micro-animations.

---

_Built with ❤️ for a seamless weather experience._
