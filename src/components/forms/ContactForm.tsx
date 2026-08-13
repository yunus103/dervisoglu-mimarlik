"use client";

import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  projectType: z.string().optional(),
  location: z.string().optional(),
  landSize: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof FormData, string[]>>;

type ContactFormProps = {
  formTitle?: string;
  successMessage?: string;
};

/** Bu iş kolunda ilk soru "elinizde ne var" olduğu için proje tipi en üstte sorulur. */
const projectTypes = [
  "Arsa — yeni yapı düşünüyorum",
  "Mevcut bina — kentsel dönüşüm",
  "Mevcut bina — tadilat ve yenileme",
  "İç mimari / dekorasyon",
  "Yalnızca proje ve ruhsat işlemleri",
  "Diğer / emin değilim",
];

export function ContactForm({
  formTitle = "Bize Ulaşın",
  successMessage = "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: projectTypes[0],
    location: "",
    landSize: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Alan hatasını temizle
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    // Client-side validasyon
    const result = schema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    // Honeypot alanını al
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: formData.projectType,
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

  if (status === "success") {
    return (
      <div className="border-t-2 border-primary bg-card px-6 py-10">
        <p className="display text-xl font-bold text-primary">Talebiniz alındı</p>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formTitle && (
        <h2 className="display border-b-2 border-primary pb-3 text-lg font-bold text-primary">
          {formTitle}
        </h2>
      )}

      {/* Honeypot — spam botları için gizli alan */}
      <div className="absolute h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectType">Ne için başvuruyorsunuz?</Label>
          <Select
            id="projectType"
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
            <Label htmlFor="location">Konum (ilçe / mahalle)</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Örn: Arnavutköy, Hadımköy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landSize">Yaklaşık alan (m²)</Label>
            <Input
              id="landSize"
              name="landSize"
              inputMode="numeric"
              value={formData.landSize}
              onChange={handleChange}
              placeholder="Biliyorsanız yazın"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad *</Label>
            <Input
              id="name"
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
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
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

        <div className="space-y-2">
          <Label htmlFor="email">E-posta *</Label>
          <Input
            id="email"
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
          <Label htmlFor="message">Projeniz hakkında *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Arsanın veya binanın durumu, beklentileriniz ve varsa ada/parsel bilgisi..."
            rows={6}
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <p className="text-sm text-destructive">{fieldErrors.message[0]}</p>
          )}
        </div>

        {status === "error" && (
          <p className="border-l-2 border-destructive pl-4 text-sm text-destructive">
            Bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full cursor-pointer bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Gönderiliyor..." : "Gönder"}
        </button>
      </div>
    </form>
  );
}
