import React, { FC, useCallback } from 'react';

import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';

import { Phase, PhaseStep as PhaseStepStruct } from './models';
import { PhaseStep } from './components/Step';

export const PhasePlanner: FC<{ phase: Phase, onChange: (phase: Phase) => void }> = ({ phase, onChange }) => {
  console.log(phase);

  const [phaseObj, setPhaseObj] = React.useState(phase);
  const [finishedPhrase, setFinishedPhrase] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);

  console.log('phaseObj', phaseObj);


  const finishedPhasePhrase = useCallback(async () => {
    const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random').then(res => res.json())
    setFinishedPhrase(res.text)
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === phaseObj.steps.length - 1) {
      finishedPhasePhrase()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const allPhaseStepTasksCompleted = () => {
    return phaseObj.steps[activeStep]?.tasks.every(task => task.completed)
  }

  const isLastStep = (index: number) => {
    return index === phaseObj.steps.length - 1
  }

  // const isStrict = () => {
  //   return phaseObj.rule === PhaseRule.strict
  // }

  const updateStep = (step: PhaseStepStruct) => {
    setPhaseObj(prev => {
      prev.steps[activeStep] = step
      onChange(prev)
      return { ...prev }
    })
  }

  if (!phaseObj) {
    return <h1>No Data found here</h1>
  }

  const { steps } = phaseObj

  return <Box sx={{ maxWidth: 400 }}>
    <Stepper activeStep={activeStep} orientation="vertical" >
      {steps.map((step, index) => (
        <Step key={step.title}>
          <StepLabel
            optional={
              isLastStep(index) ? (
                <Typography variant="caption">Last step</Typography>
              ) : null
            }
          >
            {step.title}
          </StepLabel>
          <StepContent>
            <Typography>{step.description}</Typography>
            <PhaseStep step={step} onChange={updateStep} />
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  disabled={!allPhaseStepTasksCompleted()}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
    {activeStep === steps.length && (
      <Paper square elevation={0} sx={{ p: 3 }}>
        <Typography>{finishedPhrase}</Typography>
        <Button onClick={finishedPhasePhrase} sx={{ mt: 1, mr: 1 }}>
          One more interesting fact
        </Button>
        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
          Reset
        </Button>
      </Paper>
    )}
  </Box>
}