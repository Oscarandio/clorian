export const SortSelector = ({ sortOrder, onSortChange }) => {
  return (
    <div className='mb-3'>
      <select
        id='sortOrder'
        className='form-select'
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}>
        <option value='asc'>A - Z (Nombre)</option>
        <option value='desc'>Z - A (Nombre)</option>
        <option value='asc-description'>A - Z (Descripción)</option>
        <option value='desc-description'>Z - A (Descripción)</option>
      </select>
    </div>
  );
};
