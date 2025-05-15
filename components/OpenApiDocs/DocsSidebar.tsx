'use client';

import { OpenApiDocConfig } from '@/config/openapiDoc';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r p-6 space-y-6">
      {OpenApiDocConfig.map((section) => (
        <div key={section.title}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">{section.title}</h2>
          <ul className="mt-2 space-y-1">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === link.href ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
