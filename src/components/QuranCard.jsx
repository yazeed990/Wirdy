import React, {useState} from "react"
import Modal from "./Modal"
import {exerciseDescriptions} from "../utils/index.js"
export default function QuranCard(props){
    const {trainingPlan, workoutIndex, type, dayNum, icon, savedWeights,
        handleSave, handleComplete} = props
    
    const {memorise, recite } = trainingPlan || {}
    const [showReciteDescription, setShowReciteDescription] = useState(null)
    const [weights, setWeights] = useState(savedWeights || {})

    function handleAddWeight(title, weight){
        const newObj = {
            ...weights, 
            [title]: weight
        }
        setWeights(newObj)
    }
    


    return(
        <div className="workout-container">
            {showReciteDescription && (
                <Modal showReciteDescription={showReciteDescription}
                handleCloseModal={() => {
                    setShowReciteDescription(null)
                }}/>
            )}
            <div className="workout-card card">
                <div className="plan-card-header">
                    <p>اليوم {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h2><b>{type} </b></h2>
                </div>
            </div>


        <div className="workout-grid">
            <div className="exercise-name">
                <h4>حفظ</h4>
            </div>
            <h6>جلسة</h6>
            <h6>التكرار</h6>
            <h6 className="weight-input">عدد الصفحات المكملة</h6>
            {memorise.map((memoriseExercise, memoriseIndex) => {
                return (
                    <React.Fragment key={memoriseIndex}>
                        <div className="exercise-name">
                            <p>{memoriseIndex + 1}. {memoriseExercise.name} </p>
                            <button onClick={() => {
                                setShowReciteDescription({
                                    name: memoriseExercise.name,
                                    description: exerciseDescriptions[memoriseExercise.name]
                                })
                            }} className="help-icon">
                                <i className="fa-regular fa-circle-question" />
                                </button>
                        </div>
                        <p className="exercise-info">{memoriseExercise.sets}</p>
                        <p className="exercise-info">{memoriseExercise.reps}</p>
                        <input value={weights[memoriseExercise.name] || ""} 
                        onChange={(e) => {
                            handleAddWeight(memoriseExercise.name, e.target.value)
                        }}
                         className="weight-input" placeholder="دون انجازك هنا.." />
                    </React.Fragment>
                )
            })}

        </div>
        <div className="workout-grid">
            <div className="exercise-name">
                <h4>تلاوة</h4>
            </div>
            <h6>جلسة</h6>
            <h6>التكرار</h6>
            <h6 className="weight-input">عدد الصفحات المكملة</h6>
            {recite.map((reciteExercise, reciteIndex) => {
                return (
                    <React.Fragment key={reciteIndex}>
                        <div className="exercise-name">
                            <p>{reciteIndex + 1}. {reciteExercise.name} </p>
                            <button onClick={() => {
                                setShowReciteDescription({
                                    name: reciteExercise.name,
                                    description: exerciseDescriptions[reciteExercise.name]
                                })
                            }} className="help-icon">
                                <i className="fa-regular fa-circle-question" />
                                </button>
                        </div>
                        <p className="exercise-info">{reciteExercise.sets}</p>
                        <p className="exercise-info">{reciteExercise.reps}</p>
                        <input   value={weights[reciteExercise.name]}
                         onChange={(e) => {
                            handleAddWeight(reciteExercise.name, e.target.value)
                        }
                    } className="weight-input" placeholder="دون انجازك هنا.." />
                    </React.Fragment>
                )
            })}

        </div>


        <div className="workout-buttons">

            <button onClick={() =>{
                handleSave(workoutIndex, {weights})
            }}>أحفظ و ضع أكملت</button>
            <button onClick={() => {
                handleComplete(workoutIndex, {weights})
            }} disabled={Object.keys(weights).length !== (recite.length +memorise.length) }
            >تم الأنجاز!</button>
        </div>
        </div>

    )
}