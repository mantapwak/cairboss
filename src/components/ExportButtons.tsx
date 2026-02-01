'use client';

import { useState } from 'react';
import { useInvoiceStore } from '@/lib/store';
import { generatePDF, generateImage } from '@/lib/pdf';
import { getTranslations } from '@/lib/translations';
import {
    senderSchema,
    clientSchema,
    invoiceInfoSchema,
    lineItemSchema
} from '@/lib/schemas';

interface ExportButtonsProps {
    previewRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportButtons({ previewRef }: ExportButtonsProps) {
    const [isExporting, setIsExporting] = useState(false);
    const {
        sender,
        client,
        invoiceInfo,
        lineItems,
        selectedPaymentMethods,
        paperSize,
        language,
        touchField
    } = useInvoiceStore();

    const t = getTranslations(language);

    const validate = (): string[] => {
        const errors: string[] = [];

        // Validate sender
        const senderResult = senderSchema.safeParse(sender);
        if (!senderResult.success) {
            errors.push(t.fillSenderInfo);
        }

        // Validate client
        const clientResult = clientSchema.safeParse(client);
        if (!clientResult.success) {
            errors.push(t.fillClientInfo);
        }

        // Validate invoice info
        const invoiceResult = invoiceInfoSchema.safeParse(invoiceInfo);
        if (!invoiceResult.success) {
            errors.push(t.fillInvoiceInfo);
        }

        // Validate line items
        const hasValidLineItem = lineItems.some(item => {
            const result = lineItemSchema.safeParse(item);
            return result.success;
        });
        if (!hasValidLineItem) {
            errors.push(t.addLineItemError);
        }

        // Validate payment methods
        if (selectedPaymentMethods.size === 0) {
            errors.push(t.selectPaymentError);
            touchField('paymentMethod');
        }

        return errors;
    };

    const handleExportPDF = async () => {
        const errors = validate();
        if (errors.length > 0) {
            alert((language === 'id' ? 'Perbaiki kesalahan berikut:\n\n' : 'Please fix the following errors:\n\n') + errors.join('\n'));
            return;
        }

        if (!previewRef.current) return;

        setIsExporting(true);
        try {
            await generatePDF(
                previewRef.current,
                paperSize,
                `invoice-${invoiceInfo.invoiceNumber || 'draft'}`
            );
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert(language === 'id' ? 'Gagal membuat PDF. Silakan coba lagi.' : 'Failed to generate PDF. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportImage = async () => {
        const errors = validate();
        if (errors.length > 0) {
            alert((language === 'id' ? 'Perbaiki kesalahan berikut:\n\n' : 'Please fix the following errors:\n\n') + errors.join('\n'));
            return;
        }

        if (!previewRef.current) return;

        setIsExporting(true);
        try {
            await generateImage(
                previewRef.current,
                `invoice-${invoiceInfo.invoiceNumber || 'draft'}`
            );
        } catch (error) {
            console.error('Failed to generate image:', error);
            alert(language === 'id' ? 'Gagal membuat gambar. Silakan coba lagi.' : 'Failed to generate image. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="btn-primary flex items-center gap-1.5 lg:gap-2"
            >
                {isExporting ? (
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )}
                <span className="hidden sm:inline">{t.downloadPdf}</span>
                <span className="sm:hidden">PDF</span>
            </button>

            <button
                onClick={handleExportImage}
                disabled={isExporting}
                className="btn-secondary flex items-center gap-1.5 lg:gap-2"
            >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">{t.downloadJpg}</span>
                <span className="sm:hidden">JPG</span>
            </button>
        </div>
    );
}
