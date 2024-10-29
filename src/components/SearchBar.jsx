export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type='text'
        className='form-control'
        placeholder='Buscar entradas...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
