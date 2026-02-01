import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { PaperSize } from './schemas';
import { PAPER_SIZES } from './schemas';

export async function generatePDF(
    element: HTMLElement,
    paperSize: PaperSize,
    filename: string = 'invoice'
): Promise<void> {
    const { width, height } = PAPER_SIZES[paperSize];

    // Create canvas from element
    const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
    });

    // Calculate dimensions
    const imgWidth = width;
    const imgHeight = (canvas.height * width) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
        orientation: imgHeight > height ? 'portrait' : 'portrait',
        unit: 'mm',
        format: [width, height],
    });

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, height));

    // If content is longer than one page, add more pages
    let remainingHeight = imgHeight - height;
    let position = -height;

    while (remainingHeight > 0) {
        pdf.addPage([width, height]);
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        position -= height;
        remainingHeight -= height;
    }

    // Download
    pdf.save(`${filename}.pdf`);
}

export async function generateImage(
    element: HTMLElement,
    filename: string = 'invoice'
): Promise<void> {
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
}
