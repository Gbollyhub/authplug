interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card px-8 py-10">
        {children}
      </div>
      <p className="mt-6 text-xs text-neutral-400 text-center">
        Secured by{" "}
        <span className="font-semibold text-neutral-500">AuthPlug</span>
      </p>
    </div>
  );
}
