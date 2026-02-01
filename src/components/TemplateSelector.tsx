'use client';

import { useInvoiceStore } from '@/lib/store';
import { TEMPLATE_STYLES } from '@/lib/schemas';
import type { TemplateStyle } from '@/lib/schemas';

export function TemplateSelector() {
    const { templateStyle, setTemplateStyle, language } = useInvoiceStore();

    return (
        <div className="template-selector-wrapper">
            <div className="template-selector-scroll">
                {TEMPLATE_STYLES.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => setTemplateStyle(template.id)}
                        className={`template-card ${templateStyle === template.id ? 'active' : ''}`}
                        title={language === 'id' ? template.nameId : template.name}
                    >
                        <span className="template-icon">{template.icon}</span>
                        <span className="template-name">
                            {language === 'id' ? template.nameId : template.name}
                        </span>
                        {templateStyle === template.id && (
                            <span className="template-check">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
