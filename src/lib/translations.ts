import type { Language } from './schemas';

type TranslationKeys = {
    // Header
    appName: string;
    appTagline: string;

    // Settings
    paperSize: string;
    currency: string;
    language: string;
    reset: string;
    resetConfirm: string;

    // Buttons
    downloadPdf: string;
    downloadJpg: string;

    // Validation Notice
    validationTitle: string;
    validationMessage: string;

    // Sender Info
    yourInfo: string;
    fullName: string;
    address: string;
    email: string;
    phone: string;
    phoneNumericOnly: string;

    // Client Info
    billTo: string;
    companyName: string;
    clientAddress: string;
    city: string;
    country: string;
    zipCode: string;
    taxNumber: string;
    cityRequired: string;
    countryRequired: string;
    zipCodeRequired: string;
    taxNumberRequired: string;

    // Invoice Info
    invoiceDetails: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;

    // Line Items
    services: string;
    description: string;
    qty: string;
    price: string;
    addLineItem: string;
    total: string;

    // Payment Methods
    paymentMethods: string;
    bankTransfer: string;
    swiftIban: string;
    emailTransfer: string;
    cryptoUsdt: string;
    selectPaymentMethod: string;

    // Bank Details
    bankDetails: string;
    bankName: string;
    bankAddress: string;
    swiftBic: string;
    accountNumber: string;
    holderName: string;
    selectBank: string;
    otherBank: string;
    customBankName: string;

    // Wise/PayPal Details
    wiseDetails: string;
    emailAddress: string;
    wiseLinkOptional: string;

    // Crypto Details
    cryptoDetails: string;
    network: string;
    walletAddress: string;

    // Preview
    livePreview: string;
    updatesRealtime: string;
    invoice: string;
    securityConsultation: string;
    from: string;
    amountDue: string;
    paymentDetails: string;
    thankYou: string;

    // Validation Messages
    required: string;
    nameRequired: string;
    addressRequired: string;
    companyRequired: string;
    invoiceNumberRequired: string;
    invoiceDateRequired: string;
    descriptionRequired: string;

    // Export Validation
    fillSenderInfo: string;
    fillClientInfo: string;
    fillInvoiceInfo: string;
    addLineItemError: string;
    selectPaymentError: string;
};

