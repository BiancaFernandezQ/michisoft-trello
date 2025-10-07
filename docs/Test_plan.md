# Plan de Pruebas: Validación de Flujos Críticos de Trello (UI & API)

## 1. Información del Documento

### 1.1. Autores

| Fecha | Nombre |
| :--- | :--- |
| 07/28/2025 | Torrico Gabriela |
| | Alcocer Vargas Carolina |
| | Bravo Rueda Daniela |
| | Fernandez Quispe Bianca Sarahi |
| | Cespedes Encinas Jhesabel |
| | Mamani Mamani Guadalupe |
| | Calani Uvaldez Maria Nieves |

### 1.2 Historial de Revisión

| Autor | Fecha | Versión de Documento | Descripción |
| :--- | :--- | :--- | :--- |
| Gabriela Torrico, Alcocer Vargas Carolina, Bravo Rueda Daniela, Fernandez Quispe Bianca Sarahi, Jhesabel Cespedes Encinas, Guadalupe ´Mamani Mamani, Maria Nieves Calani Uvaldez | 09/29/2025 | 1.0 | Versión inicial del test plan |

### 1.3 Proceso de aprobación y revisores

Este plan será revisado y aprobado por el equipo de QA - **Michi Soft**.

---

## 2. Introducción

### 2.1 Descripción General

Este plan de pruebas cubre la estrategia integral para la validación de los principales flujos de **Trello** (tableros, listas, tarjetas, colaboración, miembros y búsquedas), tanto desde la **interfaz gráfica (UI)** como mediante la **API oficial de Trello**.

El objetivo principal es garantizar que las funciones críticas de tableros y tarjetas se ejecuten de acuerdo a las especificaciones, asegurando consistencia entre UI y API, integridad de datos, y un correcto manejo de permisos.

Se aplicará un enfoque de pruebas **Exploratory, Smoke, Funcionales y de Regresión**, con automatización en **JavaScript (Selenium + Axios/Fetch)** para UI y API.

### 2.2 Objetivos del Proyecto

El propósito fundamental de este plan se detalla a continuación:

* Validar el funcionamiento de los flujos críticos del sistema Trello, incluyendo la gestión de tableros, listas, tarjetas y miembros.
* Validar interfaz de usuario (UI) y la API oficial de Trello.
* Detectar y documentar defectos.
* Automatizar los casos de prueba clave utilizando **JavaScript y Playwright**, facilitando su integración continua con **Git Actions**.
* Generar evidencias y reportes.

### 2.3 Alcance

A continuación, se describen las actividades que estarán **dentro del alcance** de este plan:

* Validación de UI y API para tableros, listas, tarjetas, colaboración y miembros.
* Validación de códigos de estado (**200, 201, 204, 400, 401, 403, 404**).
* Pruebas positivas, negativas y *edge cases*.
* Validación de estructura **JSON** en respuestas API.
* Automatización con **Playwright y NodeJs (UI)**.

### 2.4 Fuera del Alcance

Este plan **no contempla** las siguientes actividades:

* Pruebas de rendimiento o concurrencia.
* Integraciones de terceros (Power-Ups).
* Pruebas móviles (solo se considera versión web).

---

## 3. Funcionalidades a Probar

El plan se divide en 7 módulos, cada uno asignado a un miembro del equipo:

### 3.1 Login & Tableros (Carolina)

* **UI:** Login válido, crear tablero, cambiar visibilidad, marcar favorito.
* **API:** `GET /1/members/{id}/boards` $\rightarrow$ validar creación y visibilidad.

### 3.2 Listas (Bianca)

* **UI:** Crear listas, reordenar listas.
* **API:** `POST /1/boards/{id}/lists` $\rightarrow$ creación.

### 3.3 Creación de Tarjetas (Daniela)

* **UI:** Crear tarjeta, añadir descripción.
* **API:** `POST /1/cards`, `PUT /1/cards/{id}`.

### 3.4 Colaboración en Tarjetas (Guadalupe)

* **UI:** Añadir comentario, adjuntar archivo, asignar miembro.
* **API:** `POST /1/cards/{id}/actions/comments`, `POST /1/cards/{id}/attachments`, `PUT /1/cards/{id}/idMembers`.

### 3.5 Movimientos de Tarjetas (Jhesabel)

* **UI:** Mover tarjeta de lista, archivar tarjeta.
* **API:** `PUT /1/cards/{id}` (mover), `PUT /1/cards/{id}/closed` (archivar).

### 3.6 Gestión de Miembros (Maria)

* **UI:** Invitar miembro, cambiar rol.
* **API:** `PUT /1/boards/{id}/members/{idMember}`.

### 3.7 Búsqueda & Cierre (Gabriela)

* **UI:** Buscar tarjeta, eliminar tablero, logout.
* **API:** `GET /1/search`, `DELETE /1/boards/{id}`.

---

## 4. Técnicas de prueba aplicadas

