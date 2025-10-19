"use client";

import React, { useState, useRef } from "react";
import SearchBar from "@/components/Setting/search";
import Tabs from "@/components/Setting/tabs";

import General from "@/components/Setting/General";
import Members from "@/components/Setting/Members";
import Integrations from "@/components/Setting/Integrations";
import EarlyAccess from "@/components/Setting/EarlyAccess";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("General");
  const prevTabRef = useRef("General"); // ✅ Track previous tab
  // Refs for each component
  const generalRef = useRef<{ handleSubmit: () => Promise<void> }>(null);
  const membersRef = useRef<{ handleSubmit: () => Promise<void> }>(null);
  const integrationsRef = useRef<{ handleSubmit: () => Promise<void> }>(null);
  const earlyAccessRef = useRef<{ handleSubmit: () => Promise<void> }>(null);

  // Handle tab change with auto-save of current tab
  const handleTabChange = async (newTab: string) => {
    const prevTab = prevTabRef.current;

    try {
      if (prevTab === "General" && generalRef.current) {
        await generalRef.current.handleSubmit();
      }
      if (prevTab === "Members" && membersRef.current) {
        await membersRef.current.handleSubmit();
      }
      if (prevTab === "Integrations" && integrationsRef.current) {
        await integrationsRef.current.handleSubmit();
      }
      if (prevTab === "Early access" && earlyAccessRef.current) {
        await earlyAccessRef.current.handleSubmit();
      }
    } catch (error) {
      console.error("Error saving data on tab change:", error);
    }

    setSelectedTab(newTab);
    prevTabRef.current = newTab; // ✅ Update after the tab is changed
  };

  // Render tab content
  const renderContent = () => {
    switch (selectedTab) {
      case "General":
        return <General ref={generalRef} />;
      // case "Members":
      //   return <Members ref={membersRef} />;
      case "Integrations":
        return <Integrations ref={integrationsRef} />;
      // case "Early access":
      //   return <EarlyAccess ref={earlyAccessRef} />;
      default:
        return <General ref={generalRef} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <SearchBar />
      <Tabs onSelect={handleTabChange} />
      {renderContent()}
    </div>
  );
};

export default SettingsPage;
