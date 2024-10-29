export const SortSelector = ({ sortOrder, onSortChange }) => {
  return (
    <div className='mb-3'>
      {/* <label htmlFor='sortOrder' className='form-label'>
        Ordenar por:
      </label> */}
      <select
        id='sortOrder'
        className='form-select'
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}>
        <option value='asc'>A - Z</option>
        <option value='desc'>Z - A</option>
      </select>
    </div>
  );
};
