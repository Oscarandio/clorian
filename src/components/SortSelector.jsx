export const SortSelector = ({ sortOrder, onSortChange }) => {
  return (
    <div className='mb-3'>
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
