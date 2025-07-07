# 🏠 TECSA - Smart Home Enterprise Backend

Sistem backend NestJS complet pentru controlul IoT smart home cu arhitectură enterprise-grade și integrare React.

## 📋 Cuprins

1. [Setup Rapid (5 minute)](#-setup-rapid-5-minute)
2. [Structura Proiectului](#-structura-proiectului)
3. [Verificare și Testare](#-verificare-și-testare)
4. [API Documentation](#-api-documentation)
5. [Integrare React Frontend](#-integrare-react-frontend)
6. [Deployment](#-deployment)

---

## 🚀 Setup Rapid (5 minute)

### Cerințe Sistem
- **Node.js** 18+ și **npm** 8+
- **MongoDB Atlas** (inclus în proiect)
- **Git** pentru clonare

### Pași de Instalare

```bash
# 1. Clonare și instalare dependințe
git clone <repository-url>
cd tecsa-server
npm install

# 2. Configurare .env (fișierul există deja)
# Verifică că MONGO_URI este corect configurat în .env

# 3. Verificare MongoDB (opțional)
npm run verify-mongo

# 4. Pornire aplicație
npm run start:dev

# 5. Creare admin (într-un terminal nou)
npm run create-admin

# 6. Test complet (opțional)
npm run test-all
```

### ✅ Verificare Rapidă

Aplicația rulează pe: **http://localhost:3000**
Documentația API: **http://localhost:3000/api**

**Credențiale Admin:**
- Username: `admin`
- Password: `1234`
- Role: `owner` (acces complet)

---

## 📁 Structura Proiectului

### Arhitectura Modulară

```
tecsa-server/
├── 📁 src/                              # Codul sursă principal
│   ├── 📄 main.ts                       # Entry point + configurare Swagger
│   ├── 📄 app.module.ts                 # Modulul principal
│   │
│   ├── 📁 core/                         # 🏗️ CORE SYSTEM (Global)
│   │   ├── 📄 core.module.ts            # Guards, interceptors, config
│   │   ├── 📄 config.service.ts         # Configurare MongoDB, JWT
│   │   ├── 📄 logger.service.ts         # Logging centralizat
│   │   ├── 📁 enums/
│   │   │   └── 📄 role.enum.ts          # Roluri: owner, admin, premium, normal
│   │   ├── 📁 guards/
│   │   │   ├── 📄 jwt-auth.guard.ts     # Autentificare JWT
│   │   │   └── 📄 role.guard.ts         # Verificare roluri
│   │   └── 📁 interceptors/
│   │       └── 📄 error.interceptor.ts  # Gestionare erori globale
│   │
│   ├── 📁 auth/                         # 🔐 AUTENTIFICARE
│   │   ├── 📄 auth.controller.ts        # POST /auth/login, /auth/refresh
│   │   ├── 📄 auth.service.ts           # Logica JWT + validare
│   │   ├── 📄 auth.module.ts            # Configurare Passport
│   │   └── 📁 strategies/
│   │       ├── 📄 jwt.strategy.ts       # Strategia JWT
│   │       └── 📄 local.strategy.ts     # Strategia locală
│   │
│   ├── 📁 users/                        # 👥 UTILIZATORI
│   │   ├── 📄 users.controller.ts       # CRUD utilizatori
│   │   ├── 📄 users.service.ts          # Logica business + bcrypt
│   │   ├── 📄 users.module.ts           # Schema MongoDB
│   │   └── 📁 schemas/
│   │       └── 📄 user.schema.ts        # Schema utilizator MongoDB
│   │
│   ├── 📁 devices/                      # 🏠 DISPOZITIVE IoT
│   │   ├── 📄 devices.controller.ts     # CRUD + comenzi dispozitive
│   │   ├── 📄 devices.service.ts        # Logica business
│   │   ├── 📄 devices.module.ts         # Integrare adaptoare
│   │   ├── 📁 adapters/                 # 🔌 ADAPTOARE PROTOCOL
│   │   │   ├── 📄 adapters.service.ts   # Router adaptoare
│   │   │   └── 📄 adapter.interface.ts  # Interfață comună
│   │   ├── 📁 knx-adapter/              # Adaptor KNX
│   │   └── 📁 wifi-adapter/             # Adaptor WiFi
│   │
│   ├── 📁 zones/                        # 🏘️ ZONE ȘI GRUPURI
│   │   ├── 📄 zones.controller.ts       # CRUD zone + ierarhie
│   │   ├── 📄 zones.service.ts          # Logica ierarhie zone
│   │   └── 📄 zones.module.ts           # Schema MongoDB
│   │
│   ├── 📁 layouts/                      # 📱 LAYOUT-URI UI
│   │   ├── 📄 layouts.controller.ts     # CRUD layout-uri + card instances
│   │   ├── 📄 layouts.service.ts        # Logica grid layout
│   │   └── 📄 layouts.module.ts         # Schema MongoDB
│   │
│   ├── 📁 cards/                        # 🃏 TEMPLATE-URI CARD
│   │   ├── 📄 cards.controller.ts       # CRUD template-uri
│   │   ├── 📄 cards.service.ts          # Template-uri default
│   │   └── 📄 cards.module.ts           # Schema MongoDB
│   │
│   ├── 📁 roles/                        # 👑 SISTEM ROLURI
│   │   ├── 📄 roles.controller.ts       # GET roluri + ierarhie
│   │   └── 📄 roles.service.ts          # Logica permisiuni
│   │
│   ├── 📁 theme/                        # 🎨 SISTEM TEMĂ
│   │   ├── 📄 theme.controller.ts       # GET/PATCH temă utilizator
│   │   └── 📄 theme.service.ts          # Teme disponibile
│   │
│   ├── 📁 control/                      # ⚙️ PANOU CONTROL (Owner)
│   │   ├── 📄 control.controller.ts     # Administrare utilizatori
│   │   └── 📄 control.service.ts        # Operații admin
│   │
│   ├── 📁 impersonate/                  # 🎭 IMPERSONARE (Admin+)
│   │   ├── 📄 impersonate.controller.ts # Start/stop impersonare
│   │   └── 📄 impersonate.service.ts    # Logica impersonare
│   │
│   └── 📁 shared/                       # 🔧 UTILITARE PARTAJATE
│       ├── 📁 decorators/
│       │   ├── 📄 public.decorator.ts   # @Public() pentru endpoint-uri
│       │   └── 📄 roles.decorator.ts    # @Roles() pentru verificare
│       └── 📁 pipes/
│           └── 📄 object-id.pipe.ts     # Validare ObjectId MongoDB
│
├── 📁 test-env/                         # 🧪 TESTE ȘI VERIFICĂRI
│   ├── 📄 verify-mongodb.js             # Test conexiune MongoDB
│   ├── 📄 test-api-status.js            # Test status API
│   ├── 📄 test-complete-api.js          # Test complet funcționalități
│   ├── 📄 test-all.js                   # Suite complet teste
│   └── 📄 create-admin.js               # Script creare admin
│
├── 📁 dist/                             # Codul compilat TypeScript
├── 📄 package.json                      # Dependențe și scripturi
├── 📄 tsconfig.json                     # Configurare TypeScript
└── 📄 README.md                         # Documentația (acest fișier)
```

### Dependențe Cheie

**Production:**
- `@nestjs/core` - Framework NestJS
- `@nestjs/mongoose` - Integrare MongoDB
- `@nestjs/jwt` - Autentificare JWT
- `@nestjs/passport` - Strategii autentificare
- `@nestjs/swagger` - Documentație API
- `mongoose` - ODM MongoDB
- `bcryptjs` - Hash parole
- `class-validator` - Validare DTO

**Development:**
- `@nestjs/cli` - CLI NestJS
- `typescript` - Compilator TypeScript
- `jest` - Framework testing

---

## 🧪 Verificare și Testare

### Scripturi Disponibile

```bash
# Dezvoltare
npm run start:dev          # Server cu hot reload
npm run start:debug        # Server cu debugging
npm run build              # Build pentru producție
npm run start:prod         # Server producție

# Testare și verificare
npm run verify-mongo        # Test conexiune MongoDB
npm run test-api           # Test status API
npm run test-complete      # Test funcționalități complete
npm run test-all           # Suite complet teste
npm run create-admin       # Creare utilizator admin

# Dezvoltare
npm run lint               # Linting cod
npm run format             # Formatare cod
npm run test               # Teste unitare Jest
```

### Verificare Pas cu Pas

```bash
# 1. Verifică fișierul .env
# Asigură-te că MONGO_URI este configurat corect

# 2. Verifică MongoDB
npm run verify-mongo
# ✅ Conexiune MongoDB stabilită
# ✅ Baza de date "tecsa" accesibilă
# ✅ Operații citire/scriere funcționale

# 3. Pornește serverul
npm run start:dev
# ✅ Server pornit pe http://localhost:3000
# ✅ Swagger disponibil pe http://localhost:3000/api

# 4. Creează admin (terminal nou)
npm run create-admin
# ✅ Admin creat: username=admin, password=1234

# 5. Test complet (opțional)
npm run test-all
# ✅ Toate testele trec cu succes
```

---

## 📚 API Documentation

### Base URL și Autentificare

```javascript
const API_BASE_URL = 'http://localhost:3000';

// Headers pentru request-uri autentificate
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Endpoint-uri Principale

#### 🔐 Autentificare
```bash
POST   /auth/login           # Login utilizator
POST   /auth/refresh         # Refresh token JWT
```

#### 👥 Utilizatori
```bash
GET    /users               # Lista utilizatori (admin+)
POST   /users               # Creare utilizator (admin+)
GET    /users/:id           # Detalii utilizator
PATCH  /users/:id           # Actualizare utilizator
DELETE /users/:id           # Ștergere utilizator (owner)
```

#### 🏠 Dispozitive
```bash
GET    /devices             # Lista dispozitive
POST   /devices             # Creare dispozitiv (admin+)
GET    /devices/:id         # Detalii dispozitiv
PATCH  /devices/:id         # Actualizare dispozitiv (admin+)
DELETE /devices/:id         # Ștergere dispozitiv (admin+)
POST   /devices/:id/command # Comandă dispozitiv (premium+)

# Query parameters
GET    /devices?zoneId=living-room    # Filtrare pe zonă
```

#### 🏘️ Zone
```bash
GET    /zones               # Lista zone
POST   /zones               # Creare zonă (admin+)
GET    /zones/hierarchy     # Ierarhie zone complete
GET    /zones/root          # Zone rădăcină
GET    /zones/:id           # Detalii zonă
PATCH  /zones/:id           # Actualizare zonă (admin+)
DELETE /zones/:id           # Ștergere zonă (admin+)

# Query parameters
GET    /zones?parentId=house          # Zone copii
```

#### 📱 Layout-uri
```bash
GET    /layouts             # Layout-uri utilizator
POST   /layouts             # Creare layout
POST   /layouts/cards       # Adăugare card în layout
PATCH  /layouts/:page/cards/:cardId # Actualizare card
DELETE /layouts/:page/cards/:cardId # Ștergere card
DELETE /layouts/:page       # Ștergere layout complet

# Query parameters
GET    /layouts?page=dashboard        # Layout pentru pagină
GET    /layouts?page=dashboard&zoneId=living-room # Layout specific
```

#### 🃏 Template-uri Card
```bash
GET    /cards/templates     # Lista template-uri
POST   /cards/templates     # Creare template (admin+)

# Query parameters
GET    /cards/templates?category=lighting # Pe categorie
GET    /cards/templates?role=normal       # Pe rol minim
```

#### 👑 Roluri
```bash
GET    /roles               # Lista roluri disponibile
GET    /roles/hierarchy     # Ierarhie și permisiuni roluri
```

#### 🎨 Temă
```bash
GET    /theme               # Temă curentă utilizator
PATCH  /theme               # Schimbare temă
GET    /theme/available     # Teme disponibile
```

#### ⚙️ Control Panel (Owner)
```bash
POST   /control/users       # Creare utilizator
GET    /control/users       # Lista utilizatori
PATCH  /control/users/:id/role # Schimbare rol
PATCH  /control/users/:id/reset-password # Reset parolă
PATCH  /control/users/:id/activate # Activare utilizator
PATCH  /control/users/:id/deactivate # Dezactivare utilizator
GET    /control/audit-logs  # Jurnale audit
```

#### 🎭 Impersonare (Admin+)
```bash
POST   /impersonate/start   # Start impersonare utilizator
POST   /impersonate/stop    # Stop impersonare
```

### Structuri Date MongoDB

#### Utilizatori
```javascript
{
  id: "admin",                    // ID unic custom
  username: "admin",              // Nume utilizator
  passwordHash: "$2a$10$...",     // Hash bcrypt
  email: "admin@tecsa.com",       // Email unic
  role: "owner",                  // owner|admin|premium|normal
  theme: "default",               // Temă UI
  phone: "+40123456789",          // Telefon
  isActive: true,                 // Status activ
  dateRegistered: Date,           // Data înregistrării
  createdAt: Date,                // Timestamp creare
  updatedAt: Date                 // Timestamp actualizare
}
```

#### Dispozitive
```javascript
{
  id: "light-001",               // ID unic custom
  name: "Living Room Light",     // Nume dispozitiv
  type: "light-bulb",            // Tip dispozitiv
  protocol: "KNX",               // Protocol (KNX, WiFi, etc.)
  zoneId: "living-room",         // ID zonă asociată
  data: {                        // Date specifice dispozitiv
    brightness: 80,
    status: "on",
    color: "#FFFFFF"
  },
  online: true,                  // Status online
  config: {                      // Configurație protocol
    groupAddress: "1/2/3",
    dimmable: true
  },
  createdBy: "admin"             // ID creator
}
```

#### Zone
```javascript
{
  id: "living-room",             // ID unic custom
  name: "Living Room",           // Nume zonă
  parentId: "house",             // ID zonă părinte (opțional)
  type: "zone",                  // zone|group
  children: ["bedroom-1"],       // Array ID-uri copii
  thumbnail: "living-room.jpg",  // Imagine reprezentativă
  description: "Camera de zi",   // Descriere
  createdBy: "admin"             // ID creator
}
```

#### Layout-uri
```javascript
{
  userId: "admin",               // ID utilizator
  page: "dashboard",             // Pagină (dashboard, security, etc.)
  zoneId: "living-room",         // ID zonă (opțional)
  cardInstances: [               // Array instanțe card
    {
      cardInstanceId: "card-123", // ID unic instanță
      cardTemplateId: "light-switch", // ID template card
      deviceId: "light-001",     // ID dispozitiv asociat
      posX: 0, posY: 0,          // Poziție în grid
      sizeX: 1, sizeY: 1,        // Dimensiune în grid
      settings: {                // Setări personalizate
        color: "blue",
        showLabel: true
      }
    }
  ]
}
```

---

## ⚛️ Integrare React Frontend

### Setup Proiect React

```bash
# Creare proiect React
npx create-react-app tecsa-frontend
cd tecsa-frontend

# Instalare dependențe necesare
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install react-grid-layout react-beautiful-dnd
npm install @types/react @types/react-dom --save-dev
```

### Configurare API Client

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Configurare axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pentru token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor pentru refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await apiClient.post('/auth/refresh');
        const newToken = refreshResponse.data.access_token;
        localStorage.setItem('auth_token', newToken);
        
        // Retry original request
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Servicii API pentru React

```javascript
// src/services/authService.js
import apiClient from './api';

export const authService = {
  async login(username, password) {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    
    const { access_token, user } = response.data;
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token: access_token, user };
  },

  async refresh() {
    const response = await apiClient.post('/auth/refresh');
    const { access_token } = response.data;
    localStorage.setItem('auth_token', access_token);
    return access_token;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },
};
```

```javascript
// src/services/devicesService.js
import apiClient from './api';

export const devicesService = {
  async getDevices(zoneId = null) {
    const params = zoneId ? { zoneId } : {};
    const response = await apiClient.get('/devices', { params });
    return response.data;
  },

  async getDevice(id) {
    const response = await apiClient.get(`/devices/${id}`);
    return response.data;
  },

  async createDevice(deviceData) {
    const response = await apiClient.post('/devices', deviceData);
    return response.data;
  },

  async updateDevice(id, updates) {
    const response = await apiClient.patch(`/devices/${id}`, updates);
    return response.data;
  },

  async deleteDevice(id) {
    await apiClient.delete(`/devices/${id}`);
  },

  async sendCommand(id, action, params) {
    const response = await apiClient.post(`/devices/${id}/command`, {
      action,
      params,
    });
    return response.data;
  },

  // Comenzi specifice pentru UI
  async turnOn(id) {
    return this.sendCommand(id, 'turn_on', {});
  },

  async turnOff(id) {
    return this.sendCommand(id, 'turn_off', {});
  },

  async setBrightness(id, brightness) {
    return this.sendCommand(id, 'set_brightness', { brightness });
  },

  async setTemperature(id, temperature) {
    return this.sendCommand(id, 'set_temperature', { temperature });
  },
};
```

```javascript
// src/services/zonesService.js
import apiClient from './api';

export const zonesService = {
  async getZones(parentId = null) {
    const params = parentId ? { parentId } : {};
    const response = await apiClient.get('/zones', { params });
    return response.data;
  },

  async getZoneHierarchy() {
    const response = await apiClient.get('/zones/hierarchy');
    return response.data;
  },

  async getRootZones() {
    const response = await apiClient.get('/zones/root');
    return response.data;
  },

  async getZone(id) {
    const response = await apiClient.get(`/zones/${id}`);
    return response.data;
  },

  async createZone(zoneData) {
    const response = await apiClient.post('/zones', zoneData);
    return response.data;
  },

  async updateZone(id, updates) {
    const response = await apiClient.patch(`/zones/${id}`, updates);
    return response.data;
  },

  async deleteZone(id) {
    await apiClient.delete(`/zones/${id}`);
  },
};
```

```javascript
// src/services/layoutsService.js
import apiClient from './api';

export const layoutsService = {
  async getUserLayouts(page = null, zoneId = null) {
    const params = {};
    if (page) params.page = page;
    if (zoneId) params.zoneId = zoneId;
    
    const response = await apiClient.get('/layouts', { params });
    return response.data;
  },

  async createLayout(layoutData) {
    const response = await apiClient.post('/layouts', layoutData);
    return response.data;
  },

  async addCardInstance(page, zoneId, cardData) {
    const params = { page };
    if (zoneId) params.zoneId = zoneId;
    
    const response = await apiClient.post('/layouts/cards', cardData, { params });
    return response.data;
  },

  async updateCardInstance(page, cardInstanceId, updates, zoneId = null) {
    const params = zoneId ? { zoneId } : {};
    const response = await apiClient.patch(
      `/layouts/${page}/cards/${cardInstanceId}`,
      updates,
      { params }
    );
    return response.data;
  },

  async removeCardInstance(page, cardInstanceId, zoneId = null) {
    const params = zoneId ? { zoneId } : {};
    await apiClient.delete(
      `/layouts/${page}/cards/${cardInstanceId}`,
      { params }
    );
  },

  async deleteLayout(page, zoneId = null) {
    const params = zoneId ? { zoneId } : {};
    await apiClient.delete(`/layouts/${page}`, { params });
  },
};
```

### React Hooks pentru State Management

```javascript
// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { user } = await authService.login(username, password);
    setUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const hasRole = (role) => {
    const roleHierarchy = {
      owner: ['owner', 'admin', 'premium', 'normal'],
      admin: ['admin', 'premium', 'normal'],
      premium: ['premium', 'normal'],
      normal: ['normal'],
    };
    
    return roleHierarchy[user?.role]?.includes(role) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      hasRole,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

```javascript
// src/hooks/useDevices.js
import { useState, useEffect } from 'react';
import { devicesService } from '../services/devicesService';

export const useDevices = (zoneId = null) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, [zoneId]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await devicesService.getDevices(zoneId);
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendCommand = async (deviceId, action, params) => {
    try {
      const result = await devicesService.sendCommand(deviceId, action, params);
      
      // Actualizează starea locală
      setDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, data: { ...device.data, ...params } }
          : device
      ));
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const createDevice = async (deviceData) => {
    try {
      const newDevice = await devicesService.createDevice(deviceData);
      setDevices(prev => [...prev, newDevice]);
      return newDevice;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateDevice = async (id, updates) => {
    try {
      const updatedDevice = await devicesService.updateDevice(id, updates);
      setDevices(prev => prev.map(device => 
        device.id === id ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteDevice = async (id) => {
    try {
      await devicesService.deleteDevice(id);
      setDevices(prev => prev.filter(device => device.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    devices,
    loading,
    error,
    sendCommand,
    createDevice,
    updateDevice,
    deleteDevice,
    refetch: fetchDevices,
  };
};
```

### Componente React Exemple

```jsx
// src/components/DeviceCard.jsx
import React from 'react';
import { Card, CardContent, Switch, Slider, IconButton } from '@mui/material';
import { Lightbulb, Power } from '@mui/icons-material';

const DeviceCard = ({ device, onCommand }) => {
  const handleToggle = async () => {
    const action = device.data.status === 'on' ? 'turn_off' : 'turn_on';
    await onCommand(device.id, action, {});
  };

  const handleBrightnessChange = async (event, value) => {
    await onCommand(device.id, 'set_brightness', { brightness: value });
  };

  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Lightbulb sx={{ mr: 1 }} />
          <h3>{device.name}</h3>
          <Switch
            checked={device.data.status === 'on'}
            onChange={handleToggle}
            sx={{ ml: 'auto' }}
          />
        </div>
        
        {device.config.dimmable && (
          <div>
            <p>Brightness: {device.data.brightness}%</p>
            <Slider
              value={device.data.brightness || 0}
              onChange={handleBrightnessChange}
              min={0}
              max={100}
              disabled={device.data.status !== 'on'}
            />
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <span>Status: {device.online ? 'Online' : 'Offline'}</span>
          <span>Protocol: {device.protocol}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
```

```jsx
// src/components/Dashboard.jsx
import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { useDevices } from '../hooks/useDevices';
import { useAuth } from '../hooks/useAuth';
import DeviceCard from './DeviceCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { devices, loading, error, sendCommand } = useDevices();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user.username}!
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Your Devices ({devices.length})
      </Typography>
      
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.id}>
            <DeviceCard device={device} onCommand={sendCommand} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
```

### Gestionarea Erorilor

```javascript
// src/utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        return 'Sesiunea a expirat. Te rugăm să te autentifici din nou.';
      case 403:
        return 'Nu ai permisiunile necesare pentru această acțiune.';
      case 404:
        return 'Resursa solicitată nu a fost găsită.';
      case 409:
        return 'Conflict: Resursa există deja.';
      case 500:
        return 'Eroare de server. Te rugăm să încerci din nou.';
      default:
        return data.message || `Eroare ${status}`;
    }
  } else if (error.request) {
    // Network error
    return 'Eroare de conexiune. Verifică conexiunea la internet.';
  } else {
    // Other error
    return error.message || 'A apărut o eroare neașteptată.';
  }
};
```

### Configurare Routing

```jsx
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Devices from './components/Devices';
import Zones from './components/Zones';
import Settings from './components/Settings';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/devices" element={
              <ProtectedRoute>
                <Devices />
              </ProtectedRoute>
            } />
            <Route path="/zones" element={
              <ProtectedRoute>
                <Zones />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

---

## 🚀 Deployment

### Variabile de Mediu

```bash
# .env.production
MONGO_URI=mongodb+srv://admin:1234@cluster0.sf0fds9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-production-jwt-secret-key
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=production
```

### Build și Deploy

```bash
# Build pentru producție
npm run build

# Start producție
npm run start:prod

# Sau cu PM2
npm install -g pm2
pm2 start dist/main.js --name "tecsa-api"
```

### Docker (Opțional)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

---

## 📞 Suport și Contribuții

### Linkuri Utile
- **API Local**: http://localhost:3000
- **Documentație**: http://localhost:3000/api
- **MongoDB Atlas**: mongodb+srv://admin:1234@cluster0.sf0fds9.mongodb.net

### Comenzi Rapide
```bash
npm run start:dev      # Dezvoltare
npm run test-all       # Teste complete
npm run create-admin   # Creare admin
npm run verify-mongo   # Test MongoDB
```

### Credențiale Default
- **Username**: `admin`
- **Password**: `1234`
- **Role**: `owner` (acces complet)

---

**🎯 Această documentație conține TOATE informațiile necesare pentru setup complet și integrarea cu React!**

**Versiune**: 2.0.0  
**Ultima actualizare**: Ianuarie 2025  
**Suport**: admin@tecsa.com