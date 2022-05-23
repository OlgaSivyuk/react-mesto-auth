import React from 'react'
import successSignImg from '../images/union.svg';
//import unSuccessSignImg from '../images/unsuccess.svg';

function InfoToolTip(isOpen, onClose, text){
  const image = successSignImg

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : " "}`}>
      <div className="popup__container">
      <img className="popop__infotool-img" alt={text} src={image} />
      <h2 className="popup__title popup__title_type_message">Вы успешно зарегистрировались{text}</h2>
      <button
          type="button"
          className="popup__close-popup"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
      </div>
      
    </div>
  )
}

export default InfoToolTip
