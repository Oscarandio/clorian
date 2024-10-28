import { AddTickets } from './AddTickets';

export const ProductCard = ({ name, description, date, price, onClick }) => {
  return (
    <div className='card cursor-pointer mb-3' onClick={onClick}>
      <div className='card-body'>
        <h4 className='card-name'>{name}</h4>
        <p className='card-text'>{description}</p>
        <div className='d-flex gap-3 align-items-center justify-content-between'>
          <ul>
            <li>Precio: {price}€</li>
            <li>Fecha: {date}</li>
          </ul>

          <AddTickets />
        </div>
      </div>
    </div>
  );
};
