# Etapa 2: Jurnal AI

## Instrumente
- Gemini

## Conversații
- Gemini (Logica pe date în JavaScript pur, funcții imutabile și integrare date RTS)

## Solicitări cheie

### 1. Modelarea datelor și imutabilitatea
- Cerut: Cum să mut datele din HTML în JS folosind metodele funcționale de array (map, filter, reduce) pe jocuri RTS (WARNO, StarCraft II, Red Alert 3).
- Răspuns primit: Implementarea unui array de obiecte cu funcții care întorc copii noi folosind spread operator (`[...]`, `{...}`).
- Modificat / respins: Am păstrat câmpurile specifice de gen, DLC și OST ca proprietăți de obiect.

### 2. Validare și calcul id
- Cerut: Calcularea id-ului următor fără erori de duplicare și validarea câmpurilor.
- Răspuns primit: Utilizarea `reduce` cu `Math.max` pentru id și validări pentru titlu gol și platforme nepermise.
- Modificat / respins: Preluat conform ghidului.

## Ce am învățat / ce nu a funcționat
Am înțeles de ce este crucială imutabilitatea pentru React (compararea prin referință a stării) și cum funcționează metodele native de manipulare a listelor în JavaScript modern.