const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <h4>{`Todos os direitos reservados - ${year} - Willyan H.P. Bertolino`}</h4>
    </footer>
  );
};

export default Footer;
