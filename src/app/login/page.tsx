import { Navbar } from '../../components/layout/Navbar';
import { LoginForm } from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <Navbar />
      <div className="relative pt-32 pb-20 flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </main>
  );
}