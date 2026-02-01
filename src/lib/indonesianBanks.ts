// Indonesian Banks data with SWIFT/BIC codes and addresses
export interface IndonesianBank {
    name: string;
    swiftCode: string;
    address: string;
}

export const INDONESIAN_BANKS: IndonesianBank[] = [
    {
        name: 'PT BANK MANDIRI (PERSERO) TBK',
        swiftCode: 'BMRIIDJA',
        address: 'Plaza Mandiri, Jl. Jend. Gatot Subroto Kav. 36-38, Jakarta 12190, Indonesia',
    },
    {
        name: 'PT BANK CENTRAL ASIA TBK (BCA)',
        swiftCode: 'CENAIDJA',
        address: 'Menara BCA, Grand Indonesia, Jl. M.H. Thamrin No. 1, Jakarta 10310, Indonesia',
    },
    {
        name: 'PT BANK NEGARA INDONESIA (PERSERO) TBK (BNI)',
        swiftCode: 'BNINIDJA',
        address: 'Gedung BNI, Jl. Jend. Sudirman Kav. 1, Jakarta 10220, Indonesia',
    },
    {
        name: 'PT BANK RAKYAT INDONESIA (PERSERO) TBK (BRI)',
        swiftCode: 'BRINIDJA',
        address: 'Gedung BRI I, Jl. Jend. Sudirman Kav. 44-46, Jakarta 10210, Indonesia',
    },
    {
        name: 'PT BANK CIMB NIAGA TBK',
        swiftCode: 'BNIAIDJA',
        address: 'Graha CIMB Niaga, Jl. Jend. Sudirman Kav. 58, Jakarta 12190, Indonesia',
    },
    {
        name: 'PT BANK PERMATA TBK',
        swiftCode: 'BBBAIDJA',
        address: 'Permata Bank Tower I, Jl. Jend. Sudirman Kav. 27, Jakarta 12920, Indonesia',
    },
    {
        name: 'PT BANK DANAMON INDONESIA TBK',
        swiftCode: 'BDINIDJA',
        address: 'Menara Bank Danamon, Jl. Prof. DR. Satrio Kav. E4 No. 6, Jakarta 12950, Indonesia',
    },
    {
        name: 'PT BANK MAYBANK INDONESIA TBK',
        swiftCode: 'IBBKIDJA',
        address: 'Sentral Senayan III, Jl. Asia Afrika No. 8, Jakarta 10270, Indonesia',
    },
    {
        name: 'PT BANK OCBC NISP TBK',
        swiftCode: 'NISPIDJA',
        address: 'OCBC NISP Tower, Jl. Prof. DR. Satrio Kav. 25, Jakarta 12940, Indonesia',
    },
    {
        name: 'PT BANK TABUNGAN NEGARA (PERSERO) TBK (BTN)',
        swiftCode: 'BTANIDJA',
        address: 'Menara BTN, Jl. Gajah Mada No. 1, Jakarta 10130, Indonesia',
    },
    {
        name: 'PT BANK PANIN TBK',
        swiftCode: 'PINBIDJA',
        address: 'Panin Bank Centre, Jl. Jend. Sudirman Kav. 1, Jakarta 10270, Indonesia',
    },
    {
        name: 'PT BANK JAGO TBK',
        swiftCode: 'JAGBIDJA',
        address: 'Menara BTPN, Jl. Dr. Ide Anak Agung Gde Agung Kav. 5.5-5.6, Jakarta 12950, Indonesia',
    },
    {
        name: 'PT BANK BTPN TBK (JENIUS)',
        swiftCode: 'SUNIIDJA',
        address: 'Menara BTPN, Jl. Dr. Ide Anak Agung Gde Agung Kav. 5.5-5.6, Jakarta 12950, Indonesia',
    },
    {
        name: 'PT BANK MEGA TBK',
        swiftCode: 'MEGAIDJA',
        address: 'Menara Bank Mega, Jl. Kapten Tendean Kav. 12-14A, Jakarta 12790, Indonesia',
    },
    {
        name: 'PT BANK SYARIAH INDONESIA TBK (BSI)',
        swiftCode: 'BSMDIDJA',
        address: 'Wisma Mandiri I, Jl. M.H. Thamrin No. 5, Jakarta 10340, Indonesia',
    },
    {
        name: 'PT BANK DBS INDONESIA',
        swiftCode: 'DBSBIDJA',
        address: 'DBS Bank Tower, Ciputra World 1, Jl. Prof. DR. Satrio Kav. 3-5, Jakarta 12940, Indonesia',
    },
    {
        name: 'PT BANK HSBC INDONESIA',
        swiftCode: 'HABORIDJA',
        address: 'World Trade Center, Jl. Jend. Sudirman Kav. 29-31, Jakarta 12920, Indonesia',
    },
    {
        name: 'PT BANK UOB INDONESIA',
        swiftCode: 'BBIJIDJA',
        address: 'UOB Plaza, Jl. M.H. Thamrin No. 10, Jakarta 10230, Indonesia',
    },
];

// For custom/other banks
export const OTHER_BANK_OPTION = {
    name: 'Other Bank (Custom)',
    swiftCode: '',
    address: '',
};
