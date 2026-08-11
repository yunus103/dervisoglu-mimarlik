"use client";

import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiCheckLine,
  RiSendPlaneLine,
  RiUser3Line,
  RiMailLine,
  RiPhoneLine,
  RiBuilding4Line,
  RiChat1Line,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const quoteSchema = z.object({
  name: z.string().min(2, "Lütfen adınızı soyadınızı girin"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  projectType: z.string().min(1, "Lütfen bir hizmet türü seçin"),
  message: z.string().min(10, "Lütfen proje hakkında kısa bir bilgi yazın (en az 10 karakter)"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;
type FieldErrors = Partial<Record<keyof QuoteFormData, string[]>>;

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickQuoteModal({ isOpen, onClose }: QuickQuoteModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "Mimari Proje Tasarımı",
    message: "",
  });

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

    // Client-side validation
    const validation = quoteSchema.safeParse(formData);
    if (!validation.success) {
      setFieldErrors(validation.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    // Honeypot check
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
          subject: `Hızlı Teklif Talebi: ${formData.projectType}`,
          message: `Hizmet Türü: ${formData.projectType}\n\nProje Detayları:\n${formData.message}`,
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
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "Mimari Proje Tasarımı",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-lg border border-border/80 bg-card p-6 md:p-8 shadow-2xl z-10 my-auto overflow-hidden text-foreground"
          >
            {/* Header Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <RiCloseLine size={22} />
            </button>

            {status === "success" ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <RiCheckLine size={32} />
                </div>
                <h3 className="text-2xl font-bold font-heading text-foreground">Talebiniz Gönderildi!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Teşekkür ederiz. Proje talebiniz ekibimize iletilmiştir. E-posta ve telefon üzerinden en kısa sürede size dönüş yapacağız.
                </p>
                <div className="pt-4">
                  <Button onClick={handleReset} variant="outline" className="px-6 rounded-md font-medium">
                    Kapat
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {/* Title Section */}
                <div className="mb-6 space-y-1 pr-6">
                  <h3 className="text-2xl font-bold font-heading text-primary tracking-tight">
                    Hızlı Teklif Talebi
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Projenizin detaylarını paylaşın, mimari ve inşaat uzmanlarımız size özel ön çalışmayı hazırlasın.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot field */}
                  <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-semibold text-foreground/90 uppercase tracking-wider flex items-center gap-1.5">
                        <RiUser3Line className="text-secondary" /> Ad Soyad *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-10 rounded-md bg-slate-50/50 border-input focus:bg-background text-sm"
                        aria-invalid={!!fieldErrors.name}
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-destructive mt-1">{fieldErrors.name[0]}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold text-foreground/90 uppercase tracking-wider flex items-center gap-1.5">
                        <RiMailLine className="text-secondary" /> E-posta *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ahmet@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-10 rounded-md bg-slate-50/50 border-input focus:bg-background text-sm"
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-destructive mt-1">{fieldErrors.email[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-semibold text-foreground/90 uppercase tracking-wider flex items-center gap-1.5">
                        <RiPhoneLine className="text-secondary" /> Telefon *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-10 rounded-md bg-slate-50/50 border-input focus:bg-background text-sm"
                        aria-invalid={!!fieldErrors.phone}
                      />
                      {fieldErrors.phone && (
                        <p className="text-xs text-destructive mt-1">{fieldErrors.phone[0]}</p>
                      )}
                    </div>

                    {/* Project Type Dropdown */}
                    <div className="space-y-1.5">
                      <Label htmlFor="projectType" className="text-xs font-semibold text-foreground/90 uppercase tracking-wider flex items-center gap-1.5">
                        <RiBuilding4Line className="text-secondary" /> Hizmet / Proje Türü
                      </Label>
                      <select
                        id="projectType"
                        name="projectType"
                        className="h-10 w-full rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm text-foreground focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer transition-colors"
                        value={formData.projectType}
                        onChange={handleChange}
                      >
                        <option value="Mimari Proje Tasarımı">Mimari Proje Tasarımı</option>
                        <option value="İç Mimarlık & Dekorasyon">İç Mimarlık & Dekorasyon</option>
                        <option value="İnşaat & Taahhüt Uygulama">İnşaat & Taahhüt Uygulama</option>
                        <option value="Belediye & Ruhsat Takibi">Belediye & Ruhsat Takibi</option>
                        <option value="Danışmanlık & Proje Revizyonu">Danışmanlık & Proje Revizyonu</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-semibold text-foreground/90 uppercase tracking-wider flex items-center gap-1.5">
                      <RiChat1Line className="text-secondary" /> Proje Özeti / Notunuz *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Lokasyon, tahmini metrekare veya projeden beklentilerinizi kısaca yazın..."
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-md bg-slate-50/50 border-input focus:bg-background text-sm resize-none"
                      aria-invalid={!!fieldErrors.message}
                    />
                    {fieldErrors.message && (
                      <p className="text-xs text-destructive mt-1">{fieldErrors.message[0]}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                      Form gönderilirken bir hata oluştu. Lütfen e-posta ve telefon bilgilerinizi kontrol edip tekrar deneyin.
                    </div>
                  )}

                  {/* Submit Actions */}
                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-border mt-6">
                    <Button type="button" variant="outline" onClick={onClose} disabled={status === "loading"} className="rounded-md px-5">
                      Vazgeç
                    </Button>
                    <Button type="submit" disabled={status === "loading"} className="gap-2 rounded-md px-6 font-semibold shadow-md">
                      {status === "loading" ? (
                        "Gönderiliyor..."
                      ) : (
                        <>
                          <RiSendPlaneLine size={18} />
                          Teklif Talebini Gönder
                        </>
                      )}
                    </Button>
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
