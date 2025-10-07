# **HU002 - Listas en Trello**

## Descripción

**Yo como** usuario registrado de Trello y administrador de mi tablero,
**quiero** crear, reordenar, cambiar color y archivar listas,
**para** organizar visualmente las tareas y flujos de trabajo dentro del tablero.

---

## Criterios de aceptación

1. El sistema debe permitir crear listas con un nombre válido.
2. El sistema no debe permitir crear listas con el nombre vacío.
3. El sistema debe permitir reordenar listas dentro de un tablero existente.
4. El sistema debe permitir cambiar el color de una lista utilizando las opciones disponibles.
5. El sistema debe permitir archivar una lista existente y mostrar un mensaje de confirmación.
6. Los nombres de listas pueden contener letras, números y caracteres especiales válidos.

---

## Casos de Prueba

---

### **TC001 - Crear lista dentro de un board existente**

**Descripción:** Verificar que el usuario pueda crear una lista con un nombre válido dentro de un tablero existente.

**Precondiciones:**

* El usuario debe tener sesión iniciada en Trello.
* Debe existir al menos un tablero accesible.

| Paso | Acción                                            | Resultado esperado                           |
| ---- | ------------------------------------------------- | -------------------------------------------- |
| 1    | Navegar al tablero existente.                     | El tablero se carga correctamente.           |
| 2    | Crear una nueva lista con nombre `"PENDIENTE 1"`. | La lista se crea y aparece en el tablero.    |
| 3    | Crear una segunda lista `"PROGRESO 2"`.           | La lista se crea correctamente.              |
| 4    | Mover la primera lista al final.                  | El orden de las listas cambia correctamente. |

**Resultado esperado final:**
Las listas creadas aparecen en el tablero y se pueden mover de posición.

---

### **TC002 - Reordenar listas dentro de un board existente**

**Descripción:** Validar que el usuario pueda cambiar el orden de varias listas creadas.

**Precondiciones:**

* Tablero existente con sesión iniciada.

| Paso | Acción                                       | Resultado esperado                            |
| ---- | -------------------------------------------- | --------------------------------------------- |
| 1    | Crear tres listas con nombres distintos.     | Las tres listas se crean exitosamente.        |
| 2    | Mover la primera lista al final del tablero. | La posición de la lista cambia correctamente. |
| 3    | Repetir la acción de mover listas.           | Las listas mantienen el orden modificado.     |

**Resultado esperado final:**
Las listas pueden moverse sin errores y el nuevo orden se mantiene visible.

---

### **TC003 - Crear listas a partir de datos JSON (positivas y negativas)**

**Descripción:** Validar que el sistema acepte o rechace nombres de listas según la configuración de `listas.json`.

**Precondiciones:**

* Archivo `data/listas.json` con datos de prueba configurado.

| Paso | Acción                                      | Resultado esperado                                      |
| ---- | ------------------------------------------- | ------------------------------------------------------- |
| 1    | Leer los nombres del archivo JSON.          | Se obtienen los datos correctamente.                    |
| 2    | Crear listas según los valores del archivo. | Las listas válidas se crean; las inválidas se rechazan. |

**Resultado esperado final:**
Las listas válidas son visibles en el tablero, las inválidas no.

---

### **TC004 - Cambiar color de lista**

**Descripción:** Verificar que el usuario pueda cambiar el color de una lista existente.

**Precondiciones:**

* Base de datos `listas_varias.db` con nombres y colores.
* Lista creada correctamente.

| Paso | Acción                                                      | Resultado esperado                                                         |
| ---- | ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1    | Crear una lista con nombre obtenido desde la base de datos. | La lista aparece en el tablero.                                            |
| 2    | Cambiar el color de la lista según el valor almacenado.     | El color cambia visualmente.                                               |
| 3    | Verificar el color seleccionado.                            | El botón correspondiente al color tiene el atributo `aria-checked="true"`. |

**Resultado esperado final:**
El color seleccionado se aplica correctamente a la lista.

---

### **TC005 - Archivar lista**

**Descripción:** Verificar que el usuario pueda archivar una lista y que aparezca un mensaje de confirmación.

**Precondiciones:**

* Lista creada previamente.

| Paso | Acción                                  | Resultado esperado                                                 |
| ---- | --------------------------------------- | ------------------------------------------------------------------ |
| 1    | Crear una lista desde la base de datos. | La lista se crea correctamente.                                    |
| 2    | Cambiar color (opcional).               | La lista mantiene el color configurado.                            |
| 3    | Archivar la lista creada.               | La lista desaparece del tablero y aparece mensaje de confirmación. |

**Resultado esperado final:**
El mensaje emergente de confirmación se muestra indicando que la lista fue archivada exitosamente.

---

## **TC006 - Crear lista vía API (POST /1/lists)**

**Descripción:**
Validar que un usuario autenticado pueda crear una nueva lista en un tablero de Trello mediante una solicitud HTTP `POST` al endpoint `/1/lists`.

**Objetivo de prueba:**
Confirmar que el servicio de Trello permite la creación de listas desde API, validando la respuesta HTTP, los datos retornados 

### **Precondiciones:**

* Variables de entorno configuradas en `.env` con:

  ```
  TRELLO_KEY=<tu_api_key>
  TRELLO_TOKEN=<tu_token>
  ```
* Base de datos local `listas_varias.db` con al menos un registro válido (`nombre`, `color`).
* Tablero existente con ID conocido (por ejemplo: `68dafe4f28bbf27981d87d40`).
* Conexión activa a internet.

---

### **Datos de entrada:**

| Campo     | Valor ejemplo              | Fuente                        | Descripción                        |
| --------- | -------------------------- | ----------------------------- | ---------------------------------- |
| `name`    | “Lista QA Azul”            | DB local (`listas_varias.db`) | Nombre de la lista a crear         |
| `idBoard` | `68dafe4f28bbf27981d87d40` | Hardcoded / variable          | ID del tablero destino             |
| `pos`     | `top`                      | Manual                        | Posición de la lista en el tablero |

---

### **Pasos de prueba**

| Paso | Acción                                                                                                       | Resultado esperado                                          |
| ---- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1    | Cargar las variables de entorno con `dotenv.config()`.                                                       | Las credenciales (`key` y `token`) se cargan correctamente. |
| 2    | Abrir la base de datos SQLite y seleccionar un registro aleatorio de la tabla `listas`.                      | Se obtiene un objeto `{nombre, color}`.                     |
| 3    | Enviar una solicitud `POST` a `https://api.trello.com/1/lists` con los parámetros `name`, `idBoard` y `pos`. | La API responde con código **200 OK** o **201 Created**.    |
| 4    | Validacion con `expect(response.ok()).toBeTruthy()`.                                            | La validación pasa correctamente.                           |
| 5    | Convertir la respuesta a JSON y validar los campos retornados (`name`, `idBoard`).                           | Los valores coinciden con los enviados en la solicitud.     |
| 6    | Imprimir el obj retornado.        |

---

### **Resultado esperado final:**

* La API retorna una respuesta exitosa (`status 200` o `201`).
* El cuerpo contiene el campo `"name"` igual al enviado.
* El campo `"idBoard"` coincide con el tablero de destino.
* La lista se crea efectivamente en el tablero y es visible desde la interfaz web de Trello.