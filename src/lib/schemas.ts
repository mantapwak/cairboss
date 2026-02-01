import { z } from 'zod';

// Sender Information Schema
export const senderSchema = z.object({
    name: z.string().min(1, 'Sender name is required'),
    address: z.string().min(1, 'Sender address is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phone: z.string().regex(/^[0-9+\-\s]*$/, 'Phone must contain only numbers').optional(),
});

// Client Information Schema (Updated with Company fields)
export const clientSchema = z.object({
    company: z.string().min(1, 'Company name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    taxNumber: z.string().min(1, 'Tax number is required'),
});

// Invoice Details Schema
export const invoiceInfoSchema = z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required'),
    invoiceDate: z.string().min(1, 'Invoice date is required'),
    dueDate: z.string().optional(),
});

// Line Item Schema
export const lineItemSchema = z.object({
    id: z.string(),
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
});

// Payment Method Schemas
export const bankPaymentSchema = z.object({
    bankName: z.string().min(1, 'Bank name is required'),
    bankAddress: z.string().min(1, 'Bank address is required'),
    swiftBic: z.string().min(1, 'SWIFT/BIC is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    holderName: z.string().min(1, 'Account holder name is required'),
});

export const wisePaymentSchema = z.object({
    email: z.string().min(1, 'PayPal/Wise email is required'),
    wiseLink: z.string().optional(),
});

export const cryptoPaymentSchema = z.object({
    network: z.enum(['ERC20', 'TRC20', 'BEP20']),
    walletAddress: z.string().min(1, 'Wallet address is required'),
    currency: z.string().default('USDT'),
});

// Types
export type Sender = z.infer<typeof senderSchema>;
export type Client = z.infer<typeof clientSchema>;
export type InvoiceInfo = z.infer<typeof invoiceInfoSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
export type BankPayment = z.infer<typeof bankPaymentSchema>;
export type WisePayment = z.infer<typeof wisePaymentSchema>;
export type CryptoPayment = z.infer<typeof cryptoPaymentSchema>;

export type PaymentMethod = 'bank' | 'wise' | 'crypto';

export type PaperSize = 'A4' | 'Letter' | 'F4';

export type Language = 'en' | 'id';

export type TemplateStyle =
    | 'minimalist'
    | 'modern'
    | 'formal'
    | 'stylish'
    | 'professional'
    | 'modern-formal'
    | 'stylish-pro'
    | 'clean-corporate';

export const TEMPLATE_STYLES: { id: TemplateStyle; name: string; nameId: string; icon: string }[] = [
    { id: 'minimalist', name: 'Minimalist', nameId: 'Minimalis', icon: '○' },
    { id: 'modern', name: 'Modern', nameId: 'Modern', icon: '◆' },
    { id: 'formal', name: 'Formal', nameId: 'Formal', icon: '▢' },
    { id: 'stylish', name: 'Stylish', nameId: 'Stylish', icon: '◇' },
    { id: 'professional', name: 'Professional', nameId: 'Profesional', icon: '▣' },
    { id: 'modern-formal', name: 'Modern Formal', nameId: 'Modern Formal', icon: '◈' },
    { id: 'stylish-pro', name: 'Stylish Pro', nameId: 'Stylish Pro', icon: '✦' },
    { id: 'clean-corporate', name: 'Corporate', nameId: 'Korporat', icon: '■' },
];

// Paper dimensions in mm
export const PAPER_SIZES: Record<PaperSize, { width: number; height: number }> = {
    A4: { width: 210, height: 297 },
    Letter: { width: 216, height: 279 },
    F4: { width: 215, height: 330 },
};
