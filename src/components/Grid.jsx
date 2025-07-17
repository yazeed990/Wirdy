import { useState, useEffect } from "react";
import { memorizationPrograms, fiveShields } from "../utils/index.js";
import QuranCard from "./QuranCard.jsx";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";
import { Button, Modal, Typography, Box, Paper } from "@mui/material";
import Confetti from "react-confetti";

export default function Grid() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

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
                className={
                  "custom-framework card plan-card " +
                  (isLocked ? "inactive" : "")
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
          }
        })}
      </div>
      <Button onClick={handleOpenModal} sx={{display: "none"}}>open model</Button>
      <Modal open={open} onClose={handleCloseModal}>
         <Box sx={{ width: "100%", height: "10%" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#1a1e32",
            borderRadius: 1,
            boxShadow: 24,
            p: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
         
            <Typography variant="h6" component="h2">
              بارك الله فيك!
            </Typography>
          </Box>

          <Confetti />
        </Box>
      </Modal>
    </>
  );
}
