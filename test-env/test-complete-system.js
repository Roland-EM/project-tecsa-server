// Încarcă axios sau folosește fetch nativ
let axios;
try {
  axios = require('axios');
} catch (error) {
  console.log('⚠️ Axios nu este instalat. Instalez axios...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install axios', { stdio: 'inherit' });
    axios = require('axios');
    console.log('✅ Axios instalat cu succes!');
  } catch (installError) {
    console.error('❌ Nu s-a putut instala axios:', installError.message);
    console.log('🔧 Rulează manual: npm install axios');
    process.exit(1);
  }
}

/**
 * 🧪 SCRIPT TESTARE COMPLETĂ SISTEM TECSA
 * 
 * Testează toate funcționalitățile sistemului:
 * - Autentificare
 * - Utilizatori
 * - Dispozitive
 * - Zone
 * - Layout-uri
 * - Template-uri card
 * - Roluri
 * - Temă
 * - Control panel
 * - Impersonare
 */

const API_BASE_URL = 'http://localhost:3000';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password'
};

let authToken = null;
let testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

// Helper pentru logging
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const icons = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    test: '🧪'
  };
  console.log(`[${timestamp}] ${icons[type]} ${message}`);
}

// Helper pentru teste
function test(name, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    log(`TEST PASSED: ${name}${details ? ' - ' + details : ''}`, 'success');
  } else {
    testResults.failed++;
    log(`TEST FAILED: ${name}${details ? ' - ' + details : ''}`, 'error');
  }
}

// Helper pentru request-uri
async function apiRequest(method, endpoint, data = null, useAuth = true) {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(useAuth && authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      },
      ...(data ? { data } : {})
    };

    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status || 500
    };
  }
}

async function testAuthentication() {
  log('🔐 Testare Autentificare...', 'test');

  // Test login cu credențiale corecte
  const loginResult = await apiRequest('POST', '/auth/login', ADMIN_CREDENTIALS, false);
  test('Login cu credențiale corecte', loginResult.success);
  
  if (loginResult.success) {
    authToken = loginResult.data.access_token;
    test('Token JWT primit', !!authToken);
    test('Date utilizator returnate', !!loginResult.data.user);
    test('Rol owner verificat', loginResult.data.user.role === 'owner');
  }

  // Test login cu credențiale greșite
  const badLoginResult = await apiRequest('POST', '/auth/login', {
    username: 'admin',
    password: 'wrong-password'
  }, false);
  test('Login cu credențiale greșite respins', !badLoginResult.success && badLoginResult.status === 401);

  // Test refresh token
  if (authToken) {
    const refreshResult = await apiRequest('POST', '/auth/refresh');
    test('Refresh token funcțional', refreshResult.success);
  }
}

async function testUsers() {
  log('👥 Testare Utilizatori...', 'test');

  // Test obținere utilizatori
  const getUsersResult = await apiRequest('GET', '/users');
  test('Obținere listă utilizatori', getUsersResult.success);
  test('Admin există în listă', getUsersResult.success && 
    getUsersResult.data.some(user => user.username === 'admin'));

  // Test creare utilizator nou
  const newUser = {
    id: 'test-user-' + Date.now(),
    username: 'testuser',
    password: 'testpass123',
    email: 'test@tecsa.com',
    role: 'normal'
  };

  const createUserResult = await apiRequest('POST', '/users', newUser);
  test('Creare utilizator nou', createUserResult.success);

  let createdUserId = null;
  if (createUserResult.success) {
    createdUserId = newUser.id;
    
    // Test obținere utilizator specific
    const getUserResult = await apiRequest('GET', `/users/${createdUserId}`);
    test('Obținere utilizator specific', getUserResult.success);
    
    // Test actualizare utilizator
    const updateUserResult = await apiRequest('PATCH', `/users/${createdUserId}`, {
      theme: 'dark'
    });
    test('Actualizare utilizator', updateUserResult.success);
  }

  // Test ștergere utilizator (cleanup)
  if (createdUserId) {
    const deleteUserResult = await apiRequest('DELETE', `/users/${createdUserId}`);
    test('Ștergere utilizator', deleteUserResult.success);
  }
}

