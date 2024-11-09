import { cn } from "@/app/lib/utils";
import React, { createContext, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useStepper } from "./useStepper";


interface IStepperContextValue {
  previousStep(): void;
  nextStep(): void;
}

export const StepperContext = createContext({} as IStepperContextValue);

interface StepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
}

export function Stepper({ steps, initialStep = 0 }: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const previousStep = useCallback(() => {
    setCurrentStep(prevStep => Math.max(0, prevStep - 1));
  }, []);
  const nextStep = useCallback(() => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  }, []);

  return (
    <StepperContext.Provider value={{ previousStep, nextStep }}>
      <div>
        <ul className="space-x-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className={cn(
                "inline-block text-xs px-2 py-1 rounded-md transition-all",
                index === currentStep && 'bg-primary text-primary-foreground'
              )}
            >
              {String(index + 1).padStart(2, '0')}. {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {steps[currentStep].content}
        </div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      {children}
    </div>
  )
}

export function StepperPreviousButton({
  size = 'sm',
  type = 'button',
  variant = 'secondary',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper();

  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      onClick={onClick ?? previousStep}
      {...props}
    >
      Anterior
    </Button>
  )
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { nextStep } = useStepper();

  return (
    <Button
      size={size}
      type={type}
      onClick={onClick ?? nextStep}
      {...props}
    >
      Próximo
    </Button>
  )
}
