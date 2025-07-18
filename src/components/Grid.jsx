import { useState, useEffect } from "react";
import { memorizationPrograms, fiveShields } from "../utils/index.js";
import QuranCard from "./QuranCard.jsx";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";
import { Button, Modal, Typography, Box, Paper } from "@mui/material";
import Confetti from "react-confetti";
import { qoutesListOnAlim } from "../utils/index.js";

export default function Grid() {
  const open = usePrograms((state) => state.open);
  const completedDay = usePrograms((state) => state.completedDay);
  const handleCloseModal = usePrograms((state) => state.handleCloseModal);

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
    <>
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
              ? `جزء ${(workoutIndex + 3) / 20}`
              : page % 10 === 0
              ? `حزب ${(workoutIndex + 3) / 10}`
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

          if (selectedProgram) {
            return (
              <button
                onClick={() => {
                  if (isLocked) {
                    return;
                  }
                  setSelectedWorkout(workoutIndex);
                }}
                className={"fan card plan-card " + (isLocked ? "inactive" : "")}
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
          }
        })}
      </div>

      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={{ width: "100%", height: "10%" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: 1,
              boxShadow: 24,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="bg-emerald-400 w-80 p-10 text-center gap-5 "
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Noto Sans Arabic, sans-serif" }}
              component="h2"
            >
              بارك الله فيك!
            </Typography>
            <Typography
              sx={{ fontFamily: "Noto Sans Arabic, sans-serif" }}
              className="bg-green-300 p-3 rounded-sm text-stone-700"
            >
              "{" "}
              {
                qoutesListOnAlim[
                  Math.floor(Math.random() * qoutesListOnAlim.length)
                ]
              }{" "}
              "
            </Typography>
            <Typography sx={{ fontFamily: "Noto Sans Arabic, sans-serif" }}>اليوم: {completedDay} تم!</Typography>
          </Box>

          <Confetti />
        </Box>
      </Modal>
    </>
  );
}
