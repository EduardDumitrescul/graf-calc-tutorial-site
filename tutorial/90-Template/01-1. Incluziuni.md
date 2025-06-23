# Incluziuni

În această secțiune sunt descrise fișierele de header necesare pentru lucrul cu OpenGL și Freeglut, dar și o clasă utilitară pentru gestionarea shaderelor.

## Glew

```cpp
#include <GL/glew.h>
```
- **Necesar pentru Freeglut:** Acest header este necesar 
pentru inițializarea funcțiilor OpenGL pe care le utilizezi în aplicație.
- **Ordinea includerii:** Trebuie inclus înainte de freeglut

## Freeglut
```cpp
#include <GL/freeglut.h>
```
- **Necesar pentru gestionarea ferestrelor:** Acest header este esențial pentru crearea și gestionarea ferestrelor OpenGL,
interacțiunea cu utilizatorul și redarea grafică.

## Shader
```cpp
#include "Shader.h"
```
- **Clasă utilitară pentru Shadere:** Fișierul Shader.h conține o clasă ajutătoare care facilitează încărcarea, compilarea
și utilizarea shaderelor.