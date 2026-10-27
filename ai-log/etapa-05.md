# Jurnal AI — Etapa 5: Stare locală, evenimente, media expandabilă și Easter Egg

## 1. Obiectivul etapei
Trecerea de la date statice la stare gestionată cu React Hook-ul `useState`, adăugarea funcționalităților interactive (toggle status, ștergere, schimbare temă), integrarea componentelor media interactive (Trailer + OST) și a unui mini-joc ascuns.

## 2. Prompts utilizate și asistență AI
- Implementat operațiuni imutabile pe state cu `useState`:
  - `handleToggle(id)`: inversarea statusului `terminat` folosind `.map()`.
  - `handleDelete(id)`: eliminarea unui joc din colecție prin `.filter()`.
  - `handleTema()`: comutarea dinamică a atributului `data-theme` între `light` și `dark`.
- Calculul dinamic al jocurilor active direct din starea curentă.
- Dezvoltat o secțiune expandabilă în `JocCard.jsx` cu cutii dedicate pentru Trailer oficial și OST, dotate cu autoplay la expandare și oprire automată completă la restrângere prin demontare din DOM.
- Proiectat un mini-joc Easter Egg de tip Tower Defense pe Canvas HTML5 (`StarCraft Terran TD.jsx`) cu 3 unități Terran (Marine, Firebat, Marauder) vs. valuri Zerg, declanșat exclusiv de un sprite animat pe cardul StarCraft II.

## 3. Decizii tehnice luate
- Gestionarea stării la nivelul cel mai de sus (`App.jsx`) și transmiterea funcțiilor de manipulare ca props către componentele copil (lifting state up).
- Folosirea `youtube-nocookie.com` pentru protecția confidențialității și reducerea erorilor de încorporare.
- Controlul randării condiționate (`{deschis && ...}`) pentru a asigura unmount-ul instanțelor de iframe și oprirea instantanee a redării audio/video la pliere.
- Izolarea jocului Arcade într-un modal cu buclă Canvas proprie (`requestAnimationFrame`) pentru performanță maximă fără re-randări inutile în arborele React.

## 4. Dificultăți întâmpinate și soluții
- *Problema:* Redarea audio a continuat în fundal după restrângerea cardului sau a căsuței OST.
- *Soluție:* Controlul strict al stărilor locale `trailerDeschis` și `ostDeschis` corelat cu demontarea condiționată a elementelor `<iframe>`.
- *Problema:* Rutarea linkurilor audio către playere native HTML5.
- *Soluție:* Standardizarea ambelor surse media pe format de embed video/audio cu parametri de autoplay.

## 5. Rezultatul obținut
Aplicație interactivă completă cu gestiune reactivă a stării locale, contor sincronizat în timp real, comutare de temă, carduri media expandabile și un mod arcade ascuns dedicat comunității RTS.