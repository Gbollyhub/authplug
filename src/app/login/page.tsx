import { Suspense } from "react";
import LoginForm from "./_components/LoginForm";

export const metadata = {
  title: "Sign in — AuthPlug",
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
