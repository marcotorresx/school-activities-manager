import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_left">
                <img src="/logocicc.png" alt="" className="logocicc"/>
                <div className="footer_left_info">
                    <p>2021 Administrador de Actividades Escolares</p>
                    <p>Sistema Digital desarrollado por el CICC, S. C. / Marco A. Torres / D.R. ®</p>
                    <p>cicc_mx@outlook.com </p>
                </div>
            </div>
            <div className="footer_right">
                <p className="footer_emails">Se autoriza el uso gratuito del Administrador de Actividades Escolares a la Comunidad de la Escuela Secundaria Técnica No. 57 “Guillermo Prieto”, la cual asume la responsabilidad de su buen uso y de la información publicada.</p>
                <p>contacto.est57matutino@gmail.com</p>
                <p>contacto.est57vespertino@gmail.com</p>
            </div>
        </div>
    )
}

export default Footer
