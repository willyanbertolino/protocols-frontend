import React from 'react';
import { Link } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';

const Home = () => {
  const { protocols } = useProtocolContext();

  console.log(protocols);

  return (
    <div className="center-width main-height">
      <nav>
        <div className="name">Protocolos WB</div>
        <div className="btns-container">
          <Link to="/protocolos" className="btn-link">
            Novo
          </Link>
        </div>
      </nav>

      <main>
        <div className="header grid-protocols">
          <h3 className="justify-left">Requerente</h3>
          <h3>Descrição</h3>
          <h3>Email</h3>
          <h3>Status</h3>
          <h3>Data</h3>
          <h3>Ações</h3>
        </div>
        {protocols.map((protocol, i) => {
          const {
            _id: id,
            requester,
            description,
            email,
            status,
            createdAt,
          } = protocol;

          const year = new Date(createdAt).getFullYear();

          return (
            <article className="single-protocol grid-protocols">
              <p className="justify-left">{requester}</p>
              <p>{description}</p>
              <p>{email}</p>
              <p>{status}</p>
              <p>{year}</p>
              <div className="controls">
                <Link to="/protocolos">
                  <i class="material-icons">edit</i>
                </Link>
                <button type="button">
                  <i class="material-icons">delete</i>
                </button>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
