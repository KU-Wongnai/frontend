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
        <option value="EVERYDAY">Every day</option>
        <option value="MONDAY">Monday</option>
        <option value="TUESDAY">Tuesday</option>
        <option value="WEDNESDAY">Wednesday</option>
        <option value="THURSDAY">Thursday</option>
        <option value="FRIDAY">Friday</option>
        <option value="SATURDAY">Saturday</option>
        <option value="SUNDAY">Sunday</option>
        <option value="SATURDAY_SUNDAY">Saturday-Sunday</option>
      </select>
    </>
  );
};

export default DropdownDayInWeek;
