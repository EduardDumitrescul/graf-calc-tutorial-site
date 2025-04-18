# Shader GLSL

Shaderele sunt programe mici care rulează pe GPU și determină cum sunt renderizate obiectele 3D.

## Tipuri de shadere

Există mai multe tipuri de shadere:

1. **Vertex Shader** - Procesează vertecșii obiectelor
2. **Fragment Shader** - Determină culoarea fiecărui pixel
3. **Geometry Shader** - Poate genera geometrie nouă
4. **Compute Shader** - Pentru calcule generale

## Exemplu de Fragment Shader

```glsl
// Fragment shader simplu
void main() {
    // Culoare roșie
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

## Formule Matematice în Shadere

Shaderele folosesc multe operații matematice. De exemplu:

Calculul normalei:

$$N = \frac{v_1 \times v_2}{|v_1 \times v_2|}$$

Transformarea unui vector:

$$v' = M \cdot v$$

Unde M este matricea de transformare și v este vectorul. 