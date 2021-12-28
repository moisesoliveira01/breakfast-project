import React from 'react';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Página Inicial</Link>
                </li>
                <li className="nav-item">
                    <Link to="/listacolaboradores" className="nav-link">Lista de Colaboradores</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;
