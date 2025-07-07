const { MongoClient } = require('mongodb');

async function verifyMongoDBConnection() {
  // Read MongoDB URI from .env file
  const fs = require('fs');
  const path = require('path');
  
  let MONGO_URI;
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const mongoUriMatch = envContent.match(/MONGO_URI=(.+)/);
    if (mongoUriMatch && mongoUriMatch[1]) {
      MONGO_URI = mongoUriMatch[1].trim();
    } else {
      throw new Error('MONGO_URI not found in .env file');
    }
  } catch (error) {
    console.error('❌ Error reading .env file:', error.message);
    console.log('Using default MongoDB URI as fallback');
    MONGO_URI = 'mongodb+srv://admin:1234@cluster0.sf0fds9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  }
  
  console.log('🔍 Verificare conexiune MongoDB...\n');
  
  try {
    console.log('🔗 Conectare la MongoDB Atlas...');
    const client = new MongoClient(MONGO_URI);
    
    // Test conexiune
    await client.connect();
    console.log('✅ Conexiune MongoDB stabilită cu succes!');
    
    // Test ping
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Ping MongoDB reușit!');
    
    // Verifică baza de date
    const db = client.db('tecsa');
    console.log('✅ Conectat la baza de date "tecsa"');
    
    // Listează colecțiile existente
    const collections = await db.listCollections().toArray();
    console.log(`✅ Colecții găsite: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📋 Colecții disponibile:');
      collections.forEach(collection => {
        console.log(`   - ${collection.name}`);
      });
    }
    
    // Verifică utilizatorii
    try {
      const usersCollection = db.collection('users');
      const userCount = await usersCollection.countDocuments();
      console.log(`👥 Utilizatori în baza de date: ${userCount}`);
      
      if (userCount > 0) {
        const users = await usersCollection.find({}, { 
          projection: { username: 1, email: 1, role: 1, isActive: 1 } 
        }).toArray();
        
        console.log('📋 Utilizatori existenți:');
        users.forEach(user => {
          console.log(`   - ${user.username} (${user.role}) - ${user.email} - ${user.isActive ? 'Activ' : 'Inactiv'}`);
        });
      }
    } catch (error) {
      console.log('⚠️ Nu s-au putut încărca utilizatorii (colecția nu există încă)');
    }
    
    // Verifică alte colecții
    const collections_to_check = ['devices', 'zones', 'cardtemplates', 'layouts'];
    for (const collectionName of collections_to_check) {
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`📊 ${collectionName}: ${count} documente`);
      } catch (error) {
        console.log(`⚠️ ${collectionName}: colecția nu există încă`);
      }
    }
    
    // Test scriere
    console.log('\n🧪 Test scriere în baza de date...');
    const testCollection = db.collection('connection_test');
    const testDoc = {
      timestamp: new Date(),
      test: 'MongoDB connection verification',
      success: true
    };
    
    await testCollection.insertOne(testDoc);
    console.log('✅ Test scriere reușit!');
    
    // Curăță testul
    await testCollection.deleteOne({ _id: testDoc._id });
    console.log('✅ Test cleanup reușit!');
    
    await client.close();
    console.log('🔌 Conexiune închisă cu succes');
    
    console.log('\n🎉 MONGODB ESTE COMPLET FUNCȚIONAL!');
    console.log('✅ Conexiunea este stabilă');
    console.log('✅ Operațiile de citire funcționează');
    console.log('✅ Operațiile de scriere funcționează');
    console.log('✅ Baza de date "tecsa" este accesibilă');
    
    return true;
    
  } catch (error) {
    console.error('❌ Eroare conexiune MongoDB:', error.message);
    console.log('\n🔧 Soluții posibile:');
    console.log('   1. Verifică conexiunea la internet');
    console.log('   2. Verifică credențialele MongoDB Atlas');
    console.log('   3. Verifică whitelist-ul IP în MongoDB Atlas');
    console.log('   4. Verifică firewall-ul local');
    
    return false;
  }
}

// Rulează verificarea
if (require.main === module) {
  verifyMongoDBConnection().then(success => {
    if (success) {
      console.log('\n🚀 Poți porni aplicația cu: npm run start:dev');
    } else {
      console.log('\n❌ Rezolvă problemele de conexiune înainte de a porni aplicația');
      process.exit(1);
    }
  });
}

module.exports = { verifyMongoDBConnection };