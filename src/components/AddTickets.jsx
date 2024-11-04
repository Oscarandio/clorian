import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AddTickets = ({ onSelectQuantity, disabled }) => {
  const maxEntries = 5; // Maximum number of tickets that can be selected
  const [selectedTickets, setSelectedTickets] = useState(0); // State to keep track of the selected number of tickets

  // Function to handle ticket selection
  const handleTicketSelect = (count) => {
    setSelectedTickets(count); // Update the local state with the selected number of tickets
    if (onSelectQuantity) {
      onSelectQuantity(count); // Call the parent-provided function to update the quantity in the parent component or Redux
    }
  };

  const { t } = useTranslation(); // Hook to access the translation function

  // Determine the button text based on the selected number of tickets
  const buttonText =
    selectedTickets === 0
      ? t('seleccionar_entradas') // Display "Select tickets" when no tickets are selected
      : `${selectedTickets} ${t(
          selectedTickets === 1 ? t('entrada') : t('entradas')
        )}`; // Display the number of tickets selected with the appropriate singular/plural form

  return (
    <div className='dropdown'>
      {/* Dropdown button to display the current ticket selection */}
      <button
        className='btn btn-danger dropdown-toggle d-flex justify-content-around align-items-center'
        type='button'
        id='dropdownMenuButton'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        {buttonText}
      </button>

      {/* Dropdown menu to select the number of tickets */}
      <ul className='dropdown-menu w-100' aria-labelledby='dropdownMenuButton'>
        {[...Array(maxEntries)].map((_, index) => {
          const entryCount = index + 1;
          const entryText =
            entryCount === 1
              ? `${entryCount} ${t('entrada')}`
              : `${entryCount} ${t('entradas')}`;

          return (
            <li
              className={`dropdown-item text-end ${disabled ? 'disabled' : ''}`} // Disable the item if the `disabled` prop is true
              disabled={disabled}
              key={entryCount}
              onClick={() => handleTicketSelect(entryCount)}>
              {entryText}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
