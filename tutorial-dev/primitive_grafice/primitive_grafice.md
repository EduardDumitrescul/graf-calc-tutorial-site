## GL TRIANGLE
```cpp
glPolygonMode(GL_FRONT, GL_LINE);
// Modificare 1: schimbare fata poligonului
// Modificare 2: executate randurile de mai jos; testate si GL_FRONT, GL_FRONT_AND_BACK
// glEnable (GL_CULL_FACE); // cull face
// glCullFace (GL_BACK);
// Modificare 3: executat randul de mai jos, combinate modificarile 2 si 3
// glFrontFace(GL_CW);
codColLocation = glGetUniformLocation(ProgramId, "codCol");

glEnable(GL_CULL_FACE);
glCullFace(GL_FRONT_FACE);
glFrontFace(GL_CCW);

// Triunghiul "mic"
codCol = 1;
glUniform1i(codColLocation, codCol);
glDrawArrays(GL_TRIANGLES, 0, 3);
```


## GL POLYGON

Se presupune că optțiunea GL POLYGON este utilizată pentru un șir de
vârfuri P1, P2, .... , PN, distincte două câte două. Reguli referitoare la
vârfurile indicate, pentru ca poligonul să poată  desenat:
1. Punctele trebuie să fie complanare, dar nu coliniare.
2. Poligon convex
3. Vârfuri

### Exemplu

> [Formulele se pot scrie si cu sintaxa de latex](https://docs.mathjax.org/en/v2.7-latest/tex.html)

Punctele  P<sub>1</sub> = (7, 1, 1) ,  P<sub>2</sub> = (-3, 3, 9) ,  P<sub>3</sub> = (1, -1, 9) , P<sub>4</sub> = (8, -4, 5)  sunt coplanare.


$\overrightarrow{P_{1}P_{2}} \times \overrightarrow{P_{2}P_{3}} = (32, 32, 32)$

$\overrightarrow{P_{2}P_{3}} \times \overrightarrow{P_{3}P_{4}} = (16, 16, 16)$

$\overrightarrow{P_{3}P_{4}} \times \overrightarrow{P_{4}P_{1}} = (32, 32, 32)$

$\overrightarrow{P_{4}P_{1}} \times \overrightarrow{P_{1}P_{2}} = (48, 48, 48)$

$\overrightarrow{P_{1}P_{2}} \times \overrightarrow{P_{2}P_{3}} =
\begin{vmatrix}
-10 & 4 & e_1 \\
2 & -4 & e_2 \\
8 & 0 & e_3
\end{vmatrix}$