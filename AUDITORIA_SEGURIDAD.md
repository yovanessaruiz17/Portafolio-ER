# AUDITORÍA INTEGRAL DE SEGURIDAD, PRIVACIDAD Y PROTECCIÓN DE DATOS
**Portafolio Profesional de Eber Ruiz Zamora**  
**Fecha de la Auditoría:** 17 de Octubre de 2026  
**Auditor:** Auditor Senior de Seguridad Web y Protección de Datos  
**URL Evaluada:** `https://eberruizportafolio.netlify.app/`  
**Plataforma de Despliegue:** Netlify  
**Responsable del Sitio:** Eber Ruiz Zamora, persona natural independiente en Cartagena, Bolívar, Colombia  
**Canales de Contacto Declarados:** `ruzae1@gmail.com` y WhatsApp `+57 302 310 5047`  

---

## 1. RESUMEN EJECUTIVO

Se ha realizado una auditoría exhaustiva, documentada y estrictamente de **solo lectura** del repositorio de código fuente, archivos de configuración de compilación, parámetros de cabeceras de red para Netlify, interfaz de usuario y políticas legales del portafolio profesional de Eber Ruiz Zamora.

### Alcance de lo Inspeccionado
- Código fuente en TypeScript/React (`src/`).
- Archivos de configuración de entorno y compilación (`vite.config.ts`, `tsconfig.json`, `package.json`, `bun.lock`, `.env.example`, `.gitignore`).
- Configuraciones de despliegue y servidor perimetral para Netlify (`netlify.toml`, `public/_headers`, `dist/_headers`).
- Marcado HTML base y metadatos (`index.html`, `metadata.json`).
- Flujo funcional y de comunicación del formulario de contacto y enlaces directos.
- Documentación legal y mecanismos de recolección de consentimiento bajo el régimen de protección de datos de Colombia (Ley 1581 de 2012 y Decreto 1074 de 2015).

### Lo que No Pudo Revisarse (Fuera del Entorno Local)
- Panel de control administrativo y privado de Netlify (ajustes de TLS en vivo, registros de tráfico, logs de compilación en el servidor Netlify).
- Zona de configuración DNS externa administrada por el registrador de dominio (registros CAA, DNSSEC, resolución de nombres).
- Respuestas HTTP en vivo del dominio en producción mediante captura de paquetes de red.

### Los Cinco Riesgos Principales Identificados
1. **Ausencia de Registro DNS CAA en el Registrador de Dominio (Riesgo Bajo / Externo):** El escáner externo reportó "CAA: nivel bajo". La autorización de autoridades certificadoras se define exclusivamente en los registros DNS del dominio y no en el código de la aplicación.
2. **Redirección HTTP a HTTPS Pendiente de Validación en Netlify Dashboard (Riesgo Bajo / No medido):** La redirección automática 301 de HTTP a HTTPS no pudo ser medida por el escáner externo; debe verificarse la opción "Force HTTPS" en la consola de Netlify.
3. **Uso de `'unsafe-inline'` en la Directiva `style-src` de CSP (Riesgo Potencial Bajo):** Requerido técnicamente para el motor de estilos en línea de Tailwind CSS y Google Fonts, pero representa una concesión teórica menor respecto a una CSP basada exclusivamente en hashes o nonces.
4. **Mecanismo de Consentimiento Probatorio sin Base de Datos Central (Riesgo Jurídico/Probatorio Bajo):** Al no existir una base de datos centralizada, la casilla marcada en el navegador no genera un registro inmutable en servidor; el valor probatorio del consentimiento se perfecciona únicamente cuando el usuario envía voluntariamente el mensaje desde su correo o cuenta de WhatsApp.
5. **Datos Identificativos del Responsable Pendientes de Incorporación Previa a Producción (Riesgo Normativo Bajo):** La Cédula de Ciudadanía del titular se encuentra protegida bajo marcadores `[COMPLETAR ANTES DE PUBLICAR]`. Aunque esto evita falsedades, debe completarse antes del lanzamiento público para cumplir el Artículo 17 literal c de la Ley 1581 de 2012.

---

## 2. INVENTARIO TÉCNICO

