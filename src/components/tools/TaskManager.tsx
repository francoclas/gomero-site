'use client'

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Plus, Trash2, CheckCircle2, Circle, Clock } from "lucide-react";

// ── Tipos ─────────────────────────────────────────────────────────────────────
type Task = {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  createdAt: number;
};

type Filter = "all" | "pending" | "done";

const STORAGE_KEY = "gomero-tasks";

// ── Componente ────────────────────────────────────────────────────────────────
export default function TaskManager() {
  const t = useTranslations("tools.taskManager");

  const [tasks, setTasks]         = useState<Task[]>([]);
  const [titulo, setTitulo]       = useState("");
  const [desc, setDesc]           = useState("");
  const [filter, setFilter]       = useState<Filter>("all");
  const [clock, setClock]         = useState("");
  const [hydrated, setHydrated]   = useState(false);

  // Cargar desde localStorage (solo en el cliente)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setTasks(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  // Persistir en localStorage cada vez que cambian las tareas
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, hydrated]);

  // Reloj en tiempo real
  useEffect(() => {
    const update = () =>
      setClock(new Date().toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Acciones ────────────────────────────────────────────────────────────────
  const addTask = useCallback(() => {
    if (!titulo.trim()) return;
    setTasks(prev => [
      { id: Date.now(), titulo: titulo.trim(), descripcion: desc.trim(), completada: false, createdAt: Date.now() },
      ...prev,
    ]);
    setTitulo("");
    setDesc("");
  }, [titulo, desc]);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addTask(); }
  };

  // ── Stats ───────────────────────────────────────────────────────────────────
  const total     = tasks.length;
  const pending   = tasks.filter(t => !t.completada).length;
  const done      = tasks.filter(t => t.completada).length;

  // ── Filtrado ─────────────────────────────────────────────────────────────────
  const filtered = tasks.filter(t => {
    if (filter === "pending") return !t.completada;
    if (filter === "done")    return t.completada;
    return true;
  });

  const emptyMsg = filter === "pending" ? t("emptyPending") : filter === "done" ? t("emptyDone") : t("emptyAll");

  // ── UI ───────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl flex flex-col gap-5">

      {/* Header con reloj */}
      <div className="
        flex items-center justify-between
        px-5 py-3
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-black/10 dark:border-white/10
      ">
        <h2 className="font-bold text-lg tracking-tight">{t("title")}</h2>
        <div className="flex items-center gap-2 text-sm font-mono opacity-50">
          <Clock size={13} />
          {clock}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("statTotal"),   value: total   },
          { label: t("statPending"), value: pending, active: pending > 0 },
          { label: t("statDone"),    value: done,    green: done > 0     },
        ].map(({ label, value, active, green }) => (
          <div
            key={label}
            className="
              flex flex-col items-center gap-1
              py-3 rounded-xl
              bg-white/5 border border-black/8 dark:border-white/8
            "
          >
            <span className={`text-2xl font-bold ${active ? "text-red-400" : green ? "text-emerald-400" : "opacity-80"}`}>
              {value}
            </span>
            <span className="text-[11px] opacity-45 font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Formulario */}
      <div className="
        flex flex-col gap-3 p-5
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-black/10 dark:border-white/10
      ">
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("addPlaceholderTitle")}
          maxLength={100}
          className="
            w-full px-4 py-2.5 rounded-xl text-sm
            bg-white dark:bg-[#1a1a1a]
            border border-black/15 dark:border-white/15
            text-black dark:text-white
            placeholder:opacity-40
            focus:outline-none focus:ring-2 focus:ring-red-400/50
          "
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("addPlaceholderDesc")}
            maxLength={200}
            className="
              flex-1 px-4 py-2.5 rounded-xl text-sm
              bg-white dark:bg-[#1a1a1a]
              border border-black/15 dark:border-white/15
              text-black dark:text-white
              placeholder:opacity-40
              focus:outline-none focus:ring-2 focus:ring-red-400/50
            "
          />
          <button
            onClick={addTask}
            disabled={!titulo.trim()}
            className="
              flex items-center gap-1.5 px-4 py-2.5 rounded-xl
              bg-red-500 text-white text-sm font-semibold
              hover:bg-red-600 transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
              flex-shrink-0
            "
          >
            <Plus size={16} />
            {t("addBtn")}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {(["all", "pending", "done"] as Filter[]).map(f => {
          const labels = { all: t("filterAll"), pending: t("filterPending"), done: t("filterDone") };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                ${filter === f
                  ? "bg-red-500/20 text-red-400 border border-red-400/40"
                  : "bg-white/5 opacity-50 hover:opacity-80 border border-transparent"
                }
              `}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Lista de tareas */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-center py-10 opacity-35 text-sm">{emptyMsg}</p>
        ) : (
          filtered.map(task => (
            <div
              key={task.id}
              className={`
                group flex items-start gap-3 p-4 rounded-xl
                border transition-all duration-200
                ${task.completada
                  ? "bg-white/2 dark:bg-white/[0.015] border-black/5 dark:border-white/5 opacity-55"
                  : "bg-white/5 border-black/8 dark:border-white/8 hover:border-red-400/25"
                }
              `}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-shrink-0 mt-0.5 text-black/40 dark:text-white/40 hover:text-red-400 transition-colors"
                aria-label={task.completada ? "Marcar como pendiente" : "Marcar como completada"}
              >
                {task.completada
                  ? <CheckCircle2 size={18} className="text-emerald-400" />
                  : <Circle size={18} />
                }
              </button>

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-snug ${task.completada ? "line-through opacity-60" : ""}`}>
                  {task.titulo}
                </p>
                {task.descripcion && (
                  <p className="text-xs opacity-45 mt-0.5 leading-relaxed">{task.descripcion}</p>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                aria-label={t("deleteLabel")}
                className="
                  flex-shrink-0
                  opacity-0 group-hover:opacity-100
                  text-black/30 dark:text-white/30
                  hover:text-red-400 transition-all
                  p-1 rounded
                "
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
