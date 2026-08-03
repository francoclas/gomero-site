"use client";

import { useState } from "react";
import { useBoards } from "./useBoards";
import BoardTabs from "./BoardTabs";
import BoardView from "./BoardView";
import DueTodayDashboard from "./DueTodayDashboard";
import ImportButton from "./export-import/ImportButton";

type View = { kind: "dashboard" } | { kind: "board"; boardId: string };

export default function TaskManagerRoot() {
  const {
    boards,
    createBoard,
    renameBoard,
    deleteBoard,
    allTasks,
    labels,
    addLabel,
    deleteLabel,
    appState,
    importFullBackup,
    importSingleBoard,
  } = useBoards();

  const [view, setView] = useState<View>({ kind: "dashboard" });

  // Deleting a board while it's active falls back to the dashboard on the
  // next render without needing an effect — `activeBoard` simply resolves
  // to null once the board is gone from `boards`.
  const activeBoard = view.kind === "board" ? boards.find((b) => b.id === view.boardId) ?? null : null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BoardTabs
          boards={boards}
          activeBoardId={activeBoard?.id ?? null}
          onSelectDashboard={() => setView({ kind: "dashboard" })}
          onSelectBoard={(boardId) => setView({ kind: "board", boardId })}
          createBoard={createBoard}
          renameBoard={renameBoard}
          deleteBoard={deleteBoard}
        />
        <ImportButton importFullBackup={importFullBackup} importSingleBoard={importSingleBoard} />
      </div>

      {activeBoard ? (
        <BoardView board={activeBoard} allLabels={labels} addLabel={addLabel} deleteLabel={deleteLabel} appState={appState} />
      ) : (
        <DueTodayDashboard
          boards={boards}
          allTasks={allTasks}
          allLabels={labels}
          onNavigateToBoard={(boardId) => setView({ kind: "board", boardId })}
        />
      )}
    </div>
  );
}
