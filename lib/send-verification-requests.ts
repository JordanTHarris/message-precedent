import { SendVerificationRequestParams } from "next-auth/providers";
import { resend } from "@/lib/resend";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  try {
    await resend.emails.send({
      from: params.provider.from,
      to: params.identifier,
      subject: "Login Link to Your Account",
      html: `
      <p>Click the magic link below to sign in to your account:</p>
      <p><a href="${params.url}"><b>Sign in</b></a></p>
      `,
    });
  } catch (error) {
    console.log({ error });
  }
};
