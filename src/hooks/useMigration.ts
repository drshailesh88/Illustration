import { useState, useEffect, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { useAuth } from '@clerk/clerk-react';
import { api } from '../../convex/_generated/api';

const MIGRATION_FLAG = 'finnish-migration-offered';
const DIAGRAM_PREFIX = 'finnish-diagram-';

interface MigrationState {
  /** Whether localStorage diagrams exist */
  hasDiagrams: boolean;
  /** Whether to show the migration prompt */
  showPrompt: boolean;
  /** Number of diagrams found */
  diagramCount: number;
  /** Migration in progress */
  isMigrating: boolean;
  /** Number migrated so far */
  migratedCount: number;
  /** Run the migration */
  migrate: () => Promise<void>;
  /** Dismiss the prompt */
  dismiss: () => void;
}

/**
 * Hook to detect localStorage diagrams and offer one-time migration to Convex.
 * Shows prompt only on first sign-in when diagrams are detected.
 */
export function useMigration(): MigrationState {
  const { isSignedIn } = useAuth();
  const saveProjectMutation = useMutation(api.projects.saveProject);

  const [diagramKeys, setDiagramKeys] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migratedCount, setMigratedCount] = useState(0);

  // Scan localStorage for diagrams on mount
  useEffect(() => {
    if (!isSignedIn) return;

    const migrationOffered = localStorage.getItem(MIGRATION_FLAG);
    if (migrationOffered === 'true') return;

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(DIAGRAM_PREFIX)) {
        keys.push(key);
      }
    }

    setDiagramKeys(keys);
    if (keys.length > 0) {
      setShowPrompt(true);
    }
  }, [isSignedIn]);

  const migrate = useCallback(async () => {
    setIsMigrating(true);
    setMigratedCount(0);

    for (const key of diagramKeys) {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) continue;

        const data = JSON.parse(stored);
        const title = data.name || 'Migrated Diagram';

        // Build diagram data — could be SVG or canvas JSON
        let diagramData: string;
        if (data.canvas) {
          diagramData = JSON.stringify(data.canvas);
        } else if (data.svg) {
          // Store SVG as a simple wrapper object
          diagramData = JSON.stringify({ migrated: true, svg: data.svg });
        } else {
          diagramData = JSON.stringify(data);
        }

        await saveProjectMutation({
          title,
          diagramData,
        });

        // Remove from localStorage after successful save
        localStorage.removeItem(key);
        setMigratedCount((prev) => prev + 1);
      } catch (err) {
        console.error(`Failed to migrate diagram ${key}:`, err);
        // Continue with next diagram
      }
    }

    // Mark migration as offered/completed
    localStorage.setItem(MIGRATION_FLAG, 'true');
    setShowPrompt(false);
    setIsMigrating(false);
  }, [diagramKeys, saveProjectMutation]);

  const dismiss = useCallback(() => {
    localStorage.setItem(MIGRATION_FLAG, 'true');
    setShowPrompt(false);
  }, []);

  return {
    hasDiagrams: diagramKeys.length > 0,
    showPrompt,
    diagramCount: diagramKeys.length,
    isMigrating,
    migratedCount,
    migrate,
    dismiss,
  };
}
