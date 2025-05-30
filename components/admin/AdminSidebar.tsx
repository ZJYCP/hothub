'use client';

import { AdminConfig } from '@/config/admin';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="py-4 px-2">
        <h1 className="text-xl font-bold">系统管理</h1>
      </div>
      <div className="space-y-6">
        {AdminConfig.map((section) => (
          <div key={section.title} className="px-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">{section.title}</h2>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      pathname === link.href
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
