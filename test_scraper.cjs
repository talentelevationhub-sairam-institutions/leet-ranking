const axios = require('axios');

async function testProxy() {
    const proxyUrl = 'http://localhost:5001/scrape';
    
    // Test profile URL
    const profileUrl = 'http://www.skillrack.com/profile/403221/6b06052b09d1987d29a47c8e5be8637452b5e1aa';
    console.log('Testing proxy with profile URL...');
    const r1 = await axios.get(proxyUrl + '?url=' + encodeURIComponent(profileUrl));
    console.log('Kiruppazhini S (profile):', JSON.stringify(r1.data, null, 2));
    
    // Verify calculation: (722*2) + (59*2) + (43*20) + (9*30) = 1444 + 118 + 860 + 270 = 2692
    console.log('Expected points: 2692, Got:', r1.data.skillrackPoints);
    
    // Test resume URL
    const resumeUrl = 'https://www.skillrack.com/faces/resume.xhtml?id=402794&key=aa888a2d46c15b27933c15c2e216e67f96f2041c';
    console.log('\nTesting proxy with resume URL...');
    const r2 = await axios.get(proxyUrl + '?url=' + encodeURIComponent(resumeUrl));
    console.log('Abubacker S (resume):', JSON.stringify(r2.data, null, 2));
    
    // Verify: (1476*2) + (560*2) + (509*20) + (16*30) = 2952 + 1120 + 10180 + 480 = 14732
    console.log('Expected points: 14732, Got:', r2.data.skillrackPoints);
}

testProxy().catch(e => console.error('Error:', e.message));