* **Exploratory testing:** detectar comportamientos inesperados.
* **Smoke Testing:** verificar si la funcionalidad base es estable.
* **Funcionales:** positivos, negativos, valores límite.
* **Regresión:** revalidar tras cambios o *fixes*.
* **Partición de equivalencias y valores límite** para *inputs*.

---

## 5. Herramientas

Se utilizarán las siguientes herramientas:

* **Jira + Zephyr:** gestión de pruebas y casos.
* **Node.js (v18+):** * `@faker-js/faker: "^9.9.0"`
    * `dotenv: "^17.2.3"`
    * `sqlite: "^5.1.1"`
    * `sqlite3: "^5.1.7"`
    * `winston: "^3.18.3"`
* **Playwright**
* **Git + GitHub:** control de versiones.
* **GitHub Actions:** integración continua.

---

## 6. Cronograma de actividades

| Actividad | Descripción | Fecha |
| :--- | :--- | :--- |
| Inicio del proyecto | Definición del alcance, objetivos y componentes a automatizar (login, tablero, listas, tarjetas). | 20 de septiembre |
| Análisis funcional y técnico | Revisión de la aplicación Trello y definición de los flujos críticos a probar. | 21–22 de septiembre |
| Diseño del Test Plan | Creación del documento de estrategia de pruebas, alcance, tipos de testing y herramientas a usar. | 25 de septiembre |
| Configuración del entorno | Creación del repositorio de GitHub e instalación de Playwright, estructura del proyecto y configuración del repositorio GitHub. | 26–27 de septiembre |
| Creación de pruebas UI | Validación visual e interactiva de la aplicación: visibilidad de elementos, botones, formularios y flujo general del usuario en la interfaz. | 28-01 de Octubre |
| Implementación del flujo principal | Desarrollo del test *end-to-end* que conecta login $\rightarrow$ tablero $\rightarrow$ lista $\rightarrow$ tarjeta. | 02 de octubre |
| Creación de pruebas API (*attachments, comments*) | Implementación y validación de *endpoints* `/1/cards/{id}/attachments` y `/1/cards/{id}/actions/comments`. | 1 de octubre |
| Incorporación de Schemas y validaciones | Adición de archivos JSON para validar estructura de respuestas API. | 2 de octubre |
| Ejecución inicial de pruebas (*Smoke Test*) | Primera corrida del flujo completo para detectar errores iniciales. | 3 de octubre |
| Refactorización y aplicación de *helpers/scripts* | Limpieza de código, creación de funciones comunes, *logs* y *scripts npm*. | 4 de octubre |
| Implementación de Reportes, *Tags* y *Marks* | Integración de reportes HTML, etiquetas por tipo de test y *logging*. | 5 de octubre |
| *Code Freeze* | Bloqueo de nuevas funcionalidades y enfoque en la validación final. | 6 de octubre |
| Ejecución final de Test Cases y Reporte de Resultados | Corrida total de pruebas, recolección de métricas (Passed/Failed) y generación del informe final. | 6 de octubre |
| Entrega y defensa del proyecto | Presentación de resultados, demo del flujo automatizado y exposición de buenas prácticas aplicadas. | 7 de octubre |

---

## 7. Recursos y responsabilidades

La siguiente tabla refleja de manera general cómo se gestionan los roles del proyecto, teniendo así, un QA Lead, un Backend Developer y *testers* colaborando activamente.

| Nombre | Rol en el Proyecto | Responsabilidades Principales |
| :--- | :--- | :--- |
| Bianca Fernandez, Alcocer Vargas Carolina | QA Lead, Backend | Coordinación general, control de *merge*, validación de *scripts* automatizados. Diseñar y ejecutar casos de prueba manuales y automatizados |
| Gabriela Torrico, Bravo Rueda Daniela, Jhesabel Cespedes, Guadalupe ´Mamani, Maria Nieves Calani | QA team | Diseñar y ejecutar casos de prueba manuales y automatizados |

---

## 8. Riesgos y limitaciones

Antes de la ejecución, es vital identificar los riesgos más críticos que pueden impactar el proyecto.

| Riesgo | Mitigación |
| :--- | :--- |
| Límite de *requests* Trello API | Ejecutar con pausas, *mockear* cuando sea posible |
| Tokens expirados | Automatizar renovación |
| Cambios en API | Revisar documentación semanalmente |
| Restricciones de permisos | Validar *scopes* antes de ejecutar |

---

## 9. Criterios de entrada

Antes de ejecutar las pruebas, se deberán cumplir los siguientes requisitos:

* Acceso a entorno de pruebas (Trello API key + token válido).
* Casos de prueba revisados.
* *Scripts* básicos ejecutados localmente.

---

## 10. Criterios de salida

El proyecto será considerado exitoso cuando:

* **100%** de casos ejecutados por *sprint*.
* Evidencia documentada.
* Defectos críticos cerrados.
* $\ge$ **90%** cobertura automatizada.

---

## 11. Referencias

* Documentación oficial Spotify Web API:
* Repositorio privado en GitHub:
* Trello: