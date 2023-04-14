import React, { useEffect, useState } from 'react';
import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import './App.css';
import { PhasePlanner } from './modules/PhasePlanner';
import { Phase, PhaseRule } from './modules/PhasePlanner/models';
import { LocalStorage } from './utils';
import { cloneDeep, isUndefined } from 'lodash-es';

const simplePhase: Phase = {
  id: 1,
  title: 'Mega planner',
  completed: false,
  description: 'Phase description',
  rule: PhaseRule.dynamic,
  steps: [{
    completed: false,
    description: 'step 1',
    title: 'Step 1',
    tasks: [
      { completed: false, description: 'something to do 1', title: 'Task 1' },
      { completed: false, description: 'something to do 2', title: 'Task 2' },
      { completed: false, description: 'something to do 3', title: 'Task 3' }
    ]
  }, {
    completed: false,
    description: 'step 2',
    title: 'Step 2',
    tasks: [
      { completed: false, description: 'something to do 1', title: 'Task 1' },
      { completed: false, description: 'something to do 2', title: 'Task 2' },
      { completed: false, description: 'something to do 3', title: 'Task 3' }
    ]
  }],
}

const MEMORY_DIRECTORY = 'phasesList'

function App() {
  const [phaseList, setPhaseList] = useState<Phase[]>([])
  const [activePhase, setActivePhase] = useState<Phase | undefined>(undefined)

  // Init memory state on load
  // Init the application by getting phases from memory or set initial state to work with
  useEffect(() => {
    const availablePhasesInMemory = LocalStorage.get<Phase[]>(MEMORY_DIRECTORY)

    if (isUndefined(availablePhasesInMemory)) {
      setPhaseList([])
    } else {
      setPhaseList(availablePhasesInMemory)
    }
  }, [])

  const addNewList = () => {
    setPhaseList(prev => {
      const clonedList = cloneDeep(simplePhase)
      clonedList.id = new Date().getTime()
      prev.push(clonedList)
      return [...prev]
    })
  }

  const updatePhase = (phase: Phase) => {
    if (!phaseList || !phase) {
      return
    }

    const indexOfPhaseList = phaseList.findIndex(item => item.id === phase.id)
    if (indexOfPhaseList === -1) {
      alert(`Phase with the id ${phase.id} was not found`)
    } else {
      setPhaseList(prev => {
        prev[indexOfPhaseList] = phase
        LocalStorage.save(MEMORY_DIRECTORY, prev)
        return [...prev]
      })
    }
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        {activePhase ? <PhasePlanner key={activePhase?.id} phase={activePhase} onChange={updatePhase} /> : <Typography>No phase planner selected</Typography>}
      </Grid>
      <Grid item xs={4}>
        <List>
          {phaseList.map((phaseItem, index) => {
            return <ListItem disablePadding key={`phase-list-item-${index}`}>
              <ListItemButton selected={activePhase?.id === phaseItem.id} onClick={() => {
                setActivePhase(phaseItem)
              }}>
                <ListItemText primary={`${phaseItem.title} ${index + 1}`} />
              </ListItemButton>
            </ListItem>
          })}
        </List>
        <Button onClick={() => addNewList()}>Create a list</Button>
      </Grid>
    </Grid >
  );
}

export default App;
