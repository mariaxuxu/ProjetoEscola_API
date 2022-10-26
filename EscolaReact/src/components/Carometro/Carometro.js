//import React, { Component } from 'react';
import React, { useState, useEffect } from "react";
import Main from '../template/Main';
import axios from "axios";
import './Carometro.css';

const title = "Cadastro de Carômetro";

const urlAlunos = "http://localhost:5036/api/aluno"

const urlCursos = "http://localhost:5036/api/curso"

const cursoinitialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: "", periodo: "" },
    cursoLista: [],
};

const Carometro = () => {
    const [data, setData] = useState([])
    const [cursoLista, setCursos] = useState([])
    const [alunoLista, setAlunos] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const avatars = ['big-ears']

    const randomAvatar = () => {
        let tamanho = avatars.length
        let av = Math.floor(Math.random() * tamanho)
        let rd = avatars[av]
        return rd
    }

    const dataFromAPI = async () => {
        await axios(urlAlunos)
            .then(resp => {
                setDataAtualizada(true)
                setData(resp.data)
                console.log(resp.data)
            })
            .catch(error => {
                console.error(error)
            })

        await axios(urlCursos)
            .then(resp => {
                setCursos(resp.data)
                console.log(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const getRandomLetter = () => {
        return Math.random().toString(36).substring(2, 9);
    }

    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
        }
    }, [dataAtualizada])


    const atualizaCurso = async (event) => {
        const cod = event.target.value;
        const listaDeAlunos = data.filter((aluno) => aluno.codCurso == cod);
        setAlunos(listaDeAlunos);
    }

    return (
        <div>
            <select
                name="codCurso"
                onChange={(e) => {
                    atualizaCurso(e);
                }}
            >
                <option value="">Selecione o curso</option>
                {cursoLista.map((curso) => (
                    <option name="codCurso" value={curso.codCurso}>
                        {curso.nomeCurso}-{curso.periodo}
                    </option>
                ))}
            </select>
            <div className="card-align">
                <div className="card-def">
                    {alunoLista.map((datas) => {
                        return (
                            <div key={datas.id} className="card-sombra">
                                <div className="image-align">
                                    <img src={`https://avatars.dicebear.com/api/big-ears/${getRandomLetter()}.svg`} alt={datas.nome} />
                                </div>
                                <div className="card-geral">
                                    <span className="">{datas.nome}</span> 
                                    <span className="">RA: {datas.ra}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carometro