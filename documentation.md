# Documentation

## Codebase Structure
- **components**
  - **layout**
    - **side-nav**
      - contains the navigation panel found on the left side displaying the course content 
      structure identical to the "tutorial" folder
      - contains other smaller components used for the navigation panel
    - contains the main Layout used on the website and other smaller components
- **lib**
  - mdx.js: loads and parses the markdown files
  - navigation.js: used for getting the folder structure of the "tutorial" folder, to
  display it on the side-nav panel
- **pages**
  - **next.js** pages (loaded from app.js)
- public??
- tutorial
  - contains the course content as Markdown files
  - files are automatically loaded onto the website
- util
  - various files containing util functions that can be used anywhere in the project
- app.js