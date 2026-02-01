import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    Sender,
    Client,
    InvoiceInfo,
    LineItem,
    BankPayment,
    WisePayment,
    CryptoPayment,
    PaymentMethod,
    PaperSize,
    Language,
    TemplateStyle,
} from './schemas';

interface InvoiceState {
    // Form Data
    sender: Sender;
    client: Client;
    invoiceInfo: InvoiceInfo;
    lineItems: LineItem[];

    // Payment Methods
    selectedPaymentMethods: Set<PaymentMethod>;
    bankPayment: BankPayment;
    wisePayment: WisePayment;
    cryptoPayment: CryptoPayment;

    // Settings
    paperSize: PaperSize;
    currency: string;
    language: Language;
    templateStyle: TemplateStyle;

    // Validation State
    touchedFields: Set<string>;

    // Actions
    setSender: (sender: Partial<Sender>) => void;
    setClient: (client: Partial<Client>) => void;
    setInvoiceInfo: (info: Partial<InvoiceInfo>) => void;

    addLineItem: () => void;
    updateLineItem: (id: string, updates: Partial<LineItem>) => void;
    removeLineItem: (id: string) => void;

    togglePaymentMethod: (method: PaymentMethod) => void;
    setBankPayment: (payment: Partial<BankPayment>) => void;
    setWisePayment: (payment: Partial<WisePayment>) => void;
    setCryptoPayment: (payment: Partial<CryptoPayment>) => void;

    setPaperSize: (size: PaperSize) => void;
    setCurrency: (currency: string) => void;
    setLanguage: (lang: Language) => void;
    setTemplateStyle: (style: TemplateStyle) => void;

    touchField: (field: string) => void;

    reset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const getDefaultState = () => ({
    sender: {
        name: '',
        address: '',
        email: '',
        phone: '',
    },
    client: {
        company: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        taxNumber: '',
    },
    invoiceInfo: {
        invoiceNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: '',
    },
    lineItems: [
        {
            id: generateId(),
            description: '',
            quantity: 1,
            price: 0,
        },
    ],
    selectedPaymentMethods: new Set<PaymentMethod>(),
    bankPayment: {
        bankName: '',
        bankAddress: '',
        swiftBic: '',
        accountNumber: '',
        holderName: '',
    },
    wisePayment: {
        email: '',
        wiseLink: '',
    },
    cryptoPayment: {
        network: 'TRC20' as const,
        walletAddress: '',
        currency: 'USDT',
    },
    paperSize: 'A4' as PaperSize,
    currency: 'USD',
    language: 'en' as Language,
    templateStyle: 'minimalist' as TemplateStyle,
    touchedFields: new Set<string>(),
});

export const useInvoiceStore = create<InvoiceState>()(
    persist(
        (set) => ({
            ...getDefaultState(),

            setSender: (sender) =>
                set((state) => ({ sender: { ...state.sender, ...sender } })),

            setClient: (client) =>
                set((state) => ({ client: { ...state.client, ...client } })),

            setInvoiceInfo: (info) =>
                set((state) => ({ invoiceInfo: { ...state.invoiceInfo, ...info } })),

            addLineItem: () =>
                set((state) => ({
                    lineItems: [
                        ...state.lineItems,
                        { id: generateId(), description: '', quantity: 1, price: 0 },
                    ],
                })),

            updateLineItem: (id, updates) =>
                set((state) => ({
                    lineItems: state.lineItems.map((item) =>
                        item.id === id ? { ...item, ...updates } : item
                    ),
                })),

            removeLineItem: (id) =>
                set((state) => ({
                    lineItems: state.lineItems.filter((item) => item.id !== id),
                })),

            togglePaymentMethod: (method) =>
                set((state) => {
                    const newMethods = new Set(state.selectedPaymentMethods);
                    if (newMethods.has(method)) {
                        newMethods.delete(method);
                    } else {
                        newMethods.add(method);
                    }
                    return { selectedPaymentMethods: newMethods };
                }),

            setBankPayment: (payment) =>
                set((state) => ({ bankPayment: { ...state.bankPayment, ...payment } })),

            setWisePayment: (payment) =>
                set((state) => ({ wisePayment: { ...state.wisePayment, ...payment } })),

            setCryptoPayment: (payment) =>
                set((state) => ({ cryptoPayment: { ...state.cryptoPayment, ...payment } })),

            setPaperSize: (paperSize) => set({ paperSize }),

            setCurrency: (currency) => set({ currency }),

            setLanguage: (language) => set({ language }),

            setTemplateStyle: (templateStyle) => set({ templateStyle }),

            touchField: (field) =>
                set((state) => {
                    const newTouched = new Set(state.touchedFields);
                    newTouched.add(field);
                    return { touchedFields: newTouched };
                }),

            reset: () => set(getDefaultState()),
        }),
        {
            name: 'cairboss-storage',
            partialize: (state) => ({
                sender: state.sender,
                bankPayment: state.bankPayment,
                wisePayment: state.wisePayment,
                cryptoPayment: state.cryptoPayment,
                currency: state.currency,
                paperSize: state.paperSize,
                language: state.language,
                templateStyle: state.templateStyle,
            }),
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    const parsed = JSON.parse(str);
                    return parsed;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);
