'use client';

import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';
import type { PaperSize, Language } from '@/lib/schemas';

const currencies = ['USD', 'EUR', 'GBP', 'IDR', 'SGD', 'AUD', 'CAD'];

const paperSizes: { value: PaperSize; label: string }[] = [
    { value: 'A4', label: 'A4' },
    { value: 'Letter', label: 'Letter' },
    { value: 'F4', label: 'F4' },
];

const languages: { value: Language; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'id', label: 'Indonesia', flag: '🇮🇩' },
];

export function SettingsBar() {
    const { paperSize, setPaperSize, currency, setCurrency, language, setLanguage } = useInvoiceStore();
    const t = getTranslations(language);

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Currency - Left */}
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <select
                    className="bg-surface border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-green"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    {currencies.map((curr) => (
                        <option key={curr} value={curr}>
                            {curr}
                        </option>
                    ))}
                </select>
            </div>

            {/* Paper Size - Middle */}
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <select
                    className="bg-surface border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-green"
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value as PaperSize)}
                >
                    {paperSizes.map((size) => (
                        <option key={size.value} value={size.value}>
                            {size.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Language - Right */}
            <div className="flex items-center gap-2">
                <span className="text-lg">{languages.find(l => l.value === language)?.flag}</span>
                <select
                    className="bg-surface border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-green"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.flag} {lang.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
