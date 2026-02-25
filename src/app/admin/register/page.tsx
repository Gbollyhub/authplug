import { Suspense } from "react";
import AdminRegisterForm from "./_components/AdminRegisterForm";

export default function AdminRegisterPage() {
  return (
    <Suspense>
      <AdminRegisterForm />
    </Suspense>
  );
}
