import React, { useState } from "react";

const LeaveRequestForm2 = () => {
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Заявка отправлена:", { name, phone, message });
  };

  return (
    <div className="modal-overlay"> {/* Слой затемнения */}
    <div className="leave-request-form2">
      <div className="leave-request-form2__outer-wrapper">
        <h2 className="leave-request-form2__title">Оставить заявку</h2>
       
        <form className="leave-request-form2__form-container" onSubmit={handleSubmit}>
            <div className="leave-request-form2__form-group">
                <input
                type="text"            
                className="leave-request-form2__input leave-request-form2__name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div className="leave-request-form2__form-group">
                <input
                type="tel"             
                className="leave-request-form2__input leave-request-form2__phone"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                />
            </div>
            <div className="leave-request-form2__form-group">
                <textarea             
                className="leave-request-form2__textarea leave-request-form2__message"
                placeholder="С чем могу помочь?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                />
            </div>
            <div className="leave-request-form2__button-wrapper">
                <button className="leave-request-form2__button" type="submit">Отправить</button>
            </div>
        </form>    
      </div>
      <div className="leave-request-form2__right">
        <img className="leave-request-form2__image" src="/images/менеджер.png" alt="Оператор" />
      </div>
    </div>
    </div>
  );
};

export default LeaveRequestForm2;


