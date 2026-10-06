
const PLATFORME = ["pc", "playstation", "xbox"];

const jocuri = [
  {
    id: 1,
    titlu: "WARNO",
    terminat: false,
    platforma: "pc",
    gen: "Tactical RTS",
    expansiuni: "Nemesis: Air Assault, Army General",
    osturi: [
      { titlu: "Echoes of 1989", url: "https://example.com/warno-echoes.mp3" },
      { titlu: "Highway to the Danger Zone", url: "https://example.com/warno-highway.mp3" }
    ]
  },
  {
    id: 2,
    titlu: "StarCraft II",
    terminat: true,
    platforma: "pc",
    gen: "Sci-Fi RTS",
    expansiuni: "Heart of the Swarm, Legacy of the Void",
    osturi: [
      { titlu: "Terran Theme 1", url: "https://example.com/sc2-terran.mp3" }
    ]
  },
{
    id: 3,
    titlu: "Command & Conquer: Red Alert 3",
    terminat: false,
    platforma: "pc",
    gen: "Sci-Fi RTS",
    expansiuni: "Uprising",
    osturi: [
      { titlu: "Soviet March", url: "https://example.com/ra3-soviet-march.mp3" }
    ]
  }
];

// Pasul 3: Listarea titlurilor (map)
function listeazaTitluri(lista) {
  return lista.map((j) => j.titlu);
}

// Pasul 4: Numărarea elementelor în desfășurare/active (filter)
function numaraInDesfasurare(lista) {
  return lista.filter((j) => !j.terminat).length;
}

// Pasul 5: Căutarea după titlu (filter, toLowerCase, includes)
function cautaDupaTitlu(lista, text) {
  const textCurat = text.toLowerCase();
  return lista.filter((j) => j.titlu.toLowerCase().includes(textCurat));
}

// Pasul 6: Generarea următorului id unic (reduce cu Math.max)
function nextId(lista) {
  return lista.reduce((max, j) => Math.max(max, j.id), 0) + 1;
}

// Pasul 6: Adăugarea unui joc cu validare (funcție imutabilă)
function adaugaJoc(lista, titlu, platforma = "pc", gen = "RTS", expansiuni = "", osturi = []) {
  const titluCurat = titlu ? titlu.trim() : "";

  // 1. Validare titlu gol
  if (!titluCurat) {
    console.log("Eroare: Titlul jocului nu poate fi gol.");
    return lista;
  }

  // 2. Validare platformă permisă
  if (!PLATFORME.includes(platforma.toLowerCase())) {
    console.log(`Eroare: Platformă invalidă: "${platforma}". Valori permise: ${PLATFORME.join(", ")}`);
    return lista;
  }

  // 3. Creare obiect nou
  const jocNou = {
    id: nextId(lista),
    titlu: titluCurat,
    terminat: false,
    platforma: platforma.toLowerCase(),
    gen: gen,
    expansiuni: expansiuni,
    osturi: osturi
  };

  // 4. Return array nou fără a modifica lista inițială (spread operator)
  return [...lista, jocNou];
}

// Pasul 7: Comutarea stării finalizat / în desfășurare (map)
function comutaTerminat(lista, id) {
  return lista.map((j) =>
    j.id === id ? { ...j, terminat: !j.terminat } : j
  );
}

// Pasul 7: Ștergerea unui joc (filter)
function stergeJoc(lista, id) {
  return lista.filter((j) => j.id !== id);
}


console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(jocuri).join(", "));
console.log("În desfășurare:", numaraInDesfasurare(jocuri));
console.log("Căutare 'warno':", listeazaTitluri(cautaDupaTitlu(jocuri, "warno")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaJoc(jocuri, "Warcraft III", "pc", "Fantasy RTS", "The Frozen Throne", [
  { titlu: "Human Theme 1", url: "https://example.com/wc3-human.mp3" }
]);
console.log("Lista nouă:", listaNoua.length, "jocuri");
console.log("Originalul a rămas cu:", jocuri.length, "jocuri");

console.log("--- Modificare și ștergere ---");
listaNoua = comutaTerminat(listaNoua, 1);
console.log("După bifarea id 1, în desfășurare:", numaraInDesfasurare(listaNoua));
listaNoua = stergeJoc(listaNoua, 3);
console.log("După ștergerea id 3:", listeazaTitluri(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaJoc(listaNoua, "");
adaugaJoc(listaNoua, "Command & Conquer", "switch");