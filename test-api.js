// Simple test script to verify the API endpoint
const testContactForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+212 6 12 34 56 78',
        message: 'This is a test message from the API test script.',
        formSource: 'Contact',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS! Form submitted successfully');
      console.log('Response:', data);
      console.log('\n📧 Check your email (ruban-rouge@outlook.com) for the notification');
      console.log('📝 Check your Notion database for the new entry');
    } else {
      console.log('❌ ERROR! Form submission failed');
      console.log('Status:', response.status);
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR!');
    console.log('Error:', error.message);
    console.log('\n⚠️ Make sure the dev server is running on http://localhost:3000');
  }
};

testContactForm();
