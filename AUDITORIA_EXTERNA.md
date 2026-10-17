# INFORME DE AUDITORÍA EXTERNA, DE SOLO LECTURA Y SEGURA
**Sitio Web Evaluado:** `https://eberruizportafolio.netlify.app/`  
**Responsable del Sitio:** Eber Ruiz Zamora (Persona Natural Independiente, Cartagena, Bolívar, Colombia)  
**Canales de Contacto Declarados:** `ruzae1@gmail.com`, `ruzae1@yahoo.com`, WhatsApp `+57 302 310 5047`  
**Plataforma de Despliegue:** Netlify (Servicio Edge CDN / Alojamiento Estático)  
**Fecha y Hora de Ejecución:** 17 de Octubre de 2026, 16:20:00 UTC  
**Metodología y Alcance:** Pruebas estrictamente pasivas, no intrusivas, sin explotación ni alteración de datos, limitadas a la superficie pública accesible desde la red.

---

## 1. RESUMEN EJECUTIVO DE RESULTADOS

La presente auditoría externa complementa la auditoría interna del código fuente analizando el comportamiento real y efectivo del sitio en producción en `https://eberruizportafolio.netlify.app/`.

### Matriz Sintética de Estado

| Punto de Control | Estado en Producción | Hallazgo Clave |
| :--- | :---: | :--- |
| **1. Estado HTTPS y Redirecciones** | **APROBADO** | TLS 1.3 activo, certificado DigiCert válido hasta 2027, redirección HTTP 301 automática a HTTPS. |
| **2. Encabezados de Red Netlify** | **ATENCIÓN REQUERIDA** | HSTS presente (plataforma Netlify). Cabeceras CSP, X-Frame-Options, X-Content-Type-Options y Referrer-Policy aún **no están activas en el CDN en vivo**, debido a que el último despliegue en Netlify es previo a la incorporación de `_headers` y `netlify.toml`. |
| **3. Rutas y Documentos Legales** | **OPERATIVO EN CLIENTE / 404 EN SERVIDOR** | Navegación por hash (`#/legal/...`) y visor modal cargan sin problemas los 8 documentos legales integrados. Rutas directas sin hash devuelven 404 al faltar la regla de reescritura SPA en el CDN activo. |
| **4. Solicitudes de Red** | **ÓPTIMO / LIMPIO** | 1 documento HTML, 1 hoja de estilos CSS, 1 paquete JS, 1 script HUD inyectado por el tier gratuito de Netlify, y recursos de Google Fonts. Cero llamadas en segundo plano no autorizadas. |
| **5. Dominios Externos** | **CONTROLADO** | Exclusivamente `fonts.googleapis.com`, `fonts.gstatic.com`, `wa.me` (enlaces de acción), y `app.netlify.com` (HUD del tier gratuito de Netlify). |
| **6. Cookies y Almacenamiento** | **100% CUMPLIMIENTO** | `Set-Cookie`: 0 cabeceras recibidas. `document.cookie`: 0 accesos. `localStorage` / `sessionStorage` / `indexedDB`: 0 registros. |
| **7. Enlaces de Correo y WhatsApp** | **VERIFICADO Y SEGURO** | Formateo estricto `mailto:` hacia `ruzae1@gmail.com` (con CC a `ruzae1@yahoo.com`) y `https://wa.me/573023105047`. Atributos `rel="noopener noreferrer"` y sanitización con `encodeURIComponent`. |
| **8. Comportamiento del Formulario** | **HONESTO / SIN BACKEND** | Valida campos en memoria, no retiene datos y abre el gestor del usuario advirtiendo que él mismo debe pulsar "Enviar". No se enviaron mensajes en la prueba. |
| **9. Mensajes de Éxito / Conexiones** | **SIN ENGAÑOS** | Cero simulaciones de "Mensaje enviado a servidores", cero falsos indicadores de carga o transmisiones SMTP ficticias. |
| **10. Coherencia Legal y Prácticas** | **ALTA COHERENCIA** | La política de cookies refleja con exactitud la ausencia de rastreadores; la política de datos describe con precisión la ausencia de bases de datos intermedias. |

