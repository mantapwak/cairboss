'use client';

import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

export function LineItems() {
    const { lineItems, addLineItem, updateLineItem, removeLineItem, currency, touchField, touchedFields, language } = useInvoiceStore();
    const t = getTranslations(language);

    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'IDR' ? 'Rp' : currency;

    const total = lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    const handleBlur = (id: string, field: string) => () => {
        touchField(`lineItem.${id}.${field}`);
    };

    const isError = (id: string, field: string) => {
        const touched = touchedFields.has(`lineItem.${id}.${field}`);
        const item = lineItems.find(i => i.id === id);
        if (!item) return false;

        if (field === 'description') return touched && !item.description;
        if (field === 'quantity') return touched && item.quantity < 1;
        if (field === 'price') return touched && item.price < 0;
        return false;
    };

    return (
        <div className="section-card animate-fadeIn">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {t.services}
            </h2>

            <div className="space-y-4">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-zinc-400 pb-2 border-b border-zinc-700">
                    <div className="col-span-6">{t.description} *</div>
                    <div className="col-span-2">{t.qty} *</div>
                    <div className="col-span-3">{t.price} ({currency}) *</div>
                    <div className="col-span-1"></div>
                </div>

                {/* Items */}
                {lineItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 md:p-0 bg-surface-light md:bg-transparent rounded-lg md:rounded-none">
                        <div className="md:col-span-6">
                            <label className="input-label md:hidden required">{t.description}</label>
                            <input
                                type="text"
                                className={`input-field ${isError(item.id, 'description') ? 'error' : ''}`}
                                placeholder="e.g., Security Consultation"
                                value={item.description}
                                onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                                onBlur={handleBlur(item.id, 'description')}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="input-label md:hidden required">{t.qty}</label>
                            <input
                                type="number"
                                min="1"
                                className={`input-field ${isError(item.id, 'quantity') ? 'error' : ''}`}
                                value={item.quantity}
                                onChange={(e) => updateLineItem(item.id, { quantity: parseInt(e.target.value) || 0 })}
                                onBlur={handleBlur(item.id, 'quantity')}
                            />
                        </div>

                        <div className="md:col-span-3">
                            <label className="input-label md:hidden required">{t.price} ({currency})</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className={`input-field ${isError(item.id, 'price') ? 'error' : ''}`}
                                placeholder="0.00"
                                value={item.price || ''}
                                onChange={(e) => updateLineItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                                onBlur={handleBlur(item.id, 'price')}
                            />
                        </div>

                        <div className="md:col-span-1 flex justify-end">
                            {lineItems.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeLineItem(item.id)}
                                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Remove item"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add Item Button */}
                <button
                    type="button"
                    onClick={addLineItem}
                    className="w-full p-3 border-2 border-dashed border-zinc-700 rounded-lg text-zinc-400 hover:border-accent-green hover:text-accent-green transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t.addLineItem}
                </button>

                {/* Total */}
                <div className="flex justify-end pt-4 border-t border-zinc-700">
                    <div className="text-right">
                        <p className="text-sm text-zinc-400">{t.total}</p>
                        <p className="text-2xl font-bold text-accent-green">
                            {currencySymbol}{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
