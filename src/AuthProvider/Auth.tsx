import React from 'react';
import { createContext, useState } from 'react';

export const AuthContext = createContext({})
export const AuthProvider = ({ children }: any) => {

    const [Cargos, setDados] = useState<any[]>([]);
    const [clickedChildId, setClickedChildId] = useState(null);
    const [clickChildNome, setClickNome] = useState(null);
    const [Colaborador, setColaborador] = useState(null);
    const [Funcao, setFuncao] = useState("");
    const [Corredor, setCorredor] = useState("");
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);
    const [DropDownCargos, setDropDownCargos] = useState(null);
    const [NovoResponsavel, setNovoResponsavel] = useState(false);
    const [BusinessLine, setBusinessLine] = useState("");
    const [Complexo, setComplexo] = useState("");
    const [Posicao, setPosicao] = useState("");
    const [tela, setTela] = useState(false);
    const [showError, setShowError] = useState(false);
    const [Area, setArea] = useState([]);
    const [niveisHier, setNivelHier] = useState([]);
    const [Editar, setEditar] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');

    const Api = () => {

        const dados: any[] = [
            {
                id: 1,
                text: "Departamento de Vendas - JOÃO",
                cargo: "Vendedor",
                filho: null,
                colaborador: 123,
                corredor: "Ex: corredor",
                business: "Vendas",
                children: [],
                visible: false,
                nome: "João",
                complexo: "Complexo A",
                posicao: "Vendas",
                terceirizado: true,
                gerencia: "Gerência de Vendas",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 2,
                text: "Departamento de Marketing - MARIA",
                cargo: "Analista de Marketing",
                filho: 1,
                colaborador: 456,
                corredor: "Ex: corredor",
                business: "Marketing",
                children: [],
                visible: true,
                nome: "Maria",
                complexo: "Complexo B",
                posicao: "Marketing",
                terceirizado: true,
                gerencia: "Gerência de Marketing",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 3,
                text: "Departamento Financeiro - PEDRO",
                cargo: "Analista Financeiro",
                filho: 1,
                colaborador: 789,
                corredor: "Ex: corredor",
                business: "Finanças",
                children: [],
                visible: false,
                nome: "Pedro",
                complexo: "Complexo C",
                posicao: "Financeiro",
                terceirizado: true,
                gerencia: "Gerência Financeira",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 4,
                text: "Departamento de Recursos Humanos - ANA",
                cargo: "Gerente de RH",
                filho: null,
                colaborador: 654,
                corredor: "Ex: corredor",
                business: "Recursos Humanos",
                children: [],
                visible: false,
                nome: "Ana",
                complexo: "Complexo D",
                posicao: "Recursos Humanos",
                terceirizado: false,
                gerencia: "Gerência de Recursos Humanos",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 5,
                text: "Departamento de Desenvolvimento - CARLOS",
                cargo: "Engenheiro de Software",
                filho: 4,
                colaborador: 321,
                corredor: "Ex: corredor",
                business: "Tecnologia",
                children: [],
                visible: false,
                nome: "Carlos",
                complexo: "Complexo E",
                posicao: "Desenvolvimento",
                terceirizado: false,
                gerencia: "Gerência de Desenvolvimento",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 6,
                text: "Departamento de Marketing - LUCIANA",
                cargo: "Analista de Marketing",
                filho: 4,
                colaborador: 222,
                corredor: "Ex: corredor",
                business: "Marketing",
                children: [],
                visible: false,
                nome: "Luciana",
                complexo: "Complexo A",
                posicao: "Marketing",
                terceirizado: false,
                gerencia: "Gerência de Marketing",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 7,
                text: "Departamento de Vendas - FERNANDO",
                cargo: "Vendedor",
                filho: 4,
                colaborador: 555,
                corredor: "Ex: corredor",
                business: "Vendas",
                children: [],
                visible: false,
                nome: "Fernando",
                complexo: "Complexo B",
                posicao: "Vendas",
                terceirizado: false,
                gerencia: "Gerência de Vendas",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 8,
                text: "Departamento Financeiro - MARCELA",
                cargo: "Analista Financeiro",
                filho: 4,
                colaborador: 777,
                corredor: "Ex: corredor",
                business: "Finanças",
                children: [],
                visible: false,
                nome: "Marcela",
                complexo: "Complexo C",
                posicao: "Financeiro",
                terceirizado: false,
                gerencia: "Gerência Financeira",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 9,
                text: "Departamento de TI - ANDRÉ",
                cargo: "Analista de Sistemas",
                filho: 1,
                colaborador: 888,
                corredor: "Ex: corredor",
                business: "Tecnologia",
                children: [],
                visible: false,
                nome: "André",
                complexo: "Complexo D",
                posicao: "Tecnologia da Informação",
                terceirizado: false,
                gerencia: "Gerência de TI",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 10,
                text: "Departamento de Logística - RAFAELA",
                cargo: "Analista de Logística",
                filho: 1,
                colaborador: 999,
                corredor: "Ex: corredor",
                business: "Logística",
                children: [],
                visible: false,
                nome: "Rafaela",
                complexo: "Complexo E",
                posicao: "Logística",
                terceirizado: false,
                gerencia: "Gerência de Logística",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 11,
                text: "Departamento de Produção - LUIS",
                cargo: "Supervisor de Produção",
                filho: 1,
                colaborador: 1234,
                corredor: "Ex: corredor",
                business: "Produção",
                children: [],
                visible: false,
                nome: "Luís",
                complexo: "Complexo F",
                posicao: "Produção",
                terceirizado: false,
                gerencia: "Gerência de Produção",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 12,
                text: "Departamento de Qualidade - ANA LÚCIA",
                cargo: "Analista de Qualidade",
                filho: 1,
                colaborador: 5678,
                corredor: "Ex: corredor",
                business: "Qualidade",
                children: [],
                visible: false,
                nome: "Ana Lúcia",
                complexo: "Complexo G",
                posicao: "Qualidade",
                terceirizado: false,
                gerencia: "Gerência de Qualidade",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 13,
                text: "Departamento de RH - GABRIEL",
                cargo: "Analista de Recursos Humanos",
                filho: 1,
                colaborador: 1357,
                corredor: "Ex: corredor",
                business: "Recursos Humanos",
                children: [],
                visible: false,
                nome: "Gabriel",
                complexo: "Complexo H",
                posicao: "Recursos Humanos",
                terceirizado: false,
                gerencia: "Gerência de RH",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 14,
                text: "Departamento de Compras - LUCAS",
                cargo: "Comprador",
                filho: 1,
                colaborador: 2468,
                corredor: "Ex: corredor",
                business: "Compras",
                children: [],
                visible: false,
                nome: "Lucas",
                complexo: "Complexo I",
                posicao: "Compras",
                terceirizado: false,
                gerencia: "Gerência de Compras",
                dataImportacao: new Date("2024-03-31")
            },
            {
                id: 15,
                text: "Departamento de Engenharia - ANA CLARA",
                cargo: "Engenheira Civil",
                filho: 1,
                colaborador: 9876,
                corredor: "Ex: corredor",
                business: "Engenharia",
                children: [],
                visible: false,
                nome: "Ana Clara",
                complexo: "Complexo J",
                posicao: "Engenharia",
                terceirizado: false,
                gerencia: "Gerência de Engenharia",
                dataImportacao: new Date("2024-03-31")
            }

            // Adicione quantos objetos desejar seguindo o mesmo formato
        ];

        setDados(dados)

    };


    return (
        <AuthContext.Provider value={{
            Api,
            setDados,
            Cargos,
            clickedChildId,
            setClickedChildId,
            clickChildNome,
            setClickNome,
            isContextMenuVisible,
            setContextMenuVisible,
            Colaborador,
            setColaborador,
            Funcao,
            setFuncao,
            Corredor,
            setCorredor,
            DropDownCargos,
            setDropDownCargos,
            NovoResponsavel,
            setNovoResponsavel,
            BusinessLine,
            setBusinessLine,
            Complexo,
            setComplexo,
            Posicao,
            setPosicao,
            tela,
            setTela,
            showError,
            setShowError,
            Area,
            setArea,
            setNivelHier,
            Editar,
            setEditar,
            selectedOption,
            setSelectedOption,

        }}>
            {children}
        </AuthContext.Provider>
    )
}

