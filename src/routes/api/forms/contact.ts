import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getAdminRecipients, sendSms } from "@/lib/mnotify";
import { normalizeGhanaPhone } from "@/lib/phone";
import { contactAdminAlertMessage, contactConfirmationMessage } from "@/lib/sms-messages";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(200),
  phone: z.string().trim().min(9, "Phone number is required").max(20),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export const Route = createFileRoute("/api/forms/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: parsed.error.errors[0]?.message ?? "Invalid form data" },
            { status: 400 },
          );
        }

        const phone = normalizeGhanaPhone(parsed.data.phone);
        if (!phone) {
          return Response.json(
            { error: "Enter a valid Ghana phone number (e.g. 024 123 4567)" },
            { status: 400 },
          );
        }

        const payload = { ...parsed.data, phone };

        try {
          await sendSms({
            recipients: getAdminRecipients(),
            message: contactAdminAlertMessage(payload),
          });
          await sendSms({
            recipients: [phone],
            message: contactConfirmationMessage(payload.name, payload.subject),
          });
        } catch (error) {
          console.error("Contact form SMS failed:", error);
          return Response.json(
            { error: "We could not send your message right now. Please try again shortly." },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