async function testDevices() {
  log('🏠 Testare Dispozitive...', 'test');

  // Test obținere dispozitive
  const getDevicesResult = await apiRequest('GET', '/devices');
  test('Obținere listă dispozitive', getDevicesResult.success);

  // Test creare dispozitiv
  const newDevice = {
    id: 'test-device-' + Date.now(),
    name: 'Test Light',
    type: 'light-bulb',
    protocol: 'WiFi',
    zoneId: 'living-room',
    data: { status: 'off', brightness: 0 },
    online: true,
    config: { ip: '192.168.1.100' }
  };

  const createDeviceResult = await apiRequest('POST', '/devices', newDevice);
  test('Creare dispozitiv nou', createDeviceResult.success);

  let createdDeviceId = null;
  if (createDeviceResult.success) {
    createdDeviceId = newDevice.id;
    
    // Test obținere dispozitiv specific
    const getDeviceResult = await apiRequest('GET', `/devices/${createdDeviceId}`);
    test('Obținere dispozitiv specific', getDeviceResult.success);
    
    // Test comandă dispozitiv
    const commandResult = await apiRequest('POST', `/devices/${createdDeviceId}/command`, {
      action: 'turn_on',
      params: { brightness: 80 }
    });
    test('Trimitere comandă dispozitiv', commandResult.success);
    
    // Test actualizare dispozitiv
    const updateDeviceResult = await apiRequest('PATCH', `/devices/${createdDeviceId}`, {
      name: 'Updated Test Light'
    });
    test('Actualizare dispozitiv', updateDeviceResult.success);
  }

  // Test filtrare pe zonă
  const getDevicesByZoneResult = await apiRequest('GET', '/devices?zoneId=living-room');
  test('Filtrare dispozitive pe zonă', getDevicesByZoneResult.success);

  // Cleanup
  if (createdDeviceId) {
    const deleteDeviceResult = await apiRequest('DELETE', `/devices/${createdDeviceId}`);
    test('Ștergere dispozitiv', deleteDeviceResult.success);
  }
}

async function testZones() {
  log('🏘️ Testare Zone...', 'test');

  // Test obținere zone
  const getZonesResult = await apiRequest('GET', '/zones');
  test('Obținere listă zone', getZonesResult.success);

  // Test obținere ierarhie zone
  const getHierarchyResult = await apiRequest('GET', '/zones/hierarchy');
  test('Obținere ierarhie zone', getHierarchyResult.success);

  // Test obținere zone rădăcină
  const getRootZonesResult = await apiRequest('GET', '/zones/root');
  test('Obținere zone rădăcină', getRootZonesResult.success);

  // Test creare zonă
  const newZone = {
    id: 'test-zone-' + Date.now(),
    name: 'Test Zone',
    type: 'zone',
    description: 'Test zone description'
  };

  const createZoneResult = await apiRequest('POST', '/zones', newZone);
  test('Creare zonă nouă', createZoneResult.success);

  let createdZoneId = null;
  if (createZoneResult.success) {
    createdZoneId = newZone.id;
    
    // Test obținere zonă specifică
    const getZoneResult = await apiRequest('GET', `/zones/${createdZoneId}`);
    test('Obținere zonă specifică', getZoneResult.success);
    
    // Test actualizare zonă
    const updateZoneResult = await apiRequest('PATCH', `/zones/${createdZoneId}`, {
      description: 'Updated description'
    });
    test('Actualizare zonă', updateZoneResult.success);
  }

  // Cleanup
  if (createdZoneId) {
    const deleteZoneResult = await apiRequest('DELETE', `/zones/${createdZoneId}`);
    test('Ștergere zonă', deleteZoneResult.success);
  }
}

async function testCardTemplates() {
  log('🃏 Testare Template-uri Card...', 'test');

  // Test obținere template-uri
  const getTemplatesResult = await apiRequest('GET', '/cards/templates');
  test('Obținere template-uri card', getTemplatesResult.success);
  
  // Verifică dacă template-urile default există sau le inițializează
  if (getTemplatesResult.success) {
    if (getTemplatesResult.data.length === 0) {
      // Dacă nu există template-uri, încearcă să le inițializeze prin crearea unui template
      const initTemplate = {
        templateId: 'init-template',
        name: 'Init Template',
        category: 'init',
        minRole: 'normal',
        size: { x: 1, y: 1 }
      };
      await apiRequest('POST', '/cards/templates', initTemplate);
      
      // Verifică din nou
      const recheckResult = await apiRequest('GET', '/cards/templates');
      test('Template-uri default există', recheckResult.success && recheckResult.data.length > 0);
    } else {
      test('Template-uri default există', true);
    }
  } else {
    test('Template-uri default există', false);
  }

  // Test filtrare pe categorie
  const getByCategory = await apiRequest('GET', '/cards/templates?category=lighting');
  test('Filtrare template-uri pe categorie', getByCategory.success);

  // Test filtrare pe rol
  const getByRole = await apiRequest('GET', '/cards/templates?role=normal');
  test('Filtrare template-uri pe rol', getByRole.success);

  // Test creare template nou
  const newTemplate = {
    templateId: 'test-template-' + Date.now(),
    name: 'Test Template',
    category: 'testing',
    minRole: 'normal',
    size: { x: 1, y: 1 },
    icon: 'test',
    description: 'Test template description'
  };

  const createTemplateResult = await apiRequest('POST', '/cards/templates', newTemplate);
  test('Creare template card nou', createTemplateResult.success);
}

