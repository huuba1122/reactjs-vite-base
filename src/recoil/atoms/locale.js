import { atom } from 'recoil';
import LocaleService from '@services/utils/i18n';

export const localeState = atom({
  key: 'locale',
  default: LocaleService.getLocale()
});
