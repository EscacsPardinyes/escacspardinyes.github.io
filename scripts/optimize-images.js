import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { globSync } from 'glob';

// Configuration
const PUBLIC_IMG_DIR = path.resolve('public/img');
const SRC_DIR = path.resolve('src');
const HTML_FILE = path.resolve('index.html');
// Icons used by the PWA manifest / apple-touch-icon must stay PNG
const KEEP_PNG_DIR = path.join(PUBLIC_IMG_DIR, 'icons');
// WebP heavier than this gets resized/re-encoded
const MAX_WIDTH = 1600;
const HEAVY_WEBP_BYTES = 250 * 1024;

async function optimizeImages() {
    console.log('🚀 Iniciant optimització d\'imatges...');

    // Trobar tots els PNG, JPG, JPEG dins de public/img/
    // Utilitzem forward slashes per a glob, fins i tot a Windows
    const searchPattern = PUBLIC_IMG_DIR.replace(/\\/g, '/') + '/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}';
    const files = globSync(searchPattern).filter(f => !path.resolve(f).startsWith(KEEP_PNG_DIR));

    if (files.length === 0) {
        console.log('✅ Cap imatge PNG o JPG trobada. Ja està tot en format WebP!');
        await shrinkHeavyWebp();
        return;
    }

    console.log(`🔍 S'han trobat ${files.length} imatges pesades per optimitzar.`);

    let convertedCount = 0;
    let savedBytes = 0;

    for (const filePath of files) {
        const fileExt = path.extname(filePath);
        const webpPath = filePath.replace(new RegExp(`${fileExt}$`, 'i'), '.webp');
        
        try {
            const originalSize = fs.statSync(filePath).size;
            
            // Convertir a WebP
            await sharp(filePath)
                .rotate() // apply EXIF orientation (phone photos)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(webpPath);
                
            const newSize = fs.statSync(webpPath).size;
            savedBytes += (originalSize - newSize);
            convertedCount++;
            
            // Esborrar arxiu original
            fs.unlinkSync(filePath);
            
            console.log(`✅ Convertit: ${path.basename(filePath)} -> ${path.basename(webpPath)} (-${((originalSize - newSize) / 1024).toFixed(2)} KB)`);
            
            // Actualitzar referències al codi
            updateReferencesInSource(filePath, webpPath);
            
        } catch (error) {
            console.error(`❌ Error convertint ${filePath}:`, error);
        }
    }

    console.log(`\n🎉 Optimització completada!`);
    console.log(`📷 Imatges convertides: ${convertedCount}`);
    console.log(`💾 Espai estalviat al disc: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);

    await shrinkHeavyWebp();
}

// Re-encode WebP that are too wide or too heavy (same path, so no references change)
async function shrinkHeavyWebp() {
    const files = globSync(PUBLIC_IMG_DIR.replace(/\\/g, '/') + '/**/*.webp');
    let shrunkCount = 0;
    let savedBytes = 0;

    for (const filePath of files) {
        try {
            // Read into memory: on Windows sharp keeps the file locked and it can't be overwritten
            const input = fs.readFileSync(filePath);
            const originalSize = input.length;
            const { width, pages } = await sharp(input).metadata();
            if (pages > 1) continue; // animated: leave as is
            if (width <= MAX_WIDTH && originalSize <= HEAVY_WEBP_BYTES) continue;

            const buffer = await sharp(input)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: 75 })
                .toBuffer();

            // Only keep the result if it is actually lighter
            if (buffer.length >= originalSize) continue;
            fs.writeFileSync(filePath, buffer);
            savedBytes += originalSize - buffer.length;
            shrunkCount++;
            console.log(`🗜️  Reduït: ${path.relative(PUBLIC_IMG_DIR, filePath)} (${(originalSize / 1024).toFixed(0)} KB -> ${(buffer.length / 1024).toFixed(0)} KB)`);
        } catch (error) {
            console.error(`❌ Error reduint ${filePath}:`, error);
        }
    }

    console.log(`\n🗜️  WebP reduïts: ${shrunkCount} (-${(savedBytes / 1024 / 1024).toFixed(2)} MB)`);
}

function updateReferencesInSource(oldFilePath, newFilePath) {
    const oldFileName = path.basename(oldFilePath);
    const newFileName = path.basename(newFilePath);
    
    // Buscar a tots els arxius de codi font
    const srcPattern = SRC_DIR.replace(/\\/g, '/') + '/**/*.{jsx,js,css}';
    const sourceFiles = globSync(srcPattern).concat([HTML_FILE.replace(/\\/g, '/')]);
    
    let updatedFilesCount = 0;
    
    for (const srcFile of sourceFiles) {
        try {
            let content = fs.readFileSync(srcFile, 'utf8');
            // Busca exactament el nom vell de l'arxiu (ex: foto.png) i el canvia (foto.webp)
            // Afegim escapeRegExp per si de cas
            const escapedOldName = oldFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedOldName, 'g');
            
            if (regex.test(content)) {
                content = content.replace(regex, newFileName);
                fs.writeFileSync(srcFile, content, 'utf8');
                updatedFilesCount++;
            }
        } catch {
            // Ignorar arxius que no es puguin llegir bé
        }
    }
    
    if (updatedFilesCount > 0) {
        console.log(`   🔄 S'han actualitzat ${updatedFilesCount} línies de codi on hi sortia ${oldFileName}`);
    }
}

optimizeImages();
