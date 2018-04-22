import React, { Component } from 'react';
import green from '../../img/green.png';
import powderblue from '../../img/powderblue.png';

const Footer = () => (
  <footer>
    <img className="footer-img-left" src={powderblue} />
    <p className="footer-text">
      Heathercoraje and Veredrec are in building process
    </p>
    <img className="footer-img-right" src={green} />
  </footer>
);

export default Footer;
