const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'data', 'sampleData.js');
const content = fs.readFileSync(filePath, 'utf8');

const studentsRegex = /export const students = \s*\[([\s\S]*?)\];/;
const match = content.match(studentsRegex);

if (match) {
    let studentsStr = match[1];
    const entryRegex = /\{ ([\s\S]*?) \}/g;
    
    const updatedStudentsStr = studentsStr.replace(entryRegex, (m, fields) => {
        const collegeIdMatch = fields.match(/collegeId: "(.*?)"/);
        const nameMatch = fields.match(/name: "(.*?)"/);
        const usernameMatch = fields.match(/username: "(.*?)"/);
        const skillrackUrlMatch = fields.match(/skillrackUrl: "(.*?)"/);
        
        if (!collegeIdMatch || !nameMatch || !usernameMatch) return m;
        
        const collegeId = collegeIdMatch[1];
        const name = nameMatch[1];
        const username = usernameMatch[1];
        const skillrackUrl = skillrackUrlMatch ? skillrackUrlMatch[1] : "";
        
        // Generate new components (Realistic ranges based on provided profiles)
        const codeTutor = Math.floor(Math.random() * 250) + 10;
        const codeTracks = Math.floor(Math.random() * 800) + 50;
        const dailyChallenge = Math.floor(Math.random() * 80) + 5;
        const dailyTest = Math.floor(Math.random() * 60) + 2;
        const codeTests = Math.floor(Math.random() * 10);
        
        // Calculate points: (CodeTracks * 2) + (DC * 2) + (DT * 20) + (CodeTests * 30)
        const points = (codeTracks * 2) + (dailyChallenge * 2) + (dailyTest * 20) + (codeTests * 30);
        
        return `{ collegeId: "${collegeId}", name: "${name}", username: "${username}", skillrackUrl: "${skillrackUrl}", codeTutor: ${codeTutor}, codeTracks: ${codeTracks}, dailyChallenge: ${dailyChallenge}, dailyTest: ${dailyTest}, codeTests: ${codeTests}, skillrackPoints: ${points} }`;
    });
    
    const formattedStudents = updatedStudentsStr.split('},').join('},\n  ').trim();
    const newContent = content.replace(studentsRegex, `export const students = [\n  ${formattedStudents}\n];`);
    fs.writeFileSync(filePath, newContent);
    console.log('Updated students in sampleData.js with realistic formula ranges');
} else {
    console.log('Could not find students array');
    process.exit(1);
}
