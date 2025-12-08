import {
  EMAIL_VALIDATOR,
  HAS_LOWERCASE,
  HAS_NUMBER,
  HAS_SPECIAL_CHAR,
  HAS_UPPERCASE,
  MIN_LENGTH_12,
  NAME_VALIDATOR,
  USER_NAME_VALIDATOR,
} from '@/constants/regex';
import { AutoCapitalize, ErrorStateValue } from '@/types/types';

// Order of AUTH_FORM cannot change see _layout.tsx fieldsToValidate function
export const AUTH_FORM: ErrorStateValue[] = [
  {
    id: 'name',
    label: 'name',
    value: '',
    errorMessage: 'name error message',
    validator: [NAME_VALIDATOR],
    showErrorMessage: false,
    autoCapitalize: AutoCapitalize.words,
  },
  {
    id: 'username',
    label: 'Username',
    value: '',
    errorMessage: 'username error message',
    validator: [USER_NAME_VALIDATOR],
    showErrorMessage: false,
    autoCapitalize: AutoCapitalize.none,
  },
  {
    id: 'email',
    label: 'Email',
    value: '',
    errorMessage: 'email error message',
    validator: [EMAIL_VALIDATOR],
    showErrorMessage: false,
    autoCapitalize: AutoCapitalize.none,
  },
  {
    id: 'password',
    label: 'Password',
    value: '',
    errorMessage: 'password error message',
    validator: [HAS_UPPERCASE, HAS_LOWERCASE, HAS_NUMBER, HAS_SPECIAL_CHAR, MIN_LENGTH_12],
    showErrorMessage: false,
    autoCapitalize: AutoCapitalize.none,
    secureTextEntry: true,
  },
];
