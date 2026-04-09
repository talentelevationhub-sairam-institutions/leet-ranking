const fs = require('fs');
const path = require('path');

// Mapping from username to collegeId (from user's data)
const collegeIdMap = {
  "nav-abubacker": "SEC22AD081",
  "bastin_ai": "SEC22AD129",
  "404error_hari": "SEC22AD064",
  "balamanoharan77": "SEC22AD115",
  "Egadarshan": "SEC22AD030",
  "priyavasudevan": "SEC22AD062",
  "Kabilan_1904": "SEC22AD088",
  "Logadeepak": "SEC22AD048",
  "nishanth_2707": "SEC22AD157",
  "RajkumarMohan": "SEC22AD102",
  "Sandhyaprabakaran": "SEC22AD012",
  "yaminiDKS": "SEC22AD083",
  "ADITYA R": "SEC22AM046",
  "guru_prassandh": "SEC22AM002",
  "jayachandiran_k": "SEC22AM047",
  "KaviVarshini J": "SEC22AM044",
  "kiru_04": "SEC22AM028",
  "A_Muthurama": "SEC22AM037",
  "Sachin_MP": "SEC22AM027",
  "Adharsha_02": "SEC22CB049",
  "Livinesh_L": "SEC22CB078",
  "sachetk": "SEC22CB083",
  "Tharun_ak091": "SEC22CB091",
  "mvh_31": "SEC22CB051",
  "6VV7DkHVaS": "SEC22CB106",
  "VPHarish": "SEC22CS136",
  "Kavya_Aramuthan": "SEC22CS137",
  "Kiruppa": "SEC22CS082",
  "krish2213": "SEC22CS083",
  "savithan11a1c": "SEC22CS075",
  "Dhana_Vidhya": "SEC22CS116",
  "creatord_2104": "SEC22CS111",
  "Harinarayanan0809": "SEC22CS109",
  "gooogle5810": "SEC22CS055",
  "cHdYAyMPbo": "SEC22CS079",
  "resh-27": "SEC22CS077",
  "Deepak_baskaran": "PROBLEMS",
  "jeyasri_02": "SEC22CS",
  "rebecca_c": "SEC22CS064",
  "skshanthakumar": "SEC22CS117",
  "raghul-dayanithi": "SEC22EC233",
  "SwethaAnbalagan28": "SEC22EC118",
  "Jenitaregi_KG": "SEC22EC183",
  "Nivetha_G_codes": "SEC22EC076",
  "aadhi_alangaram": "SEC22EI043",
  "anushreenarayanan005": "SEC22CI018",
  "Prasanna1717": "SEC22CI001",
  "rash2407_": "SEC22CI042",
  "x84qebNIX2": "SEC22CI035",
  "Shreeja_1318": "SEC22CI007",
  "Dhanushini_D": "SEC22IT061",
  "Jagii-23": "SEC22IT013",
  "Sahana_Shri_A": "SEC22IT114",
  "SARAVANAKUMAR_R": "SEC22IT132",
  "Ajay8300": "SEC22IT127",
  "siva_2005": "SEC22IT056",
  "karthik_77": "SEC22IT064",
  "shivanandhini": "SEC22IT128",
  "Gowtham_PN": "SEC22IT137",
  "WingsOfFire2004": "SEC22IT059",
  "divy_1234": "SEC22MU032",
  "xterious": "SEC21CJ057",
  "majestymewtwo": "SEC21CJ037",
  "Shri_1504": "SEC21CJ046",
  "sundarwatto": "SEC21CJ049",
  "ManoSriRamK": "SIT22AD056",
  "mukesh_2605": "SIT22AD076",
  "Pavithra-B": "SIT22AD063",
  "Nivetha_A12": "SIT22AD046",
  "Oviii_yaa24": "SIT22AD080",
  "Priya_shree": "SIT22AD098",
  "sanjitha_s8": "SIT22AD077",
  "Akshay-B": "SIT22CO003",
  "MurugappanP": "SIT22CO050",
  "pradeepsv": "SIT22CO019",
  "Rahul_J1011": "SIT22CO032",
  "YOGANANDAM-V": "SIT22CO030",
  "Aswin1913": "SIT22CS095",
  "khoshikperumals": "SIT22CS009",
  "rakshakl2104": "SIT22CS076",
  "udhaya_kiran": "SIT22CS138",
  "NithyaSree0920": "SIT22CS115",
  "Abinesh_S_7": "SIT22CS109",
  "BALAMURUGAN3125": "SIT22CS151",
  "Bhagyashree1212": "SIT22CS078",
  "KirthanaMohanR": "SIT22CS054",
  "mounish_24_02": "SIT22EC064",
  "": "SIT22EC056", // Naveen Prasad R - no username
  "psathishkumar17": "SIT22EC084",
  "rithiga_04": "SIT22EC054",
  "anitha25": "SIT22EE031",
  "abinayam_27": "SIT22IT080",
  "bathrivijay05": "SIT22IT177",
  "Saivarshaa": "SIT22IT132",
  "Swasel2205": "SIT22IT008",
  "vasanths17": "SIT22IT141",
  "imantoashwin": "SIT22IT119",
  "Bhuvanesh7": "SIT22IT073",
  "rashim2104": "SIT22IT129",
  "sreeramsr": "SIT22IT145",
  "Anu_sri": "SIT22SC034",
  "sit22sc045": "SIT22SC045",
  "Deva_Kiruba_K": "SIT22SC054",
  "__sujitha__": "SIT22SC030",
  "varsha731": "SIT22SC022",
};

const filePath = path.join(__dirname, 'src', 'data', 'sampleData.js');
let content = fs.readFileSync(filePath, 'utf8');

let updated = 0;
for (const [username, collegeId] of Object.entries(collegeIdMap)) {
  if (!username) continue;
  // Replace collegeId: "undefined" for the matching username
  const regex = new RegExp(
    `(collegeId: )"[^"]*"(, name: "[^"]*", username: "${username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")`,
    'g'
  );
  const before = content;
  content = content.replace(regex, `$1"${collegeId}"$2`);
  if (content !== before) {
    updated++;
    console.log(`✅ Updated ${username} -> ${collegeId}`);
  } else {
    console.log(`⚠️ Not found: ${username}`);
  }
}

fs.writeFileSync(filePath, content);
console.log(`\nDone! Updated ${updated} students.`);
