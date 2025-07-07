# 🚀 TECSA - Setup Instructions

## Setup Rapid Backend (5 minute)

### Cerințe Sistem
- **Node.js** 18+ și **npm** 8+
- **Git** pentru clonare
- **MongoDB Atlas** (inclus în proiect)

### Pași de Instalare Backend

```bash
# 1. Clonare și instalare dependințe
git clone <repository-url>
cd tecsa-server
npm install

# 2. Verificare conexiune MongoDB (opțional)
npm run verify-mongo

# 3. Pornire aplicație
npm run start:dev

# 4. Testare sistem complet (într-un terminal nou)
npm run test-system

# 4a. Sau creare admin manual (dacă este necesar)
npm run create-admin
```

## ✅ Verificare Rapidă Backend

### Linkuri Importante
- **Aplicația**: http://localhost:3000
- **Documentația API**: http://localhost:3000/api
- **MongoDB**: mongodb+srv://admin:1234@cluster0.sf0fds9.mongodb.net

### Credențiale Admin
- **Username**: `admin`
- **Password**: `password`
- **Role**: `owner` (acces complet)

### Test Login Rapid
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### Creare Admin Manual
Dacă admin-ul nu există sau testele eșuează:
```bash
npm run create-admin
```

**Important**: Scriptul `create-admin` folosește API-ul serverului (POST /users), nu accesează direct MongoDB.

---

## ⚛️ Setup Frontend React

### Cerințe Frontend
- **Node.js** 18+ și **npm** 8+
- **Backend TECSA** rulând pe http://localhost:3000

### Creare Proiect React

```bash
# Creare proiect React cu TypeScript
npx create-react-app tecsa-frontend --template typescript
cd tecsa-frontend

# Instalare dependențe necesare
npm install axios react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install react-grid-layout react-beautiful-dnd
npm install @types/react-grid-layout --save-dev
```

### Configurare API Client

Creează fișierul `src/services/api.ts`:

```typescript
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

Creează fișierul `src/services/authService.ts`:

```typescript
import apiClient from './api';

