import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, className = '' }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium ${activeTab === index ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'} border-b-2`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