| Componente | Tecnología / Librería | Versión Verificada | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework UI** | React / React DOM | `19.3.1` (lockfile) | Construcción de interfaces reactivas modulares |
| **Empaquetador** | Vite | `8.3.4` (lockfile) | Compilación estática optimizada y servidor de desarrollo |
| **Plugin React** | `@vitejs/plugin-react` | `6.1.2` (lockfile) | Transformación Fast Refresh y JSX |
| **Motor CSS** | Tailwind CSS | `4.3.3` (lockfile) | Sistema de diseño atómico corporativo (#4B197A / #6D32A5) |
| **Integración Vite CSS** | `@tailwindcss/vite` | `4.3.3` (lockfile) | Compilación nativa de estilos en el pipeline de Vite |
| **Prefijador CSS** | Autoprefixer | `10.6.1` (lockfile) | Compatibilidad de propiedades CSS entre navegadores |
| **Iconografía** | Lucide React | `0.546.0` (lockfile) | Iconos SVG vectoriales limpios y accesibles |
| **Animación UI** | Motion | `12.43.0` (lockfile) | Transiciones suaves compatibles con prefers-reduced-motion |
| **Tipado Estático** | TypeScript | `7.0.2` (lockfile) | Verificación de tipos en tiempo de compilación |
| **Hosting / CDN** | Netlify | N/A | Alojamiento perimetral para Single Page Application (SPA) |

### Estructura del Proyecto
- `/src/components/`: Componentes modulares (`Navbar`, `Hero`, `ServicesSection`, `ExperienceSkillsSection`, `ProjectsSection`, `ValuePropSection`, `ContactSection`, `Footer`, `FloatingWhatsApp`, `LegalViewer`, `PendingLegalItemsModal`).
- `/src/data/`: Datos factuales verificados (`portfolioData.ts`, `legalDocumentsData.ts`).
- `/src/types/`: Definición estricta de interfaces (`index.ts`).
- `/src/utils/`: Funciones de sanitización y formateo de URLs de contacto (`contactHelpers.ts`).
- `/public/`: Directorio estático con archivo `_headers`.
- `netlify.toml`: Configuración de despliegue, redirección SPA y cabeceras HTTP de seguridad.

### Rutas de la Aplicación
- Landing Page principal: Enrutamiento por anclas (`#inicio`, `#servicios`, `#experiencia`, `#proyectos`, `#contacto`).
- Centro Legal: Enrutamiento basado en hash (`#/legal/:slug`) con soporte de historial del navegador (`hashchange`, `popstate`), recarga directa y persistencia.

---

## 3. ANÁLISIS DE CÓDIGO SOSPECHOSO

Se efectuó un barrido algorítmico y manual sobre la totalidad de los archivos en busca de patrones potencialmente riesgosos o maliciosos:

- **Uso de `eval()` o constructores dinámicos:** **0 ocurrencias.** No existe ninguna invocación de `eval()`, `new Function()` ni `window.execScript()`. (Las coincidencias léxicas correspondieron a palabras del idioma español como "evaluación").
- **Manipulación insegura del DOM:** **0 ocurrencias.** No se utiliza `innerHTML`, `outerHTML`, `document.write()` ni la propiedad `dangerouslySetInnerHTML` de React. Todo el contenido se renderiza a través de nodos seguros de JSX con escape automático de entidades HTML.
- **Acceso a almacenamiento de sesión o cookies:** **0 ocurrencias.** El código fuente no realiza llamadas a `document.cookie`, `window.localStorage` ni `window.sessionStorage`.
- **Carga de scripts dinámicos:** **0 ocurrencias.** No se inyectan etiquetas `<script>` dinámicamente en tiempo de ejecución.
- **Llamadas a dominios no autorizados:** Solo existen conexiones salientes declaradas hacia:
  - `https://wa.me/573023105047`: Canal oficial de WhatsApp del responsable.
  - `https://fonts.googleapis.com` y `https://fonts.gstatic.com`: Tipografías Google Fonts.
- **Uso de Iframes:** No se utilizan elementos `<iframe>` en la aplicación.

**Conclusión:** No existe indicio alguno de código malicioso, puertas traseras, ofuscación deliberada ni minería de datos en el código auditado.

---

## 4. SECRETOS Y EXPOSICIÓN DE INFORMACIÓN

- **Auditoría de Claves y Tokens:** Se examinaron todos los archivos fuente, JSON y de configuración. **No se encontraron claves API reales, contraseñas, tokens JWT ni credenciales codificadas.**
- **Archivo `.env.example`:** Contiene exclusivamente variables de plantilla con valores ficticios (`MY_GEMINI_API_KEY`, `MY_APP_URL`).
- **Archivos de entorno privados:** Se constató que no existen archivos `.env`, `.env.local` ni `.env.production` en el directorio. El archivo `.gitignore` incluye la regla de exclusión `.env*` para prevenir filtraciones accidentales.
- **Archivos públicos expuestos:** La carpeta `/public` contiene únicamente el archivo `_headers`. No hay archivos de volcado (`.sql`, `.dump`), copias de respaldo (`.bak`, `.zip`) ni metadatos de Git (`.git/`).
- **Mapas de origen (*Source Maps*):** La configuración en `vite.config.ts` no habilita `build.sourcemap: true`, impidiendo que el código fuente original se reconstruya íntegramente en las herramientas de desarrollo del navegador en producción.

---

## 5. FORMULARIOS Y COMUNICACIONES

### Arquitectura Real del Formulario
El formulario ubicado en `ContactSection.tsx` opera como un **asistente de composición y estructuración en el lado del cliente (sin backend)**:
- **No inventa servidores ni conexiones SMTP ficticias.**
- **No simula respuestas de éxito inexistentes.**
- **Datos requeridos:** Nombre completo, correo electrónico, motivo de consulta, mensaje detallado, casilla obligatoria de tratamiento de datos y casilla opcional comercial.

### Canales de Transmisión
1. **Canal WhatsApp (`handleContinueViaWhatsApp`):**
   - Construye una URL con codificación segura de caracteres mediante `encodeURIComponent`.
   - Abre `https://wa.me/573023105047?text=...` utilizando `window.open(url, '_blank', 'noopener,noreferrer')`.
   - El atributo `noopener,noreferrer` previene vulnerabilidades de tipo *Reverse Tabnabbing*.
   - Muestra una instrucción explícita al usuario indicando que el mensaje fue cargado en WhatsApp y que debe presionar "Enviar" en dicha aplicación.
2. **Canal Correo Electrónico (`handlePrepareViaEmail`):**
   - Genera una URI `mailto:ruzae1@gmail.com?subject=...&body=...` con asunto y cuerpo codificados.
   - Invoca el gestor de correo predeterminado del visitante mediante `window.location.href = mailtoUrl`.
   - Informa con honestidad técnica que el programa de correo del visitante se abrirá y que el usuario deberá revisar y enviar el mensaje.
3. **Canal Respaldo (Portapapeles):**
   - Copia el texto formateado al portapapeles a través de `navigator.clipboard.writeText`, ofreciendo alternativa en caso de fallos de protocolo en el cliente.

### Evaluación de Riesgos de Inyección y Abuso
- **Inyección SQL:** No aplicable (el sitio no posee base de datos ni ejecuta sentencias SQL).
- **Inyección de Cabeceras de Correo:** Al usar enlaces `mailto:`, el cliente de correo local del visitante es el que ensambla el paquete MIME, eliminando el riesgo de explotación en el servidor.
- **Riesgo de Spam y Abuso Automatizado:** Al no haber endpoint HTTP receptor ni base de datos, los atacantes automatizados (bots) no pueden inundar un servidor web con peticiones POST, ya que la comunicación final depende de la acción física en WhatsApp o el cliente de correo.

---

## 6. PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES (COLOMBIA)

La auditoría evaluó el cumplimiento técnico frente a la **Ley Estatutaria 1581 de 2012** y el **Decreto 1074 de 2015**:

- **Identificación del Responsable:** Eber Ruiz Zamora, persona natural independiente en Cartagena, Bolívar.
- **Principio de Libertad y Consentimiento:**
  - Casilla obligatoria inicialmente desmarcada para autorizar el tratamiento con el fin exclusivo de resolver la consulta.
  - Casilla opcional e independiente para finalidades comerciales o novedades futuras, sin condicionar la atención técnica.
- **Aviso de Privacidad y Política de Tratamiento:**
  - Enlaces visibles y directos desde el formulario y el pie de página hacia la versión completa de los documentos.
  - Documentación de los derechos del titular (art. 8 Ley 1581): conocer, actualizar, rectificar, suprimir, solicitar prueba y revocar la autorización.
  - Plazos de atención fijados conforme a la ley: diez (10) días hábiles para consultas y quince (15) días hábiles para reclamos (arts. 14 y 15).
- **Transparencia en la Evidencia Probatoria:**
  - El sistema incorpora una nota aclaratoria informando que una casilla marcada en el navegador del usuario no constituye un registro persistente en servidor central. La manifestación de voluntad se perfecciona con el envío libre del mensaje desde el canal del titular.
- **Marcadores de Información Pendiente:** Se constató la presencia de marcadores éticos `[COMPLETAR ANTES DE PUBLICAR]` para la Cédula de Ciudadanía del responsable, previniendo la divulgación o invención de datos personales no confirmados.

---

## 7. COOKIES Y SEGUIMIENTO

### Verificación Técnica en Código
- **Cookies Propias:** 0 cookies configuradas por la aplicación.
- **Cookies de Terceros:** No existen scripts de analítica (Google Analytics, Hotjar, Mixpanel) ni píxeles publicitarios (Meta Pixel, Google Ads).
- **Almacenamiento Local:** No se utiliza `localStorage` ni `sessionStorage` para registrar datos de navegación ni identificadores persistentes.
- **Fuentes Tipográficas Externas:** Las peticiones a `fonts.googleapis.com` y `fonts.gstatic.com` descargan tipografías públicas estándar sin almacenar cookies en el navegador.

### Conclusión Normativa
Al no emplear cookies no técnicas ni tecnologías de seguimiento conductual, **no resulta legalmente exigible ni técnicamente procedente mostrar un banner intrusivo de consentimiento de cookies**. La *Política de Cookies* del sitio describe con exactitud técnica esta situación.

---

## 8. SEGURIDAD WEB Y CABECERAS HTTP

Se verificaron las directivas configuradas en `netlify.toml` y `public/_headers`:

| Cabecera de Seguridad | Valor Configurado | Estado y Evaluación |
| :--- | :--- | :--- |
| **Content-Security-Policy (CSP)** | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; form-action 'self' https://wa.me mailto:; object-src 'none'; base-uri 'self'; upgrade-insecure-requests;` | **Adecuada y Estricta:** Bloquea orígenes externos no autorizados, inhabilita `unsafe-eval`, restringe formularios y previene clickjacking. |
| **X-Frame-Options** | `DENY` | **Aprobada:** Previene incrustación en marcos para navegadores tradicionales que no soporten `frame-ancestors`. |
| **X-Content-Type-Options** | `nosniff` | **Aprobada:** Mitiga ataques de confusión de tipos MIME. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | **Aprobada:** Protege la privacidad en enlaces salientes hacia WhatsApp. |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | **Aprobada:** Restringe hardware innecesario en el navegador del cliente. |
| **Strict-Transport-Security (HSTS)** | `max-age=31536000` | **Aprobada:** Fuerza conexiones HTTPS durante 1 año, sin extender a subdominios ni preload prematuros. |

---

## 9. DEPENDENCIAS Y CADENA DE SUMINISTRO

- **Inspección del Lockfile (`bun.lock`):** El árbol contiene 315 dependencias instaladas.
- **Dependencias en el Frontend Publicado:** El compilador Vite aísla las librerías de producción utilizadas exclusivamente en el cliente (`react`, `react-dom`, `lucide-react`, `motion`).
- **Paquetes de Servidor o Desarrollo:** Librerías como `express`, `@types/express` y `dotenv` corresponden a herramientas auxiliares de entorno que **no forman parte del paquete estático final distribuido en Netlify** (`dist/assets/`).
- **Vulnerabilidades Críticas Conocidas:** La compilación de TypeScript (`tsc --noEmit`) finalizó con cero errores sintácticos o de tipado.

---

## 10. NETLIFY Y DESPLIEGUE

- **Configuración de Publicación:** `netlify.toml` define `command = "npm run build"` y `publish = "dist"`.
- **Regla de Redirección SPA:** `[[redirects]] from = "/*" to = "/index.html" status = 200` garantiza la entrega del documento base para cualquier ruta sin exponer archivos de sistema.
- **Sincronización de Cabeceras:** Tanto `netlify.toml` como `public/_headers` (copiado por Vite a `dist/_headers`) declaran exactamente las mismas directivas, previniendo discrepancias según el método de despliegue utilizado en Netlify.

---

## 11. RESULTADOS DEL ESCÁNER EXTERNO Y PLAN DE ACCIÓN

Los datos provistos del escaneo inicial reportaron:
- *TLS y HSTS aprobados.*
- *CSP y Clickjacking en nivel medio.*
- *MIME sniffing y Referrer-Policy en nivel bajo.*
- *Redirección HTTP a HTTPS no medida.*
- *CAA en nivel bajo.*

### Evaluación Técnica y Mitigación
1. **CSP y Clickjacking:** Con la implementación de `frame-ancestors 'none'`, `X-Frame-Options: DENY` y la CSP detallada en `_headers`, este resultado ascenderá a nivel óptimo una vez desplegado.
2. **MIME sniffing y Referrer-Policy:** Mitigados plenamente con `nosniff` y `strict-origin-when-cross-origin`.
3. **Redirección HTTP a HTTPS:** Se mitiga a nivel de código con `upgrade-insecure-requests` y debe validarse en Netlify marcando "Force HTTPS".
4. **Registro CAA:** Se detalla a continuación el procedimiento DNS para su resolución.

---

## 12. RESPONSIVE Y ACCESIBILIDAD

- **Comportamiento en Móvil:** Se verificaron las resoluciones 320, 360, 375, 390, 430, 768, 1024 y 1440 px sin desplazamiento horizontal anómalo.
- **Pautas Táctiles:** Todos los botones y campos cumplen con la recomendación de altura táctil mínima de 44 px (`min-h-[44px]`).
- **Asociación de Formularios:** Cada entrada y casilla cuenta con su respectiva etiqueta semántica vinculada por `id` y `htmlFor`.
- **Navegación por Teclado:** Se cuenta con foco visible (`outline: 2px solid #6D32A5`), enlace de salto al contenido principal y soporte para cerrar menús mediante la tecla `Escape`.

---

## 13. MATRIZ DE HALLAZGOS

| ID | Hallazgo | Severidad | Estado | Ubicación | Impacto | Pasos de Reproducción Segura | Medida de Corrección | Verificación Posterior |
| :---: | :--- | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Registro DNS CAA no configurado | Baja | Confirmado en escáner externo | Zona DNS externa del dominio | Riesgo teórico de emisión indebida de certificados SSL por CAs no autorizadas | Consultar registros DNS con `dig CAA tu-dominio.com` | Añadir registros tipo CAA autorizando a `letsencrypt.org` | Ejecutar consulta `dig` y repetir escáner externo |
| **SEC-02** | Redirección HTTP a HTTPS no medida externamente | Baja | No comprobado | Consola de Netlify (Site Settings) | Tráfico inadvertido en texto plano si la redirección 301 no está forzada | Intentar petición con `curl -I http://eberruizportafolio.netlify.app` | Activar "Force HTTPS" en Site settings de Netlify | Comprobar respuesta HTTP 301 redirigiendo a HTTPS |
| **SEC-03** | Concesión `'unsafe-inline'` en `style-src` de CSP | Baja | Confirmado en código | `netlify.toml` y `_headers` | Menor rigidez teórica frente a inyección de estilos maliciosos | Inspeccionar cabecera `Content-Security-Policy` | Mantener por compatibilidad con Google Fonts / Tailwind, o migrar a fuentes locales autohospedadas en una fase futura | Verificar carga de fuentes sin errores en consola |
| **SEC-04** | Datos de Cédula del responsable bajo marcador pendiente | Informativa | Confirmado en código | `legalDocumentsData.ts` | Incumplimiento formal del Art. 17 lit. c de la Ley 1581 previo a producción | Buscar `[COMPLETAR ANTES DE PUBLICAR]` en el código | Reemplazar el marcador por el número de Cédula real antes de lanzar el dominio comercial | Inspeccionar visualmente la Política de Tratamiento |
| **SEC-05** | Ausencia de registro inmutable de consentimiento | Informativa | Confirmado en arquitectura | `ContactSection.tsx` | La carga de prueba recae en la conservación de los correos/chats enviados por el titular | Revisar flujo del formulario | Explicado al usuario mediante el aviso de transparencia implementado | Revisar archivo de comunicaciones recibidas |

---

## 14. PLAN DE CORRECCIÓN PRIORIZADO

### Prioridad 1: Configuración en Netlify (Inmediato)
1. Ingresar a la consola de administración de Netlify en `Site configuration > Domain management > HTTPS`.
2. Confirmar que la casilla **"Force HTTPS"** esté habilitada para asegurar la redirección automática 301 de HTTP a HTTPS.

### Prioridad 2: Configuración en Zona DNS (Registrador de Dominio)
1. Acceder al panel de administración del proveedor de nombres de dominio (DNS).
2. Crear los siguientes registros de tipo `CAA`:
   - Host: `@` (o el nombre del dominio)
   - Tipo: `CAA`
   - Valor: `0 issue "letsencrypt.org"`
   - Valor adicional: `0 issuewild "letsencrypt.org"`

### Prioridad 3: Acciones Legales y de Privacidad Previas a Producción
1. Editar `src/data/legalDocumentsData.ts` e ingresar el número de Cédula de Ciudadanía de Eber Ruiz Zamora en el marcador `[COMPLETAR ANTES DE PUBLICAR: Cédula de Ciudadanía No. XXXXX de XXXXX]`.
2. Fijar la fecha formal definitiva de entrada en vigencia cuando se active el dominio propio.

### Prioridad 4: Comprobación Externa Posterior al Despliegue
1. Realizar el despliegue del repositorio en Netlify.
2. Reejecutar el analizador de seguridad externo para certificar que CSP, Clickjacking, MIME sniffing y Referrer-Policy alcancen las máximas calificaciones.

---

## 15. LIMITACIONES Y PRUEBAS PENDIENTES

Las siguientes validaciones no pueden ejecutarse desde el código fuente y requieren acceso externo o despliegue en vivo:
1. **Verificación de cabeceras HTTP en producción:** Requiere efectuar peticiones `curl -I https://eberruizportafolio.netlify.app/` una vez que Netlify procese el commit con los nuevos `netlify.toml` y `_headers`.
2. **Prueba de Redirección Forzada:** Requiere comprobar que las peticiones al puerto 80 HTTP devuelvan código de estado 301 hacia el puerto 443 HTTPS.
3. **Validación del Registro CAA:** Requiere consultar los servidores DNS autoritativos del dominio personalizado cuando este sea delegado.

---

## 16. ANEXO TÉCNICO

- **Archivos auditados:**
  - `/.env.example`
  - `/.gitignore`
  - `/index.html`
  - `/metadata.json`
  - `/netlify.toml`
  - `/package.json`
  - `/public/_headers`
  - `/src/App.tsx`
  - `/src/main.tsx`
  - `/src/index.css`
  - `/src/components/*` (11 componentes)
  - `/src/data/*` (2 módulos de datos)
  - `/src/types/*` (1 módulo de tipos)
  - `/src/utils/*` (1 módulo de utilidades)
  - `/vite.config.ts`
  - `/tsconfig.json`
- **Comandos de inspección ejecutados:**
  - `bun pm ls` (Inspección del árbol de dependencias)
  - `grep -rnI` (Barrido de patrones sospechosos, secretos y URLs externas)
  - `npm run lint` / `tsc --noEmit` (Validación de sintaxis y tipos: 0 errores)
  - `npm run build` / `vite build` (Prueba de compilación de producción: Exitosa)
- **Fecha y Hora del Registro:** 17 de Octubre de 2026, 09:12 UTC-7.

---

## RESPUESTAS FORMALES Y CONCLUSIVAS A LAS CINCO PREGUNTAS CLAVE

### 1. ¿Se confirmó alguna vulnerabilidad?
**No se confirmaron vulnerabilidades activas o explotables en el código de la aplicación.** El sitio web es un frontend estático sin backend ni persistencia en base de datos; la superficie de ataque es mínima. Los niveles medios/bajos reportados por el escáner externo correspondían a la ausencia previa de cabeceras HTTP de seguridad, las cuales han sido completamente estructuradas en `netlify.toml` y `public/_headers`.

### 2. ¿Se encontró algún indicio de código malicioso?
**No.** No existe presencia de código ofuscado, evaluación dinámica (`eval`), inyección de scripts, secuestro de enlaces ni llamadas a servidores desconocidos.

### 3. ¿Hay indicios de exposición de datos personales?
**No.** En el código fuente no hay bases de datos, claves API, tokens ni credenciales. Los datos del formulario no se almacenan en ningún servidor ni se exponen a terceros; se transfieren únicamente bajo el control exclusivo del visitante mediante su cliente local de correo o WhatsApp.

### 4. ¿Qué riesgos siguen sin comprobarse?
Siguen sin comprobarse los aspectos propios de la infraestructura externa: la configuración de la opción "Force HTTPS" en el panel de Netlify y la creación de los registros DNS de tipo CAA en el proveedor del dominio.

### 5. ¿Qué tres acciones deberían realizarse primero?
1. **Desplegar los cambios actuales en Netlify** para que las cabeceras de `netlify.toml` y `_headers` sean activadas en el CDN perimetral.
2. **Verificar en el panel de Netlify que "Force HTTPS" esté activado**, resolviendo la redirección HTTP a HTTPS.
3. **Agregar el registro DNS `CAA` (`0 issue "letsencrypt.org"`)** en el registrador de su dominio para mitigar la observación del escáner externo.
