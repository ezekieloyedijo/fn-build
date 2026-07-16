import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <p className="mb-6 text-sm text-muted">Fill in the details below to add a new project.</p>
      <ProjectForm />
    </div>
  );
}
