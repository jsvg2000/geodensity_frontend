# Frontend - Angular 22 | Proyecto FullStack con GraphQL

Este proyecto es la interfaz de usuario construida con **Angular 22** que consume una API GraphQL desde un backend Laravel. Permite visualizar y gestionar logs que incluyen datos de usuarios y países consultados.

## 📦 Requisitos previos

Antes de instalar y ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [Angular CLI](https://angular.io/cli) versión 17 o superior (compatible con Angular 22)
- [Git](https://git-scm.com/)
- Acceso al backend Laravel con el endpoint GraphQL en funcionamiento

# Instalación

1. Clona el repositorio:
   git clone https://github.com/jsvg2000/geodensity_frontend.git
   cd geodensity_frontend
2. Instala las dependencias del proyecto:
   npm install

# Ejecución en desarrollo

ng serve

# Estructura del proyecto y Arquitectura del Proyecto

1. Este frontend se conecta a un backend Laravel con GraphQL. Asegúrate de que el backend esté en funcionamiento y accesible desde el frontend.
2. El proyecto frontend ha sido construido usando Angular 22 y está organizado siguiendo una arquitectura modular basada en características (feature-based architecture), promoviendo el principio de separación de responsabilidades y facilitando la escalabilidad, mantenibilidad y reutilización de código.

src/
├── app/
│ ├── core/ # Servicios, interceptores y configuración global
│ ├── shared/ # Componentes, directivas y pipes reutilizables
│ └── features/
│ ├── countries/ # Módulo de gestión de países
│ │ ├── pages/ # Vistas específicas
│ │ ├── services/ # Lógica de negocio y consumo de GraphQL
│ │ └── store/ # Estado manejado con NGXS
│ └── logs/ # Módulo de gestión de logs
│ ├── pages/
│ ├── services/
│ └── store/
├── assets/
└── environments/

# Decisiones Técnicas

1.  Arquitectura Modular basada en Features
    Se ha optado por separar los dominios del negocio (countries, logs) en módulos independientes bajo app/features. Cada uno contiene sus propias pages, services y store, fomentando el aislamiento y la independencia de cada funcionalidad.

2.  Consumo de API GraphQL
    Para la comunicación con el backend Laravel, se emplea Apollo Angular como cliente GraphQL, lo que permite una integración declarativa y eficiente con los datos. Las queries y mutations están centralizadas en los servicios de cada feature.

3.  Manejo de estado con NGXS
    Se utilizó NGXS como solución para manejo de estado global y local de cada feature. Algunas razones clave para su elección:

. Sintaxis sencilla y orientada a clases (TypeScript-friendly)
. Integración limpia con Angular
. Compatibilidad con inyección de dependencias
. Middleware y plugins disponibles para logging, devtools, persistencia, etc.
. Cada feature contiene su propio store/ con:
. Acciones (_.actions.ts)
. Estados (_.state.ts)
. Selectores (\*.selectors.ts)
. Esto permite una mejor trazabilidad de los datos, flujo claro de eventos y facilita pruebas unitarias.

4.  Componentes reutilizables
    Los componentes genéricos, estilos y utilidades comunes se ubican en el módulo shared/, lo que permite su uso en cualquier parte de la aplicación sin duplicar código.

5.  Environments y configuración
    El proyecto define distintos entornos en src/environments, con variables específicas como la URL del endpoint GraphQL, lo cual permite desplegar fácilmente en desarrollo, staging o producción.

# Ventajas de esta arquitectura

Escalabilidad: fácilmente se pueden agregar nuevos módulos sin interferir con otros existentes.

Testabilidad: cada feature puede ser probado de forma aislada.

Mantenibilidad: los cambios se pueden acotar a módulos específicos.

Claridad en el flujo de datos: gracias a NGXS, el estado se gestiona de forma predecible y centralizada.
