import React, { useEffect, useState } from "react";
import '../style.css';
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const cafe = {
    id: null,
    descricao: '',
    colaborador: {
        id: '',
        nome: '',
        cpf: ''
    }
}

let colab = {
    id: '',
    nome: '',
    cpf: ''
}

const Cafe = () => {

    const [values, setValues] = useState(cafe);
    const navigate = useNavigate();

    useEffect(() => {
        async function getColab() {
            const url_string = window.location.href;
            const url = new URL(url_string);
            const cpf = url.searchParams.get("cpf");

            if (cpf === null || cpf === '') {
                navigate("/");
            }

            const colabData = await api.get(`/colaborador/${cpf}`).then((response) => { return response.data });
            
            colab.id = colabData.id;
            colab.nome = colabData.nome;
            colab.cpf = colabData.cpf;
        }

        getColab();

    }, [navigate]);

    function handleChange(ev) {
        setValues({ ...values, [ev.target.name]: ev.target.value });
    }

    function setColab() {
        setValues({ ...values, colaborador: colab });
    }

    async function doPost(ev) {
        ev.preventDefault();

        setColab();

        if (values.descricao.length === 0) {
            alert("Informe o que você vai levar!");

            return;
        }

        const caf = await api.get(`/cafedamanha/${values.descricao}`).then((response) => { return response.data });

        if (caf !== null && caf !== '') {
            alert("Parece que alguém já vai levar isso... tente escolher outra coisa :)");

            return;
        }

        api.post("/cafedamanha", values)
        .then(() => {
            if (window.confirm("Deseja adicionar mais comidas?")) {
                return;
            }
            navigate("/listacolaboradores");
        }).catch(() => {
        alert("Ocorreu um erro :( .Por favor, tente novamente");
        });
    }

    return (
        <div className="home">
            <h1>Hora de escolher o que você vai levar!</h1>

            <form onSubmit={doPost}>
            <br></br>
            <div className="mb-3">
                <label htmlFor="descricao" className="form-label">DESCRIÇÃO</label>
                <input type="text" className="form-control" name="descricao" placeholder="Suco de Morango" onChange={handleChange}></input>
            </div>
            <div>
                <input type="submit" value="Escolher"></input>
            </div>
            </form>
            <br></br>
            <br></br>
            <p>*adicione um item por vez</p>
        </div>
    );
}

export default Cafe;