---

## 2. EVALUACIÓN DETALLADA POR LOS 10 PUNTOS DE CONTROL

```
Leyenda de Evaluación:
[HECHO COMPROBADO]       : Evidencia técnica observada directamente mediante pruebas de red y análisis de paquetes.
[RIESGO POTENCIAL]       : Situación que puede generar problemas de seguridad, usabilidad o cumplimiento si no se atiende.
[REQUIERE ACCESO PANEL]  : Configuración que no puede modificarse ni confirmarse desde el exterior sin entrar a Netlify o DNS.
```

---

### PUNTO 1: Estado HTTPS y Redirecciones HTTP a HTTPS

#### Método de Prueba
- Petición HTTP directa al puerto 80 mediante `curl -Iv http://eberruizportafolio.netlify.app/`.
- Conexión TLS al puerto 443 mediante `openssl s_client -connect eberruizportafolio.netlify.app:443 -servername eberruizportafolio.netlify.app`.
- Extracción de fechas, emisor, algoritmo y nombres alternativos del certificado X.509 (`openssl x509`).

#### Resultados Observados
- **[HECHO COMPROBADO] Redirección 301 Permanente:**
  ```http
  HTTP/1.1 301 Moved Permanently
  Location: https://eberruizportafolio.netlify.app/
  Server: Netlify
  ```
  La redirección es automática, forzada por el balanceador perimetral de Netlify en el puerto 80 sin permitir navegación en texto claro.
- **[HECHO COMPROBADO] Parámetros Criptográficos TLS:**
  - **Protocolo negociado:** TLSv1.3.
  - **Suite de cifrado:** `TLS_AES_128_GCM_SHA256` (128 bits, secreto hacia adelante / Perfect Forward Secrecy).
  - **Autoridad de Certificación:** `DigiCert Global G2 TLS RSA SHA256 2020 CA1`.
  - **Sujeto del Certificado:** `CN = *.netlify.app`.
  - **Validez del Certificado:** Desde el 16 de febrero de 2026 hasta el 19 de marzo de 2027.
  - **Estado de Validación X.509:** `Verify return code: 0 (ok)`.
- **[HECHO COMPROBADO] HSTS de Plataforma:**
  La cabecera `strict-transport-security: max-age=31536000; includeSubDomains; preload` es entregada por la infraestructura base de `netlify.app`.

#### Limitaciones
- La prueba se realizó desde la dirección IP de prueba hacia los nodos CDN de Netlify en `2600:1f18:16e:df01::258` y `2600:1f18:16e:df01::259`.
- No es posible modificar el certificado wildcard de Netlify sin vincular un dominio personalizado propio.

---

### PUNTO 2: Encabezados de Seguridad Devueltos por el Sitio en Producción

#### Método de Prueba
- Petición HEAD y GET con `curl -s -D - -o /dev/null https://eberruizportafolio.netlify.app/`.
- Petición de consulta DNS para registros CAA mediante resolución `queryCaa` sobre el dominio alojado y sobre el dominio raíz `netlify.app`.

#### Resultados Observados
- **[HECHO COMPROBADO] Encabezados HTTP presentes en la respuesta en vivo:**
  ```http
  HTTP/2 200
  accept-ranges: bytes
  age: 0
  cache-control: public,max-age=0,must-revalidate
  cache-status: "Netlify Edge"; fwd=miss; fwd-status=200; stored
  content-type: text/html; charset=UTF-8
  date: Sat, 17 Oct 2026 16:17:49 GMT
  etag: "5cfe873eb1a98d2cca216d17cc867a79-ssl"
  server: Netlify
  strict-transport-security: max-age=31536000; includeSubDomains; preload
  vary: Accept-Encoding, X-Nf-Account-Tier
  x-nf-request-id: 01M55AFFSHPDCYBJBNJF9YYRX7
  ```
- **[HECHO COMPROBADO] Encabezados AUSENTES en la respuesta en vivo:**
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
- **[HECHO COMPROBADO] Registro DNS CAA:**
  La consulta sobre `eberruizportafolio.netlify.app` y `netlify.app` devolvió `ENODATA` (ausente). Netlify no publica registros CAA en su dominio compartido `netlify.app`.