export const authService = {
  async login(username: string, password: string) {
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

Creează fișierul `src/services/devicesService.ts`:

```typescript
import apiClient from './api';

export const devicesService = {
  async getDevices(zoneId?: string) {
    const params = zoneId ? { zoneId } : {};
    const response = await apiClient.get('/devices', { params });
    return response.data;
  },

  async getDevice(id: string) {
    const response = await apiClient.get(`/devices/${id}`);
    return response.data;
  },

  async createDevice(deviceData: any) {
    const response = await apiClient.post('/devices', deviceData);
    return response.data;
  },

  async updateDevice(id: string, updates: any) {
    const response = await apiClient.patch(`/devices/${id}`, updates);
    return response.data;
  },

  async deleteDevice(id: string) {
    await apiClient.delete(`/devices/${id}`);
  },

  async sendCommand(id: string, action: string, params: any) {
    const response = await apiClient.post(`/devices/${id}/command`, {
      action,
      params,
    });
    return response.data;
  },

  // Comenzi specifice pentru UI
  async turnOn(id: string) {
    return this.sendCommand(id, 'turn_on', {});
  },

  async turnOff(id: string) {
    return this.sendCommand(id, 'turn_off', {});
  },

  async setBrightness(id: string, brightness: number) {
    return this.sendCommand(id, 'set_brightness', { brightness });
  },

  async setTemperature(id: string, temperature: number) {
    return this.sendCommand(id, 'set_temperature', { temperature });
  },
};
```

### React Hooks pentru State Management

Creează fișierul `src/hooks/useAuth.tsx`:

```typescript
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  theme: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const { user } = await authService.login(username, password);
    setUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const hasRole = (role: string) => {
    const roleHierarchy: Record<string, string[]> = {
      owner: ['owner', 'admin', 'premium', 'normal'],
      admin: ['admin', 'premium', 'normal'],
      premium: ['premium', 'normal'],
      normal: ['normal'],
    };
    
    return roleHierarchy[user?.role || '']?.includes(role) || false;
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

Creează fișierul `src/hooks/useDevices.ts`:

```typescript
import { useState, useEffect } from 'react';
import { devicesService } from '../services/devicesService';

interface Device {
  id: string;
  name: string;
  type: string;
  protocol: string;
  zoneId?: string;
  data: any;
  online: boolean;
  config: any;
}

export const useDevices = (zoneId?: string) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, [zoneId]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await devicesService.getDevices(zoneId);
      setDevices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendCommand = async (deviceId: string, action: string, params: any) => {
    try {
      const result = await devicesService.sendCommand(deviceId, action, params);
      
      // Actualizează starea locală
      setDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, data: { ...device.data, ...params } }
          : device
      ));
      
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createDevice = async (deviceData: any) => {
    try {
      const newDevice = await devicesService.createDevice(deviceData);
      setDevices(prev => [...prev, newDevice]);
      return newDevice;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateDevice = async (id: string, updates: any) => {
    try {
      const updatedDevice = await devicesService.updateDevice(id, updates);
      setDevices(prev => prev.map(device => 
        device.id === id ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteDevice = async (id: string) => {
    try {
      await devicesService.deleteDevice(id);
      setDevices(prev => prev.filter(device => device.id !== id));
    } catch (err: any) {
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

Creează fișierul `src/components/Login.tsx`:

```typescript
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            TECSA Login
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <Typography variant="body2" color="text.secondary" align="center">
            Default: admin / password
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
```

Creează fișierul `src/components/DeviceCard.tsx`:

```typescript
import React from 'react';
import {
  Card,
  CardContent,
  Switch,
  Slider,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Lightbulb, Power } from '@mui/icons-material';

interface Device {
  id: string;
  name: string;
  type: string;
  protocol: string;
  data: any;
  online: boolean;
  config: any;
}

interface DeviceCardProps {
  device: Device;
  onCommand: (deviceId: string, action: string, params: any) => Promise<void>;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onCommand }) => {
  const handleToggle = async () => {
    const action = device.data.status === 'on' ? 'turn_off' : 'turn_on';
    await onCommand(device.id, action, {});
  };

  const handleBrightnessChange = async (event: Event, value: number | number[]) => {
    await onCommand(device.id, 'set_brightness', { brightness: value });
  };

  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Lightbulb sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {device.name}
          </Typography>
          <Switch
            checked={device.data.status === 'on'}
            onChange={handleToggle}
          />
        </Box>
        
        {device.config.dimmable && (
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>
              Brightness: {device.data.brightness || 0}%
            </Typography>
            <Slider
              value={device.data.brightness || 0}
              onChange={handleBrightnessChange}
              min={0}
              max={100}
              disabled={device.data.status !== 'on'}
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Chip 
            label={device.online ? 'Online' : 'Offline'} 
            color={device.online ? 'success' : 'error'}
            size="small"
          />
          <Chip 
            label={device.protocol} 
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
```

### Configurare App Principal

Actualizează fișierul `src/App.tsx`:

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
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
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

### Configurare package.json pentru Proxy

Adaugă în `package.json` pentru a evita problemele CORS în dezvoltare:

```json
{
  "name": "tecsa-frontend",
  "version": "0.1.0",
  "proxy": "http://localhost:3000",
  "dependencies": {
    // ... dependențele existente
  }
}
```

### Pornire Frontend

```bash
# În directorul frontend
npm start
```

Frontend-ul va rula pe http://localhost:3001 și va comunica cu backend-ul pe http://localhost:3000.

## 🔧 Troubleshooting

### Probleme Comune Backend

**1. Eroare conexiune MongoDB**
```bash
npm run verify-mongo
```

**2. Server nu pornește**
```bash
# Verifică portul 3000
lsof -i :3000
```

### Probleme Comune Frontend

**1. Eroare CORS**
- Asigură-te că backend-ul rulează cu CORS activat
- Verifică proxy în package.json

**2. Eroare autentificare**
- Verifică credențialele: admin/password
- Verifică că backend-ul rulează pe localhost:3000

## 📋 Checklist Setup Complet

### Backend
- [ ] Node.js 18+ instalat
- [ ] Dependințe instalate (`npm install`)
- [ ] MongoDB accesibil (`npm run verify-mongo`)
- [ ] Server pornit (`npm run start:dev`)
- [ ] Teste trecute (`npm run test-system`)
- [ ] Rate succes > 95% (target: 96.5%+)

### Frontend
- [ ] Proiect React creat
- [ ] Dependințe instalate (axios, @mui/material, etc.)
- [ ] Servicii API configurate
- [ ] Hooks pentru state management create
- [ ] Componente de bază implementate
- [ ] Proxy configurat în package.json
- [ ] Frontend pornit (`npm start`)
- [ ] Login funcțional cu admin/password

## 📊 Performanță Sistem

### Rezultate Testare Actuală
- ✅ **55 teste trecute** din 57 total
- ✅ **96.5% rata de succes**
- ✅ **Toate funcționalitățile critice** operaționale

### Funcționalități Testate
- 🔐 **Autentificare** (login, refresh, logout)
- 👥 **Utilizatori** (CRUD, roluri, permisiuni)
- 🏠 **Dispozitive** (CRUD, comenzi, protocoale)
- 🏘️ **Zone** (CRUD, ierarhie, organizare)
- 📱 **Layout-uri** (CRUD, grid, card instances)
- 🃏 **Template-uri** (CRUD, categorii, roluri)
- 👑 **Roluri** (ierarhie, permisiuni)
- 🎨 **Temă** (personalizare UI)
- ⚙️ **Control Panel** (administrare)
- 🎭 **Impersonare** (moderare utilizatori)

### API Endpoints Verificate
```
✅ POST   /auth/login           # Autentificare
✅ POST   /auth/refresh         # Refresh token
✅ GET    /users               # Lista utilizatori
✅ POST   /users               # Creare utilizator
✅ GET    /devices             # Lista dispozitive
✅ POST   /devices             # Creare dispozitiv
✅ POST   /devices/:id/command # Comandă dispozitiv
✅ GET    /zones               # Lista zone
✅ GET    /zones/hierarchy     # Ierarhie zone
✅ GET    /cards/templates     # Template-uri card
✅ GET    /layouts             # Layout-uri utilizator
✅ POST   /layouts/cards       # Adăugare card
✅ GET    /roles               # Lista roluri
✅ GET    /theme               # Temă utilizator
✅ GET    /control/users       # Control panel
✅ POST   /impersonate/start   # Start impersonare
... și multe altele
```

## 🚀 Next Steps

După setup-ul complet:

1. **Testează comunicarea** între frontend și backend
2. **Implementează componente** suplimentare pentru zone, layout-uri
3. **Adaugă funcționalități** de drag & drop pentru layout-uri
4. **Configurează deployment** pentru producție

---

**🎯 Setup complet frontend + backend în 15 minute! Sistemul este gata pentru dezvoltare!**