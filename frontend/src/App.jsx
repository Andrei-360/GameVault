import { useState } from "react";
import JocList from "./components/JocList.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TerranDefense from "./components/StarCraft Terran TD.jsx";

const JOCURI_INITIALE = [
  {
    id: 1,
    titlu: "WARNO",
    terminat: false,
    platforma: "PC",
    gen: "Tactical RTS",
    expansiuni: "NORTHAG, SOUTHAG, Nemesis #1: Air Assault",
    trailer: "https://www.youtube-nocookie.com/embed/aGeaqOOMS9A",
    soundtrack: "Silicon Tribes Composed by Sebastien Alaiwan Ace17",
    ostEmbed: "https://www.youtube-nocookie.com/embed/nOsQq5W8uzk"
  },
  {
    id: 2,
    titlu: "StarCraft II",
    terminat: true,
    platforma: "PC",
    gen: "Sci-Fi RTS",
    expansiuni: "Heart of the Swarm, Legacy of the Void",
    trailer: "https://www.youtube-nocookie.com/embed/fqE4At_ltB4",
    soundtrack: "Terran Theme 01 (Heaven's Devils) - Glenn Stafford",
    ostEmbed: "https://www.youtube-nocookie.com/embed/dRA2nEUmjig"
  },
  {
    id: 3,
    titlu: "Halo Wars 2",
    terminat: false,
    platforma: "Xbox",
    gen: "Sci-Fi RTS",
    expansiuni: "Awakening the Nightmare, Operation Spearbreaker",
    trailer: "https://www.youtube-nocookie.com/embed/lnYuNXolf4Y",
    soundtrack: "Cratered - Gordy Haab",
    ostEmbed: "https://www.youtube-nocookie.com/embed/oR1lRDmUAfI"
  }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [jocuri, setJocuri] = useState(JOCURI_INITIALE);
  const [tema, setTema] = useState(temaInitiala);
  const [arcadeDeschis, setArcadeDeschis] = useState(false);

  function handleToggle(id) {
    setJocuri((prev) =>
      prev.map((j) => (j.id === id ? { ...j, terminat: !j.terminat } : j))
    );
  }

  function handleDelete(id) {
    setJocuri((prev) => prev.filter((j) => j.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const active = jocuri.filter((j) => !j.terminat).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>

        <h1>GameVault</h1>
        <p>Organizează-ți colecția de jocuri video pe platforme, genuri și expansiuni.</p>
        <p className="app-count">
          {jocuri.length} jocuri, dintre care {active} în desfășurare
        </p>
      </header>

      <main className="container">
        <Sidebar />

        <section className="panel main-panel">
          <h2>Colecția mea</h2>
          <JocList
            jocuri={jocuri}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onOpenArcade={() => setArcadeDeschis(true)}
          />
        </section>
      </main>

      {/* Mini-joc Easter Egg Terran Defense */}
      {arcadeDeschis && (
        <TerranDefense onClose={() => setArcadeDeschis(false)} />
      )}
    </>
  );
}