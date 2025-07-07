const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

/**
 * 🔧 SCRIPT CREARE ADMIN
 * 
 * Acest script creează un utilizator admin în baza de date MongoDB.
 * Utilizează-l pentru a crea primul admin după setup-ul inițial.
 */

async function createAdmin() {
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
  
  const client = new MongoClient(MONGO_URI);
  
  try {
    console.log('🔗 Conectare la MongoDB...');
    await client.connect();
    
    const db = client.db('tecsa');
    
    // Verifică dacă admin-ul există deja
    const existingAdmin = await db.collection('users').findOne({ 
      $or: [{ username: 'admin' }, { id: 'admin' }] 
    });
    
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists!');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      return;
    }
    
    // Creează hash pentru parola "1234"
    const hashedPassword = await bcrypt.hash('1234', 10);
    
    const admin = {
      id: "admin",
      username: "admin",
      passwordHash: hashedPassword,
      email: "admin@tecsa.com",
      role: "owner",
      theme: "default",
      isActive: true,
      dateRegistered: new Date(),
      phone: "+40123456789",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('users').insertOne(admin);
    console.log('✅ Admin user created successfully!');
    console.log('📋 ADMIN CREDENTIALS:');
    console.log('   Username: admin');
    console.log('   Password: 1234');
    console.log('   Email: admin@tecsa.com');
    console.log('   Role: owner');
    console.log('');
    console.log('🔐 IMPORTANT: Schimbă parola după primul login!');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Verifică dacă scriptul este rulat direct
if (require.main === module) {
  createAdmin();
}

module.exports = { createAdmin };