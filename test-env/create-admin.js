const axios = require('axios');

/**
 * 🔧 SCRIPT CREARE ADMIN VIA API
 * 
 * Acest script creează un utilizator admin cu rol de owner prin API-ul serverului.
 * Nu accesează direct MongoDB, ci folosește endpoint-ul /users al API-ului.
 * Serverul trebuie să ruleze pe localhost:3000
 */

const API_BASE_URL = 'http://localhost:3000';
const ADMIN_DATA = {
  id: "admin",
  username: "admin",
  password: "password",
  email: "admin@tecsa.com",
  role: "owner",
  theme: "default",
  phone: "+40123456789",
  isActive: true
};

async function createAdminViaAPI() {
  console.log('🚀 CREARE ADMIN PRIN API');
  console.log(`📡 Server API: ${API_BASE_URL}`);
  console.log('');

  try {
    // Verifică dacă serverul rulează
    console.log('🔍 Verificare server...');
    try {
      await axios.get(`${API_BASE_URL}/api`, { timeout: 5000 });
      console.log('✅ Server API accesibil');
    } catch (error) {
      throw new Error(`Server nu răspunde pe ${API_BASE_URL}. Asigură-te că serverul rulează cu: npm run start:dev`);
    }

    // Încearcă să creeze admin-ul prin API
    console.log('👤 Creare utilizator admin...');
    
    const response = await axios.post(`${API_BASE_URL}/users`, ADMIN_DATA, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    if (response.status === 201 || response.status === 200) {
      console.log('✅ Admin user created successfully via API!');
      console.log('');
      console.log('📋 ADMIN CREDENTIALS:');
      console.log('   ID: admin');
      console.log('   Username: admin');
      console.log('   Password: password');
      console.log('   Email: admin@tecsa.com');
      console.log('   Role: owner');
      console.log('   Theme: default');
      console.log('   Phone: +40123456789');
      console.log('   Active: true');
      console.log('');
      console.log('🔐 IMPORTANT: Schimbă parola după primul login!');
      console.log('👑 OWNER ROLE: Acces complet la toate funcționalitățile sistemului');
      console.log('');
      console.log('🧪 Pentru a testa login-ul:');
      console.log('   curl -X POST http://localhost:3000/auth/login \\');
      console.log('     -H "Content-Type: application/json" \\');
      console.log('     -d \'{"username": "admin", "password": "password"}\'');
      console.log('');
      console.log('🚀 Sau rulează testele complete: npm run test-system');
    }

  } catch (error) {
    console.error('❌ Error creating admin via API:', error.message);
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 409) {
        console.log('⚠️ Admin user already exists!');
        console.log('');
        console.log('📋 EXISTING ADMIN CREDENTIALS:');
        console.log('   Username: admin');
        console.log('   Password: password');
        console.log('   Role: owner');
        console.log('');
        console.log('🧪 Testează login-ul: npm run test-system');
        return; // Nu este o eroare reală
      } else if (status === 400) {
        console.log('⚠️ Date invalide pentru creare admin:');
        console.log(`   ${data.message || 'Verifică datele trimise'}`);
      } else if (status === 500) {
        console.log('⚠️ Eroare server intern. Verifică:');
        console.log('   1. Conexiunea la MongoDB');
        console.log('   2. Configurația .env');
        console.log('   3. Log-urile serverului');
      } else {
        console.log(`⚠️ Eroare API (${status}): ${data.message || 'Eroare necunoscută'}`);
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🔗 Nu se poate conecta la server. Verifică:');
      console.log('   1. Serverul rulează: npm run start:dev');
      console.log('   2. Portul 3000 este liber');
      console.log('   3. Nu există firewall care blochează conexiunea');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('⏱️ Timeout la conectarea cu serverul. Verifică:');
      console.log('   1. Serverul răspunde la request-uri');
      console.log('   2. Nu există probleme de rețea');
    } else {
      console.log('🔧 Eroare neașteptată. Verifică:');
      console.log('   1. Serverul rulează corect');
      console.log('   2. Endpoint-ul /users este disponibil');
      console.log('   3. Nu există probleme de configurare');
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Pornește serverul: npm run start:dev');
    console.log('   2. Verifică MongoDB: npm run verify-mongo');
    console.log('   3. Testează API-ul: npm run test-system');
    console.log('   4. Verifică documentația: http://localhost:3000/api');
    
    process.exit(1);
  }
}

// Verifică dacă scriptul este rulat direct
if (require.main === module) {
  createAdminViaAPI().catch(error => {
    console.error('❌ Eroare fatală:', error.message);
    process.exit(1);
  });
}

module.exports = { createAdminViaAPI };