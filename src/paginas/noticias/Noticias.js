import React, { useEffect } from 'react';
import { useNavigation } from '../../contextos/Navegacao';

function Noticias() {
  const { setLocation } = useNavigation();
  useEffect(() => {
    setLocation({
      title: 'Gestão de Notícias',
      key: 'noticias',
      path: '/noticias',
    });
  }, []);

  return <h1>página de Notícias</h1>;
}

export default Noticias;
