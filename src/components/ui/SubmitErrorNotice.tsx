import { AlertCircle, Phone } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';

/** Failed submits must always surface the phone number — a lead is never lost silently. */
export const SubmitErrorNotice = ({ message }: { message?: string }) => (
  <div
    role="alert"
    className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-900 flex gap-3"
  >
    <AlertCircle className="w-5 h-5 text-vred shrink-0 mt-0.5" aria-hidden="true" />
    <div>
      <p className="font-semibold">We couldn't send your request.</p>
      {message && <p className="text-xs text-red-800 mt-0.5">{message}</p>}
      <p className="mt-1">
        Please try again, or call us directly at{' '}
        <a
          href={`tel:${SHOP_INFO.phoneRaw}`}
          className="font-bold underline inline-flex items-center gap-1"
        >
          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          {SHOP_INFO.phone}
        </a>
        .
      </p>
    </div>
  </div>
);
