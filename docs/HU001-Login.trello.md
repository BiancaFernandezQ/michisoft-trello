# HU001 - Login en Trello

## Descripción

**Yo como** usuario registrado de Trello,  
**quiero** iniciar sesión con mis credenciales válidas,  
**para** acceder a mi cuenta y gestionar mis tableros de forma segura.

---

## Criterios de aceptación

1. El sistema debe permitir el acceso únicamente con un correo y contraseña válidos.  
2. Si el correo no existe o no está registrado, el sistema debe pedirte que lo registres.  
3. Si el campo email o contraseña está vacío, debe mostrarse un mensaje indicando que el campo es obligatorio.  
4. Si el correo no tiene un formato válido, debe mostrarse un mensaje de error de formato.  
5. Si la contraseña es incorrecta o demasiado corta, el sistema no debe permitir el acceso.  
6. Después de un login exitoso, el usuario debe ser redirigido al tablero principal y debe guardarse la sesión.  
7. No debe mostrarse ninguna URL o elemento del tablero cuando las credenciales sean inválidas.

---

## Casos de prueba

### **TC001 - Validar que se redirija a los tableron con un login exitoso**
**Descripción:**  
Validar que el usuario pueda iniciar sesión correctamente con credenciales válidas, que el sistema redirija al área de tableros (`/boards`) y que se guarde el estado de la sesión localmente.

**Precondiciones:**  
- El usuario tiene una cuenta activa de Trello.  
- El `TRELLO_USER` y `TRELLO_PASSWORD` están correctamente configurados.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Navegar a la página de inicio de sesión de Trello | Se muestra el formulario de login |
| 2 | Ingresar un correo válido | El sistema acepta el correo y habilita el campo de contraseña |
| 3 | Ingresar la contraseña válida | El sistema acepta la contraseña |
| 4 | Presionar el botón **“Log in”** | El usuario es redirigido al panel `/boards` |

**Resultado esperado final:**  
El usuario accede a su cuenta y la sesión queda guardada exitosamente.

---

### **TC002 - Verificar que pida registrarse al ingresar con email no registrado**
**Descripción:**  
Verificar que el sistema no permita iniciar sesión cuando el usuario ingresa un correo electrónico no registrado, mostrando un mensaje claro de error sobre las credenciales y pida registrarse para continuar.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar un correo inexistente en Trello | Se valida el formato del correo |
| 2 | Presionar **“Continuar”** |  |

**Resultado esperado final:**  
El acceso se deniega y el sistema redirecciona al usuario al registro.

---

###  **TC003 - Validar comportamiento con campo email vacío**
**Descripción:**  
Validar que el sistema no permita enviar el formulario de login si el campo de correo electrónico está vacío, mostrando un mensaje informativo sobre el campo obligatorio y sin procesar la autenticación.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Dejar el campo “email” vacío | El sistema muestra advertencia de campo obligatorio |
| 2 | Presionar **“Continuar”** | Aparece mensaje “Indica tu dirección de correo electrónico” |

**Resultado esperado final:**  
El formulario no se envía y el usuario recibe el mensaje de campo vacío.

---

###  **TC004 - Validar mensaje de error por detección de formato incorrecto en correo**
**Descripción:**  
Validar que el sistema detecte y bloquee los intentos de login con un correo electrónico que no contiene el símbolo “@”, mostrando un mensaje de formato inválido y sin redirigir al usuario.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar un correo sin “@” (ej. `ejemplodominio.com`) | El sistema muestra mensaje de formato incorrecto |
| 2 | Presionar **“Continuar”** |  |

**Resultado esperado final:**  
El sistema impide el envío y muestra error de formato inválido.

---

###  **TC005 - Validar mensaje de error por detección de correo sin punto formato incompleto**
**Descripción:**  
Validar que el sistema identifique correctamente un correo sin punto (por ejemplo `ejemplo@dominiocom`) como inválido y evite que el usuario acceda, mostrando un mensaje informativo.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar un correo sin punto (`ejemplo@dominiocom`) | El sistema muestra error de formato |
| 2 | Presionar **“Continuar”** |  |

**Resultado esperado final:**  
El sistema no acepta el correo y muestra mensaje de formato incorrecto.

---

###  **TC006 - Verificar rechazo de contraseñas demasiado cortas**
**Descripción:**  
Verificar que el sistema no permita el acceso cuando el usuario ingresa una contraseña de menos de 6 caracteres, mostrando un mensaje de error de validación y sin permitir avanzar al tablero.

**Precondición:**  
El usuario existe `TRELLO_USER` configurado.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar correo válido| El sistema acepta el correo |
| 2 | Ingresar una contraseña de solo 3 caracteres | El sistema muestra advertencia de longitud mínima |
| 3 | Presionar **“Log in”** | El acceso es denegado |

**Resultado esperado final:**  
El sistema bloquea el intento por contraseña corta.

---

###  **TC007 - Validar mensaje de error por rechazo de contraseñas inválidas con solo espacios**
**Descripción:**  
Validar que el sistema no permita el acceso cuando la contraseña está compuesta únicamente por espacios, asegurando que no se procesen valores vacíos disfrazados.

**Precondición:**  
El usuario existe `TRELLO_USER` configurado.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar correo válido | El correo es aceptado |
| 2 | Ingresar contraseña con solo espacios | El sistema muestra error de validación |
| 3 | Presionar **“Log in”** | No permite acceso |

**Resultado esperado final:**  
El sistema no autentica al usuario y muestra un mensaje de error por contraseña inválida.

---

###  **TC008 - Validar mensaje de error cuando el campo contraseña está vacío**
**Descripción:**  
Validar que el sistema muestre un mensaje de error claro y evite el acceso cuando el usuario intenta iniciar sesión sin completar el campo de contraseña.

**Precondición:**  
El usuario existe `TRELLO_USER` configurado.

| Paso | Acción | Resultado esperado |
|------|---------|--------------------|
| 1 | Ingresar correo válido (`TRELLO_USER`) | El sistema acepta el correo |
| 2 | Dejar el campo contraseña vacío | Muestra mensaje de campo requerido |
| 3 | Presionar **“Log in”** | Aparece mensaje “Indica tu contraseña” |

**Resultado esperado final:**  
El sistema impide el acceso y muestra el mensaje de campo obligatorio.

---