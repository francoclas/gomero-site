import { useSyncExternalStore } from "react";
import { migrateLegacyIfNeeded } from "./migration";
import { STORAGE_KEY } from "./storage";
import { createEmptyAppState, SCHEMA_VERSION, type AppState, type PersistedState } from "./types";

type Listener = () => void;

let state: AppState = createEmptyAppState();
let hydrated = false;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

let writeTimer: ReturnType<typeof setTimeout> | null = null;

function flushWrite() {
  if (writeTimer) {
    clearTimeout(writeTimer);
    writeTimer = null;
  }
  if (typeof window === "undefined") return;
  const persisted: PersistedState = { schemaVersion: SCHEMA_VERSION, data: state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

function scheduleWrite() {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(flushWrite, 300);
}

export function getState(): AppState {
  return state;
}

export function setState(updater: (prev: AppState) => AppState) {
  state = updater(state);
  emit();
  scheduleWrite();
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  const migrated = migrateLegacyIfNeeded();
  if (migrated) {
    state = migrated;
  } else {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as PersistedState;
        if (parsed.schemaVersion === SCHEMA_VERSION) {
          state = parsed.data;
        }
      } catch {
        // keep empty default state
      }
    }
  }
  emit();

  window.addEventListener("beforeunload", flushWrite);
}

function subscribe(callback: Listener) {
  ensureHydrated();
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): AppState {
  return state;
}

function getServerSnapshot(): AppState {
  return state;
}

export function useAppStateSubscription(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
