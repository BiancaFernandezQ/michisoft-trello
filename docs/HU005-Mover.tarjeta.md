# HU005 - Mover tarjeta “Pendiente” → “En progreso”

## Descripción

**Yo como** usuario autenticado en Trello,  
**quiero** poder mover una tarjeta desde la lista “Pendiente” hacia la lista “En progreso”,  
**para** gestionar el flujo de trabajo y el estado de mis tareas de manera organizada.

---

## Criterios de aceptación

1. El sistema debe permitir arrastrar o mover una tarjeta entre listas dentro del mismo tablero.  
2. La tarjeta debe conservar su título, etiquetas y asignaciones tras el movimiento.  
3. El movimiento debe reflejarse de forma inmediata en la interfaz.  
4. Si las listas base (“Pendiente” y “En progreso”) no existen, deben crearse antes de mover la tarjeta.  
5. El sistema debe guardar el nuevo estado de la tarjeta en la base de datos.  
6. Debe mostrarse una confirmación visual (por ejemplo, la tarjeta aparece dentro de la nueva lista).  
7. No debe permitir mover tarjetas a una lista inexistente o eliminada.  

---

## Casos de prueba

### **TC009 - Verificar que existan las listas base "Pendiente" y "En progreso"**
**Descripción:**  
Validar que el sistema tenga creadas las listas principales necesarias para el flujo de trabajo: “Pendiente” y “En progreso”. Si alguna no existe, debe crearse automáticamente.

**Precondiciones:**  
- El usuario está autenticado.  
- Existe un tablero activo.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Navegar al tablero principal del usuario | Se visualizan las listas existentes |
| 2 | Verificar la existencia de la lista “Pendiente” | La lista “Pendiente” está visible |
| 3 | Verificar la existencia de la lista “En progreso” | La lista “En progreso” está visible o se crea automáticamente |

**Resultado esperado final:**  
Ambas listas base están disponibles para mover tarjetas.

---

### **TC010 - Crear tarjeta en la lista “En progreso” y verificar su existencia**
**Descripción:**  
Validar que el usuario pueda crear una nueva tarjeta dentro de la lista “En progreso” y que esta aparezca correctamente con el título asignado.

**Precondiciones:**  
- Las listas “Pendiente” y “En progreso” existen.  
- El usuario está autenticado.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Seleccionar la lista “En progreso” | El sistema muestra la opción “Añadir tarjeta” |
| 2 | Crear una nueva tarjeta con título “Tarjeta en progreso {timestamp}” | Se crea la tarjeta |
| 3 | Verificar que la tarjeta aparece dentro de la lista “En progreso” | La tarjeta es visible con el título correcto |

**Resultado esperado final:**  
La tarjeta se crea correctamente en “En progreso” y aparece en la interfaz.

---

### **TC011 - Mover tarjeta desde “Pendiente” hacia “En progreso”**
**Descripción:**  
Validar que una tarjeta existente en la lista “Pendiente” pueda moverse correctamente a la lista “En progreso”, conservando su información.

**Precondiciones:**  
- Las listas “Pendiente” y “En progreso” existen.  
- Existe al menos una tarjeta en la lista “Pendiente”.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Seleccionar una tarjeta existente en la lista “Pendiente” | La tarjeta está visible |
| 2 | Arrastrar o mover la tarjeta hacia la lista “En progreso” | El sistema realiza el movimiento |
| 3 | Verificar que la tarjeta ahora se muestra dentro de “En progreso” | La tarjeta está presente en “En progreso” y ausente en “Pendiente” |

**Resultado esperado final:**  
La tarjeta se mueve correctamente entre listas y mantiene su información sin alteraciones.

---

### **TC012 - Verificar persistencia del movimiento de tarjeta**
**Descripción:**  
Validar que el movimiento de la tarjeta de “Pendiente” a “En progreso” se mantenga después de actualizar o recargar el tablero.

**Precondiciones:**  
- La tarjeta fue movida de “Pendiente” a “En progreso”.  

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Actualizar la página del tablero | El tablero se recarga |
| 2 | Verificar la ubicación de la tarjeta | La tarjeta sigue dentro de “En progreso” |

**Resultado esperado final:**  
El cambio de lista persiste tras la recarga del tablero.
