
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import CardPremium from './CardPremium';

const UserSuscripcion = () => {

    const [state, setState] = useState({
        mensual: '',
        trimestral: '',
        anual: '',
    });

    const handleChangeMonth = () => {
        setState({
            mensual: '$599,99 / mes'
        })
    }

    const handleChangeThreMonth = () => {
        setState({
            trimestral: '$999,99 / trimestral'
        })
    }

    const handleChangeYear = () => {
        setState({
            anual: '$1.599,99 / anual'
        })
    }

    return (
        <div>
            <Link to='/user'><p>Volver</p></Link>

            <h1>Una suscripcion sin igual para potenciar tu desarrollo personal al máximo.</h1>

            <h4>Mejora tu futuro con las herramientas que te ofrece Soy Premium.</h4>

            <div>Elegi tu cobro preferido de estas tres opciones:</div>
            <button onClick={handleChangeMonth}>Mensual</button>
            <button onClick={handleChangeThreMonth}>Trimestral</button>
            <button onClick={handleChangeYear}>Anual</button>

            <CardPremium 
                mes={state.mensual}
                trimestral={state.trimestral}
                anual={state.anual}
            />

            <br />
        
        </div>
    )
}

export default UserSuscripcion;
