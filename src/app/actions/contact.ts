"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  company: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, "Message trop court").max(2000),
});

export type ContactFormState = {
  error: string | null;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  redirect("/merci");
}
