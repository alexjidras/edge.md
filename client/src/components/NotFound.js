import React from 'react';
const message = {"ro": "Pagina nu a fost găsită", "ru": "Страница не найдена"};
const NotFound = ({ location, lang }) => (
    <div className="col-12 notfound">
      <p className="nf1">
      404 </p>
      <p className="nf2">{message[lang]}</p>
    </div>
  );

  export default NotFound;