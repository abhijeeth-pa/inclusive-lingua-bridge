// Functions for handling various accessibility features

import { toast } from "@/components/ui/sonner";

/**
 * Convert text to braille representation
 * @param text The text to convert to braille
 * @returns The braille representation as Unicode characters
 */
export const textToBraille = (text: string): string => {
  const brailleMap: Record<string, string> = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵', ' ': '⠀', ',': '⠂', ';': '⠆', ':': '⠒',
    '.': '⠲', '?': '⠦', '!': '⠖', "'": '⠄', '"': '⠐',
    '-': '⠤', '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲',
    '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔',
    '0': '⠴'
  };

  return text.toLowerCase().split('').map(char => {
    return brailleMap[char] || char;
  }).join('');
};

/**
 * Convert an image to braille representation
 * @param imageUrl The URL of the image to convert
 * @param width The desired width of the braille representation (in characters)
 * @param height Optional height (will maintain aspect ratio if not provided)
 * @returns Promise that resolves to a 2D array of braille characters
 */
export const imageToBraille = async (
  imageUrl: string,
  width: number = 40,
  height?: number
): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    // Create a new image object
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      // Calculate height if not provided (maintain aspect ratio)
      const aspectRatio = img.height / img.width;
      const brailleHeight = height || Math.floor(width * aspectRatio * 0.5);
      
      // Create a canvas to process the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        reject(new Error("Could not create canvas context"));
        return;
      }
      
      // Set canvas dimensions and draw the image
      canvas.width = width * 2; // We use 2x2 pixels for each braille dot
      canvas.height = brailleHeight * 4; // Each braille cell is 2x4 dots
      
      // Draw and resize the image to fit our grid
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      
      // Convert image to black and white and detect edges
      const threshold = 128;
      const brailleGrid: boolean[][] = [];
      
      // Initialize braille grid with false values
      for (let y = 0; y < canvas.height; y++) {
        brailleGrid[y] = [];
        for (let x = 0; x < canvas.width; x++) {
          brailleGrid[y][x] = false;
        }
      }
      
      // Process image to black and white
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = pixelData[i];
          const g = pixelData[i + 1];
          const b = pixelData[i + 2];
          
          // Calculate grayscale value using luminance formula
          const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // Set grid value based on threshold
          brailleGrid[y][x] = grayscale < threshold;
        }
      }
      
      // Convert the boolean grid to braille characters
      const brailleOutput: string[][] = [];
      
      // Each braille cell is 2x4 dots
      for (let cellY = 0; cellY < brailleHeight; cellY++) {
        brailleOutput[cellY] = [];
        for (let cellX = 0; cellX < width; cellX++) {
          // Get the 8 points for this braille cell
          const dots = [
            getBrailleGridValue(brailleGrid, cellX * 2, cellY * 4),
            getBrailleGridValue(brailleGrid, cellX * 2, cellY * 4 + 1),
            getBrailleGridValue(brailleGrid, cellX * 2, cellY * 4 + 2),
            getBrailleGridValue(brailleGrid, cellX * 2 + 1, cellY * 4),
            getBrailleGridValue(brailleGrid, cellX * 2 + 1, cellY * 4 + 1),
            getBrailleGridValue(brailleGrid, cellX * 2 + 1, cellY * 4 + 2),
            getBrailleGridValue(brailleGrid, cellX * 2, cellY * 4 + 3),
            getBrailleGridValue(brailleGrid, cellX * 2 + 1, cellY * 4 + 3)
          ];
          
          // Convert the 8 dots to a braille character
          const brailleChar = dotsTobraille(dots);
          brailleOutput[cellY][cellX] = brailleChar;
        }
      }
      
      resolve(brailleOutput);
    };
    
    img.onerror = () => {
      reject(new Error("Failed to load image"));
      toast.error("Failed to load image for braille conversion");
    };
    
    img.src = imageUrl;
  });
};

/**
 * Helper function to get a grid value, handling out-of-bounds gracefully
 */
const getBrailleGridValue = (grid: boolean[][], x: number, y: number): boolean => {
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
    return grid[y][x];
  }
  return false;
};

/**
 * Convert an array of 8 dots to a braille character
 * @param dots Array of 8 booleans representing the dots in a braille cell
 * @returns A Unicode braille character
 */
const dotsTobraille = (dots: boolean[]): string => {
  // Braille pattern dots:
  // 0 3
  // 1 4
  // 2 5
  // 6 7
  
  // Calculate the Unicode value for the braille character
  // The base code point for braille patterns is U+2800
  let value = 0x2800;
  if (dots[0]) value |= 0x01;   // dot 1
  if (dots[1]) value |= 0x02;   // dot 2
  if (dots[2]) value |= 0x04;   // dot 3
  if (dots[3]) value |= 0x08;   // dot 4
  if (dots[4]) value |= 0x10;   // dot 5
  if (dots[5]) value |= 0x20;   // dot 6
  if (dots[6]) value |= 0x40;   // dot 7
  if (dots[7]) value |= 0x80;   // dot 8
  
  return String.fromCharCode(value);
};

/**
 * Simulate speech synthesis using the Web Speech API
 * @param text The text to speak
 * @param lang The language code for the speech
 * @returns Promise that resolves when speech is complete or rejects on error
 */
export const speakText = (text: string, lang: string = 'en-US'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Speech synthesis is not supported in your browser');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };
    
    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Get audio URL for text-to-speech (simulated)
 * This would normally call a TTS API like Google TTS or ElevenLabs
 * @param text The text to convert to speech
 * @param lang The language code
 * @returns Promise that resolves to the audio URL
 */
export const getTextToSpeechUrl = async (
  text: string,
  lang: string = 'en-US'
): Promise<string> => {
  console.log(`Getting TTS URL for: "${text}" in ${lang}`);
  
  // This is just a mock function
  // In a real app, you would call an API like Google TTS or ElevenLabs
  
  // Return a placeholder for demo purposes
  toast.info('In a production app, this would generate real TTS audio');
  return new Promise((resolve) => {
    // Simulating API delay
    setTimeout(() => {
      resolve('https://example.com/tts-audio.mp3');
    }, 1000);
  });
};

/**
 * Mock function to convert text to sign language 
 * In a real app, this would provide sign language videos or animations
 * @param text The text to convert to sign language
 * @param lang The language code
 * @returns Promise that resolves to an array of sign language resources
 */
export const textToSignLanguage = async (
  text: string,
  lang: string = 'en'
): Promise<Array<{ word: string, resourceUrl: string }>> => {
  console.log(`Converting to sign language: "${text}" in ${lang}`);
  
  // This is just a mock function
  // In a real app, you would map words to sign language videos/images
  
  const words = text.toLowerCase().split(/\s+/);
  
  return words.map(word => ({
    word,
    resourceUrl: `https://example.com/sign-language/${lang}/${encodeURIComponent(word)}.gif`
  }));
};
