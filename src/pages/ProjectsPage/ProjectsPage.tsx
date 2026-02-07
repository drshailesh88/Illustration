import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useProjects } from '../../hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useToast } from '../../components/Toast';
import './ProjectsPage.css';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

/**
 * My Projects dashboard page.
 * Shows a grid of all saved projects with thumbnails, titles, and last-modified dates.
 */
export function ProjectsPage() {
  if (IS_TEST_MODE) {
    return <ProjectsPageTestMode />;
  }
  return <ProjectsPageProduction />;
}

function ProjectsPageTestMode() {
  const navigate = useNavigate();
  const { projects, isLoading } = useProjects();

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>My Projects</h1>
        <div className="projects-header-actions">
          <button className="projects-back-btn" onClick={() => navigate('/')}>Home</button>
          <button className="projects-new-btn" onClick={() => navigate('/editor')}>New Diagram</button>
        </div>
      </div>
      {!isLoading && projects.length === 0 && (
        <div className="projects-empty">
          <h2>No projects yet</h2>
          <p>Create your first diagram to get started!</p>
          <button className="projects-new-btn" onClick={() => navigate('/editor')}>Create Diagram</button>
        </div>
      )}
    </div>
  );
}

function ProjectsPageProduction() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { projects, status, loadMore, isLoading } = useProjects();
  const deleteProjectMutation = useMutation(api.projects.deleteProject);

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = useCallback((projectId: string) => {
    setDeleteConfirm(projectId);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteConfirm) return;
    try {
      await deleteProjectMutation({ projectId: deleteConfirm });
      showToast({ type: 'success', message: 'Project deleted' });
    } catch (err) {
      console.error('Failed to delete project:', err);
      showToast({ type: 'error', message: 'Failed to delete project' });
    }
    setDeleteConfirm(null);
  }, [deleteConfirm, deleteProjectMutation, showToast]);

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-header">
        <h1>My Projects</h1>
        <div className="projects-header-actions">
          <button className="projects-back-btn" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Home
          </button>
          <button className="projects-new-btn" onClick={() => navigate('/editor')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Diagram
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="projects-loading">
          <LoadingSpinner />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && projects.length === 0 && (
        <div className="projects-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <h2>No projects yet</h2>
          <p>Create your first diagram to get started!</p>
          <button className="projects-new-btn" onClick={() => navigate('/editor')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Diagram
          </button>
        </div>
      )}

      {/* Project grid */}
      {!isLoading && projects.length > 0 && (
        <>
          <div className="projects-grid">
            {projects.map((project: any) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.title}
                thumbnailUrl={project.thumbnailUrl}
                updatedAt={project.updatedAt}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Load more */}
          {status === 'CanLoadMore' && (
            <div className="projects-load-more">
              <button className="projects-load-more-btn" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <div className="projects-confirm-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="projects-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Project?</h3>
            <p>This will permanently delete this project and its thumbnail. This action cannot be undone.</p>
            <div className="projects-confirm-actions">
              <button className="projects-confirm-cancel" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="projects-confirm-delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