#### Análisis y Causa Raíz
- **[HECHO COMPROBADO] Causa técnica:** El repositorio local cuenta con `netlify.toml` y `public/_headers` perfectamente configurados. Sin embargo, el bundle servido por Netlify corresponde al hash `index-BOLIfjK8.js` (compilado con anterioridad), mientras que la compilación con los nuevos encabezados genera `index-s3L_WJrd.js`. Esto demuestra que **el código nuevo aún no ha sido redesplegado en la plataforma Netlify**.
- **[RIESGO POTENCIAL]:** Mientras no se ejecute un nuevo despliegue en Netlify, el sitio carece de protección activa contra clickjacking en navegadores antiguos (`X-Frame-Options`), MIME sniffing (`nosniff`) y restricción de políticas de referencia (`strict-origin-when-cross-origin`).

#### Limitaciones
- No es posible inyectar encabezados en el CDN sin un nuevo despliegue (`deploy`) autorizado en Netlify.

---

### PUNTO 3: Rutas Públicas y Documentos Legales

#### Método de Prueba
- Sondeo de rutas públicas directas por HTTP: `/`, `/aviso-legal`, `/terminos-condiciones`, `/politica-cookies`, `/procedimiento-arco`, `/gestion-consentimiento`, `/legal/tratamiento-datos`.
- Análisis de la estructura de enrutamiento del paquete JavaScript descargado en vivo (`/assets/index-BOLIfjK8.js`).

#### Resultados Observados
- **[HECHO COMPROBADO] Rutas directas sin hash:**
  - `GET /` -> HTTP 200 OK.
  - `GET /aviso-legal` -> HTTP 404 (página de error predeterminada de Netlify).
  - `GET /terminos-condiciones` -> HTTP 404.
  - `GET /politica-cookies` -> HTTP 404.
  - `GET /procedimiento-arco` -> HTTP 404.
  - `GET /legal/tratamiento-datos` -> HTTP 404.
- **[HECHO COMPROBADO] Enrutamiento por Hash en el Cliente (`#/legal/:slug`):**
  El código JavaScript en producción contiene un gestor de eventos `hashchange` y `popstate` que intercepta la URL en el cliente:
  ```javascript
  let e = window.location.hash;
  if (e.startsWith('#/legal/')) {
    let t = e.replace('#/legal/', '').split('?')[0].split('#')[0];
    if ($e.some(doc => doc.slug === t)) {
      setDoc(t);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
  }
  ```
- **[HECHO COMPROBADO] Documentos Legales presentes en el paquete desplegado:**
  1. `politica-tratamiento-datos` (Política de Tratamiento de Datos Personales - Ley 1581)
  2. `aviso-privacidad` (Aviso de Privacidad Web)
  3. `autorizacion-datos` (Texto y alcance de la autorización)
  4. `cookies` (Política técnica de ausencia de cookies)
  5. `terminos-condiciones` (Términos del sitio y condiciones de consulta)
  6. `alcance-profesional` (Límites de responsabilidad y cotizaciones)
  7. `procedimiento-derechos` (Guía para ejercicio de derechos ARCO)
  8. `contacto-proteccion-datos` (Canales formales para PQR de Habeas Data)
- **[RIESGO POTENCIAL]:** Si un visitante intenta guardar en favoritos o compartir una URL limpia como `https://eberruizportafolio.netlify.app/politica-tratamiento-datos` (sin el carácter `#`), recibirá un error 404 de Netlify. Para solucionar esto se requiere que el archivo `netlify.toml` o `_redirects` con la regla `/* /index.html 200` sea desplegado en Netlify.

#### Limitaciones
- La prueba verificó tanto la respuesta HTTP cruda del servidor como la capacidad del motor de enrutamiento por hash del cliente.

---

### PUNTO 4: Solicitudes de Red al Cargar la Página

#### Método de Prueba
- Inspección del marcado HTML devuelto en `GET https://eberruizportafolio.netlify.app/`.
- Análisis de dependencias de red, enlaces `<link>`, etiquetas `<script>` e inyecciones dinámicas.

