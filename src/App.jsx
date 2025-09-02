import Navbar from "./layouts/components/Navbar";
import AppRoutes from "./routes/AppRoutes";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// main.jsx ou App.jsx
import "primeflex/primeflex.css";
import Settings from "./features/settings/pages/Settings";

export default function App() {
  const { theme } = Settings();
  return (
    <>
      <div className={`bg-${theme} min-h-screen`}>
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
}
