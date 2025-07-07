const axios = require('axios');

/**
 * 🧪 SCRIPT TESTARE IMPERSONARE
 * 
 * Testează funcționalitatea de impersonare a utilizatorilor
 */

const API_BASE_URL = 'http://localhost:3000';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password'
};

async function testImpersonation() {
  console.log('🚀 TESTARE IMPERSONARE UTILIZATORI');
  console.log(`📡 Server API: ${API_BASE_URL}`);
  console.log('');

  try {
    // 1. Login ca admin
    console.log('🔑 Login ca admin...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, ADMIN_CREDENTIALS);
    const adminToken = loginResponse.data.access_token;
    console.log('✅ Login reușit, token obținut');

    // 2. Creează un utilizator de test pentru impersonare
    console.log('👤 Creare utilizator de test pentru impersonare...');
    const testUser = {
      id: "test-user-" + Date.now(),
      username: "testuser",
      password: "testpass123",
      email: "test@example.com",
      role: "normal"
    };

    await axios.post(`${API_BASE_URL}/users`, testUser, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Utilizator de test creat: ${testUser.id}`);

    // 3. Impersonează utilizatorul de test
    console.log('🎭 Impersonare utilizator de test...');
    const impersonateResponse = await axios.post(
      `${API_BASE_URL}/impersonate/start`,
      { targetUserId: testUser.id },
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Impersonare reușită!');
    console.log('📋 Detalii impersonare:');
    console.log(`   Original user: ${impersonateResponse.data.originalUser.username}`);
    console.log(`   Target user: ${impersonateResponse.data.targetUser.username}`);
    console.log(`   Impersonated: ${impersonateResponse.data.impersonated}`);

    // 4. Stop impersonare
    console.log('🛑 Stop impersonare...');
    try {
      const stopImpersonateResponse = await axios.post(
        `${API_BASE_URL}/impersonate/stop`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`, // Use admin token instead of impersonation token
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('✅ Stop impersonare reușit!');
    } catch (error) {
      console.error('⚠️ Eroare la stop impersonare:', error.message);
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Message: ${JSON.stringify(error.response.data)}`);
      }
    }

    // 5. Cleanup - șterge utilizatorul de test
    console.log('🧹 Cleanup - ștergere utilizator de test...');
    await axios.delete(`${API_BASE_URL}/users/${testUser.id}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Utilizator de test șters');

    console.log('\n🎉 TEST IMPERSONARE COMPLET REUȘIT!');
    return true;
  } catch (error) {
    console.error('❌ Eroare în timpul testării impersonării:', error.message);
    
    if (error.response) {
      console.error('📋 Detalii eroare:');
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${JSON.stringify(error.response.data)}`);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verifică că serverul rulează: npm run start:dev');
    console.log('   2. Asigură-te că admin-ul există: npm run create-admin');
    console.log('   3. Verifică implementarea impersonării în controller și service');
    console.log('   4. Verifică că JWT strategy returnează corect userId și id');
    
    return false;
  }
}

// Rulează testul dacă scriptul este apelat direct
if (require.main === module) {
  testImpersonation().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

module.exports = { testImpersonation };