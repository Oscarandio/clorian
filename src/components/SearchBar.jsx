import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const { t } = useTranslation();

  return (
    <div>
      <input
        type='text'
        className='form-control'
        placeholder={t('buscar')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
