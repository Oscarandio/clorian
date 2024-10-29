export const ProductCard = ({ name, description, onClick }) => {
  return (
    <div className='card cursor-pointer mb-3' onClick={onClick}>
      <div className='card-body'>
        <h4 className='card-name'>{name}</h4>
        <p className='card-text'>{description}</p>
      </div>
    </div>
  );
};
