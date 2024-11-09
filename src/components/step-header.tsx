interface StepHeadderProps {
  title: string;
  descrition: string;
}

export function StepHeader({ title, descrition }: StepHeadderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <span className="text-muted-foreground">{descrition}</span>
    </header>
  )
}
