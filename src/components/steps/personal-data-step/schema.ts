import { z } from "zod";

export const personalDataStepSchema = z.object({
  firstName: z.string().min(1, 'Inform seu nome'),
  lastName: z.string().min(1, 'Informe seu sobrenome'),
  document: z.string().min(1, 'Inform o CPf')
});
