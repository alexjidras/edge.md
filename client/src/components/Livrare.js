import React from 'react';
let text = {ro: ["Livrare", "Produsele sînt livrate de curier în termen de maxim 24 ore de la confirmarea comenzii prin telefon. Livrarea este gratuită în aria Chișinăului. Pentru clienții din afara Chișinăului livrarea va costa 1 leu/km parcurs în afara orașului.", "Achitarea se va efectua în numerar curierului. Drept dovadă de procurare veţi primi certificatul de garanție."],
ru: ["Доставка", "Товары будут доставлены куриером за максимум 24 часа после оформление заказа. Доставка бесплатная в приделах Кишинёва и платная с тарифом 1 лей за проеденный километр за городом.", "Оплата производиться наличными куриеру. При оплате вы получите гарантийный талон."]}

const Livrare = ({ lang }) => (
    <div className="col-12 ">
      <h2 className="livrare">{text[lang][0]}</h2>
      <p>{text[lang][1]}</p>
      <p>{text[lang][2]}</p>
 </div>

  );

  export default Livrare;