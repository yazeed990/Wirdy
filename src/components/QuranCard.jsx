import React, { useState } from "react";
import Modal from "./Modal";
import { exerciseDescriptions } from "../utils/index.js";
//
import DoneIcon from "@mui/icons-material/Done";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";
export default function QuranCard(props) {
  const handleOpenModal = usePrograms((state) => state.handleOpenModal);
  const changecompletedDay = usePrograms((state) => state.changecompletedDay);
  const {
    trainingPlan,
    workoutIndex,
    type,
    dayNum,
    savedWeights,
    handleSave,
    handleComplete,
    onClose,
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

  // Calculate overall progress
  const totalExercises = Object.entries(trainingPlan)
    .filter(([key]) => key !== "name")
    .reduce((total, [, exercises]) => total + exercises.length, 0);

  const completedExercises = Object.entries(trainingPlan)
    .filter(([key]) => key !== "name")
    .reduce((completed, [, exercises]) => {
      return (
        completed +
        exercises.filter(
          (exercise) =>
            Number(weights[exercise.name]) >= Number(exercise.amount)
        ).length
      );
    }, 0);

  const overallProgress =
    totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  return (
    <div className="quran-card-container">
      <div className="quran-card-inner">
        {showReciteDescription && (
          <Modal
            showReciteDescription={showReciteDescription}
            handleCloseModal={() => setShowReciteDescription(null)}
          />
        )}

        {/* Header Card */}
        <div className="quran-card-header">
          <div className="day-info">
            <div className="day-number">
              <span className="day-label">اليوم</span>
              <span className="day-value">{dayNum}</span>
            </div>
            <div className="lesson-info">
              <h2 className="lesson-title">{type}</h2>
              <div className="progress-summary">
                <span className="progress-text">
                  {completedExercises} من {totalExercises} تمارين
                </span>
                <div className="progress-bar-mini">
                  <div
                    className="progress-fill"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="quran-card-close-btn"
              aria-label="إغلاق"
              title="العودة إلى الجدول"
            >
              ✕
            </button>
          )}
        </div>

        {/* Exercises List */}
        <div className="exercises-container">
          {Object.entries(trainingPlan).map(([sectionKey, exercises]) => {
            if (sectionKey === "name") return null;

            const sectionName = sectionKey.split("_").join(" ");

            return (
              <div key={sectionKey} className="exercise-section">
                <div className="section-header">
                  <h3 className="section-title">{sectionName}</h3>
                  <span className="section-count">
                    {exercises.length} تمارين
                  </span>
                </div>

                <div className="exercises-list">
                  {exercises.map((exercise, index) => {
                    const currentValue = Number(weights[exercise.name]) || 0;
                    const targetValue = Number(exercise.amount);
                    const progress =
                      targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
                    const isCompleted = currentValue >= targetValue;

                    return (
                      <div
                        key={index}
                        className={`exercise-item ${
                          isCompleted ? "completed" : ""
                        }`}
                      >
                        <div className="exercise-header">
                          <div className="exercise-info">
                            <h4 className="exercise-name">{exercise.name}</h4>
                            <span className="exercise-target">
                              الهدف: {exercise.amount} {exercise.unit}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setShowReciteDescription({
                                name: exercise.name,
                                description:
                                  exerciseDescriptions[exercise.name],
                              })
                            }
                            className="help-button"
                            title={`تفاصيل ${exercise.name}`}
                          >
                            ?
                          </button>
                        </div>

                        <div className="exercise-input-section">
                          <div className="input-group">
                            <input
                              type="number"
                              inputMode="numeric"
                              value={weights[exercise.name] || ""}
                              onChange={(e) => {
                                const val = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                handleAddWeight(exercise.name, val);
                              }}
                              className="exercise-input"
                              placeholder="0"
                              min="0"
                              max={targetValue * 2}
                            />
                            <span className="input-unit">{exercise.unit}</span>
                          </div>

                          <div className="progress-section">
                            <div className="progress-bar">
                              <div
                                className={`progress-fill ${
                                  isCompleted ? "completed" : ""
                                }`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                            <span className="progress-percentage">
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>

                        {isCompleted && (
                          <div className="completion-badge">مكتمل</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="quran-card-actions">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => handleSave(workoutIndex, { weights })}
            disabled={Object.keys(weights).length === 0}
          >
            حفظ التقدم
          </button>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              handleComplete(workoutIndex, { weights });
              handleOpenModal();
              changecompletedDay(workoutIndex + 1);
            }}
            disabled={overallProgress < 100}
          >
            {overallProgress >= 100
              ? "إنجاز اليوم"
              : `باقي ${Math.round(100 - overallProgress)}%`}
          </button>
        </div>
      </div>
    </div>
  );
}