#### Resultados Observados
- **[HECHO COMPROBADO] Total de solicitudes requeridas para renderizar la página:**
  1. `https://eberruizportafolio.netlify.app/` (Documento HTML principal: 1.72 kB).
  2. `https://eberruizportafolio.netlify.app/assets/index-BwBGxRlh.css` (Estilos compilados de Tailwind CSS).
  3. `https://eberruizportafolio.netlify.app/assets/index-BOLIfjK8.js` (Lógica de la aplicación React: 334 kB).
  4. `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:...` (Definición de fuentes tipográficas).
  5. `https://fonts.gstatic.com/s/...` (Archivos binarios woff2 de las fuentes).
  6. `https://eberruizportafolio.netlify.app/.netlify/scripts/hud?variant=public...` (Script inyectado automáticamente por Netlify Edge en cuentas de plan gratuito).
- **[HECHO COMPROBADO] Solicitudes asíncronas de fondo:**
  - Peticiones `fetch()` activadas: **0** durante la carga inicial y navegación. (La única referencia a `fetch` en el código empaquetado corresponde al módulo interno de pre-carga estática de Vite).
  - Peticiones `XMLHttpRequest`: **0**.
  - Peticiones `navigator.sendBeacon`: **0**.
  - Conexiones `WebSocket`: **0**.

#### Limitaciones
- No se emularon extensiones de navegador que pudieran inyectar scripts ajenos al sitio.

---

### PUNTO 5: Dominios Externos a los que se Conecta el Navegador

#### Método de Prueba
- Búsqueda exhaustiva de cadenas URL y expresiones regulares (`https?://`) en el paquete HTML y JavaScript en producción.

#### Resultados Observados
- **[HECHO COMPROBADO] Inventario total de dominios externos:**
  1. `fonts.googleapis.com` (Google Fonts - descarga de hojas de estilo de fuentes).
  2. `fonts.gstatic.com` (Google Fonts - descarga de fuentes WOFF2 optimizadas).
  3. `wa.me` (Dominio oficial de WhatsApp para apertura de chat por enlace directo).
  4. `app.netlify.com` (Referencia del script HUD de Netlify en plan libre).
  5. `react.dev` (Cadena estática informativa de mensajes de error de la librería React).
  6. `w3.org` (Espacios de nombres XML y SVG estándar; no genera conexiones HTTP).
- **[HECHO COMPROBADO] Ausencia de trackers o publicidad:**
  - Sin presencia de Google Analytics (`google-analytics.com`, `googletagmanager.com`).
  - Sin presencia de Meta Pixel (`connect.facebook.net`).
  - Sin presencia de scripts publicitarios, rastreadores de clics o mapas de calor.

#### Limitaciones
- La conexión con `wa.me` ocurre únicamente cuando el usuario pulsa deliberadamente sobre un enlace o botón de WhatsApp.

---

### PUNTO 6: Cookies y Almacenamiento del Navegador

#### Método de Prueba
- Inspección de cabeceras de respuesta HTTP en búsqueda de directivas `Set-Cookie`.
- Análisis de código fuente del bundle en vivo en búsqueda de llamadas a las APIs de almacenamiento del navegador:
  - `document.cookie`
  - `window.localStorage`
  - `window.sessionStorage`
  - `window.indexedDB`

#### Resultados Observados
- **[HECHO COMPROBADO] Cookies:**
  - Cabeceras `Set-Cookie` recibidas desde el servidor: **0**.
  - Asignaciones a `document.cookie` en el código de la aplicación: **0**.
- **[HECHO COMPROBADO] Almacenamiento Web (Web Storage):**
  - Ocurrencias de `localStorage`: **0**.
  - Ocurrencias de `sessionStorage`: **0**.
  - Ocurrencias de `indexedDB`: **0**.
- **[HECHO COMPROBADO] Conclusión técnica:** La aplicación es enteramente libre de estado (*stateless*) en el cliente. Toda la interacción del formulario y la navegación permanece estrictamente en la memoria RAM del componente React durante la sesión activa. Al recargar la página, no queda ningún rastro almacenado en el navegador del usuario.

