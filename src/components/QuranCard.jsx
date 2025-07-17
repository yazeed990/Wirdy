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
  const [borderCheck, setBorderCheck] = useState(false);

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
                <div className="bg-slate-950 backdrop-blur-md rounded-2xl ">
                  {Index === 0 ? (
                    <>
                      <div className="custom-framework exercise-name  ">
                        <h4>{key.split("_").join(" ")}</h4>
                      </div>
                      <h6>جلسة</h6>
                      <h6>التكرار</h6>
                      <h6 className="custom-framework weight-input">
                        عدد المكملة
                      </h6>
                    </>
                  ) : (
                    ""
                  )}
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
                  <div className=" ">
                    <input
                      value={weights[Exercise.name] || ""}
                      onChange={(e) => {
                        handleAddWeight(Exercise.name, e.target.value);
                      }}
                      className="custom-framework w-18 sm:w-auto"
                      placeholder="دون هنا . . ."
                    />
                    <progress
                      className={`w-18 sm:w-54 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   
                        [&::-webkit-progress-bar]:bg-slate-300 ${
                          weights[Exercise.name] >= Exercise.amount
                            ? "[&::-webkit-progress-value]:bg-green-500"
                            : "[&::-webkit-progress-value]:bg-blue-400"
                        } [&::-moz-progress-bar]:bg-violet-400`}
                      value={weights[Exercise.name] / Exercise.amount || ""}
                    />
                  </div>
                </div>
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
