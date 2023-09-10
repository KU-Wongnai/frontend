import React from "react";

type Props = {
  value: string;
  onChange: (selectedTime: string) => void;
};

const DropdownTimeScale = ({ value, onChange }: Props) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = event.target.value;
    onChange(selectedTime);
  };
  return (
    <>
      <select
      value={value}
      onChange={handleTimeChange}
      className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
    >
      <option value="">Select Opening Time</option>
      <option value="24hours">24hours</option>
      <option value="05:00am">05:00am</option>
      <option value="06:00am">06:00am</option>
      <option value="07:00am">07:00am</option>
      <option value="08:00am">08:00am</option>
      <option value="09:00am">09:00am</option>
      <option value="10:00am">10:00am</option>
      <option value="11:00am">11:00am</option>
      <option value="12:00pm">12:00pm</option>
      <option value="13:00pm">13:00pm</option>
      <option value="14:00pm">14:00pm</option>
      <option value="15:00pm">15:00pm</option>
      <option value="16:00pm">16:00pm</option>
      <option value="17:00pm">17:00pm</option>
      <option value="18:00pm">18:00pm</option>
      <option value="19:00pm">19:00pm</option>
      <option value="20:00pm">20:00pm</option>
      <option value="21:00pm">21:00pm</option>
      <option value="22:00pm">22:00pm</option>
      <option value="23:00pm">23:00pm</option>
      <option value="00:00am">00:00am</option>
     

    </select>
    </>
  );
};

export default DropdownTimeScale;
