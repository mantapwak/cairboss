'use client';

import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

export function InvoiceInfo() {
    const { invoiceInfo, setInvoiceInfo, touchField, touchedFields, language } = useInvoiceStore();
    const t = getTranslations(language);

    const handleChange = (field: keyof typeof invoiceInfo) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInvoiceInfo({ [field]: e.target.value });
    };

    const handleBlur = (field: string) => () => {
        touchField(`invoiceInfo.${field}`);
    };

    const isError = (field: string) => {
        const touched = touchedFields.has(`invoiceInfo.${field}`);
        const value = invoiceInfo[field as keyof typeof invoiceInfo];
        return touched && !value;
    };

    return (
        <div className="section-card animate-fadeIn">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {t.invoiceDetails}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="input-label required">{t.invoiceNumber}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('invoiceNumber') ? 'error' : ''}`}
                        placeholder="INV-2026-001"
                        value={invoiceInfo.invoiceNumber}
                        onChange={handleChange('invoiceNumber')}
                        onBlur={handleBlur('invoiceNumber')}
                    />
                    {isError('invoiceNumber') && <p className="error-message">{t.invoiceNumberRequired}</p>}
                </div>

                <div>
                    <label className="input-label required">{t.invoiceDate}</label>
                    <input
                        type="date"
                        className={`input-field ${isError('invoiceDate') ? 'error' : ''}`}
                        value={invoiceInfo.invoiceDate}
                        onChange={handleChange('invoiceDate')}
                        onBlur={handleBlur('invoiceDate')}
                    />
                    {isError('invoiceDate') && <p className="error-message">{t.invoiceDateRequired}</p>}
                </div>

                <div>
                    <label className="input-label">{t.dueDate}</label>
                    <input
                        type="date"
                        className="input-field"
                        value={invoiceInfo.dueDate}
                        onChange={handleChange('dueDate')}
                    />
                </div>
            </div>
        </div>
    );
}
