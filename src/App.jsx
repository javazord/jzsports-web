import Navbar from "./layouts/components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// main.jsx ou App.jsx
import "primeflex/primeflex.css";

function App() {
  return (
    <>
      <div className="bg-white-alpha-90 min-h-screen">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
