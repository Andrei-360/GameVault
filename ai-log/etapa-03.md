# Jurnal AI — Etapa 3: Structura HTML semantică și primul styling de bază

## 1. Obiectivul etapei
Definirea structurii semantice a paginii aplicației GameVault și aplicarea primului strat de stilizare CSS pentru o interfață preliminară curată și accesibilă.

## 2. Prompts utilizate și asistență AI
- Solicitat generarea structurii semantice standard HTML5 (`header`, `main`, `aside`, `section`, `ul`, `li`).
- Stabilit modelul de date inițial pentru colecția de jocuri (titlu, platformă, gen, expansiuni, status de finalizare).
- Generat primele reguli de reset CSS, box-sizing și paletă cromatică neutră pentru modul luminos de bază.

## 3. Decizii tehnice luate
- Utilizarea tag-urilor semantice HTML5 în locul containerelor generice `<div>` pentru a asigura o ierarhie accesibilă.
- Structurarea cardurilor de joc ca elemente `<li>` într-o listă neordonată `<ul>`.
- Pregătirea claselor CSS pentru badge-uri în funcție de platformă (PC, Xbox, PlayStation).

## 4. Dificultăți întâmpinate și soluții
- *Problema:* Alinierea informațiilor din card fără utilizarea tabelelor vechi.
- *Soluție:* Utilizarea Flexbox pentru alinierea orizontală a checkbox-ului, datelor despre joc și acțiunilor.

## 5. Rezultatul obținut
O pagină funcțională static, cu layout clar, lizibilă și pregătită pentru descompunerea în componente React reutilizabile.