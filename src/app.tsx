import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeProvider } from "./app/contexts/theme-provider";
import { sleep } from "./app/lib/utils";
import { Stepper } from "./components/stepper";
import { AccountStep } from "./components/steps/account-step";
import { accountStepSchema } from "./components/steps/account-step/schema";
import { AddressStep } from "./components/steps/address-step";
import { addressStepSchema } from "./components/steps/address-step/schema";
import { PersonalDataStep } from "./components/steps/personal-data-step";
import { personalDataStepSchema } from "./components/steps/personal-data-step/schema";

const schema = z.object({
  accountStep: accountStepSchema,
  personalDataStep: personalDataStepSchema,
  addressStep: addressStepSchema,
});

export type FormData = z.infer<typeof schema>;

export function App() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountStep: {
        email: '',
        password: '',
      },
      personalDataStep: {
        firstName: '',
        lastName: '',
        document: '',
      },
      addressStep: {
        state: '',
        city: '',
        street: ''
      }
    }
  });

  const handleSubmit = form.handleSubmit(async formData => {
    console.log('Enviando para a API:', formData);

    await sleep(2000);

    console.log('Enviado')
  })

  return (
    <ThemeProvider>
      <div className="min-h-screen flex justify-center pt-40">
        <FormProvider {...form} >
          <form onSubmit={handleSubmit}>
            <Stepper
              steps={[
                {
                  label: 'Conta',
                  content: <AccountStep />
                },
                {
                  label: 'Dados pessoas',
                  content: <PersonalDataStep />
                },
                {
                  label: 'Endereço',
                  content: <AddressStep />
                },
              ]}
            />
          </form>
        </FormProvider>
      </div>
    </ThemeProvider>
  )
};
