// Contrasenya del dossier de patrocini (/patrocini).
// Es guarda només el hash SHA-256 (hex), no la contrasenya. Per canviar-la:
//   node scripts/hash-password.mjs <nova contrasenya>
// i enganxa aquí el resultat. Protecció bàsica: evita visites casuals, no un atac tècnic.
export const PATROCINI_HASH = '255f01ba12a17a8085f87a80b253206394cab736ee40a8633d4a970827d05f8c';
