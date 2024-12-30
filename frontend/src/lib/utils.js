import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function extractVariables(text) {
  const regex = /{{(.*?)}}/g;
  const matches = text.match(regex) || [];
  return matches.map(match => match.slice(2, -2).trim());
}

export function isValidVariableName(name) {
  try {
    Function(`var ${name};`);
    return true;
  } catch {
    return false;
  }
}
