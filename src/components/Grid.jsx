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
  const resetProgress = usePrograms((state) => state.resetProgress);

  const selectedProgram = usePrograms((state) => state.selectedProgram);
  const setCurrentWorkoutIndex = usePrograms((s) => s.setCurrentWorkoutIndex);

  const [training_plan, setTraining_plan] = useState({});
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const completedWorkouts = savedWorkouts
    ? Object.keys(savedWorkouts || {}).filter(
        (val) => savedWorkouts[val].isComplete
      )
    : [];

  useEffect(() => {
    const onOpen = () => {
      // If a specific index is stored, open that; otherwise open the next available
      setSelectedWorkout((prev) => prev ?? 0);
    };
    window.addEventListener("open-workout-request", onOpen);
    return () => window.removeEventListener("open-workout-request", onOpen);
  }, []);

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
        completedAt:
          !!data.isComplete && !savedWorkouts?.[index]?.completedAt
            ? Date.now()
            : savedWorkouts?.[index]?.completedAt,
      },
    };

    setSavedWorkouts(newObj);
    localStorage.setItem(
      `Quran-tracker-${selectedProgram?.name || "fiveShields"}`,
      JSON.stringify(newObj)
    );
    try {
      window.dispatchEvent(
        new CustomEvent("quran-progress-updated", {
          detail: { programName: selectedProgram?.name, data: newObj },
        })
      );
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
    // cloud sync (fire-and-forget)
    import("../firebase/index").then(async (m) => {
      try {
        const user = await m.ensureSignedIn();
        await m.saveProgress(
          user.uid,
          selectedProgram?.name || "fiveShields",
          newObj
        );
      } catch (error) {
        console.error("Failed to update progress:", error);
      }
    });
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

  // Check if any workout is selected
  const selectedWorkoutData =
    selectedWorkout !== null
      ? Object.keys(training_plan)[selectedWorkout]
      : null;
  const selectedWorkoutPlan = selectedWorkoutData
    ? training_plan[selectedWorkoutData]
    : null;

  return (
    <>
      {/* Render QuranCard outside the grid if one is selected */}
      {selectedWorkout !== null && selectedWorkoutPlan && (
        <QuranCard
          savedWeights={savedWorkouts?.[selectedWorkout]?.weights}
          handleSave={handleSave}
          handleComplete={handleComplete}
          key={selectedWorkout}
          trainingPlan={selectedWorkoutPlan}
          type={
            selectedWorkout === 0
              ? "الصفحة " + (selectedWorkout + 3)
              : (selectedWorkout + 3) % 20 === 0
              ? "مراجعة"
              : "الصفحة " + (selectedWorkout + 3)
          }
          workoutIndex={selectedWorkout}
          icon={
            selectedWorkout % 3 === 0 ? (
              <img className="custom-framework icon" src="/2quran_icon.png" />
            ) : selectedWorkout % 3 === 1 ? (
              <img className="custom-framework icon" src="/quran-icon.png" />
            ) : (
              <img className="custom-framework icon" src="/tasbih_icon.png" />
            )
          }
          dayNum={selectedWorkout + 1}
          onClose={() => setSelectedWorkout(null)}
        />
      )}

      <section
        id="Days"
        className="training-plan-grid animate-fade-in"
        aria-live="polite"
        aria-label="جدول الأيام التدريبية"
      >
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

          const dayNum = workoutIndex + 1;

          // Skip rendering the grid card if it's selected (QuranCard is rendered above)
          if (workoutIndex === selectedWorkout) {
            return null;
          }

          if (selectedProgram) {
            return (
              <button
                onClick={() => {
                  if (isLocked) {
                    return;
                  }
                  setSelectedWorkout(workoutIndex);
                  setCurrentWorkoutIndex(workoutIndex);
                }}
                className={`plan-card animate-fade-in ${
                  isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } ${
                  completedWorkouts.includes(String(workoutIndex))
                    ? "selected"
                    : ""
                }`}
                key={workoutIndex}
                aria-disabled={isLocked}
                aria-label={`اليوم ${dayNum} - ${type}${
                  isLocked ? " مقفل" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-accent">
                      #{dayNum}
                    </span>
                    <span className="text-sm text-secondary">يوم</span>
                  </div>
                  {isLocked && (
                    <span className="text-sm text-secondary">مقفل</span>
                  )}
                </div>

                <div className="text-center mb-3">
                  <h4 className="text-lg font-semibold text-primary mb-1">
                    {type}
                  </h4>
                  <span
                    className={`badge ${
                      completedWorkouts.includes(String(workoutIndex))
                        ? "badge-success"
                        : isLocked
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {completedWorkouts.includes(String(workoutIndex))
                      ? "مكتمل"
                      : isLocked
                      ? "مقفل"
                      : "متاح"}
                  </span>
                </div>
              </button>
            );
          }
        })}
      </section>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="congrats-title"
      >
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
            role="dialog"
            aria-modal="true"
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Noto Sans Arabic, sans-serif" }}
              component="h2"
              id="congrats-title"
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
            <Typography sx={{ fontFamily: "Noto Sans Arabic, sans-serif" }}>
              اليوم: {completedDay} تم!
            </Typography>
            <div className="flex gap-2">
              <button
                className="bg-blue-950 text-white px-4 py-1 rounded-md"
                onClick={() => handleCloseModal()}
              >
                إغلاق
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded-md"
                onClick={() => {
                  resetProgress(selectedProgram?.name);
                  handleCloseModal();
                  window.location.reload();
                }}
              >
                إعادة تعيين التقدم
              </button>
            </div>
          </Box>

          <Confetti />
        </Box>
      </Modal>
    </>
  );
}
