import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';

import api from '../api/axios';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';

import styles from './Dashboard.module.css';

import useProjects from '../Hooks/useProjects';


interface Project {
  id: string;
  name: string;
  color: string;
}

interface Column {
  id: string;
  title: string;
  tasks: string[];
}

export default function Dashboard() {


  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const { projects, columns, loading, error, addProject, renameProject, deleteProject }
    = useProjects();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  

  {/*
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          api.get('/projects'),
          api.get('/columns')
        ]);
        setProjects(projRes.data);
        setColumns(colRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Creer Un Projet
  async function addProject(name: string, color: string) {
    setSaving(true);
    setError(null);

    try {
      const { data } = await api.post('/projects', { name, color });
      setProjects(prev => [...prev, data]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          `Erreur ${err.response?.status ?? ''}`.trim()
        );
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  // Mise A jour 
  async function renameProject(project: Project) {
    const input = prompt('Nouveau nom :', project.name);
    const newName = input?.trim();

    if (!newName || newName === project.name) return;

    setSaving(true);
    setError(null);

    try {
      const { data } = await api.put(`/projects/${project.id}`, {
        ...project,
        name: newName
      });

      setProjects(prev =>
        prev.map(p => (p.id === project.id ? data : p))
      );

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          `Erreur ${err.response?.status ?? ''}`.trim()
        );
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  // Supprimer un projet 
  async function deleteProject(id: string) {
    const confirmed = confirm('Êtes-vous sûr ?');
    if (!confirmed) return;

    setSaving(true);
    setError(null);

    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          `Erreur ${err.response?.status ?? ''}`.trim()
        );
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }
*/}


  return (
    <div className={styles.layout}>

      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        userName={user?.name}
        onLogout={() => dispatch(logout())}
      />

      <div className={styles.body}>

        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRenameProject={renameProject}
          onDeleteProject={deleteProject}
        />

        <div className={styles.content}>

          <div className={styles.toolbar}>

            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
                
              >
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={async (name, color) => {
                  await addProject(name, color);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            )}

            {error && (
              <div className={styles.error}>{error}</div>
            )}

          </div>

          <MainContent columns={columns} />

        </div>
      </div>
    </div>
  );
}
