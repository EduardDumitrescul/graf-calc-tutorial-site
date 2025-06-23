# Documentație

## Tutoriale / documentație specifică
- [setup](intro.md) (cum se rulează proiectul)
- [ajustare font](font.md)
- [ajustare culori](culori.md)
- [adăugare conținut](pagini-tutorial.md) (cum se adaugă tutoriale/documentație nouă pe site)

## Structura Codului

* **components**

  * **layout**

    * **side-nav**

      * conține panoul de navigare afișat în partea stângă, care arată conținutul cursului
        structura este identică cu cea a folderului "tutorial"
      * conține alte componente mai mici folosite pentru panoul de navigare
    * conține layout-ul principal folosit pe site și alte componente mai mici
* **lib**

  * mdx.js: încarcă și parsează fișierele markdown
  * navigation.js: folosit pentru a obține structura de foldere din folderul "tutorial", pentru a fi afișată în panoul side-nav
* **pages**

  * pagini **next.js** (încărcate din app.js)
* public
  * diverse resurse folosite (majoritatea au rămas din faza inițială a proiectului)
  * subfolderul _images_ conține imagini/gif-uri afișate în fișierele markdown tuorial
* tutorial
  * conține conținutul cursului sub formă de fișiere Markdown
  * fișierele sunt încărcate automat pe site
* util
  * diverse fișiere care conțin funcții utilitare ce pot fi folosite oriunde în proiect
* app.js
