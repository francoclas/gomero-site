'use client'

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";

// ── Tipos ─────────────────────────────────────────────────────────────────────
type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

// ── Colores de lenguajes (estándar GitHub) ────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript:   "#3178c6",
  JavaScript:   "#f1e05a",
  "C#":         "#178600",
  Python:       "#3572a5",
  Rust:         "#dea584",
  Go:           "#00add8",
  Java:         "#b07219",
  HTML:         "#e34c26",
  CSS:          "#563d7c",
  Shell:        "#89e051",
  Kotlin:       "#a97bff",
  Swift:        "#f05138",
  Ruby:         "#701516",
  PHP:          "#4f5d95",
};

// ── Capitaliza nombre (quita guiones/underscores) ─────────────────────────────
function formatName(name: string) {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-black/8 dark:border-white/6 bg-white/3 dark:bg-white/[0.02] p-5 animate-pulse">
      <div className="h-4 w-2/3 rounded bg-black/8 dark:bg-white/8 mb-3" />
      <div className="h-3 w-full rounded bg-black/5 dark:bg-white/5 mb-1.5" />
      <div className="h-3 w-4/5 rounded bg-black/5 dark:bg-white/5 mb-4" />
      <div className="flex gap-3 mt-auto">
        <div className="h-3 w-16 rounded bg-black/5 dark:bg-white/5" />
        <div className="h-3 w-10 rounded bg-black/5 dark:bg-white/5" />
      </div>
    </div>
  );
}

// ── Repo card ─────────────────────────────────────────────────────────────────
function RepoCard({ repo }: { repo: Repo }) {
  const color = repo.language ? (LANG_COLORS[repo.language] ?? "#8b949e") : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex flex-col gap-3
        rounded-xl p-5
        border border-black/8 dark:border-white/6
        bg-white dark:bg-white/[0.02]
        hover:border-[#D85A30]/40
        hover:shadow-[0_0_20px_rgba(216,90,48,0.07)]
        transition-all duration-250
        no-underline
      "
    >
      {/* Nombre + ícono */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-sm text-black dark:text-white leading-tight group-hover:text-[#D85A30] transition-colors">
          {formatName(repo.name)}
        </span>
        <ExternalLink
          size={13}
          className="flex-shrink-0 opacity-0 group-hover:opacity-40 transition-opacity mt-0.5"
        />
      </div>

      {/* Descripción */}
      <p className="text-xs text-black/50 dark:text-white/45 leading-relaxed flex-1 line-clamp-2">
        {repo.description ?? "Sin descripción"}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-auto">
        {color && (
          <span className="flex items-center gap-1.5 text-[11px] text-black/50 dark:text-white/40">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-black/45 dark:text-white/35">
            <Star size={11} />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-black/45 dark:text-white/35">
            <GitFork size={11} />
            {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function GitHubRepos({
  title,
}: {
  title: string;
}) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/francoclas/repos?sort=updated&per_page=8")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: Repo[]) => {
        setRepos(data.filter(r => !r.fork));
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : repos.map(repo => <RepoCard key={repo.id} repo={repo} />)
        }
      </div>
    </section>
  );
}
