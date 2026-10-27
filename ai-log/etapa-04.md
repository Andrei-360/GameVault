# Jurnal AI — Etapa 4: Descompunerea în componente React și layout avansat

## 1. Obiectivul etapei
Modularizarea interfeței în componente React reutilizabile bazate pe props și implementarea unui sistem vizual inspirat din estetica MSI Mystic Light (Dark Mode).

## 2. Prompts utilizate și asistență AI
- Generat componentele React: `Sidebar.jsx`, `JocList.jsx` și `JocCard.jsx`.
- Solicitat configurarea unui layout de tip CSS Grid cu meniu lateral sticky de 200px și zonă centrală pentru colecția de jocuri.
- Implementat paleta de culori MSI Mystic Light bazată pe variabile CSS (`--bg: #070510`, `--accent: #e11d74` magenta neon, `--accent-cyan: #00d2ff`).
- Adăugat suport pentru imagini de fundal animate (GIF) personalizate per joc (WARNO, StarCraft II, Halo Wars 2).

## 3. Decizii tehnice luate
- Separarea responsabilităților: `Sidebar` se ocupă de navigare și filtre vizuale, `JocList` iterează lista prin `.map()`, iar `JocCard` randează detaliile fiecărui titlu.
- Folosirea atributelor `data-theme` și a variabilelor CSS custom pentru scalabilitatea temelor vizuale.
- Gestionarea cheilor unice (`key={joc.id}`) la randarea listelor pentru reconcilierea corectă în Virtual DOM.

## 4. Dificultăți întâmpinate și soluții
- *Problema:* Contrastul textului peste fundalurile animate de tip GIF.
- *Soluție:* Aplicarea unui gradient semitransparent întunecat peste imagini (`linear-gradient(to right, rgba(9, 7, 20, 0.82), rgba(9, 7, 20, 0.35))`).

## 5. Rezultatul obținut
Aplicație complet componentizată, randerată dinamic din date statice, cu layout responsive și temă vizuală neon Dark Mode.