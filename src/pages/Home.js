import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';

const Home = () => {
  const {
    protocols_filtered,
    setFilter,
    updateProtocol,
  } = useProtocolContext();
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(20);
  const [key, setKey] = useState('');

  useEffect(() => {
    setFilter(key);
  }, [key]);

  return (
    <div className="center-width main-height">
      <nav>
        <div className="name">Protocolos WB</div>
        <div className="btns-container">
          <Link to="/protocolos/novo" className="btn-link">
            Novo
          </Link>
        </div>
      </nav>

      <section className="filter-container">
        <i className="material-icons">search</i>
        <input
          className="filter"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </section>

      <main>
        <div className="header grid-protocols">
          <h3 className="justify-left">Requerente</h3>
          <h3>Descrição</h3>
          <h3>Email</h3>
          <h3>Status</h3>
          <h3>Data</h3>
          <h3>Ações</h3>
        </div>
        {protocols_filtered.map((protocol, i) => {
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
            <article className="single-protocol grid-protocols" key={i}>
              <p className="justify-left">
                <span className="num">{i + 1}</span>
                {requester}
              </p>
              <p>{description}</p>
              <p>{email}</p>
              <p>{status}</p>
              <p>{year}</p>
              <div className="controls">
                <Link
                  className="btn-icon"
                  to={`/protocolos/${id}`}
                  onClick={() => updateProtocol(id)}
                >
                  <i className="material-icons">edit</i>
                </Link>
                <button type="button" className="btn-icon">
                  <i className="material-icons">delete</i>
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
