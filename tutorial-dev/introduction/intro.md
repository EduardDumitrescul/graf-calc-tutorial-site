---
title: Introducere în OpenGL
description: Un tutorial simplu de introducere în OpenGL
---

# Introducere în OpenGL

Acest tutorial ne va ajuta să înțelegem conceptele de bază ale OpenGL.

## Ce este OpenGL?

OpenGL (Open Graphics Library) este o specificație standard care definește o API multilimbaj și multiplatformă pentru scrierea aplicațiilor care produc grafică 2D și 3D.

## De ce să folosim OpenGL?

- Este cross-platform
- Are performanță ridicată
- Este foarte flexibil
- Are o comunitate activă

## Exemple simple

Iată un exemplu simplu de cod OpenGL:

```cpp
// Exemplu simplu de OpenGL
#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    
    glBegin(GL_TRIANGLES);
    glColor3f(1.0, 0.0, 0.0);
    glVertex3f(-0.5, -0.5, 0.0);
    glColor3f(0.0, 1.0, 0.0);
    glVertex3f(0.5, -0.5, 0.0);
    glColor3f(0.0, 0.0, 1.0);
    glVertex3f(0.0, 0.5, 0.0);
    glEnd();
    
    glutSwapBuffers();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Triunghi simplu OpenGL");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
```

În tutorialele următoare vom explora mai în detaliu concepte precum:

1. Primitive grafice
2. Shadere
3. Texturi
4. Transformări

## Ce urmează?

În următoarele secțiuni vom explora cum să instalăm OpenGL și să configurăm primul nostru proiect. 