const jocuri = [
  {
    id: 1,
    titlu: "WARNO",
    terminat: false,
    platforma: "PC",
    gen: "Tactical RTS",
    expansiuni: "NORTHAG, SOUTHAG, Nemesis #1: Air Assault"
  },
  {
    id: 2,
    titlu: "StarCraft II",
    terminat: true,
    platforma: "PC",
    gen: "Sci-Fi RTS",
    expansiuni: "Heart of the Swarm, Legacy of the Void"
  },
  {
    id: 3,
    titlu: "Halo Wars 2",
    terminat: false,
    platforma: "Xbox",
    gen: "Sci-Fi RTS",
    expansiuni: "Awakening the Nightmare, Operation Spearbreaker"
  }
];

export default function App() {
  const active = jocuri.filter((j) => !j.terminat).length;

  return (
    <>
      <header className="app-header">
        <h1>GameVault</h1>
        <p>Organizează-ți colecția de jocuri video pe platforme, genuri și expansiuni.</p>
        <p className="app-count">
          {jocuri.length} jocuri, dintre care {active} în desfășurare
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Colecția mea</h2>
          {/* Temporar: date brute; componentele apar in Etapa 4 */}
          <pre>{JSON.stringify(jocuri, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}