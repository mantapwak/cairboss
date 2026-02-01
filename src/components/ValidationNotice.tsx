'use client';

import { useState } from 'react';
import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

export function ValidationNotice() {
    const [isDismissed, setIsDismissed] = useState(false);
    const { language } = useInvoiceStore();
    const t = getTranslations(language);

    if (isDismissed) return null;

    return (
        <div className="notice-banner mb-6 flex items-start justify-between gap-4 animate-fadeIn">
            <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                    <p className="font-medium text-amber-200">{t.validationTitle}</p>
                    <p className="text-sm text-amber-300/80 mt-1">
                        {t.validationMessage}
                    </p>
                </div>
            </div>
            <button
                onClick={() => setIsDismissed(true)}
                className="text-amber-400 hover:text-amber-200 transition-colors flex-shrink-0"
                title="Dismiss"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
