# GameVault — Catalog & Manager de Jocuri Video

**GameVault** este o aplicație web reactivă dezvoltată în **React** și stilizată cu **CSS modern (CSS Variables & Flexbox/Grid)**, destinată organizării colecției personale de jocuri video pe platforme, genuri și expansiuni. Aplicația oferă o experiență vizuală inspirată de estetica **MSI Mystic Light** (Dark Mode cu accente neon Magenta și Cyan).

---

## Progresul Proiectului

- [x] **Stage 1:** Ideea de proiect și schițele inițiale
- [x] **Stage 2:** Structura repository-ului și configurarea mediului de lucru (Vite + React)
- [x] **Stage 3:** Structura HTML semantică și primul styling de bază
- [x] **Stage 4:** Descompunerea în componente React reutilizabile și layout Grid/Sidebar
- [x] **Stage 5:** Stare locală (`useState`), evenimente, media expandabilă și Easter Egg
- [ ] **Stage 6:** Preluarea datelor dintr-un Mock API (Fetch / useEffect)
- [ ] **Stage 7:** Formulare controlate pentru adăugare și editare de titluri
- [ ] **Stage 8:** Filtrare avansată, căutare și optimizări finale

---

## Funcționalități Implementate (Etapa 5)

1. **Gestiune Interactivă a Stării (`useState`)**:
   - Comutare status joc (*În desfășurare* / *Terminat*) cu tăiere vizuală a textului și actualizare dinamică de stare imutabilă.
   - Ștergerea jocurilor din colecție cu recalcularea automată a contorului din antet.
   - Contor reactiv în timp real: numărul total de jocuri și câte sunt active.

2. **Sistem de Teme (Light / Dark Mode)**:
   - Comutare tematică prin atributul `data-theme` direct pe elementul rădăcină.
   - Detectarea automată a preferinței de sistem (`prefers-color-scheme`).
   - Temă întunecată personalizată cu paletă **MSI Mystic Light** (neon magenta `#e11d74` și cyan `#00d2ff`).

3. **Carduri Media Expandabile cu Autoplay și Auto-Stop**:
   - Fiecare card conține un buton pliabil (`btn-expand`) care dezvăluie secțiunea media.
   - **Trailer oficial**: Încorporat prin `youtube-nocookie.com`, pornește automat la deschiderea căsuței și se oprește complet la pliere (prin demontare din DOM).
   - **OST dedicat**: Căsuță simetrică cu titlul piesei și buton neon *„Ascultă OST ▼”* cu redare sincronizată.
   - Fundaluri tematice animate (GIF-uri) optimizate cu gradiente pentru lizibilitate.

4. **Easter Egg: StarCraft Terran Defense (Canvas Mini-Game)**:
   - Integrat discret exclusiv pe cardul de *StarCraft II* printr-un sprite animat de Marine Terran.
   - La declanșare, deschide un modal Arcade de tip Tower Defense realizat în HTML5 Canvas (`requestAnimationFrame`).
   - Permite amplasarea a 3 unități Terran (Marine, Firebat, Marauder) cu resurse (minerale) pentru apărarea bazei împotriva valurilor de Zergi (Zerglingi și Roaches).

---

##  Structura Proiectului

```text
GameVault/
├── ai-log/
│   ├── etapa-03.md
│   ├── etapa-04.md
│   └── etapa-05.md
├── frontend/
│   ├── public/
│   │   └── img/
│   │       ├── 11th ACR gif.gif
│   │       ├── SC 2 hots Terran.gif
│   │       ├── halowars2jerome.gif
│   │       └── marine-starcraft_tuff.gif
│   ├── src/
│   │   ├── components/
│   │   │   ├── JocCard.jsx
│   │   │   ├── JocList.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StarCraft Terran TD.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md