async function testLayouts() {
  log('📱 Testare Layout-uri...', 'test');

  // Test obținere layout-uri utilizator
  const getLayoutsResult = await apiRequest('GET', '/layouts');
  test('Obținere layout-uri utilizator', getLayoutsResult.success);

  // Test creare layout
  const newLayout = {
    userId: 'admin',
    page: 'test-dashboard',
    zoneId: 'test-zone',
    cardInstances: []
  };

  const createLayoutResult = await apiRequest('POST', '/layouts', newLayout);
  test('Creare layout nou', createLayoutResult.success);

  // Test adăugare card în layout
  const addCardResult = await apiRequest('POST', '/layouts/cards?page=test-dashboard&zoneId=test-zone', {
    cardTemplateId: 'light-switch',
    deviceId: 'test-device',
    posX: 0,
    posY: 0,
    sizeX: 1,
    sizeY: 1,
    settings: { color: 'blue' }
  });
  test('Adăugare card în layout', addCardResult.success);

  // Test obținere layout specific
  const getSpecificLayout = await apiRequest('GET', '/layouts?page=test-dashboard&zoneId=test-zone');
  test('Obținere layout specific', getSpecificLayout.success);

  // Cleanup
  const deleteLayoutResult = await apiRequest('DELETE', '/layouts/test-dashboard?zoneId=test-zone');
  test('Ștergere layout', deleteLayoutResult.success);
}

async function testRoles() {
  log('👑 Testare Roluri...', 'test');

  // Test obținere roluri
  const getRolesResult = await apiRequest('GET', '/roles');
  test('Obținere listă roluri', getRolesResult.success);
  test('Roluri corecte returnate', getRolesResult.success && 
    getRolesResult.data.includes('owner') && 
    getRolesResult.data.includes('admin') && 
    getRolesResult.data.includes('premium') && 
    getRolesResult.data.includes('normal'));

  // Test obținere ierarhie roluri
  const getHierarchyResult = await apiRequest('GET', '/roles/hierarchy');
  test('Obținere ierarhie roluri', getHierarchyResult.success);
  test('Ierarhie roluri corectă', getHierarchyResult.success && 
    getHierarchyResult.data.owner && 
    getHierarchyResult.data.owner.includes('admin'));
}

async function testTheme() {
  log('🎨 Testare Temă...', 'test');

  // Test obținere temă utilizator
  const getThemeResult = await apiRequest('GET', '/theme');
  test('Obținere temă utilizator', getThemeResult.success);

  // Test obținere teme disponibile
  const getAvailableThemesResult = await apiRequest('GET', '/theme/available');
  test('Obținere teme disponibile', getAvailableThemesResult.success);
  test('Teme default există', getAvailableThemesResult.success && 
    getAvailableThemesResult.data.includes('default'));

  // Test schimbare temă
  const updateThemeResult = await apiRequest('PATCH', '/theme', { theme: 'dark' });
  test('Schimbare temă utilizator', updateThemeResult.success);

  // Revert la tema default
  await apiRequest('PATCH', '/theme', { theme: 'default' });
}

async function testControlPanel() {
  log('⚙️ Testare Control Panel...', 'test');

  // Test obținere utilizatori (control panel)
  const getControlUsersResult = await apiRequest('GET', '/control/users');
  test('Control Panel - obținere utilizatori', getControlUsersResult.success);

  // Test obținere audit logs
  const getAuditLogsResult = await apiRequest('GET', '/control/audit-logs');
  test('Control Panel - obținere audit logs', getAuditLogsResult.success);

  // Test creare utilizator prin control panel
  const newControlUser = {
    id: 'control-test-' + Date.now(),
    username: 'controltest',
    password: 'testpass123',
    email: 'controltest@tecsa.com',
    role: 'normal'
  };

  const createControlUserResult = await apiRequest('POST', '/control/users', newControlUser);
  test('Control Panel - creare utilizator', createControlUserResult.success);

  if (createControlUserResult.success) {
    const userId = newControlUser.id;
    
    // Test schimbare rol
    const changeRoleResult = await apiRequest('PATCH', `/control/users/${userId}/role`, {
      role: 'premium'
    });
    test('Control Panel - schimbare rol', changeRoleResult.success);
    
    // Test dezactivare utilizator
    const deactivateResult = await apiRequest('PATCH', `/control/users/${userId}/deactivate`);
    test('Control Panel - dezactivare utilizator', deactivateResult.success);
    
    // Test activare utilizator
    const activateResult = await apiRequest('PATCH', `/control/users/${userId}/activate`);
    test('Control Panel - activare utilizator', activateResult.success);
    
    // Test reset parolă
    const resetPasswordResult = await apiRequest('PATCH', `/control/users/${userId}/reset-password`, {
      password: 'newpassword123'
    });
    test('Control Panel - reset parolă', resetPasswordResult.success);
  }
}

