import React, { useState } from "react";
import Modal from "./Modal";
import { exerciseDescriptions } from "../utils/index.js";
export default function QuranCard(props) {
  const {
    trainingPlan,
    workoutIndex,
    type,
    dayNum,
    icon,
    savedWeights,
    handleSave,
    handleComplete,
  } = props;

  const [showReciteDescription, setShowReciteDescription] = useState(null);
  const [weights, setWeights] = useState(savedWeights || {});

  function handleAddWeight(title, weight) {
    const newObj = {
      ...weights,
      [title]: weight,
    };
    setWeights(newObj);
  }

  return (
    <div className="custom-framework workout-container">
      {showReciteDescription && (
        <Modal
          showReciteDescription={showReciteDescription}
          handleCloseModal={() => {
            setShowReciteDescription(null);
          }}
        />
      )}
      <div className="custom-framework workout-card card">
        <div className="custom-framework plan-card-header">
          <p>اليوم {dayNum}</p>
          {icon}
        </div>
        <div className="custom-framework plan-card-header">
          <h2>
            <b>{type} </b>
          </h2>
        </div>
      </div>

      <div className="custom-framework workout-grid  rounded-xl shadow">
        
        {Object.entries(trainingPlan).map(([key, value]) => {
          if (key === "name") {
            return;
          }

          return value.map((Exercise, Index) => {
            return (
              <React.Fragment key={Index}>
               {Index === 0?<> 
               <div className="custom-framework exercise-name">
                  <h4>{key.split("_").join(" ")}</h4>
                </div>
                <h6>جلسة</h6>
                <h6>التكرار</h6>
                <h6 className="custom-framework weight-input">عدد المكملة</h6></> : ""}
                <div className="custom-framework exercise-name">
                  <p>{Exercise.name} </p>
                  <button
                    onClick={() => {
                      setShowReciteDescription({
                        name: Exercise.name,
                        description: exerciseDescriptions[Exercise.name],
                      });
                    }}
                    className="custom-framework help-icon"
                  >
                    <i className="custom-framework fa-regular fa-circle-question" />
                  </button>
                </div>
                <p className="custom-framework exercise-info">
                  {Exercise.unit}
                </p>
                <p className="custom-framework exercise-info">
                  {Exercise.amount}
                </p>
                <input
                  value={weights[Exercise.name] || ""}
                  onChange={(e) => {
                    handleAddWeight(Exercise.name, e.target.value);
                  }}
                  className="custom-framework weight-input"
                  placeholder="دون هنا . . ."
                />
              </React.Fragment>
            );
          });
        })}
      </div>

      <div className="custom-framework workout-buttons">
        <button
          onClick={() => {
            handleSave(workoutIndex, { weights });
          }}
        >
          أحفظ و ضع أكملت
        </button>
        <button
          onClick={() => {
            handleComplete(workoutIndex, { weights });
          }}
        >
          تم الأنجاز!
        </button>
      </div>
    </div>
  );
}