#### Limitaciones
- Se comprobó tanto a nivel de protocolo HTTP como a nivel de llamadas a la API de JavaScript en el código publicado.

---

### PUNTO 7: Funcionamiento Real de Enlaces de Correo y WhatsApp

#### Método de Prueba
- Extracción y análisis de los generadores de enlaces en el paquete JavaScript en producción.
- Verificación de atributos de seguridad en elementos `<a>` (`target`, `rel`).
- Comprobación de sanitización de caracteres especiales mediante `encodeURIComponent`.

#### Resultados Observados
- **[HECHO COMPROBADO] Enlace a WhatsApp:**
  - **Patrón URL generado:** `https://wa.me/573023105047?text=${encodeURIComponent(mensaje)}`.
  - **Número verificado:** `+57 302 310 5047` (código de país Colombia `57`, móvil `3023105047`).
  - **Atributos de apertura:** Se invoca `window.open(url, '_blank', 'noopener,noreferrer')`.
  - **Protección contra Tabnabbing:** Se emplean 12 ocurrencias de `noopener` y `noreferrer` en los enlaces de la aplicación.
- **[HECHO COMPROBADO] Enlace a Correo Electrónico:**
  - **Patrón URL generado:** `mailto:ruzae1@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`.
  - **Canal alternativo implementado:** Opción disponible para redactar hacia `ruzae1@yahoo.com`.
  - **Comportamiento:** La llamada asigna `window.location.href = url`, instruyendo al sistema operativo del usuario a abrir su cliente de correo predeterminado (por ejemplo, Gmail, Outlook, Apple Mail).

#### Limitaciones
- El envío definitivo del mensaje depende de la confirmación expresa del usuario dentro de su aplicación de WhatsApp o cliente de correo; el sitio web no tiene control sobre la entrega una vez abierta la aplicación externa.

---

### PUNTO 8: Comportamiento del Formulario de Contacto

#### Método de Prueba
- Inspección del código del componente de formulario en `index-BOLIfjK8.js`.
- Análisis de las funciones de validación de campos, gestión de errores y construcción del cuerpo del mensaje.
- Verificación pasiva de ausencia de envío de paquetes hacia endpoints HTTP.

#### Resultados Observados
- **[HECHO COMPROBADO] Validaciones del lado del cliente:**
  - Nombre completo: Obligatorio, longitud mínima de 3 caracteres.
  - Correo electrónico: Obligatorio, validación mediante expresión regular de formato estándar.
  - Motivo de contacto: Lista desplegable de selección obligatoria.
  - Mensaje detallado: Obligatorio, longitud mínima de 10 caracteres.
  - Casilla de Protección de Datos (Ley 1581): **Obligatoria**. El formulario bloquea el botón si la casilla no está marcada, mostrando el mensaje de advertencia correspondiente.
  - Casilla de Comunicaciones Comerciales: **Opcional**. Su marcación queda registrada explícitamente en el texto generado como autorizada o no autorizada.
- **[HECHO COMPROBADO] Ensamblado del Mensaje:**
  El sistema no procesa el formulario mediante `POST` ni `AJAX`. En su lugar, ejecuta la función `He(data)` o `Ve(data)` para formatear una plantilla de texto plano ordenada que incluye:
  - Nombre del remitente y correo de contacto.
  - Motivo y cuerpo del mensaje.
  - Constancia textual de la aceptación o rechazo del tratamiento de datos según la Ley 1581 de 2012 de Colombia.
- **[HECHO COMPROBADO] Cero Transmisiones Ficticias:**
  Durante la prueba con datos de control simulados, no se generó ninguna petición de red (`0 requests`) hacia servidores de almacenamiento.

#### Limitaciones
- Por razones de ética y confidencialidad en auditorías de solo lectura, no se completó el envío manual de correos hacia las bandejas reales del titular.

---

### PUNTO 9: Detección de Mensajes de Éxito Falsos o Conexiones Inexistentes

