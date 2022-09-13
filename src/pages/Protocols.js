import React from 'react';
import { Link } from 'react-router-dom';

const Protocols = () => {
  return (
    <div className="center-width main-height">
      <nav>
        <div className="name">Protocolos WB</div>
        <div className="btns">
          <Link to="/" className="btn-link">
            Voltar
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Protocols;
