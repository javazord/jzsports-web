import { Route, Routes } from "react-router-dom";
import ChampionshipRegister from "../features/championships/pages/ChampionshipRegister";
import TeamRegister from "../features/teams/pages/TeamRegister";
import TeamList from "../features/teams/pages/TeamList";
import Home from "../features/home/Home";
import About from "../features/about/About";
import Settings from "../features/settings/pages/Settings";
import ChampionshipList from "../features/championships/pages/ChampionshipList";
import ChampionshipView from "../features/championships/pages/ChampionshipView";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/team-register" element={<TeamRegister />}></Route>
      <Route
        path="/championship-register"
        element={<ChampionshipRegister />}
      ></Route>
      <Route path="/team-list" element={<TeamList />}></Route>
      <Route path="/championship-list" element={<ChampionshipList />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
      <Route path="/championship-view" element={<ChampionshipView />}></Route>
    </Routes>
  );
}
