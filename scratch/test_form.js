
async function testForm() {
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('message', 'This is a test message');
    
    try {
        console.log('Sending request...');
        const response = await fetch('https://formsubmit.co/ajax/escacspardinyes@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: "Test",
                email: "test@example.com",
                message: "Test message"
            })
        });
        
        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testForm();
