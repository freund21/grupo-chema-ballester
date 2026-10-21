# Grupo Chema Ballester · Propuesta de rediseño web

**Ver la propuesta:** https://freund21.github.io/grupo-chema-ballester/

Propuesta de mejora de las webs de las tres empresas del **Grupo Chema Ballester**, un grupo familiar del sector logístico con sede en el entorno del Puerto de Valencia.

Las tres son **empresas independientes**, cada una con su propia actividad, marca y web, pero pertenecen a la misma familia. El objetivo del proyecto es modernizarlas y darles una imagen común que transmita que forman parte del mismo grupo, sin que ninguna pierda su identidad.

> Es un prototipo de diseño, no la web oficial de las empresas. Los contenidos (textos, servicios, sedes, productos) están tomados de sus webs actuales.

## Las tres empresas

| Empresa | Actividad | Color | Web actual |
|---|---|---|---|
| **Logística Chema Ballester** | Transporte terrestre de contenedores marítimos desde el Puerto de Valencia | Rojo | chemaballester.com |
| **VCD Logística** | Aduanas, distribución, almacén y mudanzas | Azul | vcdlogistica.com |
| **RIBU Containers** | Venta y alquiler de contenedores marítimos nuevos y usados | Naranja | ribucontainers.com |

La **portada del grupo** reúne las tres. Al pulsar cualquiera de los paneles se abre la web de esa empresa.

## Qué mejora la propuesta

**Una imagen común para las tres empresas**
- Misma tipografía, botones, tarjetas, formularios y footer en las tres webs.
- Cada empresa mantiene sus colores corporativos y su logotipo original.
- Desde cualquier web se puede pasar a las otras empresas del grupo.

**Cabecera y menú**
- Navbar más compacto e integrado con la fotografía principal, que pasa a fondo sólido al desplazarse.
- Menús simplificados: los servicios agrupados en un desplegable y el resto de opciones secundarias en el footer.
- Acceso al Área de clientes siempre visible, también en el móvil.
- Logotipos siempre completos y sin deformar.

**Contenidos mejor organizados**
- Páginas de servicio con una explicación, los servicios en tarjetas compactas y un único bloque de contacto.
- Tienda de RIBU Containers con filtro por nuevos y usados, y fichas de producto con tabla de medidas, disponibilidad y formulario de reserva.
- Buscador de distancias kilométricas desde el Puerto de Valencia (más de 3.000 poblaciones), sin plugins.
- Formulario de presupuesto de transporte en tres pasos.
- Oficinas en tarjetas compactas con «Cómo llegar» y «Abrir en Maps», sin mapas que alarguen la página.

**Footer común**
- Contacto, empresas del grupo, redes sociales y WhatsApp.
- Enlaces legales separados (aviso legal, privacidad, protección de datos, cookies), configuración de cookies y canal ético.
- Año del copyright siempre actualizado.

**Calidad**
- Diseño adaptado a móvil, tablet y ordenador (comprobado de 320 a 1920 px de ancho).
- Accesible con teclado y lectores de pantalla.
- Sin dependencias: HTML, CSS y JavaScript propios, y fuentes de Google Fonts.

## Estructura

```
index.html                  Portada del grupo
chema-ballester/            Logística Chema Ballester (inicio, distancias, subvenciones, legales)
vcd-logistica/              VCD Logística (inicio, servicios, calcula tu precio, subvenciones, legales)
ribu-containers/            RIBU Containers (inicio, tienda, categorías, fichas de producto)
assets/                     Estilos, scripts, logotipos, fotografías y datos
```

## Estado

Prototipo para presentar la propuesta. Para llevarlo a producción, el diseño se aplicaría sobre las webs actuales (WordPress) manteniendo sus formularios, la tienda y la gestión de cookies.

Algunas fotografías son provisionales y se sustituirán por imágenes reales de las instalaciones y la flota.
