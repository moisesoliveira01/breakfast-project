import React, { useEffect, useState } from "react";
import '../style.css';
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const colaborador = {
    id: null,
    nome: '',
    cpf: ''
}

const Home = () => {

    const [values, setValues] = useState(colaborador);
    const navigate = useNavigate();

    useEffect(() => {
        api.delete("/colaborador");
    }, [])

    function handleChange(ev) {
        setValues({ ...values, [ev.target.name]: ev.target.value });
    }

    async function doPost(ev) {
        ev.preventDefault();

        if (values.nome.length === 0) {
            alert("Informe o seu nome!");

            return;
        }

        if (values.cpf.length !== 11) {
            alert("O CPF precisa ter 11 dígitos!");

            return;
        }
        if (!/^[0-9]+$/.test(values.cpf)) {
            alert("O CPF deve conter apenas números!");

            return;
        }

        const colab = await api.get(`/colaborador/${values.cpf}`).then((response) => { return response.data });

        if (colab !== null && colab !== '') {
            alert("O CPF informado já está cadastrado!");

            return;
        }

        api.post("/colaborador", values)
        .then(() => {
            navigate(`/cafe?cpf=${values.cpf}`);
        });
    }

    return (
        <div className="home">
            <h1>Bem vindo ao café da manhã da empresa!</h1>

            <br></br>
            <form onSubmit={doPost}>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">NOME</label>
                <input type="text" className="form-control" name="nome" placeholder="João Silva" onChange={handleChange}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cpf" className="form-label">CPF</label>
                <input className="form-control" name="cpf" rows="3" placeholder="000.111.222.33" onChange={handleChange}></input>
            </div>
            <div>
                <input type="submit" value="Salvar"></input>
            </div>
            </form>
        </div>
    );
}

export default Home;