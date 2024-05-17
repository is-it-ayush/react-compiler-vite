import React, { useEffect, useState } from "react"
import { Heavy } from "./Heavy"

const JOBS = 1000;

function App() {
  const [currentJob, setCurrentJob] = useState(0);
  const [collectedResults, setCollectedResults] = useState<number[]>([]);

  // vite removes console.logs in prod, test in dev.
  useEffect(() => {
    if (currentJob >= JOBS) {
      console.log(`Job Times (ms): ${collectedResults.join(', ')}`);
      console.log(`Average Time (ms): ${collectedResults.reduce((a, b) => a + b, 0) / JOBS}`);

    }
  }, [currentJob]);

  return (
    <div className="h-screen w-full flex flex-col bg-black/10 items-center justify-center gap-4">
      <span className="fixed bg-white p-3 rounded-xl bottom-5 shadow-md">React Compiler + Vite | Jobs: {JOBS} | Avg. Time: {(collectedResults.reduce((a, b) => a + b, 0) / JOBS) * 10e6}ns</span>
      <div className="flex flex-wrap gap-2 px-12">
        {
          /**
           * Populate the screen with 10 Heavy components with profilers
           * adding the actualTime to the collectedResults on update phase
           */
          Array.from({ length: JOBS }).map((_, i) => (
            <React.Profiler
              key={`job-${i}`}
              id={`job-${i.toString()}`}
              onRender={(_, phase, actualTime): void => {
                if (phase === 'update') {
                  setCollectedResults((prev) => [...prev, actualTime]);
                  setCurrentJob((prev) => prev + 1);
                }
              }}
            >
              <Heavy />
            </React.Profiler>
          ))
        }
      </div>
    </div>
  )
}

export default App
