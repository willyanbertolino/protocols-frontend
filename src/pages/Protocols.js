import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';
import { Loading } from '../components';
import axios from 'axios';
import { baseURL } from '../utils/baseURL';

const protocolDefault = {
  id: '',
  requester: '',
  email: '',
  description: '',
};

const Protocols = () => {
  const {
    protocol_to_update,
    updateProtocolList,
    setUpdateProtocolList,
  } = useProtocolContext();
  let { protocolId } = useParams();
  const [protocol, setProtocol] = useState(protocolDefault);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ msg: '', type: '' });
  const [infoController, setInfoControler] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProtocol((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (protocolId !== 'novo') {
      setProtocol(protocol_to_update);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfo({ msg: '', type: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, [infoController]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { requester, email, description } = protocol;

    const newProtocol = {
      requester,
      email,
      description,
    };

    setLoading(true);

    if (protocolId === 'novo') {
      try {
        const { data } = await axios.post(
          `${baseURL}/api/v1/protocols`,
          newProtocol
        );
        setLoading(false);
        if (data.success) {
          setProtocol(protocolDefault);
          setInfo({ msg: 'Protocolo criado com sucesso', type: 'success' });
          setInfoControler(!infoController);
          setUpdateProtocolList(!updateProtocolList);
        }
      } catch (error) {
        setLoading(false);
        setInfo({ msg: error.response.data.msg, type: 'fail' });
        setInfoControler(!infoController);
      }
    } else {
      try {
        const { data } = await axios.patch(
          `${baseURL}/api/v1/protocols/${protocolId}`,
          newProtocol
        );
        if (data.protocol) setLoading(false);
        if (data) {
          setUpdateProtocolList(!updateProtocolList);
          setInfo({ msg: 'Protocolo editado com sucesso', type: 'success' });
          setInfoControler(!infoController);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setInfo({ msg: error.response.data.msg, type: 'fail' });
        setInfoControler(!infoController);
      }
    }
  };

  if (loading)
    return (
      <div className="center-height">
        <Loading />
      </div>
    );

  return (
    <div className="center-width main-height">
      <nav>
        <div className="name">Protocolos WB</div>
        <div className="btns">
          <Link
            to="/"
            className="btn-link"
            onClick={() => setProtocol(protocolDefault)}
          >
            Voltar
          </Link>
        </div>
      </nav>

      {info.msg && (
        <section className={`msg ${info.type}`}>
          <p>{info.msg}</p>
        </section>
      )}

      <section className="new-container">
        <form className="new-input-box" onSubmit={handleSubmit}>
          <div className="requester-box">
            <label htmlFor="requester">Requerente</label>
            <input
              type="text"
              name="requester"
              id="requester"
              required
              value={protocol.requester}
              onChange={handleChange}
            />
          </div>
          <div className="email-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={protocol.email}
              onChange={handleChange}
            />
          </div>
          <div className="description-box">
            <p>Descrição</p>
            <textarea
              name="description"
              required
              value={protocol.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn-link btn-submit">
            {protocolId === 'novo' ? 'Gerar Protocolo' : 'Editar Protocolo'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Protocols;
