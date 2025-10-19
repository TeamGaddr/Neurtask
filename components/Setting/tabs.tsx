import React, { useState } from "react";

interface TabsProps {
  onSelect: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState("General");
  // const tabs = ["General", "Members", "Integrations", "Early access"];
  const tabs = ["General", "Integrations"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${activeTab === tab
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Members" && (
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="text-lg">+</span>
          <span>Add members</span>
        </button>
      )}
    </div>
  );
};

export default Tabs;
