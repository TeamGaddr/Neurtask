"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarStrip = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const generateDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");

    const daysArray = [];
    for (
      let day = startOfMonth;
      day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day");
      day = day.add(1, "day")
    ) {
      daysArray.push(day);
    }
    return daysArray;
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentDate((prev) =>
      direction === "prev" ? prev.subtract(1, "month") : prev.add(1, "month")
    );
  };

  const handleDayClick = (day: dayjs.Dayjs) => {
    if (!day.isBefore(dayjs(), "day")) {
      setSelectedDate(day);
    }
  };

  const days = generateDays();

  return (
    <div className="px-[10px] sm:px-[40px] py-4">
      {/* Header aligned to top-left */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-6">
        <button onClick={() => handleMonthChange("prev")}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span>{currentDate.format("MMMM, YYYY")}</span>
        <button onClick={() => handleMonthChange("next")}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Days Strip */}
      <div className="flex overflow-x-auto no-scrollbar border rounded-md ">
        {days.map((day) => {
          const isPast = day.isBefore(dayjs(), "day");
          const isToday = day.isSame(dayjs(), "day");
          const isSelected = selectedDate.isSame(day, "day");

          return (
            <button
              key={day.format("YYYY-MM-DD")}
              onClick={() => handleDayClick(day)}
              disabled={isPast}
              className={clsx(
                "w-10 h-20 flex flex-col items-center justify-center border-r border-gray-200 transition",
                isSelected && "bg-black text-white",
                isPast
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "hover:bg-gray-100 text-gray-800",
                isToday &&
                  !isSelected &&
                  "font-semibold border-l-2 border-black"
              )}
            >
              <span className="text-[10px] font-medium">
                {day.format("dd").charAt(0)}
              </span>
              <span className="text-sm font-medium">{day.format("D")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarStrip;
