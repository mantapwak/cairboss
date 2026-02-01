'use client';

import { useState, useRef } from 'react';
import { useInvoiceStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';
import { SenderInfo } from '@/components/InvoiceForm/SenderInfo';
import { ClientInfo } from '@/components/InvoiceForm/ClientInfo';
import { InvoiceInfo } from '@/components/InvoiceForm/InvoiceInfo';
import { LineItems } from '@/components/InvoiceForm/LineItems';
import { PaymentMethods } from '@/components/InvoiceForm/PaymentMethods';
import { InvoicePreview } from '@/components/InvoicePreview/Preview';
import { SettingsBar } from '@/components/SettingsBar';
import { ExportButtons } from '@/components/ExportButtons';
import { ValidationNotice } from '@/components/ValidationNotice';
import { TemplateSelector } from '@/components/TemplateSelector';

export default function Home() {
    const previewRef = useRef<HTMLDivElement>(null);
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    const { language } = useInvoiceStore();
    const t = getTranslations(language);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-[1800px] mx-auto px-4 py-3 lg:py-4">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{t.appName}</h1>
                                <p className="text-xs text-zinc-500">{t.appTagline}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <SettingsBar />
                            <ExportButtons previewRef={previewRef} />
                        </div>
                    </div>

                    {/* Mobile Header */}
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h1 className="text-lg font-bold text-white">{t.appName}</h1>
                            </div>
                            <ExportButtons previewRef={previewRef} />
                        </div>
                        <div className="overflow-x-auto -mx-4 px-4">
                            <SettingsBar />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Preview Toggle */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setShowMobilePreview(!showMobilePreview)}
                    className="btn-primary flex items-center gap-2 shadow-lg px-4 py-2"
                >
                    {showMobilePreview ? (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Preview
                        </>
                    )}
                </button>
            </div>

            {/* Main Content */}
            <main className="max-w-[1800px] mx-auto">
                <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
                    {/* Form Section */}
                    <div className={`lg:w-1/2 xl:w-[45%] p-4 lg:p-6 overflow-y-auto lg:h-[calc(100vh-73px)] ${showMobilePreview ? 'hidden lg:block' : ''}`}>
                        <ValidationNotice />

                        <div className="space-y-4 lg:space-y-6">
                            <SenderInfo />
                            <ClientInfo />
                            <InvoiceInfo />
                            <LineItems />
                            <PaymentMethods />
                        </div>

                        {/* Spacer for mobile floating button */}
                        <div className="h-16 lg:hidden"></div>
                    </div>

                    {/* Preview Section */}
                    <div className={`lg:w-1/2 xl:w-[55%] bg-zinc-900 p-4 lg:p-6 overflow-y-auto lg:h-[calc(100vh-73px)] ${showMobilePreview ? 'block' : 'hidden lg:block'}`}>
                        <div className="lg:sticky lg:top-0">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-zinc-300">{t.livePreview}</h2>
                                <span className="text-xs text-zinc-500">{t.updatesRealtime}</span>
                            </div>

                            {/* Template Selector */}
                            <TemplateSelector />

                            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                                <InvoicePreview ref={previewRef} />
                            </div>
                        </div>

                        {/* Spacer for mobile floating button */}
                        <div className="h-16 lg:hidden"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