const translations: Record<Language, TranslationKeys> = {
    en: {
        // Header
        appName: 'CairBoss',
        appTagline: 'Invoice Generator for Bug Hunters',

        // Settings
        paperSize: 'Paper Size',
        currency: 'Currency',
        language: 'Language',
        reset: 'Reset',
        resetConfirm: 'Are you sure you want to reset all fields?',

        // Buttons
        downloadPdf: 'Download PDF',
        downloadJpg: 'JPG',

        // Validation Notice
        validationTitle: 'Important: Email Case Sensitivity',
        validationMessage: 'Ensure your email address matches exactly as registered (e.g., "leopard@gmail.com" not "Leopard@gmail.com"). Some payment systems are case-sensitive.',

        // Sender Info
        yourInfo: 'Your Information',
        fullName: 'Full Name',
        address: 'Address',
        email: 'Email',
        phone: 'Phone',
        phoneNumericOnly: 'Numbers only',

        // Client Info
        billTo: 'Bill To (Client)',
        companyName: 'Company Name',
        clientAddress: 'Address',
        city: 'City',
        country: 'Country',
        zipCode: 'Zip Code',
        taxNumber: 'TAX Number',
        cityRequired: 'City is required',
        countryRequired: 'Country is required',
        zipCodeRequired: 'Zip code is required',
        taxNumberRequired: 'TAX number is required',

        // Invoice Info
        invoiceDetails: 'Invoice Details',
        invoiceNumber: 'Invoice Number',
        invoiceDate: 'Invoice Date',
        dueDate: 'Due Date',

        // Line Items
        services: 'Services / Line Items',
        description: 'Description',
        qty: 'Qty',
        price: 'Price',
        addLineItem: 'Add Line Item',
        total: 'Total',

        // Payment Methods
        paymentMethods: 'Payment Methods',
        bankTransfer: 'Bank Transfer',
        swiftIban: 'SWIFT / IBAN',
        emailTransfer: 'Paypal / Wise',
        cryptoUsdt: 'Crypto (USDT)',
        selectPaymentMethod: 'Please select at least one payment method to proceed.',

        // Bank Details
        bankDetails: 'Bank Transfer Details',
        bankName: 'Bank Name',
        bankAddress: 'Bank Address',
        swiftBic: 'SWIFT / BIC Code',
        accountNumber: 'Account Number',
        holderName: 'Account Holder Name',
        selectBank: 'Select a bank...',
        otherBank: 'Other Bank (Custom)',
        customBankName: 'Custom Bank Name',

        // Wise/PayPal Details
        wiseDetails: 'PayPal / Wise Details',
        emailAddress: 'Email Address',
        wiseLinkOptional: 'Wise Payment Link (Optional)',

        // Crypto Details
        cryptoDetails: 'Cryptocurrency Details (USDT)',
        network: 'Network',
        walletAddress: 'Wallet Address',

        // Preview
        livePreview: 'Live Preview',
        updatesRealtime: 'Updates in real-time',
        invoice: 'INVOICE',
        securityConsultation: 'Security Consultation Services',
        from: 'From',
        amountDue: 'Amount Due',
        paymentDetails: 'Payment Details',
        thankYou: 'Thank you for your business!',

        // Validation Messages
        required: 'Required',
        nameRequired: 'Name is required',
        addressRequired: 'Address is required',
        companyRequired: 'Company name is required',
        invoiceNumberRequired: 'Invoice number is required',
        invoiceDateRequired: 'Invoice date is required',
        descriptionRequired: 'Description is required',

        // Export Validation
        fillSenderInfo: 'Please fill in your name and address',
        fillClientInfo: 'Please fill in company name',
        fillInvoiceInfo: 'Please fill in invoice number and date',
        addLineItemError: 'Please add at least one line item with description, quantity, and price',
        selectPaymentError: 'Please select at least one payment method',
    },
    id: {
        // Header
        appName: 'CairBoss',
        appTagline: 'Invoice Generator untuk Bug Hunter',

        // Settings
        paperSize: 'Ukuran Kertas',
        currency: 'Mata Uang',
        language: 'Bahasa',
        reset: 'Reset',
        resetConfirm: 'Apakah Anda yakin ingin mengosongkan semua field?',

        // Buttons
        downloadPdf: 'Unduh PDF',
        downloadJpg: 'JPG',

        // Validation Notice
        validationTitle: 'Penting: Huruf Besar/Kecil pada Email',
        validationMessage: 'Pastikan alamat email sesuai dengan yang terdaftar (contoh: "NamaAnda@gmail.com" bukan "namaanda@gmail.com"). Beberapa sistem pembayaran sensitif terhadap huruf besar/kecil.',

        // Sender Info
        yourInfo: 'Informasi Anda',
        fullName: 'Nama Lengkap',
        address: 'Alamat',
        email: 'Email',
        phone: 'Telepon',
        phoneNumericOnly: 'Hanya angka',

        // Client Info
        billTo: 'Tagihan Kepada (Klien)',
        companyName: 'Nama Perusahaan',
        clientAddress: 'Alamat',
        city: 'Kota',
        country: 'Negara',
        zipCode: 'Kode Pos',
        taxNumber: 'Nomor NPWP/Pajak',
        cityRequired: 'Kota wajib diisi',
        countryRequired: 'Negara wajib diisi',
        zipCodeRequired: 'Kode pos wajib diisi',
        taxNumberRequired: 'Nomor NPWP wajib diisi',

        // Invoice Info
        invoiceDetails: 'Detail Invoice',
        invoiceNumber: 'Nomor Invoice',
        invoiceDate: 'Tanggal Invoice',
        dueDate: 'Jatuh Tempo',

        // Line Items
        services: 'Layanan / Item',
        description: 'Deskripsi',
        qty: 'Jml',
        price: 'Harga',
        addLineItem: 'Tambah Item',
        total: 'Total',

        // Payment Methods
        paymentMethods: 'Metode Pembayaran',
        bankTransfer: 'Transfer Bank',
        swiftIban: 'SWIFT / IBAN',
        emailTransfer: 'Transfer Email',
        cryptoUsdt: 'Crypto (USDT)',
        selectPaymentMethod: 'Pilih minimal satu metode pembayaran.',

        // Bank Details
        bankDetails: 'Detail Transfer Bank',
        bankName: 'Nama Bank',
        bankAddress: 'Alamat Bank',
        swiftBic: 'Kode SWIFT / BIC',
        accountNumber: 'Nomor Rekening',
        holderName: 'Nama Pemilik Rekening',
        selectBank: 'Pilih bank...',
        otherBank: 'Bank Lainnya (Custom)',
        customBankName: 'Nama Bank Custom',

        // Wise/PayPal Details
        wiseDetails: 'Detail PayPal / Wise',
        emailAddress: 'Alamat Email',
        wiseLinkOptional: 'Link Pembayaran Wise (Opsional)',

        // Crypto Details
        cryptoDetails: 'Detail Cryptocurrency (USDT)',
        network: 'Jaringan',
        walletAddress: 'Alamat Wallet',

        // Preview
        livePreview: 'Pratinjau Langsung',
        updatesRealtime: 'Diperbarui secara real-time',
        invoice: 'INVOICE',
        securityConsultation: 'Jasa Konsultasi Keamanan',
        from: 'Dari',
        amountDue: 'Total Tagihan',
        paymentDetails: 'Detail Pembayaran',
        thankYou: 'Terima kasih atas kerjasama Anda!',

        // Validation Messages
        required: 'Wajib diisi',
        nameRequired: 'Nama wajib diisi',
        addressRequired: 'Alamat wajib diisi',
        companyRequired: 'Nama perusahaan wajib diisi',
        invoiceNumberRequired: 'Nomor invoice wajib diisi',
        invoiceDateRequired: 'Tanggal invoice wajib diisi',
        descriptionRequired: 'Deskripsi wajib diisi',

        // Export Validation
        fillSenderInfo: 'Isi nama dan alamat Anda',
        fillClientInfo: 'Isi nama perusahaan klien',
        fillInvoiceInfo: 'Isi nomor dan tanggal invoice',
        addLineItemError: 'Tambahkan minimal satu item dengan deskripsi, jumlah, dan harga',
        selectPaymentError: 'Pilih minimal satu metode pembayaran',
    },
};

export function getTranslations(lang: Language): TranslationKeys {
    return translations[lang];
}

export type { TranslationKeys };
