import React from 'react';

const Contacte = ({ match }) => (
    <div className="col-12">
      
      <div className="row">
        <div className="col-6 contacte">
        <h2 className="contacte">Contacte</h2>
        {/* <p><i className="fas fa-map-marker-alt"/> Sky Tower et. 17, bir. 178a</p>
        <p><i className="fas fa-phone"/>+373 068013670</p>
        <p><i class="fas fa-envelope"></i>info@eazy.md</p> */}
        <p>Program: 24/7</p>
        <p>Tel: +373 61041697</p>
        <p>Email: <span className="mail">edge.md<i className="aron">@</i>mail.ru</span></p>
        </div>
        {/* <div className="col-6"><iframe width="400" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=chisinau%20sky%20tower&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div> */}
      </div>
    </div>
  );

  export default Contacte;
  