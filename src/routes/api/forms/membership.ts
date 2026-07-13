import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getAdminRecipients, sendSms } from "@/lib/mnotify";
import { normalizeGhanaPhone } from "@/lib/phone";
import { membershipAdminAlertMessage, membershipConfirmationMessage } from "@/lib/sms-messages";

const membershipSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  studentId: z.string().trim().min(1, "Student ID is required").max(50),
  department: z.string().trim().min(1, "Department is required").max(100),
  level: z.string().trim().min(1, "Level is required").max(30),
  phone: z.string().trim().min(9, "Phone number is required").max(20),
  email: z.string().trim().email("Valid email is required").max(200),
  interests: z.array(z.string().trim().min(1)).max(20).default([]),
  reason: z.string().trim().max(2000).optional(),
});

export const Route = createFileRoute("/api/forms/membership")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const parsed = membershipSchema.safeParse(body);
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
            message: membershipAdminAlertMessage(payload),
          });
          await sendSms({
            recipients: [phone],
            message: membershipConfirmationMessage(payload.name),
          });
        } catch (error) {
          console.error("Membership form SMS failed:", error);
          return Response.json(
            { error: "We could not submit your application right now. Please try again shortly." },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
