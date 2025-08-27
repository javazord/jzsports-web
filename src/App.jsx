import Navbar from "./layouts/components/Navbar";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <div className="bg-slate-100 min-h-screen">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
