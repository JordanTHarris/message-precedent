import { SendVerificationRequestParams } from "next-auth/providers/email";
import { resend } from "@/lib/resend";

export const sendVerificationRequest = async (params: SendVerificationRequestParams) => {
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

// export async function sendVerificationRequest({
//   identifier,
//   url,
//   provider,
// }: SendVerificationRequestParams) {
//   try {
//     const isDevOrStaging =
//       process.env.NODE_ENV === "development" ||
//       process.env.VERCEL_ENV === "preview";
//     const emailAddress = isDevOrStaging ? "delivered@resend.dev" : identifier;

//     //@ts-ignore
//     const data = await resend.emails.send({
//       from: process.env.EMAIL_FROM || "onboarding@resend.dev",
//       to: [emailAddress],
//       subject: "Login Link to Your Account",
//       html: `
//       <p>Click the magic link below to sign in to your account:</p>
//       <p><a href="${url}"><b>Sign in</b></a></p>`,
//       headers: {
//         "X-Entity-Ref-ID": new Date().getTime() + "",
//       },
//     });

//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }
