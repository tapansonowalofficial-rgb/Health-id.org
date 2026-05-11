import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = () => {
    // 1. Clear the "Onboarded" and "Auth" tokens
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // 2. Refresh to reset the App state and show the Login screen
    window.location.reload();
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 p-4 w-full text-gray-500 hover:text-red-500 transition-colors"
    >
      <LogOut size={18} />
      <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
    </button>
  );
}
