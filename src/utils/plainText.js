// Emojis and zero-width characters add noise to search titles, descriptions, alt texts and
// structured data: strip them (news titles keep their emoji on the page itself)
const EMOJI = /[\p{Extended_Pictographic}\uFE0F\u200B\u200D]/gu;

export function stripEmoji(text) {
    return (text || '').replace(EMOJI, '').replace(/\s+/g, ' ').trim();
}
