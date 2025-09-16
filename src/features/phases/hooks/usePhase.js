import { useEffect, useState } from "react";
import PhaseService from "../../../api/service/phaseService";

export default function usePhase() {
  const phaseService = new PhaseService();
  const [phase, setPhase] = useState({
    id: null,
    phase: "",
    championship: null,
    matchesList: [],
  });
  return { phase, setPhase };
}
