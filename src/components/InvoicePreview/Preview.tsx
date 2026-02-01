'use client';

import { forwardRef } from 'react';
import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

export const InvoicePreview = forwardRef<HTMLDivElement>((_, ref) => {
    const {
        sender,
        client,
        invoiceInfo,
        lineItems,
        selectedPaymentMethods,
        bankPayment,
        wisePayment,
        cryptoPayment,
        currency,
        language,
        templateStyle,
    } = useInvoiceStore();

    const t = getTranslations(language);
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'IDR' ? 'Rp ' : currency + ' ';
    const total = lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const paymentCount = selectedPaymentMethods.size;

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div ref={ref} className={`invoice-preview template-${templateStyle}`} style={{ aspectRatio: '210/297' }}>
            {/* Header */}
            <div className="invoice-header">
                <div>
                    <h1 className="invoice-title">{t.invoice}</h1>
                    <p className="invoice-subtitle">{t.securityConsultation}</p>
                </div>
                <div className="invoice-number-block">
                    <p className="invoice-label">{t.invoiceNumber}</p>
                    <p className="invoice-number">{invoiceInfo.invoiceNumber || 'INV-XXXX'}</p>
                </div>
            </div>

            {/* From / To Section */}
            <div className="invoice-parties">
                <div className="invoice-from">
                    <p className="label">{t.from}</p>
                    <p className="party-name">{sender.name || (language === 'id' ? 'Nama Anda' : 'Your Name')}</p>
                    <p className="party-detail">{sender.address || (language === 'id' ? 'Alamat Anda' : 'Your Address')}</p>
                    {sender.email && <p className="party-detail">{sender.email}</p>}
                    {sender.phone && <p className="party-detail">{sender.phone}</p>}
                </div>
                <div className="invoice-to">
                    <p className="label">{t.billTo}</p>
                    <p className="party-name">{client.company || (language === 'id' ? 'Nama Perusahaan' : 'Company Name')}</p>
                    {client.address && <p className="party-detail">{client.address}</p>}
                    {(client.city || client.zipCode) && <p className="party-detail">{[client.city, client.zipCode].filter(Boolean).join(', ')}</p>}
                    {client.country && <p className="party-detail">{client.country}</p>}
                    {client.taxNumber && <p className="party-detail">TAX: {client.taxNumber}</p>}
                </div>
            </div>

            {/* Dates */}
            <div className="invoice-dates">
                <div>
                    <p className="label">{t.invoiceDate}</p>
                    <p className="date-value">{formatDate(invoiceInfo.invoiceDate) || (language === 'id' ? 'Tanggal' : 'Date')}</p>
                </div>
                {invoiceInfo.dueDate && (
                    <div>
                        <p className="label">{t.dueDate}</p>
                        <p className="date-value">{formatDate(invoiceInfo.dueDate)}</p>
                    </div>
                )}
                <div className="amount-due-block">
                    <p className="label">{t.amountDue}</p>
                    <p className="amount-due">
                        {currencySymbol}{total.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            {/* Line Items Table */}
            <div className="invoice-items">
                <table>
                    <thead>
                        <tr>
                            <th className="text-left">{t.description}</th>
                            <th className="text-center">{t.qty}</th>
                            <th className="text-right">{t.price}</th>
                            <th className="text-right">{t.total}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.description || (language === 'id' ? 'Deskripsi Layanan' : 'Service Description')}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-right">
                                    {currencySymbol}{item.price.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="text-right">
                                    {currencySymbol}{(item.quantity * item.price).toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="total-label">{t.total}</td>
                            <td className="total-value">
                                {currencySymbol}{total.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Payment Details */}
            {paymentCount > 0 && (
                <div className="invoice-payment">
                    <p className="payment-title">{t.paymentDetails}</p>
                    <div className={`payment-methods ${paymentCount === 1 ? 'single' : paymentCount === 2 ? 'double' : 'triple'}`}>
                        {selectedPaymentMethods.has('bank') && (
                            <div className="payment-block">
                                <p className="payment-type">{t.bankTransfer}</p>
                                <div className="payment-info">
                                    <p><span>{language === 'id' ? 'Bank:' : 'Bank:'}</span> {bankPayment.bankName || '-'}</p>
                                    {bankPayment.bankAddress && <p><span>{language === 'id' ? 'Alamat Bank:' : 'Bank Address:'}</span> {bankPayment.bankAddress}</p>}
                                    <p><span>SWIFT/BIC:</span> {bankPayment.swiftBic || '-'}</p>
                                    <p><span>{language === 'id' ? 'No. Rek:' : 'Account:'}</span> {bankPayment.accountNumber || '-'}</p>
                                    <p><span>{language === 'id' ? 'A/N:' : 'Name:'}</span> {bankPayment.holderName || '-'}</p>
                                </div>
                            </div>
                        )}

                        {selectedPaymentMethods.has('wise') && (
                            <div className="payment-block">
                                <p className="payment-type">PayPal / Wise</p>
                                <div className="payment-info">
                                    <p><span>Email:</span> {wisePayment.email || '-'}</p>
                                    {wisePayment.wiseLink && (
                                        <p className="wise-link"><span>Wise Link:</span> {wisePayment.wiseLink}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {selectedPaymentMethods.has('crypto') && (
                            <div className="payment-block">
                                <p className="payment-type">Crypto ({cryptoPayment.currency})</p>
                                <div className="payment-info">
                                    <p><span>{t.network}:</span> {cryptoPayment.network}</p>
                                    <p><span>{language === 'id' ? 'Alamat:' : 'Address:'}</span></p>
                                    <p className="wallet-address">{cryptoPayment.walletAddress || '-'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="invoice-footer">
                <p>{t.thankYou}</p>
            </div>
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';
