const { verifyMongoDBConnection } = require('./verify-mongodb');
const { testAPIStatus } = require('./test-api-status');

/**
 * 🧪 SCRIPT TEST COMPLET
 * 
 * Rulează toate testele în ordine:
 * 1. Verifică conexiunea MongoDB
 * 2. Verifică statusul API-ului
 * 3. Rulează testele complete
 */

async function runAllTests() {
  console.log('🚀 TECSA - Test Suite Complet');
  console.log('==============================\n');
  
  try {
    // 1. Test MongoDB
    console.log('📊 PASUL 1: Verificare MongoDB');
    console.log('--------------------------------');
    const mongoOk = await verifyMongoDBConnection();
    
    if (!mongoOk) {
      console.log('❌ MongoDB nu funcționează. Opresc testele.');
      process.exit(1);
    }
    
    console.log('\n⏳ Aștept 2 secunde...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. Test API Status
    console.log('🌐 PASUL 2: Verificare API Status');
    console.log('-----------------------------------');
    const apiOk = await testAPIStatus();
    
    if (!apiOk) {
      console.log('❌ API nu funcționează. Verifică dacă serverul rulează.');
      console.log('💡 Rulează: npm run start:dev');
      process.exit(1);
    }
    
    console.log('\n⏳ Aștept 2 secunde...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. Test complet API
    console.log('🔬 PASUL 3: Teste Complete API');
    console.log('--------------------------------');
    
    // Importă și rulează testul complet
    require('./test-complete-api');
    
  } catch (error) {
    console.error('\n❌ EROARE ÎN SUITE-UL DE TESTE:', error.message);
    process.exit(1);
  }
}

// Rulează testele dacă scriptul este apelat direct
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };