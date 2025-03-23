
// Enhanced translation utility with support for multiple languages

/**
 * Translates text from one language to another
 * @param text The text to translate
 * @param fromLang The source language code
 * @param toLang The target language code
 * @returns Promise that resolves to the translated text
 */
export const translateText = async (
  text: string,
  fromLang: string,
  toLang: string
): Promise<string> => {
  console.log(`Translating from ${fromLang} to ${toLang}: "${text}"`);
  
  // In a production environment, this would connect to a real translation API
  // such as Google Translate, DeepL, or a fine-tuned MarianMT model
  
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Extract base language codes (without region specifics)
      const baseFromLang = fromLang.split('-')[0];
      const baseToLang = toLang.split('-')[0];
      
      // Dictionary of common phrases in different languages (for demo purposes)
      const commonPhrases: Record<string, Record<string, string>> = {
        'en': {
          'hello': 'hello',
          'thank you': 'thank you',
          'goodbye': 'goodbye',
          'how are you': 'how are you',
          'welcome': 'welcome',
          'please': 'please'
        },
        'es': {
          'hello': 'hola',
          'thank you': 'gracias',
          'goodbye': 'adiós',
          'how are you': 'cómo estás',
          'welcome': 'bienvenido',
          'please': 'por favor'
        },
        'fr': {
          'hello': 'bonjour',
          'thank you': 'merci',
          'goodbye': 'au revoir',
          'how are you': 'comment allez-vous',
          'welcome': 'bienvenue',
          'please': 's\'il vous plaît'
        },
        'de': {
          'hello': 'hallo',
          'thank you': 'danke',
          'goodbye': 'auf wiedersehen',
          'how are you': 'wie geht es dir',
          'welcome': 'willkommen',
          'please': 'bitte'
        },
        'it': {
          'hello': 'ciao',
          'thank you': 'grazie',
          'goodbye': 'arrivederci',
          'how are you': 'come stai',
          'welcome': 'benvenuto',
          'please': 'per favore'
        },
        'pt': {
          'hello': 'olá',
          'thank you': 'obrigado',
          'goodbye': 'adeus',
          'how are you': 'como vai',
          'welcome': 'bem-vindo',
          'please': 'por favor'
        },
        'ru': {
          'hello': 'привет',
          'thank you': 'спасибо',
          'goodbye': 'до свидания',
          'how are you': 'как дела',
          'welcome': 'добро пожаловать',
          'please': 'пожалуйста'
        },
        'zh': {
          'hello': '你好',
          'thank you': '谢谢',
          'goodbye': '再见',
          'how are you': '你好吗',
          'welcome': '欢迎',
          'please': '请'
        },
        'ja': {
          'hello': 'こんにちは',
          'thank you': 'ありがとう',
          'goodbye': 'さようなら',
          'how are you': 'お元気ですか',
          'welcome': 'ようこそ',
          'please': 'お願いします'
        },
        'ko': {
          'hello': '안녕하세요',
          'thank you': '감사합니다',
          'goodbye': '안녕히 가세요',
          'how are you': '어떻게 지내세요',
          'welcome': '환영합니다',
          'please': '부탁합니다'
        },
        'ar': {
          'hello': 'مرحبا',
          'thank you': 'شكرا لك',
          'goodbye': 'مع السلامة',
          'how are you': 'كيف حالك',
          'welcome': 'أهلا بك',
          'please': 'من فضلك'
        },
        'hi': {
          'hello': 'नमस्ते',
          'thank you': 'धन्यवाद',
          'goodbye': 'अलविदा',
          'how are you': 'आप कैसे हैं',
          'welcome': 'स्वागत है',
          'please': 'कृपया'
        },
      };
      
      // For demonstration purposes, try to replace common phrases
      let translatedText = text;
      
      // Process sign language requests differently
      if (baseToLang === 'asl' || baseToLang === 'bsl' || baseToLang === 'isl' || baseToLang === 'lsf' || baseToLang === 'lse') {
        resolve(`[Sign Language Translation - ${toLang}] ${text}`);
        return;
      }
      
      // Handle specific language pairs with our demo dictionary
      if (commonPhrases[baseFromLang] && commonPhrases[baseToLang]) {
        // Try to find and replace common phrases
        const lowerText = text.toLowerCase();
        
        Object.keys(commonPhrases[baseFromLang]).forEach(phrase => {
          if (lowerText.includes(phrase)) {
            const targetPhrase = commonPhrases[baseToLang][phrase];
            if (targetPhrase) {
              // Preserve case if possible
              const regex = new RegExp(phrase, 'gi');
              translatedText = translatedText.replace(regex, targetPhrase);
            }
          }
        });
        
        // If we made any translations, return the result
        if (translatedText !== text) {
          resolve(translatedText);
          return;
        }
      }
      
      // For other languages or if no phrases matched, return a placeholder
      resolve(`(Translation from ${fromLang} to ${toLang}: "${text}")`);
    }, 1000); // Reduced delay for better user experience
  });
};

