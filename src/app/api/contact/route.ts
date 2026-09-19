import { NextRequest, NextResponse } from "next/server";
import { submitContactForm } from "@/services/contact.service";
import { contactSchema } from "@/lib/contactSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid form data." }, { status: 400 });
    }

    const result = await submitContactForm(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "An error occurred. Please try again." }, { status: 500 });
  }
}
