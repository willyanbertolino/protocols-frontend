import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';
import { Loading } from '../components';
import { baseURL } from '../utils/baseURL';

const Home = () => {
  const {
    protocols,
    setFilter,
    updateProtocol,
    setUpdateProtocolList,
    updateProtocolList,
    changePage,
    page,
    maxPage,
  } = useProtocolContext();

  const pageNumList = Array.from({ length: maxPage }, (_, i) => i + 1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [key, setKey] = useState('');
  const [info, setInfo] = useState({ msg: '', type: '' });
  const [infoController, setInfoControler] = useState(false);
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

  const handleSearchChange = (e) => {
    setKey(e.target.value);
    changePage(1);
  };

  const deleteProtocolReset = async () => {
    setLoading(true);
    try {
      if (deleteConfirm.type === 'delete' && deleteConfirm.id) {
        const { data } = await axios.delete(
          `${baseURL}/api/v1/protocols/${deleteConfirm.id}`
        );
        if (data.success) {
          setUpdateProtocolList(!updateProtocolList);
          setLoading(false);
          setInfo({ msg: 'Protocolo excluido com sucesso', type: 'success' });
          setInfoControler(!infoController);
          setDeleteConfirm({ id: '', confirm: false });
        }
        return;
      }
      if (deleteConfirm.type === 'reset') {
        const { data } = await axios.get(`${baseURL}/api/v1/protocols/reset`);
        setUpdateProtocolList(!updateProtocolList);
        if (page > 1) {
          changePage(1);
        }
        setInfo({ msg: data.msg, type: 'success' });
        setInfoControler(!infoController);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      setInfo({ msg: error.response.data.msg, type: 'fail' });
      setInfoControler(!infoController);
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
  }, [infoController]);

  if (loading)
    return (
      <div className="center-height">
        <Loading />
      </div>
    );

  const mainHeader = [
    <h3 key="requester">Requerente</h3>,
    <h3 key="description">Descrição</h3>,
    <h3 key="email">Email</h3>,
    <h3 key="status">Status</h3>,
    <h3 key="data">Data</h3>,
    <h3 key="empty"></h3>,
  ];

  return (
    <div className="center-width main-height">
      <nav className="navbar">
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
            <div className="modal-control-btn">
              <button
                type="button"
                className="btn-link modal-btn"
                onClick={() => setModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-link modal-btn"
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
        <div className="search-icon-container">
          <i className="material-icons">search</i>
        </div>
        <input
          className="filter"
          type="text"
          value={key}
          onChange={handleSearchChange}
        />
      </section>

      <main>
        <div className="description-full">
          <div className="grid-protocols">{mainHeader.map((item) => item)}</div>
        </div>
        <div>
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
              <article className="small-container" key={i}>
                <div className="small-inside">
                  <div className="aside-description">{mainHeader[0]}</div>
                  <p className="justify-left">{requester}</p>
                </div>
                <div className="small-inside">
                  <div className="aside-description">{mainHeader[1]}</div>
                  <p>{description}</p>
                </div>
                <div className="small-inside">
                  <div className="aside-description">{mainHeader[2]}</div>
                  <p>{email}</p>
                </div>
                <div className="small-inside">
                  <div className="aside-description">{mainHeader[3]}</div>
                  <p>{status}</p>
                </div>
                <div className="small-inside">
                  <div className="aside-description">{mainHeader[4]}</div>
                  <p>{year}</p>
                </div>
                <div className="small-inside">
                  <div className="aside-description">{mainHeader[5]}</div>
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
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <section className="pages">
        {pageNumList.map((value) => {
          return (
            <button
              key={value}
              className={`btn-icon page-btn ${page === value ? 'active' : ''}`}
              onClick={() => {
                page !== value && changePage(value);
              }}
            >
              {value}
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
