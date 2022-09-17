import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';
import { Loading } from '../components';
import axios from 'axios';

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
  }, [info]);

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
        const { data } = await axios.post('/api/v1/protocols', newProtocol);
        setLoading(false);
        if (data.success) {
          setProtocol(protocolDefault);
          setInfo({ msg: 'Protocolo criado com sucesso', type: 'success' });
          setUpdateProtocolList(!updateProtocolList);
        }
      } catch (error) {
        setLoading(false);
        setInfo({ msg: error.response.data.msg, type: 'fail' });
      }
    } else {
      try {
        const { data } = await axios.patch(
          `/api/v1/protocols/${protocolId}`,
          newProtocol
        );
        if (data.protocol) setLoading(false);
        if (data) {
          setUpdateProtocolList(!updateProtocolList);
          setInfo({ msg: 'Protocolo editado com sucesso', type: 'success' });
        }
      } catch (error) {
        setLoading(false);
        setInfo({ msg: error.response.data.msg, type: 'fail' });
      }
    }
  };

  if (loading) return <Loading />;

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
