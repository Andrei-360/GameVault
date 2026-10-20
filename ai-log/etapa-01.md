# Etapa 1: Jurnal AI

## Instrumente
- Gemini

## Solicitări cheie

### 1. Adaptarea temei și planificarea subcategoriilor
- Cerut: Cum să integrez genurile de jocuri și DLC-urile în schema obligatorie de 5 câmpuri.
- Răspuns primit: Sugestie de a păstra DLC-urile și genul ca metadate informative pe carduri fără a complica schema principală.
- Modificat / respins: Am adăugat un paragraf dedicat `.game-details` în structura cardului pentru o afișare curată.

### 2. Layout, Media Queries și Temă întunecată
- Cerut: Structură CSS Grid și Flexbox cu suport pentru Dark Mode.
- Răspuns primit: Layout complet cu variabile CSS redefinite în `@media (prefers-color-scheme: dark)` și navigare cu tastatura prin `:focus-visible`.
- Modificat / respins: Folosit conform sugestiei.

## Ce am învățat / ce nu a funcționat
Am învățat cum se folosesc elementele semantice (`header`, `main`, `section`), cum variabilele CSS simplifică implementarea temei întunecate fără reguli duplicate și cum se menține layout-ul adaptiv pe ecrane înguste.