# Obiectul pe care dorim să-l desenăm - Square

## Atribute

```cpp
GLuint vaoId;
```
Reprezintă ID-ul unui Vertex Array Object și este folosit pentru a semnaliza programului că urmează să fie utilizate 
buffer-ele asociate acestui obiect.

```cpp
GLuint vboId;
```
Reprezintă ID-ul unui Vertex Buffer Object și este folosit pentru a identifica un buffer cu informații despre poziția 
vârfurilor obiectului.

```cpp
GLuint colorBufferId
```
Reprezintă ID-ul unui Vertex Buffer Object și este folosit pentru a identifica un buffer cu informații despre culoarea 
vârfurilor obiectului.

```cpp
GLfloat vertices[6 * 4] = {
    0.5f,  0.5f, 0.0f, 1.0f,
    0.5f, -0.5f, 0.0f, 1.0f,
    -0.5f, -0.5f, 0.0f, 1.0f,
    -0.5f, -0.5f, 0.0f, 1.0f,
    -0.5f,  0.5f, 0.0f, 1.0f,
    0.5f,  0.5f, 0.0f, 1.0f
};
```
**Coordonatele vârfurilor.**

Fiecare vârf are asociate 4 coordonate (x, y, z, w):
- x: lățime (stânga -> dreapta)
- y: înălțime (sus -> jos)
- z: adâncime (departe -> aproape)
- w: factorul de scalare (pentru coordonate omogene); de obicei este egal cu 1.0

Aceste coordonate trebuie să apară în intervalul [-1, 1].

```cpp
GLfloat colors[6 * 4] = {
    1.0f, 0.5f, 0.2f, 1.0f,
    1.0f, 0.5f, 0.2f, 1.0f,
    1.0f, 0.5f, 0.2f, 1.0f,
    1.0f, 0.5f, 0.2f, 1.0f,
    1.0f, 0.5f, 0.2f, 1.0f,
    1.0f, 0.5f, 0.2f, 1.0f,
  };
```
**Culorile vârfurilor.**

Fiecare vârf are asociată o culoare în format RGBA (roșu, verde, albastru, alfa).

Valorile trebuie să apară în intervalul [0, 1].

## Constructor

```cpp
Square()
{
    glGenVertexArrays(1, &vaoId);
    glBindVertexArray(vaoId);
```
- creează un Vertex Array Object și stochează ID-ul în variabila vaoId.
- setează VAO-ul identificat prin vaoId ca VAO-ul curent.

```cpp
    glGenBuffers(1, &vboId);
    glBindBuffer(GL_ARRAY_BUFFER, vboId);   
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
```
- creează un buffer nou pentru pozițiile vârfurilor și stochează ID-ul în variabila vboId.
- setează buffer-ul identificat prin vboId ca buffer-ul curent.
- copiază pozițiile vârfurilor din vectorul vertices în buffer-ul curent.

```cpp
    glEnableVertexAttribArray(0); // location
    glVertexAttribPointer(0, 4, GL_FLOAT, GL_FALSE, 0, 0); // location, size, type, normalized, stride, pointer
```
- definește atributul de la `location = 0` din shader, utilizând valorile din buffer-ul curent (vboId)
- in shader: `layout (location = 0) in vec4 in_Position;`
- size = 4 deoarece fiecărui vârf îi sunt asociate 4 valori.

```cpp
    glGenBuffers(1, &colorBufferId);
    glBindBuffer(GL_ARRAY_BUFFER, colorBufferId);   
    glBufferData(GL_ARRAY_BUFFER, sizeof(colors), colors, GL_STATIC_DRAW);
```
- creează un buffer nou pentru culorile vârfurilor și stochează ID-ul în variabila colorBufferId.
- setează buffer-ul identificat prin colorBufferId ca buffer-ul curent.
- copiază culorile vârfurilor din vectorul colors în buffer-ul curent.

```cpp
    glEnableVertexAttribArray(1); // location
    glVertexAttribPointer(1, 4, GL_FLOAT, GL_FALSE, 0, 0); // location, size, type, normalized, stride, pointer
}
```
- definește atributul de la `location = 1` din shader, utilizând valorile din buffer-ul curent (vboId).
- În shader: `layout (location = 0) in vec4 in_Position;`
- size = 4 deoarece fiecărui vârf îi sunt asociate 4 valori.

## Metoda pentru randare
```cpp
void render() const
{
    glBindVertexArray(vaoId);
    glDrawArrays(GL_TRIANGLES, 0, 3);
    glDrawArrays(GL_TRIANGLES, 3, 3);
}
```
- semnalizează utilizarea VAO-ului vaoId.
- desenează două triunghiuri, formate din primele 3 și următoarele 3 vârfuri.

## Destructorul
```cpp
~Square()
{
    glDisableVertexAttribArray(1);
    glDisableVertexAttribArray(0);
```
- dezactivează atributele de la locațiile 0 și 1 din shader.

```cpp
    glBindBuffer(GL_ARRAY_BUFFER, 0);
    glDeleteBuffers(1, &colorBufferId);
    glDeleteBuffers(1, &vboId);
```
- dezactivează buffer-ul curent.
- Șterge buffer-ele vboId și colorBufferId.

```cpp
    glBindVertexArray(0);
    glDeleteVertexArrays(1, &vaoId);
}
```
- dezactivează VAO-ul curent.
- Șterge VAO-ul vaoId.