/**
 * Detect the language of a given text
 * @param text The text to detect language for
 * @returns Promise that resolves to the detected language code
 */
export const detectLanguage = async (text: string): Promise<string> => {
  console.log(`Detecting language for: "${text}"`);
  
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple language detection logic for demonstration purposes
      const lowerText = text.toLowerCase();
      
      // Spanish detection
      if (lowerText.includes('hola') || lowerText.includes('gracias') || lowerText.includes('cómo estás')) {
        resolve('es');
      } 
      // French detection
      else if (lowerText.includes('bonjour') || lowerText.includes('merci') || lowerText.includes('comment allez-vous')) {
        resolve('fr');
      }
      // German detection
      else if (lowerText.includes('hallo') || lowerText.includes('danke') || lowerText.includes('wie geht es dir')) {
        resolve('de');
      }
      // Italian detection
      else if (lowerText.includes('ciao') || lowerText.includes('grazie') || lowerText.includes('come stai')) {
        resolve('it');
      }
      // Portuguese detection
      else if (lowerText.includes('olá') || lowerText.includes('obrigado') || lowerText.includes('como vai')) {
        resolve('pt');
      }
      // Russian detection
      else if (lowerText.includes('привет') || lowerText.includes('спасибо') || lowerText.includes('как дела')) {
        resolve('ru');
      }
      // Chinese detection (simplified characters)
      else if (/[\u4e00-\u9fa5]/.test(text)) {
        resolve('zh');
      }
      // Japanese detection (hiragana, katakana, kanji)
      else if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text)) {
        resolve('ja');
      }
      // Korean detection (Hangul)
      else if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(text)) {
        resolve('ko');
      }
      // Arabic detection
      else if (/[\u0600-\u06FF]/.test(text)) {
        resolve('ar');
      }
      // Hindi detection
      else if (/[\u0900-\u097F]/.test(text)) {
        resolve('hi');
      }
      // Default to English for any other text
      else {
        resolve('en');
      }
    }, 500);
  });
};

/**
 * Gets appropriate language code for text-to-speech
 * Maps our internal language codes to standard BCP-47 language tags for speech synthesis
 * @param langCode Our internal language code
 * @returns BCP-47 language tag for speech synthesis
 */
export const getSpeechSynthesisLang = (langCode: string): string => {
  // Map of our language codes to BCP-47 tags for speech synthesis
  const langMap: Record<string, string> = {
    'en': 'en-US',
    'en-us': 'en-US',
    'en-gb': 'en-GB',
    'es': 'es-ES',
    'es-es': 'es-ES',
    'es-mx': 'es-MX',
    'fr': 'fr-FR',
    'fr-fr': 'fr-FR',
    'fr-ca': 'fr-CA',
    'de': 'de-DE',
    'it': 'it-IT',
    'pt': 'pt-PT',
    'pt-br': 'pt-BR',
    'pt-pt': 'pt-PT',
    'nl': 'nl-NL',
    'pl': 'pl-PL',
    'sv': 'sv-SE',
    'no': 'nb-NO',
    'da': 'da-DK',
    'fi': 'fi-FI',
    'zh': 'zh-CN',
    'zh-cn': 'zh-CN',
    'zh-tw': 'zh-TW',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'th': 'th-TH',
    'vi': 'vi-VN',
    'id': 'id-ID',
    'ms': 'ms-MY',
    'hi': 'hi-IN',
    'ar': 'ar-SA',
    'he': 'he-IL',
    'tr': 'tr-TR',
    'ru': 'ru-RU',
    'uk': 'uk-UA',
    'cs': 'cs-CZ',
    'hu': 'hu-HU',
    'ro': 'ro-RO',
    'bg': 'bg-BG',
    'el': 'el-GR'
  };
  
  return langMap[langCode] || 'en-US'; // Default to en-US if not found
};
