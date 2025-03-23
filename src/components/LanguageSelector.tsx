
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type LanguageOption = {
  value: string;
  label: string;
  region?: string;
};

const languages: LanguageOption[] = [
  // European Languages
  { value: 'en', label: 'English', region: 'Global' },
  { value: 'en-us', label: 'English (US)', region: 'North America' },
  { value: 'en-gb', label: 'English (UK)', region: 'Europe' },
  { value: 'en-au', label: 'English (Australia)', region: 'Oceania' },
  { value: 'en-ca', label: 'English (Canada)', region: 'North America' },
  { value: 'en-in', label: 'English (India)', region: 'Asia' },
  { value: 'es', label: 'Spanish', region: 'Global' },
  { value: 'es-es', label: 'Spanish (Spain)', region: 'Europe' },
  { value: 'es-mx', label: 'Spanish (Mexico)', region: 'Latin America' },
  { value: 'es-ar', label: 'Spanish (Argentina)', region: 'Latin America' },
  { value: 'es-co', label: 'Spanish (Colombia)', region: 'Latin America' },
  { value: 'fr', label: 'French', region: 'Global' },
  { value: 'fr-fr', label: 'French (France)', region: 'Europe' },
  { value: 'fr-ca', label: 'French (Canada)', region: 'North America' },
  { value: 'fr-be', label: 'French (Belgium)', region: 'Europe' },
  { value: 'fr-ch', label: 'French (Switzerland)', region: 'Europe' },
  { value: 'de', label: 'German', region: 'Europe' },
  { value: 'de-de', label: 'German (Germany)', region: 'Europe' },
  { value: 'de-at', label: 'German (Austria)', region: 'Europe' },
  { value: 'de-ch', label: 'German (Switzerland)', region: 'Europe' },
  { value: 'it', label: 'Italian', region: 'Europe' },
  { value: 'it-it', label: 'Italian (Italy)', region: 'Europe' },
  { value: 'it-ch', label: 'Italian (Switzerland)', region: 'Europe' },
  { value: 'pt', label: 'Portuguese', region: 'Global' },
  { value: 'pt-br', label: 'Portuguese (Brazil)', region: 'South America' },
  { value: 'pt-pt', label: 'Portuguese (Portugal)', region: 'Europe' },
  { value: 'nl', label: 'Dutch', region: 'Europe' },
  { value: 'nl-nl', label: 'Dutch (Netherlands)', region: 'Europe' },
  { value: 'nl-be', label: 'Dutch (Belgium)', region: 'Europe' },
  { value: 'pl', label: 'Polish', region: 'Europe' },
  { value: 'sv', label: 'Swedish', region: 'Europe' },
  { value: 'no', label: 'Norwegian', region: 'Europe' },
  { value: 'da', label: 'Danish', region: 'Europe' },
  { value: 'fi', label: 'Finnish', region: 'Europe' },
  { value: 'is', label: 'Icelandic', region: 'Europe' },
  { value: 'ga', label: 'Irish', region: 'Europe' },
  { value: 'cy', label: 'Welsh', region: 'Europe' },
  { value: 'gl', label: 'Galician', region: 'Europe' },
  { value: 'ca', label: 'Catalan', region: 'Europe' },
  { value: 'eu', label: 'Basque', region: 'Europe' },
  
  // Asian Languages
  { value: 'zh', label: 'Chinese', region: 'Asia' },
  { value: 'zh-cn', label: 'Chinese (Simplified)', region: 'Asia' },
  { value: 'zh-tw', label: 'Chinese (Traditional)', region: 'Asia' },
  { value: 'zh-hk', label: 'Chinese (Hong Kong)', region: 'Asia' },
  { value: 'ja', label: 'Japanese', region: 'Asia' },
  { value: 'ko', label: 'Korean', region: 'Asia' },
  { value: 'th', label: 'Thai', region: 'Asia' },
  { value: 'vi', label: 'Vietnamese', region: 'Asia' },
  { value: 'id', label: 'Indonesian', region: 'Asia' },
  { value: 'ms', label: 'Malay', region: 'Asia' },
  { value: 'tl', label: 'Tagalog', region: 'Asia' },
  { value: 'hi', label: 'Hindi', region: 'Asia' },
  { value: 'ur', label: 'Urdu', region: 'Asia' },
  { value: 'bn', label: 'Bengali', region: 'Asia' },
  { value: 'pa', label: 'Punjabi', region: 'Asia' },
  { value: 'ta', label: 'Tamil', region: 'Asia' },
  { value: 'te', label: 'Telugu', region: 'Asia' },
  { value: 'mr', label: 'Marathi', region: 'Asia' },
  { value: 'gu', label: 'Gujarati', region: 'Asia' },
  { value: 'kn', label: 'Kannada', region: 'Asia' },
  { value: 'ml', label: 'Malayalam', region: 'Asia' },
  { value: 'si', label: 'Sinhala', region: 'Asia' },
  { value: 'ne', label: 'Nepali', region: 'Asia' },
  { value: 'my', label: 'Burmese', region: 'Asia' },
  { value: 'km', label: 'Khmer', region: 'Asia' },
  { value: 'lo', label: 'Lao', region: 'Asia' },
  
  // Middle Eastern and African Languages
  { value: 'ar', label: 'Arabic', region: 'Middle East' },
  { value: 'ar-sa', label: 'Arabic (Saudi Arabia)', region: 'Middle East' },
  { value: 'ar-eg', label: 'Arabic (Egypt)', region: 'Middle East' },
  { value: 'ar-ma', label: 'Arabic (Morocco)', region: 'Middle East' },
  { value: 'ar-ae', label: 'Arabic (UAE)', region: 'Middle East' },
  { value: 'he', label: 'Hebrew', region: 'Middle East' },
  { value: 'fa', label: 'Persian', region: 'Middle East' },
  { value: 'tr', label: 'Turkish', region: 'Middle East' },
  { value: 'ku', label: 'Kurdish', region: 'Middle East' },
  { value: 'am', label: 'Amharic', region: 'Africa' },
  { value: 'sw', label: 'Swahili', region: 'Africa' },
  { value: 'yo', label: 'Yoruba', region: 'Africa' },
  { value: 'ha', label: 'Hausa', region: 'Africa' },
  { value: 'zu', label: 'Zulu', region: 'Africa' },
  { value: 'xh', label: 'Xhosa', region: 'Africa' },
  { value: 'af', label: 'Afrikaans', region: 'Africa' },
  { value: 'mg', label: 'Malagasy', region: 'Africa' },
  { value: 'so', label: 'Somali', region: 'Africa' },
  { value: 'ig', label: 'Igbo', region: 'Africa' },
  
  // Eastern European Languages
  { value: 'ru', label: 'Russian', region: 'Eastern Europe' },
  { value: 'uk', label: 'Ukrainian', region: 'Eastern Europe' },
  { value: 'be', label: 'Belarusian', region: 'Eastern Europe' },
  { value: 'cs', label: 'Czech', region: 'Eastern Europe' },
  { value: 'sk', label: 'Slovak', region: 'Eastern Europe' },
  { value: 'hu', label: 'Hungarian', region: 'Eastern Europe' },
  { value: 'ro', label: 'Romanian', region: 'Eastern Europe' },
  { value: 'bg', label: 'Bulgarian', region: 'Eastern Europe' },
  { value: 'mk', label: 'Macedonian', region: 'Eastern Europe' },
  { value: 'sr', label: 'Serbian', region: 'Eastern Europe' },
  { value: 'hr', label: 'Croatian', region: 'Eastern Europe' },
  { value: 'bs', label: 'Bosnian', region: 'Eastern Europe' },
  { value: 'sl', label: 'Slovenian', region: 'Eastern Europe' },
  { value: 'lt', label: 'Lithuanian', region: 'Eastern Europe' },
  { value: 'lv', label: 'Latvian', region: 'Eastern Europe' },
  { value: 'et', label: 'Estonian', region: 'Eastern Europe' },
  { value: 'el', label: 'Greek', region: 'Eastern Europe' },
  
  // Sign Languages
  { value: 'asl', label: 'American Sign Language', region: 'Sign Language' },
  { value: 'bsl', label: 'British Sign Language', region: 'Sign Language' },
  { value: 'isl', label: 'International Sign Language', region: 'Sign Language' },
  { value: 'lsf', label: 'French Sign Language', region: 'Sign Language' },
  { value: 'lse', label: 'Spanish Sign Language', region: 'Sign Language' },
  { value: 'lsi', label: 'Italian Sign Language', region: 'Sign Language' },
  { value: 'dgs', label: 'German Sign Language', region: 'Sign Language' },
  { value: 'jsl', label: 'Japanese Sign Language', region: 'Sign Language' },
  { value: 'auslan', label: 'Australian Sign Language', region: 'Sign Language' },
  { value: 'nzsl', label: 'New Zealand Sign Language', region: 'Sign Language' },
  { value: 'csl', label: 'Chinese Sign Language', region: 'Sign Language' },
  
  // Indigenous and Less Common Languages
  { value: 'haw', label: 'Hawaiian', region: 'Indigenous' },
  { value: 'sm', label: 'Samoan', region: 'Oceania' },
  { value: 'mi', label: 'Māori', region: 'Oceania' },
  { value: 'ht', label: 'Haitian Creole', region: 'Caribbean' },
  { value: 'gn', label: 'Guarani', region: 'South America' },
  { value: 'ay', label: 'Aymara', region: 'South America' },
  { value: 'qu', label: 'Quechua', region: 'South America' },
  { value: 'kk', label: 'Kazakh', region: 'Central Asia' },
  { value: 'ky', label: 'Kyrgyz', region: 'Central Asia' },
  { value: 'mn', label: 'Mongolian', region: 'Asia' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label = "Select language",
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Add a fallback in case value is undefined or not in languages array
  const selectedLanguage = React.useMemo(() => {
    return languages.find(lang => lang.value === value) || null;
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background hover:bg-accent/50 transition-colors"
          >
            {selectedLanguage ? selectedLanguage.label : "Select language..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{language.label}</span>
                    {language.region && (
                      <span className="text-xs text-muted-foreground">{language.region}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
