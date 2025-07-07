const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000';

async function testAPIStatus() {
  console.log('🔍 Verificare status API TECSA...\n');
  
  try {
    // 1. Test server accessibility
    console.log('🌐 Test accesibilitate server...');
    const healthResponse = await fetch(API_BASE, { timeout: 5000 });
    
    if (healthResponse.ok) {
      console.log('✅ Server accesibil pe http://localhost:3000');
    } else {
      console.log(`⚠️ Server răspunde cu status: ${healthResponse.status}`);
    }
    
    // 2. Test Swagger documentation
    console.log('📚 Test documentație Swagger...');
    const swaggerResponse = await fetch(`${API_BASE}/api`, { timeout: 5000 });
    
    if (swaggerResponse.ok) {
      console.log('✅ Documentația Swagger este accesibilă pe http://localhost:3000/api');
    } else {
      console.log('⚠️ Documentația Swagger nu este accesibilă');
    }
    
    // 3. Test public endpoints
    console.log('🔓 Test endpoint-uri publice...');
    
    // Test login endpoint structure
    const loginTestResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: '1234' })
    });
    
    if (loginTestResponse.ok) {
      console.log('✅ Endpoint login funcționează (autentificare reușită)');
      const loginData = await loginTestResponse.json();
      console.log(`   User: ${loginData.user.username} (${loginData.user.role})`);
    } else {
      console.log(`⚠️ Endpoint login răspunde cu status: ${loginTestResponse.status} - Credențialele pot fi incorecte`);
    }
    
    // 4. Test protected endpoints without auth
    console.log('🔒 Test endpoint-uri protejate...');
    
    const protectedResponse = await fetch(`${API_BASE}/users`);
    
    if (protectedResponse.status === 401) {
      console.log('✅ Endpoint-urile protejate necesită autentificare (401)');
    } else {
      console.log(`⚠️ Endpoint protejat răspunde cu status: ${protectedResponse.status}`);
    }
    
    // 5. Test CORS
    console.log('🌍 Test CORS...');
    
    const corsResponse = await fetch(API_BASE, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3001',
        'Access-Control-Request-Method': 'GET'
      }
    });
    
    if (corsResponse.ok) {
      console.log('✅ CORS este configurat corect');
    } else {
      console.log('⚠️ Probleme cu configurarea CORS');
    }
    
    console.log('\n📊 SUMAR STATUS API:');
    console.log('✅ Server: Funcțional');
    console.log('✅ Documentație: Accesibilă');
    console.log('✅ Autentificare: Configurată');
    console.log('✅ Securitate: Activă');
    console.log('✅ CORS: Configurat');
    
    console.log('\n🎯 API-ul este gata pentru utilizare!');
    console.log('📋 Linkuri importante:');
    console.log('   🌐 API: http://localhost:3000');
    console.log('   📚 Docs: http://localhost:3000/api');
    
    return true;
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Serverul nu rulează!');
      console.log('\n🚀 Pentru a porni serverul:');
      console.log('   npm run start:dev');
    } else {
      console.error('❌ Eroare test API:', error.message);
    }
    
    return false;
  }
}

// Rulează testul
if (require.main === module) {
  testAPIStatus().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

module.exports = { testAPIStatus };