import { useState, useEffect } from "react";
import { memorizationPrograms, fiveShields } from "../utils/index.js";
import QuranCard from "./QuranCard.jsx";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";

export default function Grid() {
  const selectedProgram = usePrograms((state) => state.selectedProgram);

  const [training_plan, setTraining_plan] = useState({});
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const completedWorkouts = savedWorkouts
    ? Object.keys(savedWorkouts || {}).filter(
        (val) => savedWorkouts[val].isComplete
      )
    : [];

  useEffect(() => {
    const numberOfDays =
      memorizationPrograms.find(
        (program) => program.name === selectedProgram?.name
      )?.averageDays || 30;
    const fullList = {};
    for (let i = 0; i < numberOfDays; i++) {
      fullList[i] = { ...(selectedProgram || fiveShields) };
    }
    setTraining_plan(fullList);
  }, [selectedProgram]);

  function handleSave(index, data) {
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete,
      },
    };

    setSavedWorkouts(newObj);
    localStorage.setItem(
      `Quran-tracker-${selectedProgram?.name || "fiveShields"}`,
      JSON.stringify(newObj)
    );
    setSelectedWorkout(null);
  }

  function handleComplete(index, data) {
    const newObj = { ...data };
    newObj.isComplete = true;
    handleSave(index, newObj);
  }

  useEffect(() => {
    if (!localStorage || !selectedProgram?.name) {
      return;
    }
    let savedData = {};
    if (
      localStorage.getItem(
        `Quran-tracker-${selectedProgram?.name || "fiveShields"}`
      )
    ) {
      savedData = JSON.parse(
        localStorage.getItem(
          `Quran-tracker-${selectedProgram?.name || "fiveShields"}`
        )
      );
    }
    setSavedWorkouts(savedData);
  }, [selectedProgram?.name]);

  return (
    <div id="Days" className="custom-framework training-plan-grid">
      {Object.keys(training_plan).map((memorise, workoutIndex) => {
        const isLocked =
          workoutIndex === 0
            ? false
            : !completedWorkouts.includes(`${workoutIndex - 1}`);

        const page = workoutIndex + 3;
        const type =
          workoutIndex === 0
            ? "الصفحة " + page
            : page % 20 === 0
            ? "جزء"
            : page % 10 === 0
            ? "حزب"
            : "الصفحة " + page;

        const trainingPlan = training_plan[workoutIndex];
        const dayNum = workoutIndex + 1;
        const icon =
          workoutIndex % 3 === 0 ? (
            <img className="custom-framework icon" src="/2quran_icon.png" />
          ) : workoutIndex % 3 === 1 ? (
            <img className="custom-framework icon" src="/quran-icon.png" />
          ) : (
            <img className="custom-framework icon" src="/tasbih_icon.png" />
          );

        if (workoutIndex === selectedWorkout) {
          return (
            <QuranCard
              savedWeights={savedWorkouts?.[workoutIndex]?.weights}
              handleSave={handleSave}
              handleComplete={handleComplete}
              key={workoutIndex}
              trainingPlan={trainingPlan}
              type={type}
              workoutIndex={workoutIndex}
              icon={icon}
              dayNum={dayNum}
            />
          );
        }
        return (
          <button
            onClick={() => {
              if (isLocked) {
                return;
              }
              setSelectedWorkout(workoutIndex);
            }}
            className={
              "custom-framework card plan-card " + (isLocked ? "inactive" : "")
            }
            key={workoutIndex}
          >
            <div className="custom-framework plan-card-header">
              <p>اليوم {dayNum}</p>
            </div>
            {isLocked ? (
              <i className="custom-framework fa-solid fa-lock"></i>
            ) : (
              icon
            )}
            <div className="custom-framework plan-card-header">
              <h4>
                <b>{type}</b>
              </h4>
            </div>
          </button>
        );
      })}
    </div>
  );
}
