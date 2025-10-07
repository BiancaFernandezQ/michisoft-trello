# Grupo : MichiSoft
## Modulo 6 : Automatizacion de Pruebas en Sistemas Web
---


## Tabla de Contenido

1. [Descripción](#descripción)
2. [Estructura del Proyecto](#descripción-de-directorios-y-archivos)
3. [Herramientas](#herramientas)
4. [Instalacion y Configuracion](#instalacion)
5. [Ejecucion de Pruebas](#ejecucion-de-pruebas)
6. [Autores](#autores)
---
## 1. Descripción
El presente proyecto se centró en la evaluación de la aplicación Trello, un gestor de tareas, en el cual se implementó un  framework de automatización de sistemas web utilizando las herramientas de Playwright y Node.js, y se diseñaron casos de prueba para la ejecución de pruebas funcionales tanto de API como de interfaz de usuario (UI).
Además, se integró la herramienta Allure para la generación de reportes de ejecución, y GitHub Actions para la creación del pipeline CI/CD. 

---

### 2. Estructura de Proyecto
```bash
+michisoft-trello
├── data/                    #  Archivo a consumir en los test cases
├── fixtures/                # Fixtures compartidas (ej. token de autenticación)
├── pages/                   # Modelado de Paginas (POM) a evaluar
├── scripts/                 # Contiene scripts de la BD y login
├── tests/                   # Contiene todos los test cases de UI Y API
├── reports/                 # Carpeta para resultados de Allure
├── utils/                   # Utilitarios que va usar el framework como helper
└── README.md                # Documentación del proyecto
└── playwright.config.js     # Archivo de configuración global de Playwright
```
---
## 3.  Herramientas

- Visual Studio
- GitHub
- Playwright / Node Js
- JavaScript
---
## 4. Instalacion y Configuracion

### Instalar dependencias

- Inicializa un proyecto Node.js con un archivo `package.json` por defecto:<br>
 `npm init -y`

- Instala Playwright como dependencia de desarrollo:<br>
 `npm i -D @playwright/test`

- Instala los navegadores necesarios para Playwright:<br>
 `npx playwright install`

- Instalar dotenv <br>
`npm install dotenv`

- Instalar datos faker <br>
`npm install @faker-js/faker`

- Instalar sqlite3 <br>
`npm install sqlite3`

- Instalar sqlite <br>
`npm install sqlite`


---
 ## 5. ✅ Ejecucion de pruebas
 >Con todo configurado ya se puede correr pruebas automatizadas de la siguiente manera:

 ### Paso 1: Ejecutar los scripts
```bash
node .\scripts\generateLists.js
node .\scripts\login.data.js

```

### Paso 2 : Ejecutar Scripts de la Base de Datos
```bash
node .\scripts\generateBoardsDB.js
 ```

### Paso 3 : Ejecutar el test para trello Sesion
```bash
 npx playwright test tests/trello.spec.js
 ```

### Paso 4: Empezar a ejecutar los test cases 

Ejecuta todas las pruebas en modo interfaz grafica
  ```bash
  nnpx playwright test --headed
  ```

Ejecuta todas las pruebas en modo headless:
   ```bash
  npx playwright test
   ```

Ejecuta todos los test cases del Flujo:
   ```bash
  npx playwright test tests/flujo-michisoft.spec.js
 
  ```

---
## 6.Autores

| Nombre completo                          | Nickname                    |
|------------------------------------------|-----------------------------|
| Alcocer Vargas Carolina                  | CarolinaAVar                |
| Bravo Rueda Daniela                      | danielabravo2308            |
| Calani Maria Nieves                      | maria6755                   |
| Cespedes Jhesabel                        |   Jhesabel                  |
| Fernandez Bianca Sarahi                  | BiancaFernandezQ            |
|  Mamani Mamani Guadalupe                 | GuadalupeMamani             |
|  Torrico Gabriela                        |       GabyRebound           |
                                             









  