
import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

interface BrailleConverterProps {
  text: string;
}

const BrailleConverter: React.FC<BrailleConverterProps> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  // Map of ASCII characters to Unicode Braille
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

  const convertToBraille = (input: string): string => {
    return input.toLowerCase().split('').map(char => {
      return brailleMap[char] || char;
    }).join('');
  };

  const brailleText = convertToBraille(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(brailleText);
    setCopied(true);
    toast.success('Braille text copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="w-full rounded-lg border p-4 bg-background shadow-subtle"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Braille Representation</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 text-xs"
        >
          {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      
      <div className="min-h-[100px] rounded-md bg-accent/50 p-3 overflow-x-auto">
        {brailleText ? (
          <p className="braille-text text-lg leading-relaxed break-words" dir="ltr">
            {brailleText}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">No text to convert</p>
        )}
      </div>
      
      <p className="mt-3 text-xs text-muted-foreground">
        This is a Unicode representation of Braille patterns and may not perfectly match official Braille standards for all languages.
      </p>
    </motion.div>
  );
};

export default BrailleConverter;
