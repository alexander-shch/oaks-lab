export interface PhaseBase {
    title: string
    description: string
    completed: boolean
}

export interface PhaseTask extends PhaseBase { }

export interface PhaseStep extends PhaseBase {
    tasks: PhaseTask[]
}

export enum PhaseRule {
    dynamic = 'agile', // the user will be able to go forward and back in the phases e.g dynamic
    strict = 'waterfall', // requires the user to finish all tasks in a phase step to be able to continue to the next phase e.g strict
    // We can have more rules to be able to implement different logic
}

export interface Phase extends PhaseBase {
    id: number
    rule: PhaseRule
    steps: PhaseStep[]
}