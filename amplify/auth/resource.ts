import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to Sagaa - Your AI Companion!",
      verificationEmailBody: (createCode) =>
        `Use this code to confirm your Companionship: ${createCode()}`,
    },
  },
  userAttributes: {
    givenName: { required: true },
    familyName: { required: true },
  },
});