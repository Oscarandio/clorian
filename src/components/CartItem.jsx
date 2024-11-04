import React from 'react';
import { useTranslation } from 'react-i18next';

const CartItem = React.memo(({ item, onRemove }) => {
  const { t } = useTranslation();

 
  if (
    !item ||
    typeof item.price !== 'number' ||
    typeof item.quantity !== 'number'
  ) {
    return null; 
  }


  const price = item.price || 0; 
  const quantity = item.quantity || 0; 

  return (
    <div className='list-group-item d-flex justify-content-between align-items-center py-2'>
      <div>
        <h5>{t(`${item.name}.name`)}</h5>
        <p>
          {t('precio_entrada')}: {price.toFixed(2)}€ <br />
          {t('cantidad')}: {quantity}
        </p>
      </div>
      <div className='text-end'>
        <p className='fw-bold'>
          {t('subtotal')}: {(price * quantity).toFixed(2)}€
        </p>
        <button
          className='btn btn-outline-danger btn-sm mb-2'
          onClick={() => onRemove(item.id)}>
          {t('eliminar_producto')}
        </button>
      </div>
    </div>
  );
});


export default CartItem;
