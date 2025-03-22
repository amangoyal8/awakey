import axios from 'axios';

export async function translateText(text: string, targetLang: 'hi' | 'en') {
  try {
    const res = await axios.post('https://cors-anywhere.herokuapp.com/https://libretranslate.de/translate', {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}
