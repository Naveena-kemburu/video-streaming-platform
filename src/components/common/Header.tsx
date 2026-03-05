import { Link } from 'react-router-dom';
import { IconPlayerPlay } from '@tabler/icons-react';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold text-primary-500 hover:text-primary-400 transition-colors focus-visible"
          aria-label="Home"
        >
          <IconPlayerPlay size={28} />
          <span>StreamFlix</span>
        </Link>
      </div>
    </header>
  );
}
