-- Creaci�n de tablas

CREATE TABLE Roles (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Departamentos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrase�a VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    departamento_id INT NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Roles(id),
    FOREIGN KEY (departamento_id) REFERENCES Departamentos(id)
);

CREATE TABLE Asignaciones (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(255) NOT NULL,
    empleado_id INT NOT NULL,
    fecha_asignacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (empleado_id) REFERENCES Usuarios(id)
);

CREATE TABLE Posts (
    id INT PRIMARY KEY IDENTITY(1,1),
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE() 
);

-- Inserci�n de datos en las tablas

INSERT INTO Roles (nombre) VALUES ('Administrador');
INSERT INTO Roles (nombre) VALUES ('B�sico');

INSERT INTO Departamentos (nombre) 
VALUES 
    ('Recursos Humanos'), 
    ('IT'), 
    ('Finanzas'), 
    ('Marketing');

INSERT INTO Usuarios (nombre_usuario, contrase�a, nombre_completo, rol_id, departamento_id) 
VALUES 
    ('admin1', 'contrase�a_hash_admin1', 'Admin Uno', 1, 1),   
    ('admin2', 'contrase�a_hash_admin2', 'Admin Dos', 1, 3),   
    ('empleado1', 'contrase�a_hash_empleado1', 'Empleado Uno', 2, 2),
    ('empleado2', 'contrase�a_hash_empleado2', 'Empleado Dos', 2, 4),  
    ('empleado3', 'contrase�a_hash_empleado3', 'Empleado Tres', 2, 1); 

-- Consultas para obtener datos

-- Obtener informaci�n de usuarios con su departamento
SELECT 
    U.nombre_completo, 
    U.id,
    D.nombre AS nombre_departamento
FROM 
    Usuarios U
JOIN 
    Departamentos D ON U.departamento_id = D.id;

-- Obtener asignaciones y empleados
SELECT 
    A.descripcion AS Asignacion,
    U.nombre_completo AS Empleado,
    A.fecha_asignacion,
    A.id
FROM 
    Asignaciones A
JOIN 
    Usuarios U ON A.empleado_id = U.id;

-- Consultas para verificar contenido de las tablas
SELECT * FROM Usuarios;
SELECT * FROM Asignaciones;


-- Agregar la columna de descripci�n a la tabla Usuarios
ALTER TABLE Usuarios
ADD descripcion VARCHAR(255) NOT NULL DEFAULT 'Sin descripci�n';
