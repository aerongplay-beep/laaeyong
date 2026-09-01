import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FDFBF0] text-[#3E4A20]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}