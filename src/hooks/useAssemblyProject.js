import { useCallback, useEffect, useState } from "react";

import {
  ASSEMBLY_PROJECT_UPDATED_EVENT,
  loadAssemblyProject,
  resetAssemblyProjectSection,
  saveAssemblyProject,
} from "services/assembly/store";

export default function useAssemblyProject() {
  const [project, setProject] = useState(() => loadAssemblyProject());

  useEffect(() => {
    const handleProjectUpdate = (event) => {
      setProject(event.detail || loadAssemblyProject());
    };

    window.addEventListener(ASSEMBLY_PROJECT_UPDATED_EVENT, handleProjectUpdate);
    return () =>
      window.removeEventListener(ASSEMBLY_PROJECT_UPDATED_EVENT, handleProjectUpdate);
  }, []);

  const persist = useCallback((nextProject) => {
    setProject(nextProject);
    saveAssemblyProject(nextProject);
    return nextProject;
  }, []);

  const updateProject = useCallback(
    (updater) => {
      const snapshot = loadAssemblyProject();
      const nextProject =
        typeof updater === "function" ? updater(snapshot) : updater;

      return persist(nextProject);
    },
    [persist]
  );

  const resetSection = useCallback(
    (sectionId) => {
      const nextProject = resetAssemblyProjectSection(sectionId);
      setProject(nextProject);
      return nextProject;
    },
    []
  );

  const reloadProject = useCallback(() => {
    const nextProject = loadAssemblyProject();
    setProject(nextProject);
    return nextProject;
  }, []);

  return {
    project,
    setProject: updateProject,
    persist,
    reloadProject,
    resetSection,
  };
}
