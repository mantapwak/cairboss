'use client';

import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';
import { INDONESIAN_BANKS, OTHER_BANK_OPTION } from '@/lib/indonesianBanks';
import type { PaymentMethod } from '@/lib/schemas';

const paymentOptions = [
    {
        id: 'bank' as PaymentMethod,
        nameKey: 'bankTransfer' as const,
        descKey: 'swiftIban' as const,
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
        ),
    },
    {
        id: 'wise' as PaymentMethod,
        nameKey: 'emailTransfer' as const,
        descKey: 'wiseDetails' as const,
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        id: 'crypto' as PaymentMethod,
        nameKey: 'cryptoUsdt' as const,
        descKey: 'network' as const,
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export function PaymentMethods() {
    const {
        selectedPaymentMethods,
        togglePaymentMethod,
        bankPayment,
        setBankPayment,
        wisePayment,
        setWisePayment,
        cryptoPayment,
        setCryptoPayment,
        touchField,
        touchedFields,
        language,
    } = useInvoiceStore();

    const t = getTranslations(language);

    const hasNoPaymentMethod = selectedPaymentMethods.size === 0;
    const showPaymentError = touchedFields.has('paymentMethod') && hasNoPaymentMethod;

    return (
        <div className="section-card animate-fadeIn">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {t.paymentMethods}
                <span className="text-red-500">*</span>
            </h2>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {paymentOptions.map((option) => {
                    const isActive = selectedPaymentMethods.has(option.id);
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                                togglePaymentMethod(option.id);
                                touchField('paymentMethod');
                            }}
                            className={`payment-card relative ${isActive ? 'active' : ''}`}
                        >
                            <div className={`mb-2 ${isActive ? 'text-accent-green' : 'text-zinc-400'}`}>
                                {option.icon}
                            </div>
                            <p className="font-medium text-white">{t[option.nameKey]}</p>
                            <p className="text-xs text-zinc-500">{option.id === 'bank' ? t.swiftIban : option.id === 'wise' ? t.emailTransfer : 'ERC20 / TRC20'}</p>
                            {isActive && (
                                <div className="absolute top-2 right-2">
                                    <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {showPaymentError && (
                <p className="error-message mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t.selectPaymentMethod}
                </p>
            )}

            {/* Conditional Payment Forms */}
            <div className="space-y-6">
                {/* Bank Transfer Form */}
                {selectedPaymentMethods.has('bank') && (
                    <div className="p-4 bg-surface-light rounded-lg border border-zinc-700 animate-fadeIn">
                        <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            {t.bankDetails}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="input-label required">{t.bankName}</label>
                                <select
                                    className="input-field"
                                    value={bankPayment.bankName}
                                    onChange={(e) => {
                                        const selectedBank = INDONESIAN_BANKS.find(b => b.name === e.target.value);
                                        if (selectedBank) {
                                            setBankPayment({
                                                bankName: selectedBank.name,
                                                bankAddress: selectedBank.address,
                                                swiftBic: selectedBank.swiftCode,
                                            });
                                        } else if (e.target.value === OTHER_BANK_OPTION.name) {
                                            setBankPayment({
                                                bankName: '',
                                                bankAddress: '',
                                                swiftBic: '',
                                            });
                                        }
                                    }}
                                >
                                    <option value="">{t.selectBank || 'Select a bank...'}</option>
                                    {INDONESIAN_BANKS.map((bank) => (
                                        <option key={bank.swiftCode} value={bank.name}>
                                            {bank.name}
                                        </option>
                                    ))}
                                    <option value={OTHER_BANK_OPTION.name}>{t.otherBank || 'Other Bank (Custom)'}</option>
                                </select>
                            </div>
                            {/* Show custom bank name input if "Other" selected or if bankName doesn't match any preset */}
                            {(bankPayment.bankName === '' || !INDONESIAN_BANKS.find(b => b.name === bankPayment.bankName)) && (
                                <div className="md:col-span-2">
                                    <label className="input-label required">{t.customBankName || 'Custom Bank Name'}</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="e.g., PT BANK EXAMPLE TBK"
                                        value={bankPayment.bankName}
                                        onChange={(e) => setBankPayment({ bankName: e.target.value })}
                                    />
                                </div>
                            )}
                            <div className="md:col-span-2">
                                <label className="input-label required">{t.bankAddress}</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g., Jl. Jend. Sudirman Kav. 1, Jakarta 10220, Indonesia"
                                    value={bankPayment.bankAddress}
                                    onChange={(e) => setBankPayment({ bankAddress: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label required">{t.swiftBic}</label>
                                <input
                                    type="text"
                                    className="input-field font-mono"
                                    placeholder="e.g., BMRIIDJA"
                                    value={bankPayment.swiftBic}
                                    onChange={(e) => setBankPayment({ swiftBic: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div>
                                <label className="input-label required">{t.accountNumber}</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g., 1354722378728"
                                    value={bankPayment.accountNumber}
                                    onChange={(e) => setBankPayment({ accountNumber: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label required">{t.holderName}</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g., Joko Widodo"
                                    value={bankPayment.holderName}
                                    onChange={(e) => setBankPayment({ holderName: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* PayPal/Wise Form */}
                {selectedPaymentMethods.has('wise') && (
                    <div className="p-4 bg-surface-light rounded-lg border border-zinc-700 animate-fadeIn">
                        <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t.wiseDetails}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="input-label required">{t.emailAddress}</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="e.g., payment@email.com"
                                    value={wisePayment.email}
                                    onChange={(e) => setWisePayment({ email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label">{t.wiseLinkOptional}</label>
                                <input
                                    type="url"
                                    className="input-field"
                                    placeholder="e.g., https://wise.com/pay/..."
                                    value={wisePayment.wiseLink}
                                    onChange={(e) => setWisePayment({ wiseLink: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Crypto Form */}
                {selectedPaymentMethods.has('crypto') && (
                    <div className="p-4 bg-surface-light rounded-lg border border-zinc-700 animate-fadeIn">
                        <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t.cryptoDetails}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="input-label required">{t.network}</label>
                                <select
                                    className="input-field"
                                    value={cryptoPayment.network}
                                    onChange={(e) => setCryptoPayment({ network: e.target.value as 'ERC20' | 'TRC20' | 'BEP20' })}
                                >
                                    <option value="TRC20">TRC20 (Tron - Low Fees)</option>
                                    <option value="ERC20">ERC20 (Ethereum)</option>
                                    <option value="BEP20">BEP20 (BSC)</option>
                                </select>
                            </div>
                            <div>
                                <label className="input-label">{t.currency}</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={cryptoPayment.currency}
                                    onChange={(e) => setCryptoPayment({ currency: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label required">{t.walletAddress}</label>
                                <input
                                    type="text"
                                    className="input-field font-mono text-sm"
                                    placeholder="e.g., TN..."
                                    value={cryptoPayment.walletAddress}
                                    onChange={(e) => setCryptoPayment({ walletAddress: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
