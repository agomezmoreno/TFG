# Base de Datos - ComparaYA

Por aquí dejo un pequeño script de tablas con algunos `INSERT` de prueba para facilitar la puesta en marcha del proyecto.

En este archivo SQL encontrarás la estructura completa y limpia de la base de datos relacional. Además, he incluido una muestra representativa de productos (Mercadona y Día) con sus precios y categorías. 

El objetivo de estos datos de prueba es que puedas levantar el proyecto rápidamente es por ello que los enlaces a los productos no funcionarán. Unicamente se podrá probar el buscador y ver como actuaría el algoritmo de IA normalizando los nombres de los productos, todo ello sin necesidad de cargar el volcado masivo original de más de 11.000 registros. Además las alertas del bot de Telegram tampoco funcionaría ya que para ello necesitarías tener instalado n8n en tu equipo local o servidor con los flujos de trabajo correspondientes.

### Cómo usarlo
Simplemente importa el archivo `.sql` en tu servidor MySQL (usando phpMyAdmin, Workbench o la terminal) y el backend estará listo para conectarse.
