import React, { useEffect, useState } from "react";
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../api";
import { useNavigate } from 'react-router-dom';

const colab = {
    id: '',
    nome: '',
    cpf: ''
}

const cafe = {
    id: '',
    descricao: '',
    colaborador: {
        id: '',
        nome: '',
        cpf: ''
    }
}

const Edit = () => {

    const [colabValues, setColabValues] = useState([colab]);
    const [cafeValues, setCafeValues] = useState([cafe]);
    const navigate = useNavigate();
    const [render, setRender] = useState(false);

    useEffect(() => {
        async function getColab() {
            const url_string = window.location.href;
            const url = new URL(url_string);
            const cpf = url.searchParams.get("cpf");

            if (cpf === null || cpf === '') {
                navigate("/");
            }

            const colabData = await api.get(`/colaborador/${cpf}`).then((response) => { return response.data });

            setColabValues(colabData);
        }

        async function getCafe() {
            const url_string = window.location.href;
            const url = new URL(url_string);
            const descricao = url.searchParams.get("descricao");

            const cafeData = await api.get(`/cafedamanha/${descricao}`).then((response) => { return response.data });

            setCafeValues(cafeData);
        }

        getColab();
        getCafe();

        setRender(true);

    }, []);

    function handleChangeColab(ev) {
        setColabValues({ ...colabValues, [ev.target.name]: ev.target.value });
    }

    function handleChangeCafe(ev) {
        setCafeValues({ ...cafeValues, [ev.target.name]: ev.target.value });
    }

    async function doPut(ev) {
        ev.preventDefault();

        if (colabValues.nome.length === 0) {
            alert("Informe o seu nome!");

            return;
        }

        if (colabValues.cpf.length !== 11) {
            alert("O CPF precisa ter 11 dígitos!");

            return;
        }
        if (!/^[0-9]+$/.test(colabValues.cpf)) {
            alert("O CPF deve conter apenas números!");

            return;
        }

        const colab = await api.get(`/colaborador/${colabValues.cpf}`).then((response) => { return response.data });

        const url_string = window.location.href;
        const url = new URL(url_string);
        const cpf = url.searchParams.get("cpf");
        const descricao = url.searchParams.get("descricao");

        if (colab !== null && colab !== '' && colab.cpf !== cpf) {
            alert("O CPF informado já está cadastrado!");

            return;
        }

        if (cafeValues.descricao.length === 0) {
            alert("Informe o que você vai levar!");

            return;
        }

        const caf = await api.get(`/cafedamanha/${cafeValues.descricao}`).then((response) => { return response.data });

        if (caf !== null && caf !== '' && caf.descricao !== descricao) {
            alert("Parece que alguém já vai levar isso... tente escolher outra coisa :)");

            return;
        }

        api.put("/colaborador", colabValues)
        .then(() => {}).catch(() => {
            alert("Ocorreu um erro :( .Por favor, tente novamente");
        });

        api.put("/cafedamanha", cafeValues)
        .then(() => {
            navigate("/listacolaboradores");
        }).catch(() => {
            alert("Ocorreu um erro :( .Por favor, tente novamente");
        })
    }

    return(
        <div className="home">
            { render ? <div>
            <h1>Editar</h1>

            <br></br>
            <form onSubmit={doPut}>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">NOME</label>
                <input type="text" className="form-control" name="nome" placeholder="João Silva" onChange={handleChangeColab} value={colabValues.nome}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cpf" className="form-label">CPF</label>
                <input className="form-control" name="cpf" rows="3" placeholder="000.111.222.33" onChange={handleChangeColab} value={colabValues.cpf}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="descricao" className="form-label">ITEM CAFÉ</label>
                <input type="text" className="form-control" name="descricao" placeholder="Suco de Morango" onChange={handleChangeCafe} value={cafeValues.descricao}></input>
            </div>
                <input type="submit" value="Atualizar"></input>
            </form>
           </div>
           : null}
        </div>
    );
}

export default Edit;