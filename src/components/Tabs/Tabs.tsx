"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [focusedTabIndex, setFocusedTabIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabClick = (index: number) => {
    setSelectedTabIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      setFocusedTabIndex(
        focusedTabIndex !== tabs.length - 1
          ? (focusedTabIndex as number) + 1
          : 0
      );
    } else if (e.key === "ArrowLeft") {
      setFocusedTabIndex(
        focusedTabIndex !== 0
          ? (focusedTabIndex as number) - 1
          : tabs.length - 1
      );
    }
  };

  const handleFocus = (index: number) => {
    setFocusedTabIndex(index);
  };

  useEffect(() => {
    if (tabRefs.current[focusedTabIndex as number]) {
      tabRefs.current[focusedTabIndex as number]?.focus();
    }
  }, [focusedTabIndex]);

  const ariaSelectedProps = (index: number) => ({
    "aria-selected": (
      index === selectedTabIndex
    ).toString() as React.AriaAttributes["aria-selected"],
  });

  return (
    <>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <button
            ref={(element) => (tabRefs.current[index] = element)}
            role="tab"
            id={`tab-${index}`}
            key={tab.id}
            type="button"
            className={styles.tab}
            tabIndex={index === selectedTabIndex ? 0 : -1}
            onClick={() => handleTabClick(index)}
            onFocus={() => handleFocus(index)}
            {...ariaSelectedProps(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          role="tabpanel"
          key={tab.id}
          aria-labelledby={`tab-${index}`}
          hidden={selectedTabIndex !== index}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
};

export default Tabs;
