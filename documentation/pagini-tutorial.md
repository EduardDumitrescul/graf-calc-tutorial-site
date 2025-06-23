# Pagini Tutoriale
Paginile ce contin documentatie si tutoriale legate de curs/laborator se gasesc in folder-ul
'tutorial'. Fisierele markdown, si folderele (pana la adancime 2) sunt randate automat
pe site, ele fiind afisate in bara de navigatie din partea stanga.


## Ordinea fisierelor
Paginile si folderele sunt afisate in ordine alfabetica. 

Pentru a face disponibila ordonarea personalizata, primele 3 caractere din numele fisierului
nu sunt afisate pe website. Ele pot reprezenta pozitia in lista ordonata de noi.

Acest numar de 3 caractere poate fi modificat in fisierul `components/layout/side-nav/NavList.tsx`
```
const nameWithoutPrefix = name.substring(3)
```
 

## Adaugare alte tutoriale
Se adauga fisierul markdown in folder-ul 'tutorial', sau un subfolder. Atentie ca primele
3 caractere sunt folosite pentru ordonarea in lista si nu apar pe website.

## Blocuri de cod 
Pentru a colora blocurile de cod, trebuie adaugat tag-ul corespunzator:
- blocuri de cod din fisiere cpp: 

\`\`\`cpp     

\`\`\`

- blocuri de cod din fisiere frag:

\`\`\`frag

\`\`\`

- blocuri de cod din fisiere vert:

\`\`\`vert

\`\`\`

Acestea vor fi colorate automat.

## Actualizare cod
Codul se gaseste in folderul `components/layout/side-nav`