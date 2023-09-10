import React from "react";

type Props = {
  value: string;
  onChange: (selectedDay: string) => void;
};

const DropdownDayInWeek = ({ value, onChange }: Props) => {
  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = event.target.value;
    onChange(selectedDay);
  };
  return (
    <>
      <select
      value={value}
      onChange={handleDayChange}
      className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
    >
      <option value="">Select Opening Day</option>
      <option value="Everyday">Every day</option>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
      <option value="Saturday-Sunday">Saturday-Sunday</option>

    </select>
    </>
  );
};

export default DropdownDayInWeek;
