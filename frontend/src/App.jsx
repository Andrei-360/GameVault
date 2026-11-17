import { useEffect, useState } from "react";
import JocList from "./components/JocList.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TerranDefense from "./components/StarCraft Terran TD.jsx";
import { fetchJocuri } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [jocuri, setJocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tema, setTema] = useState(temaInitiala);
  const [arcadeDeschis, setArcadeDeschis] = useState(false);

  // Etapa 6: Preluarea datelor de la API la montarea componentei
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchJocuri();
        if (!ignore) setJocuri(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

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

          {/* Starea de încărcare */}
          {loading && <p className="info">Se încarcă lista...</p>}

          {/* Starea de eroare */}
          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}

          {/* Cazul de succes: afișarea listei de jocuri */}
          {!loading && !error && (
            <JocList
              jocuri={jocuri}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onOpenArcade={() => setArcadeDeschis(true)}
            />
          )}
        </section>
      </main>

      {/* Mini-joc Easter Egg Terran Defense */}
      {arcadeDeschis && (
        <TerranDefense onClose={() => setArcadeDeschis(false)} />
      )}
    </>
  );
}