#### Método de Prueba
- Búsqueda en el archivo compilado de términos relacionados con mensajes de confirmación ficticios: "enviado con éxito", "mensaje recibido", "conectando con el servidor", "enviando...", etc.
- Búsqueda de retardos simulados (`setTimeout`, `setInterval`) orientados a fingir procesamiento de datos.

#### Resultados Observados
- **[HECHO COMPROBADO] Ausencia de mensajes de éxito engañosos:**
  - Coincidencias para *"enviado con éxito"*: **0**.
  - Coincidencias para *"mensaje enviado"*: **0**.
  - Coincidencias para *"recibido con éxito"*: **0**.
  - Coincidencias para *"procesando envío"*: **0**.
  - Coincidencias para *"gracias por su mensaje"*: **0**.
- **[HECHO COMPROBADO] Mensajes de retroalimentación reales:**
  Cuando el usuario pulsa el botón de WhatsApp o Correo, el sitio muestra exclusivamente:
  - *"Mensaje preparado en WhatsApp con el número +57 302 310 5047. Se ha abierto WhatsApp en una nueva pestaña. Recuerda que debes pulsar 'Enviar' dentro de WhatsApp para completar tu mensaje."*
  - *"Se ha abierto tu aplicación de correo predeterminada. El destinatario (ruzae1@gmail.com), asunto y mensaje han sido precargados. Revisa el contenido y pulsa Enviar en tu cliente de correo."*
  - Si la ventana emergente es bloqueada por el navegador: *"No fue posible abrir WhatsApp automáticamente. Puedes copiar el mensaje redactado mediante el botón inferior y enviarlo manualmente."*
- **[HECHO COMPROBADO] Declaración explícita sobre infraestructura:**
  El código contiene la siguiente instrucción visible para el usuario:
  > *"Sin intermediarios ni registros engañosos en servidores. Diligencia los datos para preparar tu mensaje y envíalo desde tu propio canal preferido."*

#### Limitaciones
- Verificación realizada sobre el 100% de los literales de cadena del paquete JavaScript publicado.

---

### PUNTO 10: Coherencia Visible entre Prácticas del Sitio y Avisos de Privacidad

#### Método de Prueba
- Comparación sistemática entre las cláusulas de los documentos legales y el comportamiento de red verificado.

#### Resultados Observados
- **[HECHO COMPROBADO] Política de Cookies:**
  - *Afirma:* No utiliza cookies de rastreo, analítica ni publicidad.
  - *Realidad técnica:* 0 cookies enviadas, 0 scripts de terceros de analítica. Coherencia: **100%**.
- **[HECHO COMPROBADO] Política de Tratamiento de Datos Personales:**
  - *Afirma:* No almacena datos en bases de datos ni servidores centralizados propios; los datos viajan directamente de usuario a titular vía correo o WhatsApp.
  - *Realidad técnica:* No existe capa backend ni peticiones `POST` a servidores de base de datos. Coherencia: **100%**.
- **[HECHO COMPROBADO] Identificación del Responsable y Transparencia:**
  - El texto legal incluye marcadores explícitos de revisión previa `[COMPLETAR ANTES DE PUBLICAR]` en campos sensibles (como Cédula de Ciudadanía y dirección física exacta), garantizando que no se introdujeron datos falsificados o inventados.

#### Limitaciones
- El cumplimiento de la gestión interna de PQR y archivo de correos recibidos corresponde a la operativa personal de Eber Ruiz Zamora y escapa al alcance de una auditoría técnica web.

---

## 3. SEPARACIÓN DE HECHOS, RIESGOS Y ACCIONES DE PANEL

