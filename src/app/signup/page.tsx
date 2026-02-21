import { Navbar } from '../../components/layout/Navbar';
import { SignupForm } from '../../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950 dark:to-pink-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <Navbar />
      <div className="relative pt-32 pb-20 flex items-center justify-center px-4">
        <SignupForm />
      </div>
    </main>
  );
}