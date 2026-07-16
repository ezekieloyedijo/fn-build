import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div>
      <p className="mb-6 text-sm text-muted">Add a new service to your website.</p>
      <ServiceForm />
    </div>
  );
}
