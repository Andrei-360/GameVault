# GameVault

Aplicație pentru gestionarea și evidența colecției personale de jocuri video.
Permite urmărirea jocurilor în desfășurare, a titlurilor finalizate, precum și a platformelor, genurilor și expansiunilor deținute.

## Model de date

| Câmp | Tip | Note |
| :--- | :--- | :--- |
| titlu | text | obligatoriu, max 100 caractere |
| finalizat | boolean | comutat din listă, implicit fals |
| platforma | valori fixe | PC, PlayStation, Xbox |
| gen | relație | Tactical RTS, Sci-Fi RTS (categorie, din etapa 10) |
| expansiuni | text | opțional, expansiuni/DLC-uri deținute |
| osturi | array | opțional, piese reprezentative per joc |
| utilizator | relație | proprietarul elementului (din etapa 11) |

Date de test utilizate în toate etapele:
1. WARNO, activ, PC (DLC: NORTHAG, SOUTHAG, Nemesis #1: Air Assault)
2. StarCraft II, finalizat, PC (DLC: Heart of the Swarm, Legacy of the Void)
3. Command & Conquer: Red Alert 3, activ, PC (DLC: Uprising)

## Mod de rulare
Se deschide fișierul index.html într-un browser web. Nu necesită etapă de build sau server.

## Utilizare AI

| Instrument | Scopul utilizării |
| :--- | :--- |
| Gemini | Structură HTML/CSS, funcții JS imutabile și verificare date |

Detalii pentru fiecare etapă: consultați folderul ai-log/.

## Stadiu
- [x] Etapa 1: mockup static
- [x] Etapa 2: logica pe date în JavaScript
- [ ] Etapa 3: proiect Vite și React

## Stage 2: data logic
Plain JavaScript, no DOM. jocuri.js holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Tabel de verificare - Etapa 2

| ID | Cerință | Unde (permalink) | Cum se verifică |
| :--- | :--- | :--- | :--- |
| S2-R1 | Fișier JS legat, afișează la încărcarea paginii | [index.html#L70](https://github.com/Andrei-360/GameVault/blob/main/index.html#L70) | deschidere pagină, F12 |
| S2-R2 | 3+ elemente cu id, nume, stare, etichetă | [jocuri.js#L8-L46](https://github.com/Andrei-360/GameVault/blob/main/jocuri.js#L8-L46) | citire |
| S2-R3 | listare, numărare, căutare, adăugare, comutare, ștergere | [jocuri.js#L49-L109](https://github.com/Andrei-360/GameVault/blob/main/jocuri.js#L49-L109) | consolă |
| S2-R4 | adăugarea respinge titlul gol și eticheta invalidă | [jocuri.js#L73-L82](https://github.com/Andrei-360/GameVault/blob/main/jocuri.js#L73-L82) | ultimele 2 linii din consolă |
| S2-R5 | array-ul original rămâne neschimbat după adăugare | [jocuri.js#L125](https://github.com/Andrei-360/GameVault/blob/main/jocuri.js#L125) | linia din consolă |
| S2-R6 | README secțiunea Stage 2 + jurnal AI | README.md, [ai-log/etapa-02.md](https://github.com/Andrei-360/GameVault/blob/main/ai-log/etapa-02.md) | citire |
| S2-R7 | commit predat | [Istoric commit-uri](https://github.com/Andrei-360/GameVault/commits/main) | istoric git |