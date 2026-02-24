import { Suspense } from "react";
import RegisterForm from "./_components/RegisterForm";

export const metadata = {
  title: "Create account — AuthPlug",
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
