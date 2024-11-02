# serchixt

A new Front for a new apocalyptic World

## 🚀 Instalacion

#### Clonar repositorio (acuerdate de estar conectado a la VPN)

```bash
git clone git@github.com:CasioPT87/serchixt.git
```

#### Navegar a la carpeta

```bash
cd serchixt
```

#### Instalar dependencias

```bash
npm install
```

#### Crear .env

```bash
touch .env
```

## ⚙️ Configuracion de entorno (.env) -this are all examples-

```bash
BACKEND_URL=http://localhost:3050
SERVER_URL=http://localhost:9990
BACKEND_AUTH_PATH=/api/v2/login
BACKEND_CLOSE_AUTH_PATH=/api/v1/logout
BACKEND_USER_PATH=/api/v2/users

PORTAL_SUFIX=genei.es # esto DEBE SER LO MISMO QUE EL "PORTAL_SUFIX" del apiGateway que se este atacando (aunque es solo para desarrollo, para que funcionen las cookies)

COOKIES_PATH=/cookies

APP_NAME=serchixt

USER_NAME=nombre_de_usuario
USER_PASSWORD=password_de_usuario
```

## 🖥️ Correr la aplicacion

#### Correr en desarrollo

```bash
npm run dev
```

#### Correr en produccion

```bash
npm start
```

#### Correr los test

```bash
npm run test
```
