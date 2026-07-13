import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getAdminRecipients, sendSms } from "@/lib/mnotify";
import { normalizeGhanaPhone } from "@/lib/phone";
import {
  eventRegistrationAdminAlertMessage,
  eventRegistrationConfirmationMessage,
} from "@/lib/sms-messages";

const eventRegistrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(255),
  phone: z.string().trim().min(9, "Phone number is required").max(20),
  indexNo: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(500).optional(),
  eventTitle: z.string().trim().min(1, "Event is required").max(150),
  eventDate: z.string().trim().min(1).max(50),
  eventTime: z.string().trim().min(1).max(30),
  eventVenue: z.string().trim().min(1).max(100),
});

export const Route = createFileRoute("/api/forms/event-registration")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const parsed = eventRegistrationSchema.safeParse(body);
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
            message: eventRegistrationAdminAlertMessage(payload),
          });
          await sendSms({
            recipients: [phone],
            message: eventRegistrationConfirmationMessage(payload),
          });
        } catch (error) {
          console.error("Event registration SMS failed:", error);
          return Response.json(
            { error: "We could not complete your registration right now. Please try again shortly." },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
