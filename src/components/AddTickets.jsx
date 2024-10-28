import { useState } from 'react';

export const AddTickets = () => {
  const maxEntries = 5;
  const [selectedTickets, setSelectedTickets] = useState(0);

  const handleTicketSelect = (count) => {
    setSelectedTickets(count);
  };

  const buttonText =
    selectedTickets === 0
      ? 'Seleccionar entradas'
      : `${selectedTickets} ${selectedTickets === 1 ? 'entrada' : 'entradas'}`;

  return (
    <div className='dropdown'>
      <button
        className='btn btn-success dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        {buttonText}
      </button>
      <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        {[...Array(maxEntries)].map((_, index) => {
          const entryCount = index + 1;
          const entryText =
            entryCount === 1
              ? `${entryCount} entrada`
              : `${entryCount} entradas`;
          return (
            <li
              className='dropdown-item'
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
