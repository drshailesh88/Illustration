import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  updatedAt: number;
  onDelete: (id: string) => void;
}

/**
 * Formats a timestamp into a relative time string (e.g., "2 hours ago").
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return days === 1 ? '1 day ago' : `${days} days ago`;
  if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  return 'Just now';
}

/**
 * Card component for displaying a project in the My Projects grid.
 */
export function ProjectCard({ id, title, thumbnailUrl, updatedAt, onDelete }: ProjectCardProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/editor/${id}`);
  }, [navigate, id]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  }, [onDelete, id]);

  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-card-thumbnail">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} />
        ) : (
          <div className="project-card-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="project-card-info">
        <h3 className="project-card-title">{title}</h3>
        <span className="project-card-date">{formatRelativeTime(updatedAt)}</span>
      </div>
      <button
        className="project-card-delete"
        onClick={handleDelete}
        title="Delete project"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
