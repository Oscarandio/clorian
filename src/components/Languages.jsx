import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='d-flex flex-wrap flex-md-nowrap justify-content-end gap-2'>
      <button className='btn btn-dark' onClick={() => changeLanguage('en')}>
        English
      </button>
      <button className='btn btn-dark' onClick={() => changeLanguage('es')}>
        Español
      </button>
    </div>
  );
};
