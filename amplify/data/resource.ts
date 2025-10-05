import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
     }).authorization(allow => [allow.publicApiKey()]), // Changed from allow.owner()
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey', // Changed from 'userPool'
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});