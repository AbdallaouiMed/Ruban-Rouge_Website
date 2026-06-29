const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

async function testNotionConnection() {
  console.log('Testing Notion connection...\n');

  // Check if variables exist
  console.log('Environment Variables:');
  console.log('NOTION_TOKEN:', process.env.NOTION_TOKEN ? '✓ Set' : '✗ Missing');
  console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID ? '✓ Set' : '✗ Missing');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Missing');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing');
  console.log();

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    console.error('❌ Missing Notion credentials');
    return;
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    // Try to retrieve the database
    console.log('Testing database access...');
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log('✅ Database connection successful!');
    console.log('Database title:', database.title[0]?.plain_text || 'Untitled');
    console.log('\nDatabase properties:');
    Object.keys(database.properties).forEach(prop => {
      console.log(`  - ${prop}: ${database.properties[prop].type}`);
    });

    // Try to create a test entry
    console.log('\nTesting entry creation...');
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        'Nom complet': {
          title: [{ text: { content: 'TEST - Please Delete' } }],
        },
        'Contact Email': {
          email: 'test@example.com',
        },
        'Téléphone': {
          phone_number: '+1234567890',
        },
        'Date de soumission': {
          date: { start: new Date().toISOString() },
        },
        'Form Source': {
          select: { name: 'Contact' },
        },
        'message': {
          rich_text: [{ text: { content: 'This is a test message' } }],
        },
      },
    });

    console.log('✅ Test entry created successfully!');
    console.log('Entry ID:', response.id);
    console.log('\n⚠️  Please delete the test entry from your Notion database');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'unauthorized') {
      console.error('   → Check your NOTION_TOKEN is correct');
    } else if (error.code === 'object_not_found') {
      console.error('   → Check your NOTION_DATABASE_ID is correct');
    } else {
      console.error('   → Full error:', error);
    }
  }
}

testNotionConnection();
