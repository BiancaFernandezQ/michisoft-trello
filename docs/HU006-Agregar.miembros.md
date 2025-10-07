# HU006 – Miembros en trello

## Descripción

**Yo como** usuario registrado de Trello,
**quiero** Agregar miembros a un tablero,  
**para** Compartir el tablero con otros miembros.

---

## Criterios de aceptación

1. El usuario debe poder agregar un nuevo miembro al tablero ingresando su correo electrónico.
2. Si se intenta agregar un miembro que ya pertenece al tablero, el sistema debe mostrar un mensaje de error o advertencia.
3. Solo los usuarios con permisos de administrador del tablero pueden agregar miembros.
4. El sistema debe registrar correctamente el rol del nuevo miembro (normal, administrador u observador).

---

## Casos de prueba

### **TC001 – Verificar que se agregue a un miembro al tablero**
**Descripción:**  
Validar que el usuario pueda agregar a un nuevo miembro a un tablero especifico.

**Precondiciones:**  
- El usuario tiene una cuenta activa de Trello.  
- El `TRELLO_USER` y `TRELLO_PASSWORD` están correctamente configurados.
- Se creó un tablero

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar al tablero creado| Se muestra el botón de compartir|
| 2 | Hacer clic en compartir | Mostrar el formulario de registro|
| 3 | Ingresar un Gmail válido| El sistema acepta el gmail |
| 4 | Presionar el botón **“Compartir”** | El miembro se encuentra registrado |

**Resultado esperado final:**  
El usuario agrega a un nuevo miembro al tablero.

---

### **TC002 - Verificar que se pueda cambiar de rol al miembro**
**Descripción:**  
Verificar que el sistema permita cambiar el rol a un miembro de un tablero.

**Precondiciones:**  
- El usuario tiene una cuenta activa de Trello.  
- El `TRELLO_USER` y `TRELLO_PASSWORD` están correctamente configurados.
- Se creó un tablero


| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar al tablero creado| Se muestra el botón de compartir|
| 2 | Hacer clic en compartir | Mostrar el formulario de registro|
| 3 | Ingresar un Gmail válido| El sistema acepta el gmail |
| 4 | Presionar el botón **“Compartir”** | El miembro se encuentra registrado |
| 5 | clic en miembro | mostrar seleccionador |
| 6 | clic en Observador| El miembro debe cambiar su rol a observador|



**Resultado esperado final:**  
Se cambia el rol de miembro a observador.

---
