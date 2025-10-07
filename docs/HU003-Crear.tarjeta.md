# HU0003 - Crear una Tarjeta en Trello

## Descripción

**Yo como** usuario registrado de Trello,  
**quiero** crear una nueva tarjeta dentro de una lista ,  
**para** poder registar tareas o actividades especificas en mi tablero.

---

## Casos de Prueba UI

**Precondiciones:**  
- El usuario tiene una cuenta activa de Trello.  
- El `TRELLO_USER` y `TRELLO_PASSWORD` están correctamente configurados.
- Crear un Tablero
- Crear una Lista

| ID | Titulo Test Case | Prioridad
|------|---------|--------------------|
| 1 | Card > Validar que la tarjeta creada se muestre correctamente en la lista correspondiente  | Media |
| 2 | Card > Verificar que el título de la tarjeta se visualice correctamente en la interfaz | Baja |
| 3 | Card > Verificar que una tarjeta se pueda abrir correctamente | Baja |
| 4 | Card > Verificar que se pueda ingresar una descripcion en una tarjeta ya creada | Baja |

--- 

## Casos de Prueba API

**Precondiciones:**  
- El usuario tiene una cuenta activa de Trello.  
- El usuario tiene generado `key` y `token` correctamente.
- El usuario tiene tableros ya creados
- El usuario tiene acceso al board mendiante su id_board 

| ID | Titulo Test Case | Prioridad
|------|---------|--------------------|
| 1 | POST > Validar creación exitosa de una tarjeta   | Media |
| 2 | POST > Verificar la funcionalidad de agregar nueva descripcion a una tarjeta | Baja |
| 3 | PUT > Actualizar la descripción de una tarjeta y confirmar el cambio guardado | Baja |

