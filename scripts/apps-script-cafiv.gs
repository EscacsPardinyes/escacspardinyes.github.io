// Google Apps Script per desar les inscripcions del Torneig 30 anys Biblioteca CAFIV.
// 1. Crea un Google Sheets nou. Extensions > Apps Script. Enganxa aquest codi.
// 2. Desplega > Nou desplegament > Aplicacio web:
//      Executa com: jo | Qui hi te acces: Qualsevol
// 3. Copia la URL (acaba en /exec) a CAFIV_SCRIPT_URL de src/components/CafivForm.jsx.
// Cada cop que canviis el codi cal fer un desplegament nou.

const HEADERS = ['Data', 'Nom i cognoms', 'Email', 'Telèfon', 'Estudiant UdL', 'Federat', 'Privacitat'];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

  const d = JSON.parse(e.postData.contents);
  // Apostrofa les cel·les que comencen per =, +, - o @ per evitar formules injectades
  const safe = (v) => /^[=+\-@]/.test(String(v || '')) ? "'" + v : (v || '');

  sheet.appendRow([
    new Date(),
    safe(d.name),
    safe(d.email),
    safe(d.phone),
    safe(d.udl_student),
    safe(d.federated),
    d.privacy ? 'Acceptada' : ''
  ]);

  return ContentService.createTextOutput('ok');
}