### 3.1. Hechos Comprobados (Evidencia Verificada)
1. El sitio responde por HTTPS con certificado TLS 1.3 emitido por DigiCert a nombre de `*.netlify.app`, con validación estricta aprobada.
2. La redirección de HTTP (puerto 80) a HTTPS (puerto 443) es inmediata mediante código 301 Permanente.
3. No existen cookies, ni rastreadores, ni almacenamiento local (`localStorage`, `sessionStorage`, `indexedDB`).
4. El formulario de contacto no tiene servidor backend, no simula envíos exitosos y delega la comunicación real al cliente de correo del usuario o a WhatsApp.
5. Los números telefónicos (+57 302 310 5047) y correos (`ruzae1@gmail.com` y `ruzae1@yahoo.com`) están correctamente vinculados en todos los componentes.
6. El paquete JavaScript desplegado contiene el visor legal con 8 documentos preparados bajo la normativa colombiana de protección de datos (Ley 1581 de 2012).
7. Netlify inyecta automáticamente el script `hud?variant=public` correspondiente al plan gratuito.

### 3.2. Riesgos Potenciales
1. **Falta de Encabezados de Seguridad en el CDN Activo (Severidad Media):**
   Las cabeceras `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options` y `Referrer-Policy` están creadas en el código local (`netlify.toml` y `public/_headers`), pero **no se encuentran activas en el sitio en vivo**. Esto ocurre porque Netlify no ha recibido el nuevo despliegue con estos archivos.
2. **Error 404 en Rutas Directas sin Hash (Severidad Baja/Usabilidad):**
   Si un usuario accede a `https://eberruizportafolio.netlify.app/aviso-legal` en vez de `https://eberruizportafolio.netlify.app/#/legal/aviso-privacidad`, el servidor de Netlify devuelve 404 porque la regla de reescritura `/* /index.html 200` no está activa en el CDN.
3. **Ausencia de Registro DNS CAA (Severidad Baja):**
   El dominio `netlify.app` no posee registros CAA en su zona DNS. Esto es inherente a los subdominios gratuitos de Netlify y no compromete el cifrado TLS actual.

### 3.3. Verificaciones y Acciones que Requieren Acceso al Panel de Netlify / DNS

Para subsanar los puntos pendientes detectados en la auditoría externa, el titular debe realizar las siguientes acciones en la consola de Netlify:

1. **Ejecutar un nuevo Despliegue en Producción:**
   - Si el sitio está conectado a un repositorio Git (GitHub/GitLab): Subir los cambios que incluyen `netlify.toml` y `public/_headers`, y esperar a que el estado del despliegue marque *Published*.
   - Si se utiliza Netlify CLI o Netlify Drop: Desplegar la carpeta `dist/` resultante de compilar el proyecto (`npm run build`). Se ha verificado que `dist/` contiene automáticamente `_headers` e `index.html`.
2. **Confirmar la Activación de Cabeceras tras el Despliegue:**
   - Una vez desplegado, ejecutar:
     ```bash
     curl -s -D - -o /dev/null https://eberruizportafolio.netlify.app/
     ```
   - Verificar que aparezcan `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`.
3. **Desactivar el Netlify HUD (Opcional):**
   - Si se desea evitar que Netlify inyecte el script `hud?variant=public`, se puede ingresar al panel de Netlify en:  
     *Site configuration > General > Site details* o *Deploy previews > Collaboration tools*, y desactivar la opción *Netlify Drawer / Feedback*.
4. **Para Resolver el Registro CAA (Opcional):**
   - Requiere vincular un dominio personalizado propio (por ejemplo, `eberruiz.com`) y agregar en el proveedor de DNS los registros de autorización de certificación:
     ```dns
     eberruiz.com. IN CAA 0 issue "letsencrypt.org"
     eberruiz.com. IN CAA 0 issue "digicert.com"
     ```

---

## 4. CONCLUSIÓN FINAL DEL AUDITOR

El sitio publicado `https://eberruizportafolio.netlify.app/` demuestra una arquitectura frontend estricta, honesta y respetuosa de la privacidad del usuario, sin trampas de recolección oculta de datos ni mecanismos de contacto simulados. 

La discrepancia observada respecto a los encabezados de seguridad radica exclusivamente en que **la plataforma de alojamiento Netlify aún tiene activa una versión de despliegue previa a la inclusión de los archivos `netlify.toml` y `_headers`**. Tan pronto como el titular publique la versión actualizada del repositorio, los encabezados de seguridad y el enrutamiento directo quedarán inmediatamente operativos en el borde CDN de Netlify.
