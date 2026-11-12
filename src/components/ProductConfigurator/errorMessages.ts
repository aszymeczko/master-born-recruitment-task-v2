import { ERROR_CODES, type ErrorCode } from './types';

interface ErrorMessage {
  message: string;
  action: string;
}

const ERROR_MESSAGES: Record<ErrorCode, ErrorMessage> = {
  [ERROR_CODES.PRICE_CALC_FAILED]: {
    message: "We couldn't calculate the price for this configuration.",
    action: 'Please try again in a moment.',
  },
  [ERROR_CODES.NETWORK_TIMEOUT]: {
    message: 'Calculating the price is taking longer than usual.',
    action: 'Check your internet connection and try again.',
  },
  [ERROR_CODES.VALIDATION_CONFLICT]: {
    message: "Some of your selected options can't be combined.",
    action: 'Please review your options and adjust your choices.',
  },
  [ERROR_CODES.DEPENDENCY_MISSING]: {
    message: 'One of your add-ons needs another option to be selected first.',
    action: 'Check the requirements listed next to the add-on.',
  },
  [ERROR_CODES.INVALID_QUANTITY]: {
    message: 'The quantity must be at least 1.',
    action: 'Please update the quantity and try again.',
  },
  [ERROR_CODES.UNKNOWN]: {
    message: 'Something went wrong.',
    action: 'Please try again. If the problem continues, contact our support team.',
  },
};

export function getErrorMessage(code: string): ErrorMessage {
  return ERROR_MESSAGES[code as ErrorCode] ?? ERROR_MESSAGES[ERROR_CODES.UNKNOWN];
}
