import { useState } from "react";

const PLATFORME = [
  { value: "PC", label: "PC" },
  { value: "PlayStation", label: "PlayStation" },
  { value: "Xbox", label: "Xbox" },
];

const TITLU_MAX = 100;

export default function JocForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [platforma, setPlatforma] = useState("PC");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul este obligatoriu.";
    if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }
    setEroare("");
    setTrimite(true);

    try {
      await onAdd({ titlu: titlu.trim(), platforma, terminat: false });
      setTitlu("");
      setPlatforma("PC");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Cyberpunk 2077"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <label>
        Platformă
        <select
          value={platforma}
          onChange={(e) => setPlatforma(e.target.value)}
          data-testid="form-platforma"
        >
          {PLATFORME.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button type="submit" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă jocul"}
      </button>
    </form>
  );
}