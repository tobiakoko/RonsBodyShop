/** Shared text-input styling; red border + tint when invalid. */
export const inputClass = (hasError?: boolean) =>
  `w-full px-3.5 py-2.5 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-vnavy ${
    hasError ? 'border-vred bg-red-50' : 'border-slate-300'
  }`;