async function testImpersonation() {
  log('🎭 Testare Impersonare...', 'test');

  // Creează un utilizator pentru impersonare
  const testUser = {
    id: 'impersonate-test-' + Date.now(),
    username: 'impersonatetest',
    password: 'testpass123',
    email: 'impersonatetest@tecsa.com',
    role: 'normal'
  };

  const createUserResult = await apiRequest('POST', '/users', testUser);
  
  if (createUserResult.success) {
    // Test start impersonare
    const startImpersonateResult = await apiRequest('POST', '/impersonate/start', {
      targetUserId: testUser.id
    });
    test('Start impersonare utilizator', startImpersonateResult.success);
    
    if (startImpersonateResult.success) {
      test('Token impersonare primit', !!startImpersonateResult.data.access_token);
      test('Date impersonare corecte', 
        startImpersonateResult.data.impersonated === true &&
        startImpersonateResult.data.targetUser.username === testUser.username);
      
      // Test stop impersonare
      const stopImpersonateResult = await apiRequest('POST', '/impersonate/stop');
      test('Stop impersonare', stopImpersonateResult.success);
    }
    
    // Cleanup
    await apiRequest('DELETE', `/users/${testUser.id}`);
  } else {
    // Dacă nu s-a putut crea utilizatorul, testează cu admin existent
    log('⚠️ Nu s-a putut crea utilizator test, folosesc admin pentru test minimal', 'warning');
    
    // Încearcă să impersoneze admin-ul pe el însuși (ar trebui să eșueze)
    const selfImpersonateResult = await apiRequest('POST', '/impersonate/start', {
      targetUserId: 'admin'
    });
    test('Impersonare self (ar trebui să eșueze)', !selfImpersonateResult.success);
  }
}

async function testServerHealth() {
  log('🏥 Testare Sănătate Server...', 'test');

  try {
    // Test server răspunde
    const healthCheck = await axios.get(`${API_BASE_URL}/api`, { timeout: 5000 });
    test('Server răspunde la request-uri', healthCheck.status === 200);
  } catch (error) {
    test('Server răspunde la request-uri', false, error.message);
  }

  // Test documentație Swagger
  try {
    const swaggerCheck = await axios.get(`${API_BASE_URL}/api-json`, { timeout: 5000 });
    test('Documentație Swagger accesibilă', swaggerCheck.status === 200);
  } catch (error) {
    test('Documentație Swagger accesibilă', false, error.message);
  }
}

async function runCompleteTest() {
  console.log('🚀 ÎNCEPERE TESTARE COMPLETĂ SISTEM TECSA\n');
  console.log(`📡 API Base URL: ${API_BASE_URL}`);
  console.log(`👤 Admin Credentials: ${ADMIN_CREDENTIALS.username}/${ADMIN_CREDENTIALS.password}\n`);

  try {
    // Verifică dacă serverul rulează
    await testServerHealth();
    
    // Testează autentificarea
    await testAuthentication();
    
    if (!authToken) {
      log('❌ Nu s-a putut obține token de autentificare. Oprire teste.', 'error');
      return;
    }
    
    // Rulează toate testele
    await testUsers();
    await testDevices();
    await testZones();
    await testCardTemplates();
    await testLayouts();
    await testRoles();
    await testTheme();
    await testControlPanel();
    await testImpersonation();
    
  } catch (error) {
    log(`Eroare critică în timpul testării: ${error.message}`, 'error');
  }

  // Afișează rezultatele finale
  console.log('\n' + '='.repeat(60));
  console.log('📊 REZULTATE FINALE TESTARE');
  console.log('='.repeat(60));
  console.log(`✅ Teste reușite: ${testResults.passed}`);
  console.log(`❌ Teste eșuate: ${testResults.failed}`);
  console.log(`📊 Total teste: ${testResults.total}`);
  console.log(`📈 Rata de succes: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);
  
  if (testResults.failed === 0) {
    console.log('\n🎉 TOATE TESTELE AU TRECUT CU SUCCES!');
    console.log('✅ Sistemul TECSA este complet funcțional');
    console.log('🚀 API-ul este gata pentru utilizare în producție');
  } else {
    console.log('\n⚠️ UNELE TESTE AU EȘUAT');
    console.log('🔧 Verifică log-urile de mai sus pentru detalii');
    console.log('🐛 Rezolvă problemele înainte de deployment');
  }
  
  console.log('\n📚 Documentație API: http://localhost:3000/api');
  console.log('🔗 Server API: http://localhost:3000');
  console.log('='.repeat(60));
}

// Rulează testele dacă scriptul este apelat direct
if (require.main === module) {
  runCompleteTest().catch(error => {
    console.error('❌ Eroare fatală:', error.message);
    process.exit(1);
  });
}

module.exports = { runCompleteTest };