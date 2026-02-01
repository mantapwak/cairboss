'use client';

import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

export function ClientInfo() {
    const { client, setClient, touchField, touchedFields, language } = useInvoiceStore();
    const t = getTranslations(language);

    const handleChange = (field: keyof typeof client) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setClient({ [field]: e.target.value });
    };

    const handleBlur = (field: string) => () => {
        touchField(`client.${field}`);
    };

    const isError = (field: string) => {
        const touched = touchedFields.has(`client.${field}`);
        const value = client[field as keyof typeof client];
        return touched && !value;
    };

    return (
        <div className="section-card animate-fadeIn">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {t.billTo}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name - Full Width */}
                <div className="md:col-span-2">
                    <label className="input-label required">{t.companyName}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('company') ? 'error' : ''}`}
                        placeholder="e.g., Maybank S.A."
                        value={client.company}
                        onChange={handleChange('company')}
                        onBlur={handleBlur('company')}
                    />
                    {isError('company') && <p className="error-message">{t.companyRequired}</p>}
                </div>

                {/* Address - Left */}
                <div>
                    <label className="input-label required">{t.clientAddress}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('address') ? 'error' : ''}`}
                        placeholder="e.g., ul. Zamiany 8 LU2"
                        value={client.address}
                        onChange={handleChange('address')}
                        onBlur={handleBlur('address')}
                    />
                    {isError('address') && <p className="error-message">{t.addressRequired}</p>}
                </div>

                {/* City - Right */}
                <div>
                    <label className="input-label required">{t.city}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('city') ? 'error' : ''}`}
                        placeholder="e.g., Warszawa"
                        value={client.city}
                        onChange={handleChange('city')}
                        onBlur={handleBlur('city')}
                    />
                    {isError('city') && <p className="error-message">{t.cityRequired}</p>}
                </div>

                {/* Country - Left */}
                <div>
                    <label className="input-label required">{t.country}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('country') ? 'error' : ''}`}
                        placeholder="e.g., Poland"
                        value={client.country}
                        onChange={handleChange('country')}
                        onBlur={handleBlur('country')}
                    />
                    {isError('country') && <p className="error-message">{t.countryRequired}</p>}
                </div>

                {/* Zip Code - Right */}
                <div>
                    <label className="input-label required">{t.zipCode}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('zipCode') ? 'error' : ''}`}
                        placeholder="e.g., 02-786"
                        value={client.zipCode}
                        onChange={handleChange('zipCode')}
                        onBlur={handleBlur('zipCode')}
                    />
                    {isError('zipCode') && <p className="error-message">{t.zipCodeRequired}</p>}
                </div>

                {/* Tax Number - Full Width */}
                <div className="md:col-span-2">
                    <label className="input-label required">{t.taxNumber}</label>
                    <input
                        type="text"
                        className={`input-field ${isError('taxNumber') ? 'error' : ''}`}
                        placeholder="e.g., 9512390641"
                        value={client.taxNumber}
                        onChange={handleChange('taxNumber')}
                        onBlur={handleBlur('taxNumber')}
                    />
                    {isError('taxNumber') && <p className="error-message">{t.taxNumberRequired}</p>}
                </div>
            </div>
        </div>
    );
}
