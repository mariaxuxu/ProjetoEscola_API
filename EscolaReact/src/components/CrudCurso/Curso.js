import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Curso.css';
import Main from '../template/Main';

const title = "Cadastro de cursos";
const urlAPI = "http://localhost:5036/api/curso";

const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: []
}

export default function CrudCurso() {
    //initial State do curso e da lista
    const [curso, setCurso] = useState(initialState.curso)
    const [lista, setLista] = useState(initialState.lista)

    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista(resp.data)
        })
    }, [curso])

    const limparCurso = () => {
        setCurso( initialState.curso )
    }

    const salvarCurso = () => {
        curso.codCurso = Number(curso.codCurso);

        const metodo = curso.id ? 'put' : 'post';
        const url = curso.id ? `${urlAPI}/${curso.id}` : urlAPI;
        console.log(curso)
        axios[metodo](url, curso)
            .then(resp => {
                const lista = getListaAtualizada(resp.data)
                setCurso(initialState.curso)
                setLista(lista)
            })
    }

    const getListaAtualizada = (curso, add = true) => {
        const listaAtualizada = lista.filter(a => a.id !== curso.id);
        if (add)
            listaAtualizada.unshift(curso);
        return listaAtualizada;
    }

    const atualizaCampoCurso = (event) => {
       const cursoAtualizado = { ...curso };
       cursoAtualizado[event.target.name] = event.target.value;
       setCurso(cursoAtualizado);
    }

    const carregarCurso = (curso) => {
        setCurso(curso);
    }

    const removerCurso = (curso) => {
        const url = urlAPI + "/" + curso.id;
        if (window.confirm("Confirma remoção do curso: " + curso.nomeCurso)) {
            console.log("entrou no confirm (confirma a remoção)");
            axios['delete'](url, curso)
                .then(resp => {
                    const lista = getListaAtualizada(curso, false)
                    setCurso({ curso: initialState.curso, lista })
                })
        }
    }

    const renderForm = () => {
        return (
            <div className="inclui-container">
                <label> ID: </label>
                <input
                    type="number"
                    id="codCurso"
                    placeholder="ID do curso"
                    className="form-input"
                    name="codCurso"

                    value={curso.codCurso}
                    onChange={e => atualizaCampoCurso(e)} // e: evento de clique
                />
                <label> Nome Curso: </label>
                <input
                    type="text"
                    id="nomeCurso"
                    placeholder="Curso"
                    className="form-input"
                    name="nomeCurso"

                    value={curso.nomeCurso}
                    onChange={e => atualizaCampoCurso(e)}
                /> <br/>
                <label> Período: </label>
                <input
                    type="text"
                    id="periodo"
                    placeholder="Periodo"
                    className="form-input"
                    name="periodo"

                    value={curso.periodo}
                    onChange={e => atualizaCampoCurso(e)}
                /> <br/>
                <button className="btnSalvar"
                    onClick={e => salvarCurso(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => limparCurso(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    const renderTable = () => {
        return (
            <div className="listagem">
                <table className="listaCursos" id="tblListaCursos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">ID</th>
                            <th className="tabTituloNome">Curso</th>
                            <th className="tabTituloCurso">Período</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(
                            (curso) =>

                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => carregarCurso(curso)} >
                                            Alterar
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => removerCurso(curso)} >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }


        return (
            <Main title={title}>
                {renderForm()}
                {renderTable()}
            </Main>
        )
    }










