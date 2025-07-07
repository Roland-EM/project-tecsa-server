# 🚀 TECSA - Setup Instructions

## Setup Rapid (5 minute)

### Cerințe Sistem
- **Node.js** 18+ și **npm** 8+
- **Git** pentru clonare
- **MongoDB Atlas** (inclus în proiect)

### Pași de Instalare

```bash
# 1. Clonare și instalare dependințe
git clone <repository-url>
cd tecsa-server
npm install

# 2. Verificare conexiune MongoDB (opțional)
npm run verify-mongo

# 3. Pornire aplicație
npm run start:dev

# 4. Creare admin (într-un terminal nou)
npm run create-admin

# 5. Test complet (opțional)
npm run test-all
```

## ✅ Verificare Rapidă

### Linkuri Importante
- **Aplicația**: http://localhost:3000
- **Documentația API**: http://localhost:3000/api
- **MongoDB**: mongodb+srv://admin:1234@cluster0.sf0fds9.mongodb.net

### Credențiale Admin
- **Username**: `admin`
- **Password**: `1234`
- **Role**: `owner` (acces complet)

### Test Login Rapid
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'
```

## 🧪 Scripturi de Testare

```bash
# Verificare MongoDB
npm run verify-mongo

# Test status API
npm run test-api

# Test funcționalități complete
npm run test-complete

# Suite complet teste
npm run test-all

# Creare utilizator admin
npm run create-admin
```

## 🔧 Troubleshooting

### Probleme Comune

**1. Eroare conexiune MongoDB**
```bash
# Verifică conexiunea
npm run verify-mongo

# Soluții:
# - Verifică conexiunea la internet
# - Verifică firewall-ul local
# - Contactează administratorul pentru whitelist IP
```

**2. Server nu pornește**
```bash
# Verifică portul 3000
lsof -i :3000

# Schimbă portul (opțional)
PORT=3001 npm run start:dev
```

**3. Admin nu există**
```bash
# Creează admin
npm run create-admin

# Verifică în MongoDB
npm run verify-mongo
```

## 📋 Checklist Setup

- [ ] Node.js 18+ instalat
- [ ] Dependințe instalate (`npm install`)
- [ ] MongoDB accesibil (`npm run verify-mongo`)
- [ ] Server pornit (`npm run start:dev`)
- [ ] Admin creat (`npm run create-admin`)
- [ ] API funcțional (`npm run test-api`)
- [ ] Documentație accesibilă (http://localhost:3000/api)

## 🚀 Next Steps

După setup-ul complet:

1. **Explorează API-ul** pe http://localhost:3000/api
2. **Testează endpoint-urile** cu credențialele admin
3. **Integrează cu frontend-ul** React
4. **Configurează deployment-ul** pentru producție

---

**🎯 Setup complet în 5 minute! API-ul este gata pentru utilizare!**