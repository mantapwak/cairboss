"use client";

import { useInvoiceStore } from "@/lib/store";
import { getTranslations } from "@/lib/translations";

export function SenderInfo() {
  const { sender, setSender, touchField, touchedFields, language } =
    useInvoiceStore();
  const t = getTranslations(language);

  const handleChange =
    (field: keyof typeof sender) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // For phone field, only allow numeric characters
      if (field === "phone") {
        const numericValue = e.target.value.replace(/[^0-9+\-\s]/g, "");
        setSender({ [field]: numericValue });
      } else {
        setSender({ [field]: e.target.value });
      }
    };

  const handleBlur = (field: string) => () => {
    touchField(`sender.${field}`);
  };

  const isError = (field: string) => {
    const touched = touchedFields.has(`sender.${field}`);
    const value = sender[field as keyof typeof sender];
    return touched && !value;
  };

  return (
    <div className="section-card animate-fadeIn">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-accent-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        {t.yourInfo}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="input-label required">{t.fullName}</label>
          <input
            type="text"
            className={`input-field ${isError("name") ? "error" : ""}`}
            placeholder="Joko Widodo"
            value={sender.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          {isError("name") && <p className="error-message">{t.nameRequired}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="input-label required">{t.address}</label>
          <textarea
            className={`input-field min-h-[80px] ${
              isError("address") ? "error" : ""
            }`}
            placeholder="123 Security Street, Cyber City, CC 12345, Country"
            value={sender.address}
            onChange={handleChange("address")}
            onBlur={handleBlur("address")}
          />
          {isError("address") && (
            <p className="error-message">{t.addressRequired}</p>
          )}
        </div>

        <div>
          <label className="input-label">{t.email}</label>
          <input
            type="email"
            className="input-field"
            placeholder="you@email.com"
            value={sender.email}
            onChange={handleChange("email")}
          />
        </div>

        <div>
          <label className="input-label">
            {t.phone}
            <span className="text-xs text-zinc-500 ml-2">
              ({t.phoneNumericOnly})
            </span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            className="input-field"
            placeholder="+62 812 3456 7890"
            value={sender.phone}
            onChange={handleChange("phone")}
          />
        </div>
      </div>
    </div>
  );
}
