# Intranet Corporativa

## Descripción del Proyecto

Este proyecto es una intranet corporativa que permite gestionar usuarios de empleados y manejar el acceso con diferentes niveles de control de acuerdo al tipo de usuario. Los usuarios pueden ser clasificados como "Básico" o "Administrador", cada uno con diferentes permisos y funcionalidades.

### Funcionalidades Principales

- **Gestión de Usuarios**: Los administradores pueden agregar y editar la información de los empleados.
- **Asignaciones**: Los administradores pueden agregar asignaciones a empleados específicos, que pueden ser visualizadas y editadas por el administrador.
- **Publicaciones**: Los administradores pueden crear, editar y eliminar publicaciones que son visibles para los empleados.
- **Interfaz de Usuario**: Los empleados pueden visualizar y editar su propia información, además de ver asignaciones y publicaciones.

## Tecnologías Utilizadas

- **Frontend**: React

  - Hooks: `useState`, `useEffect`, `useRef`, `useContext`, `useAuth`
  - Manejo de peticiones HTTP: Axios
  - Enrutamiento: React Router

- **Backend**: Node.js
  - Framework: Express
  - Base de datos: SQL Server (utilizando mssql)
  - Variables de entorno: dotenv
  - Desarrollo: nodemon
  - Cors

## Estructura del Proyecto

```
/intranet-corporativa
│
├── /backend
│   ├── config             # Datos de la base de datos
│   ├── /routes            # Rutas de la API
│   ├── index.js           # Archivo principal del servidor
│   ├── db.js              # Conexion a la base de datos
│   └── .env               # Variables de entorno
│
├── /frontend
│   ├── /src
│   │   ├── /components     # Componentes de React
│   │   ├── /components     # Componentes
│   │   ├── App.tsx         # Componente principal de la aplicación
│   │   └── main.tsx        # Punto de entrada de la aplicación
│   └── package.json        # Dependencias del frontend
│
└── README.md               # Documentación del proyecto
```

## Instalación

### Backend

1. Navega a la carpeta del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta del backend y define las variables necesarias:

   ```plaintext
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_SERVER=tu_servidor
   DB_DATABASE=tu_base_de_datos
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Frontend

1. Navega a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```

## Uso

- **Acceso como Administrador**: Inicia sesión con las credenciales de un administrador para tener acceso completo a todas las funcionalidades.
- **Acceso como Empleado**: Inicia sesión con las credenciales de un empleado para acceder y editar tu información personal, además de ver las asignaciones y publicaciones.

## Hooks Utilizados

- **`useState`**: Para manejar el estado de los inputs y mensajes de error en el formulario de inicio de sesión y otros componentes.
- **`useEffect`**: Para realizar acciones después de que el componente se haya montado, como enfocar un input.
- **`useRef`**: Para crear referencias a elementos del DOM, como inputs.
- **`useContext`**: Para manejar el estado global de la aplicación a través del contexto.
- **`useAuth`**: Hook personalizado para manejar la autenticación de los usuarios.

## Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de abrir un issue o enviar un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.
