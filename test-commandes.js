// Test script for Commandes form
const testCommandesForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test Customer',
        email: 'customer@example.com',
        phone: '+212 6 12 34 56 78',
        message: 'I would like to order a custom birthday cake for 20 people.',
        formSource: 'Commandes',
        eventDate: '2026-05-15',
        eventType: 'birthday',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS! Commandes form submitted successfully');
      console.log('Response:', data);
      console.log('\n📝 Check your Notion database for the new entry');
      console.log('\nNote: Event Date and Event Type are NOT saved to Notion (columns don\'t exist)');
      console.log('They are only included in the email notification when SMTP is enabled.');
    } else {
      console.log('❌ ERROR! Commandes form submission failed');
      console.log('Status:', response.status);
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR!');
    console.log('Error:', error.message);
    console.log('\n⚠️ Make sure the dev server is running on http://localhost:3000');
  }
};

testCommandesForm();
