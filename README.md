# 🎓 Academic System 01

![Status](https://img.shields.io/badge/Status-Examen-orange) ![MongoDB](https://img.shields.io/badge/DB-MongoDB-blue) ![Node.js](https://img.shields.io/badge/Backend-Node.js-green) ![React](https://img.shields.io/badge/Frontend-React-blueviolet)

Repositorio de **Michel Carrau** para el proyecto final de examen: un sistema académico básico con conexión a MongoDB para **gestión de carreras**.

---

## ✨ Descripción

Academic System 01 es un **mini sistema académico** con funcionalidades CRUD para carreras, implementado con **Node.js + Express** en el backend y **React** en el frontend.  

Características principales:

- ✅ Crear, listar, editar y eliminar **carreras**
- 🔑 Autenticación básica de usuarios con JWT
- 🗄️ Almacenamiento en **MongoDB**
- 🎨 Diseño simple y funcional en React

---

## 🗂 Estructura del proyecto

```

academic\_system01/
│
├─ .expo/
├─ .vscode/
├─ node\_modules/
├─ src/
│  ├─ connection/db.js
│  ├─ controllers/
│  │   ├─ authController.js
│  │   └─ career.Controller.js
│  ├─ libs/jwt.js
│  ├─ middlewares/
│  ├─ models/
│  │   ├─ career.js
│  │   ├─ career.model.js
│  │   └─ user.js
│  ├─ routes/
│  │   ├─ auth.js
│  │   ├─ careers.routes.js
│  │   └─ home.routes.js
│  ├─ app.js
│  └─ index.js
├─ vite-project/  # Frontend en React
├─ .env
├─ package-lock.json
└─ package.json

````

---

## ⚡ Tecnologías

- **Backend:** Node.js, Express  
- **Frontend:** React (Vite)  
- **Base de datos:** MongoDB  
- **Autenticación:** JWT  
- **Otras herramientas:** VSCode, Expo

---

## 🚀 Funcionalidades

### Carreras
- 📝 Crear nueva carrera  
- 📋 Listar todas las carreras  
- ✏️ Editar carrera existente  
- ❌ Eliminar carrera  

### Usuarios
- 🔐 Registro y login  
- 🛡️ Validación de token JWT

---

## 🛠 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/MichelCarrau/academic_system01.git
cd academic_system01
````

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` con:

```
MONGO_URI=<tu_mongodb_uri>
JWT_SECRET=<tu_clave_secreta>
PORT=3000
```

4. Iniciar servidor backend:

```bash
npm run dev
```

5. Iniciar frontend:

```bash
cd vite-project
npm install
npm run dev
```

---

## 🎨 Uso

* Acceder al frontend en tu navegador
* Crear, editar, listar y eliminar carreras
* Autenticarse si es necesario para acceder a rutas protegidas

---

## 👤 Autor

**Michel Carrau**
GitHub: [MichelCarrau](https://github.com/MichelCarrau)

---

## 📝 Notas

* Diseño simple y modular
* Perfecto para aprendizaje y ampliaciones futuras
* Proyecto académico con fines educativos

```
