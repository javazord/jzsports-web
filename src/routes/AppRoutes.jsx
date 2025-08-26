import { Route, Routes } from "react-router-dom";
import TeamRegisterForm from "../features/teams/pages/TeamRegisterForm";
import Home from "../features/home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/team-register" element={<TeamRegisterForm />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}
