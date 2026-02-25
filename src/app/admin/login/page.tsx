import { Suspense } from "react";
import AdminLoginForm from "./_components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
