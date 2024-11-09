import type { FormData } from "@/app";
import { StepHeader } from "@/components/step-header";
import { StepperFooter, StepperNextButton, StepperPreviousButton } from "@/components/stepper";
import { useStepper } from "@/components/stepper/useStepper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";


export function PersonalDataStep() {
  const { nextStep } = useStepper();

  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger('personalDataStep');

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div>
      <StepHeader
        title="Dados pessoais"
        descrition="Conte-nos mais sobre você"
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Primeiro nome</Label>
          <Input id="firstName" {...form.register('personalDataStep.firstName')} />
          {form.formState.errors.personalDataStep?.firstName?.message && (
            <small className="text-destructive">
              {form.formState.errors.personalDataStep?.firstName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...form.register('personalDataStep.lastName')} />
          {form.formState.errors.personalDataStep?.lastName?.message && (
            <small className="text-destructive">
              {form.formState.errors.personalDataStep?.lastName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">CPF</Label>
          <Input id="document" {...form.register('personalDataStep.document')} />
          {form.formState.errors.personalDataStep?.document?.message && (
            <small className="text-destructive">
              {form.formState.errors.personalDataStep?.document?.message}
            </small>
          )}
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  )
}
