// CartItem.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const CartItem = React.memo(({ item, onRemove }) => {
  const { t } = useTranslation();

  console.log(`Renderizando item: ${item.name}`);

  return (
    <div className='list-group-item d-flex justify-content-between align-items-center py-2'>
      <div>
        <h5>{t(`${item.name}.name`)}</h5>
        <p>
          {t('precio_entrada')}: {item.price.toFixed(2)}€ <br />
          {t('cantidad')}: {item.quantity}
        </p>
      </div>
      <div className='text-end'>
        <p className='fw-bold'>
          {t('subtotal')}: {(item.price * item.quantity).toFixed(2)}€
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
