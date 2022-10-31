import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';
import { Loading } from '../components';
import { baseURL } from '../utils/baseURL';

const Home = () => {
  const {
    protocols_filtered,
    setFilter,
    updateProtocol,
    setUpdateProtocolList,
    updateProtocolList,
  } = useProtocolContext();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState('');
  const [info, setInfo] = useState({ msg: '', type: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({
    confirm: false,
    id: '',
    type: '',
  });

  const handleDelete = (id) => {
    setModal(true);
    setDeleteConfirm({ confirm: false, id, type: 'delete' });
  };

  const handleReset = () => {
    setModal(true);
    setDeleteConfirm({ confirm: false, id: '', type: 'reset' });
  };

  const deleteProtocolReset = async () => {
    setLoading(true);
    try {
      if (deleteConfirm.type === 'delete' && deleteConfirm.id) {
        const { data } = await axios.delete(
          `${baseURL}/api/v1/protocols/${deleteConfirm.id}`
        );
        if (data.success) {
          setLoading(false);
          setInfo({ msg: 'Protocolo excluido com sucesso', type: 'success' });
          setUpdateProtocolList(!updateProtocolList);
          setDeleteConfirm({ id: '', confirm: false });
        }
        return;
      }
      if (deleteConfirm.type === 'reset') {
        setLoading(false);
        const { data } = await axios.get(`${baseURL}/api/v1/protocols/reset`);
        setInfo({ msg: data.msg, type: 'success' });
        console.log(data);
        setUpdateProtocolList(!updateProtocolList);
        return;
      }
    } catch (error) {
      setLoading(false);
      setInfo({ msg: error.response.data.msg, type: 'fail' });
    }
  };

  useEffect(() => {
    if (deleteConfirm.confirm) deleteProtocolReset();
  }, [deleteConfirm]);

  useEffect(() => {
    setFilter(key);
  }, [key]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfo({ msg: '', type: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, [info]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="center-width main-height">
      <nav>
        <div className="name">Protocolos WB</div>
        <div className="btns-container">
          <button
            type="button"
            className="btn-link btn-nav"
            onClick={() => handleReset()}
          >
            Reset
          </button>
          <Link to="/protocolos/novo" className="btn-link">
            Novo
          </Link>
        </div>
      </nav>

      {info.msg && (
        <section className={`msg ${info.type}`}>
          <p>{info.msg}</p>
        </section>
      )}

      {modal ? (
        <section className="modal-container">
          <div className="modal-content">
            <p>
              Tem certeza que quer{' '}
              {deleteConfirm.type === 'reset'
                ? 'resetar o banco de dados'
                : 'excluir este protocolo'}
              ?
            </p>
            <div className="control">
              <button
                type="button"
                className="btn-link"
                onClick={() => setModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-link"
                onClick={() => {
                  setModal(false);
                  setDeleteConfirm((prev) => {
                    return { ...prev, confirm: true };
                  });
                }}
              >
                {deleteConfirm.type === 'reset' ? 'Resetar' : 'Excluir'}
              </button>
            </div>
          </div>
        </section>
      ) : null}

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
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => handleDelete(id)}
                >
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
