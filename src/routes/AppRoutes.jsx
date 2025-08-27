import { Route, Routes } from "react-router-dom";
import ChampionshipRegisterForm from "../features/championships/ChampionshipRegisterForm";
import TeamRegisterForm from "../features/teams/pages/TeamRegisterForm";
import Home from "../features/home/Home";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/team-register" element={<TeamRegisterForm />}></Route>
      <Route
        path="/championship-register"
        element={<ChampionshipRegisterForm />}
      ></Route>
    </Routes>
  );
}
