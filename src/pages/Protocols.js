import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProtocolContext } from '../context/protocolsContext';
import { Loading } from '../components';

const protocolDefault = {
  id: '',
  requester: '',
  email: '',
  description: '',
};

const Protocols = () => {
  const { protocol_to_update } = useProtocolContext();
  let { protocolId } = useParams();
  const [protocol, setProtocol] = useState(protocolDefault);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('yeh');
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

      <section className="new-container">
        <form className="new-input-box">
          <div className="requester-box">
            <label htmlFor="requester">Requerente</label>
            <input
              type="text"
              name="requester"
              id="requester"
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
              value={protocol.email}
              onChange={handleChange}
            />
          </div>
          <div className="description-box">
            <p>Descrição</p>
            <textarea
              name="description"
              value={protocol.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn-link btn-submit"
            onClick={handleSubmit}
          >
            {protocolId === 'novo' ? 'Gerar Protocolo' : 'Editar Protocolo'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Protocols;
