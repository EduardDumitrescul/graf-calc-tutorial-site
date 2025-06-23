# Culori Website
In fisierul `components/ThemeContext.tsx` sunt definite culorile ce vor fi folosite in
componentele ReactMUI, pentru ambele moduri (light/dark):
- background: culoarea de fundal
- paper: culoarea container-elor (ex: cardurile cu rezultatele cautarilor)

# Culori blocuri de cod
Se modifica valorile din atributul 'custom' (unul pentru fiecare mod light/dark)
```
custom: {
        shader: {
            bg: 'rgba(230, 245, 255, 0.6)',
            border: 'rgba(100, 180, 255, 0.5)',
        },
        cpp: {
            bg: 'rgba(240, 255, 240, 0.6)',
            border: 'rgba(80, 200, 120, 0.5)',
        },
        default: {
            bg: 'rgba(250, 250, 250, 0.6)',
            border: 'rgba(0, 0, 0, 0.1)',
        },
    },
```

# Adaugare culori
Pentru a adauga alte culori in aceasta tema, ori se seteaza token-urile deja existente, ori 
se defines noi token-uri(cum am facut pentru blocurile de cod).

Token-urile deja existente se gasesc in documentati oficiala: https://mui.com/material-ui/customization/palette/

Pentru a crea token-uri noi, trebuie adaugate in modulul de la inceputul fisierului, dupa
care definite in tema noastra.