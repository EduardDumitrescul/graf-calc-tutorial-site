# Prezentare Generală a Template-ului

## 1. Incluziuni
La începutul fișierului `main.cpp`, vom include câteva librării și clase 
care ne vor ajuta în crearea unei aplicații OpenGL:
```cpp
#include <GL/glew.h> 
#include <GL/freeglut.h>
#include "Shader.h"
```

## 2. Obiectul pe care dorim să-l desenăm - Square

Pentru a facilita dezvoltarea și înțelegerea codului, 
grupăm toate informațiile necesare pentru desenarea unui pătrat 
într-o clasă `Square`. Această clasă gestionează datele despre 
vârfuri (vertex), shader-e și logica de randare.

### Definiția clasei:
#### Atribute:
- ID-uri GLuint pentru Vertex Array Object (VAO), Vertex Buffer Object (VBO) și Color Buffer.
- Tablouri pentru stocarea pozițiilor vârfurilor și culorilor acestora.

#### Constructor:
- Inițializează buffer-ele și VAO-ul, setând starea OpenGL necesară pentru randare.

#### Metoda pentru randare:
- Randază obiectul prin legarea buffer-elor necesare și apelarea funcțiilor OpenGL pentru desenare.

#### Destructor:
- Eliberează resursele prin dezactivarea buffer-elor și ștergerea obiectelor OpenGL.

```cpp
class Square
{
	GLuint vaoId, vboId, colorBufferId;
	GLfloat vertices[6 * 4] = {
		0.5f,  0.5f, 0.0f, 1.0f,
		0.5f, -0.5f, 0.0f, 1.0f,
		-0.5f, -0.5f, 0.0f, 1.0f,
		-0.5f, -0.5f, 0.0f, 1.0f,
		-0.5f,  0.5f, 0.0f, 1.0f,
		0.5f,  0.5f, 0.0f, 1.0f
	};

	GLfloat colors[6 * 4] = {
		1.0f, 0.5f, 0.2f, 1.0f,
		1.0f, 0.5f, 0.2f, 1.0f,
		1.0f, 0.5f, 0.2f, 1.0f,
		1.0f, 0.5f, 0.2f, 1.0f,
		1.0f, 0.5f, 0.2f, 1.0f,
		1.0f, 0.5f, 0.2f, 1.0f,
	  };
	
	public:
	Square()
	{
		glGenBuffers(1, &vboId);
		glBindBuffer(GL_ARRAY_BUFFER, vboId);
		glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
		glGenVertexArrays(1, &vaoId);
		glBindVertexArray(vaoId);

		glEnableVertexAttribArray(0);
		glVertexAttribPointer(0, 4, GL_FLOAT, GL_FALSE, 0, 0);

		glGenBuffers(1, &colorBufferId);
		glBindBuffer(GL_ARRAY_BUFFER, colorBufferId);
		glBufferData(GL_ARRAY_BUFFER, sizeof(colors), colors, GL_STATIC_DRAW);
		glEnableVertexAttribArray(1);
		glVertexAttribPointer(1, 4, GL_FLOAT, GL_FALSE, 0, 0);
	}

	void render() const
	{
		glBindVertexArray(vaoId);
		glDrawArrays(GL_TRIANGLES, 0, 3);
		glDrawArrays(GL_TRIANGLES, 3, 3);
	}

	~Square()
	{
		glDisableVertexAttribArray(1);
		glDisableVertexAttribArray(0);

		glBindBuffer(GL_ARRAY_BUFFER, 0);
		glDeleteBuffers(1, &colorBufferId);
		glDeleteBuffers(1, &vboId);

		glBindVertexArray(0);
		glDeleteVertexArrays(1, &vaoId);
	}
	
};
```

## 3. Inițializare și Randare

În această secțiune, inițializăm obiectele necesare (shader-e, texturi și obiectele 
de desenat) și setăm bucla principală de randare.

### Logica principală:
- **Obiecte Shader și Square:** Inițializăm pointerii pentru obiectele de shader
și pătrat.

- **Funcția de randare:** Se ocupă cu ștergerea ecranului, activarea shader-ului 
și randarea pătratului.

- **Funcția main:** Inițializează fereastra și contextul OpenGL, setează shader-ul 
și obiectele, apoi pornește bucla de randare.

```cpp
Shader* shader = nullptr;
Square* square = nullptr;

void RenderFunction(void)
{
	glClear(GL_COLOR_BUFFER_BIT);       
	shader->use();
	square->render();
	glFlush();
}

int main(int argc, char* argv[])
{
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
	glutInitWindowPosition(100, 100);
	glutInitWindowSize(600, 600); 
	glutCreateWindow("Grafica pe calculator - primul exemplu"); 
	glewInit(); 

	glClearColor(0.2f, 0.3f, 0.3f, 1.0f);

	shader = new Shader("example.vert", "example.frag");
	shader->use();
	square = new Square();
	square->render();
	
	glutDisplayFunc(RenderFunction);
	glutMainLoop();

	delete square;
	delete shader;
}
```