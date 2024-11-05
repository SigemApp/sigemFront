import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: { label: string; href: string }[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex text-sm ${className}`}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <Link href={item.href}>
            <a className="text-blue-600">{item.label}</a>
          </Link>
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
