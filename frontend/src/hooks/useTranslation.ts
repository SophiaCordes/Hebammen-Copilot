import { useAppStore } from '../store/store';
import { Translations, TranslationKey } from '../constants/strings';

export const useTranslation = () => {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const t = (key: TranslationKey | string): string => {
    const langDict = (Translations as any)[language] || Translations.en;
    const val = langDict[key];
    if (val !== undefined) {
      return val;
    }
    // Fallback to English if the key is missing in the chosen language
    const fallbackVal = (Translations.en as any)[key];
    if (fallbackVal !== undefined) {
      return fallbackVal;
    }
    return key;
  };

  return { t, language, setLanguage };
};
