import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Lista = () => {

    const [colabCafs, setColabCafs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.delete("/colaborador");
    }, [])

    useEffect(() => {
        async function fetchData(){
            await api.get(`/`).then((response) => {setColabCafs(response.data)});
        }

        fetchData();
    }, [])

    function excluir (ev) {
        if (window.confirm("Tem certeza que deseja excluir essa pessoa da lista?")){
            api.delete(`/colaborador/${ev.target.id}`)
            .then((response) => {
                alert(response.data);

                window.location.reload();
            });
        }
    }

    function showEdit(ev) {
        navigate(`/editar?cpf=${ev.target.id}&descricao=${ev.target.name}`);
    }

    return (
        <div className="pag-lista">
            <h1 className="titulo-lista">Lista de Pessoas e Comidas</h1>
                <table className="table">
                    <thead>
                        <tr className="table-head">
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Trazer</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colabCafs.map((colabCaf) => {
                            return (
                                <tr key={colabCaf[0]}>
                                    <td>{colabCaf[1]}</td>
                                    <td>{colabCaf[2]}</td>
                                    <td>{colabCaf[3]}</td>
                                    <td><button className="btn btn-outline-warning" id={colabCaf[2]} name={colabCaf[3]} onClick={showEdit}>Editar</button></td>
                                    <td><button className="btn btn-outline-danger" id={colabCaf[0]} onClick={excluir}>Excluir</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
            </div>
    );
}

export default Lista;