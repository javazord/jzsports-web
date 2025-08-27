import { Route, Routes } from "react-router-dom";
import ChampionshipRegisterForm from "../features/championships/pages/ChampionshipRegisterForm";
import TeamRegisterForm from "../features/teams/pages/TeamRegisterForm";
import Home from "../features/home/Home";
import About from "../features/about/About";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/team-register" element={<TeamRegisterForm />}></Route>
      <Route
        path="/championship-register"
        element={<ChampionshipRegisterForm />}
      ></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
}
