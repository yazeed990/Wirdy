import { useState, useEffect } from 'react'
import {workoutProgram as training_plan} from '../utils/index.js'
import QuranCard from './QuranCard.jsx'


export default function Grid() {
    const [savedWorkouts, setSavedWorkouts] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        const entry = savedWorkouts[val]
        return entry.isComplete
    })

    function handleSave(index, data) {
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data, isComplete: !!data.isComplete || 
                !!savedWorkouts?.[index]?.isComplete

            }
        }

        setSavedWorkouts(newObj)
        localStorage.setItem('Quran-tracker', JSON.stringify(newObj))
        setSelectedWorkout(null)

    }

    function handleComplete(index, data){
        const  newObj = {...data}
        newObj.isComplete = true
        handleSave(index, newObj)
    }

    useEffect(() => {
        if(!localStorage) {return}
        let savedData = {}
        if (localStorage.getItem("Quran-tracker")) {
            savedData = JSON.parse(localStorage.getItem("Quran-tracker"))
        }
        setSavedWorkouts(savedData)
    }, [])

    return (
        
        <div id="Days" className="training-plan-grid">
            { Object.keys(training_plan).map((memorise, workoutIndex) => {
                const isLocked = workoutIndex === 0 ? 
                false : 
                !completedWorkouts.includes(`${workoutIndex - 1}`)
                console.log(workoutIndex, isLocked)
                

                const page = workoutIndex +1
                const type =workoutIndex === 0 ? "الصفحة " + page :page  % 20 === 0 ? "جزء" : 
                page % 10 === 0 ? "حزب" : "الصفحة " + page 



                const trainingPlan = training_plan[workoutIndex]
                const dayNum =  workoutIndex + 1
                const icon = 
                workoutIndex % 3 === 0 ? (
                    <img className='icon' src="public/2quran_icon.png" />
                ) : (
                    workoutIndex % 3 === 1 ? (
                        <img className="icon" src="public/quran-icon.png"/>
                    ) : (
                        <img className='icon' src="public/tasbih_icon.png" />
                    )
                )
            

                if (workoutIndex === selectedWorkout){
                    return(
                        <QuranCard savedWeights={savedWorkouts?.[workoutIndex]?.weights} handleSave={handleSave} handleComplete={handleComplete} key={workoutIndex} trainingPlan={trainingPlan}
                        type={type} workoutIndex={workoutIndex} icon={icon} dayNum={dayNum}/>
                    ) 
                }
                return (    
                    <button onClick={() => {
                        if (isLocked) {return}
                        setSelectedWorkout(workoutIndex)
                    }} className={"card plan-card " + (isLocked ? "inactive": "")} 
                     key={workoutIndex}>
                        <div className="plan-card-header">
                            <p>اليوم  {dayNum}</p>
                        </div>
                        {isLocked ? (
                            <i className="fa-solid fa-lock"></i>
                        ) : (icon)}
                        <div className="plan-card-header">
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}




        </div>
    )
}