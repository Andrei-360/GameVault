import { useEffect, useState } from "react";
import JocList from "./components/JocList.jsx";
import JocForm from "./components/JocForm.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TerranDefense from "./components/StarCraft Terran TD.jsx";
import { createJoc, deleteJoc, fetchJocuri, updateJoc } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [jocuri, setJocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tema, setTema] = useState(temaInitiala);
  const [arcadeDeschis, setArcadeDeschis] = useState(false);

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

  async function handleAdd(jocNou) {
    const creat = await createJoc(jocNou); // serverul întoarce elementul cu id
    setJocuri((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const joc = jocuri.find((j) => j.id === id);
    try {
      const actualizat = await updateJoc(id, { terminat: !joc.terminat });
      setJocuri((prev) => prev.map((j) => (j.id === id ? actualizat : j)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteJoc(id);
      setJocuri((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setError(err.message);
    }
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

        <div className="content-area" style={{ display: "flex", gap: "20px", width: "100%" }}>
          <section className="panel" style={{ flex: 1 }}>
            <h2>Adaugă joc</h2>
            <JocForm onAdd={handleAdd} />
          </section>

          <section className="panel" style={{ flex: 2 }}>
            <h2>Colecția mea</h2>

            {loading && (
              <p className="info" data-testid="loading">
                Se încarcă...
              </p>
            )}

            {error && (
              <p className="error" data-testid="error">
                {error}
              </p>
            )}

            {!loading && (
              <JocList
                jocuri={jocuri}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onOpenArcade={() => setArcadeDeschis(true)}
              />
            )}
          </section>
        </div>
      </main>

      {arcadeDeschis && (
        <TerranDefense onClose={() => setArcadeDeschis(false)} />
      )}
    </>
  );
}