"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const quoteSchema = z.object({
  name: z.string().min(2, "Lütfen adınızı soyadınızı girin"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  projectType: z.string().min(1, "Lütfen bir seçim yapın"),
  location: z.string().optional(),
  message: z.string().min(10, "Lütfen projeniz hakkında kısa bir bilgi yazın"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;
type FieldErrors = Partial<Record<keyof QuoteFormData, string[]>>;

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  "Arsa — yeni yapı düşünüyorum",
  "Mevcut bina — kentsel dönüşüm",
  "Mevcut bina — tadilat ve yenileme",
  "İç mimari / dekorasyon",
  "Yalnızca proje ve ruhsat işlemleri",
  "Diğer / emin değilim",
];

const emptyForm: QuoteFormData = {
  name: "",
  email: "",
  phone: "",
  projectType: projectTypes[0],
  location: "",
  message: "",
};

export function QuickQuoteModal({ isOpen, onClose }: QuickQuoteModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<QuoteFormData>(emptyForm);

  // Modal açıkken arka planın kaymasını engelle, Esc ile kapat
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof QuoteFormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    const validation = quoteSchema.safeParse(formData);
    if (!validation.success) {
      setFieldErrors(validation.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          location: formData.location,
          subject: `Ön fizibilite talebi: ${formData.projectType}`,
          message: formData.message,
          honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        if (data.error && typeof data.error === "object") {
          setFieldErrors(data.error);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFieldErrors({});
    setFormData(emptyForm);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ön fizibilite talebi"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 my-auto w-full max-w-2xl border border-border bg-card text-foreground"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 cursor-pointer p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Kapat"
            >
              <RiCloseLine size={22} />
            </button>

            {status === "success" ? (
              <div className="px-6 py-14 sm:px-10">
                <h2 className="display text-2xl font-extrabold text-primary">Talebiniz alındı</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  Talebiniz ekibimize iletildi. Mesai saatleri içinde telefon veya e-posta
                  üzerinden size dönüş yapılacaktır.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-8 cursor-pointer border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Kapat
                </button>
              </div>
            ) : (
              <div className="px-6 py-10 sm:px-10">
                <div className="border-b-2 border-primary pb-4 pr-8">
                  <h2 className="display text-2xl font-extrabold text-primary">
                    Ön Fizibilite Talebi
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    Arsanızın veya binanızın bilgilerini iletin; imar durumunu çıkarıp
                    oluşabilecek bağımsız bölüm sayısını hesaplayalım. Bu çalışma ücretsizdir.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                  <div className="absolute h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote-projectType">Ne için başvuruyorsunuz?</Label>
                    <Select
                      id="quote-projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quote-name">Ad Soyad *</Label>
                      <Input
                        id="quote-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Adınız Soyadınız"
                        aria-invalid={!!fieldErrors.name}
                      />
                      {fieldErrors.name && (
                        <p className="text-sm text-destructive">{fieldErrors.name[0]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-phone">Telefon *</Label>
                      <Input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="05XX XXX XX XX"
                        aria-invalid={!!fieldErrors.phone}
                      />
                      {fieldErrors.phone && (
                        <p className="text-sm text-destructive">{fieldErrors.phone[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quote-email">E-posta *</Label>
                      <Input
                        id="quote-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ornek@mail.com"
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="text-sm text-destructive">{fieldErrors.email[0]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-location">Konum (ilçe / mahalle)</Label>
                      <Input
                        id="quote-location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Örn: Arnavutköy, Hadımköy"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote-message">Projeniz hakkında *</Label>
                    <Textarea
                      id="quote-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Arsanın veya binanın durumu, yaklaşık metrekare ve varsa ada/parsel bilgisi..."
                      aria-invalid={!!fieldErrors.message}
                    />
                    {fieldErrors.message && (
                      <p className="text-sm text-destructive">{fieldErrors.message[0]}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="border-l-2 border-destructive pl-4 text-sm text-destructive">
                      Form gönderilirken bir hata oluştu. Bilgilerinizi kontrol edip tekrar deneyin.
                    </p>
                  )}

                  <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row-reverse sm:items-center">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full cursor-pointer bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {status === "loading" ? "Gönderiliyor..." : "Talebi gönder"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={status === "loading"}
                      className="w-full cursor-pointer border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 sm:w-auto"
                    >
                      Vazgeç
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
