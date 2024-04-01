
import { Tree, TreeNode } from 'react-organizational-chart';
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../AuthProvider/Auth';
import './Container.css';
import { Icon, Text, Dropdown } from 'office-ui-fabric-react';
import ButtonDireito from '../Componentes/Button';
import { buildTree, getLastNode, capitalizeWords, countDescendants, Iniciais, procurarObjetoPorNome, countNodes } from './Helper';

const Arvore = () => {
    const initialTreeData: any = {
        label: "Carregando...",
        visible: true,
        children: [],
        id: 0,
        terceirizado: false,
        corredor: "Carregando...",
        cargo: "Aguarde...",
    };

    const [treeData, setTreeData] = useState<any>(initialTreeData);
    const [filho, setFilho] = useState<any[]>([]);
    const [inicio, setInicio] = useState<any>(true);
    const [InicioArvore, setArvore] = useState<any>([]);
    const containerRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [ModalOpen, setModal] = useState(false);
    const [click, setClick] = useState(null);
    const [selectedKey, setSelectedKey] = useState(null);

    const {
        Cargos,
        Api,
        clickedChildId,
        setClickedChildId,
        setClickNome,
        clickChildNome,
        isContextMenuVisible,
        setContextMenuVisible,
        DadosModal,
        DropDownCargos,
        setNovoResponsavel,
        NovoResponsavel,

    } = useContext<any>(AuthContext);

    useEffect(() => {
        Api()
    }, []);

    const nestedData: any = buildTree(Cargos);

    useEffect(() => {
        if (nestedData?.OpcoesGerencia.length > 0) {
            setSelectedKey(nestedData?.gerenciaOptions[0].key)
            const objetoEncontrado = procurarObjetoPorNome(nestedData?.tree, nestedData?.OpcoesGerencia[0]?.id);
            const rootNode: any = {
                label: nestedData?.OpcoesGerencia[0]?.nome,
                id: nestedData?.OpcoesGerencia[0]?.id,
                corredor: nestedData?.OpcoesGerencia[0]?.corredor,
                cargo: nestedData?.OpcoesGerencia[0]?.cargo,
                visible: true,
                children: [],
                terceirizado: nestedData?.OpcoesGerencia[0]?.terceirizado,
                filho: nestedData?.OpcoesGerencia[0]?.filho
            };
            if (clickChildNome === null) {
                setTreeData(rootNode);
            }
            setArvore(objetoEncontrado?.children);
        }
    }, [Cargos]);

    const GerarFilhos = (child: any) => {
        setFilho(child.children);
    };

    const handleAddNode = (child: any) => {
        setClick(child.id)
        if (child.children.length > 0) {
            setInicio(false);
            child.visible = true;
            child.children.forEach((element: any) => {
                element.visible = true;
            });
            GerarFilhos(child);
            const newNode: any = {
                label: child.nome,
                children: [],
                id: child.id,
                corredor: child.corredor,
                cargo: child.cargo,
                visible: true,
                terceirizado: child.terceirizado,
                filho: child.filho
            };
            setTreeData((prevTreeData: any) => {
                const lastNode = getLastNode(prevTreeData);
                lastNode.children.push(newNode);
                return { ...prevTreeData };
            });

            const { nome, ...outrasPropriedades } = child;
            const NomeAlterado = { ...outrasPropriedades, label: nome };
            setClickNome(NomeAlterado)
            setClickedChildId(child.id);
        }
    };

    const handleRemoveChildrenBelowNode = (node: any) => {
        const nomeProcurado = node.id;
        const objetoEncontrado = procurarObjetoPorNome(nestedData?.tree, nomeProcurado);
        if (objetoEncontrado === null) {
            setTreeData([]);
            setFilho([]);
            setInicio(true);
        } else {
            setInicio(false);
        }
        GerarFilhos(objetoEncontrado);
        node.children.forEach((element: any) => {
            element.visible = false;
        });
        node.children = [];
        setTreeData({ ...treeData });
    };




    const renderTreeNodes = (node: any) => {

        const hasChildren = node.children && node.children.length > 0;
        const nomeProcurado = node.id;
        const objetoEncontrado = procurarObjetoPorNome(nestedData?.tree, nomeProcurado);

        const ScrowView = (childId: any) => {
            handleRemoveChildrenBelowNode(node);
            setClickedChildId(childId.id);
            setClickNome(childId);
            setContextMenuVisible(false);
        };

        const Nome = capitalizeWords(node.label || "Sem nome Definido");
        const Corredor = capitalizeWords(node.corredor);
        const nomeAbreviado = clickedChildId === node.id ? (Nome?.length > 27 ? `${Nome?.slice(0, 27)}...` : Nome) : (Nome?.length > 23 ? `${Nome?.slice(0, 23)}...` : Nome);
        const CargoAbreviado = node?.cargo?.length > 26 ? `${node?.cargo.slice(0, 26)}...` : node?.cargo;

        const calculateBorderColor = (node: any, clickedId: any) => {
            if (node.terceirizado) {
                return clickedId === node.id ? '#3CB5E5' : '#dee2e6';
            } else {
                return clickedId === node.id ? '#007e7a' : '#dee2e6';
            }
        };
        return (
            <TreeNode
                label={
                    <div
                        onClick={() => ScrowView(node)}
                        data-child-id={node.id}
                        style={{
                            display: 'inline-block',
                            padding: 14,
                            background: node.terceirizado ? "#E6F6FC" : '#EAFAFA',
                            borderWidth: '1px',
                            borderColor: calculateBorderColor(node, clickedChildId),
                            borderStyle: 'solid',
                            width: clickedChildId === node.id ? 250 : 200,
                        }}
                    >
                        <div style={{ display: 'flex' }}>
                            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                                {nomeAbreviado || "Sem nome Definido"}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    marginLeft: clickedChildId === node.id ? 204 : 170,
                                    width: clickedChildId === node.id ? 48 : 31,
                                    height: clickedChildId === node.id ? 48 : 31,
                                    borderRadius: 100,
                                    backgroundColor: 'white',
                                    marginTop: 2,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: clickedChildId === node.id ? 20 : 12,
                                        color: node.terceirizado === false ? '#007e7a' : '#3CB5E5',
                                        fontWeight: 700,
                                        padding: clickedChildId === node.id ? 9 : 7,
                                    }}
                                >
                                    {Iniciais(node.label)}
                                </div>
                            </div>
                        </div>
                        <Text
                            style={{
                                fontSize: 10,
                                color: '#555555',
                                display: 'flex',
                            }}
                        >
                            {CargoAbreviado || "Sem cargo definido"}
                        </Text>
                        {clickedChildId === node.id ? <div style={{ marginTop: 26, borderWidth: 1, borderColor: '#dee2e6', borderStyle: 'solid', }} /> : null}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: clickedChildId === node.id ? 16 : 24 }}>
                            <Text
                                style={{ color: node.terceirizado === false ? '#007e7a' : '#3CB5E5', fontSize: 10, paddingRight: clickedChildId === node.id ? 80 : 30 }}
                            >
                                {Corredor || "Não especificado"}
                            </Text>
                            <div className="circle" style={{ marginLeft: 1 }}>
                                {/*   <img className='icon' src={require('../Icons/icon_users.svg')} /> */}
                                <div className="circle-content">
                                    Total  {countDescendants(objetoEncontrado) + 1}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                {hasChildren && node.children.map((child: any) => child.visible && renderTreeNodes(child))}
            </TreeNode>
        );
    };

    // Clicar Com botão deireito
    const handleContextMenu = (event: any) => {
        event.preventDefault();
        setMenuPosition({ x: event.clientX, y: event.clientY });
        const cardElement = document.querySelector(
            `[data-child-id="${clickedChildId}"]`
        );
        if (cardElement) {
            setContextMenuVisible(true);
        }
    };

    const NewReponsavel = (IDidentificado: any) => {
        if (IDidentificado === "IDidentificado") {
            setNovoResponsavel(false)
        }
        else {
            setNovoResponsavel(true)
        }
        setModal(true)
    }

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            // Verificar se a tecla pressionada é o "Escape"
            if (event.key === 'Escape') {
                setModal(false)
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        // Remover o event listener quando o componente será desmontado
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [ModalOpen]);

    useEffect(() => {
        //Centralizar Onde Clicado
        // if (containerRef.current && clickedChildId) {
        //     const childElement = containerRef.current.querySelector(
        //       `[data-child-id="${clickedChildId}"]`
        // );
        //if (childElement) {
        //  childElement.scrollIntoView({
        //    behavior: 'smooth',
        //  block: 'center',
        // inline: 'center',
        // });
        // }
        //}
        //Click Fora da Tela
        const handleClickOutside = (event: any) => {
            const cardElement = document.querySelector(
                `[data-child-id="${clickedChildId}"]`
            );
            if (cardElement && !cardElement.contains(event.target)) {
                if (click) {
                    //setClickedChildId(null)
                }
                setContextMenuVisible(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [clickedChildId,
        ModalOpen,
        clickChildNome,
        DadosModal,
        DropDownCargos,
        NovoResponsavel,
        click,
        filho,
        inicio
    ]);



    //const Editar = () => {
    //setEditar(true)
    //setModal(true)
    //EditarColaborador()
    //}

    const TreeNodes = ({ node }: any) => {

        const Nome = capitalizeWords(node?.nome || "Sem nome Definido");
        const Cargo = node?.cargo?.toUpperCase()

        return (
            <div
                className={`tree-node ${node.terceirizado ? 'blue' : 'tree-node'} ${click === node.id ? 'selected' : ''}`}
                key={node?.nome}
                onClick={() => handleAddNode(node)}

            >
                <div className="outer-teste">
                    <div className="node-initials">
                        <div className={`node-initials-text ${node.terceirizado ? 'blue' : ''}`}>
                            {Iniciais(node?.nome)}
                        </div>
                    </div>
                </div>
                <div className="node-name">{Nome.length > 22 ? `${Nome.slice(0, 22)}...` : Nome}</div>
                <div className="node-cargo">
                    {Cargo.length > 26 ? `${Cargo?.slice(0, 26)}...` : Cargo}
                </div>
            </div>
        );
    };

    const handleManagerChange = (event: any, option?: any) => {
        const objetoEncontrado = procurarObjetoPorNome(nestedData?.tree, option?.key);
        const initialTreeData: any = {
            label: objetoEncontrado?.nome,
            visible: true,
            children: [],
            id: objetoEncontrado.id,
            corredor: objetoEncontrado.corredor,
            cargo: objetoEncontrado.cargo,
            terceirizado: objetoEncontrado.terceirizado
        };
        setSelectedKey(option?.key)
        setTreeData(initialTreeData)
        setFilho(objetoEncontrado?.children)
        setArvore(objetoEncontrado?.children);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        InicioArvore
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        filho
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    }, [InicioArvore, filho, inicio]);

    const data = inicio ? InicioArvore : filho;
    data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));

    return (
        <div className="container"
            style={{
                overflowX: 'scroll',
                backgroundColor: "white"
            }}
            onContextMenu={handleContextMenu}
            ref={containerRef}
        >

            <div>
                <Icon iconName="AddNotes"
                    style={{
                        fontSize: '25px',
                        margin: 10,
                        position: 'absolute',
                        zIndex: 1,
                        cursor: 'pointer',
                        marginTop: '90px'
                    }}
                    onClick={() => NewReponsavel('IDnãoidentificado')}
                />
            </div>

            <div style={{ padding: 10 }}>
                <Dropdown
                    label="Filtrar Gerência"
                    options={nestedData?.gerenciaOptions}
                    onChange={handleManagerChange}
                    selectedKey={selectedKey}
                    style={{ marginBottom: 10 }}
                />
            </div>



            {isContextMenuVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: menuPosition.y,
                        left: menuPosition.x,
                        zIndex: 1,
                    }}
                >
                    <div>
                        <div><ButtonDireito onClick={() => NewReponsavel('IDidentificado')} label={"Adicionar Colaborador"} /></div>
                        {/* <div><ButtonDireito onClick={() => Delete()} label={"Remover Colaborador"} /></div> */}
                        { /* <div><ButtonDireito onClick={() => Editar()} label={"Editar Colaborador"} /></div> */}
                    </div>

                </div>
            )}

            <Tree
                lineColor='#dee2e6'
                label={
                    <div className="outer-container">
                        <div className="inner-circle" />
                    </div>
                }>
                {renderTreeNodes(treeData)}
            </Tree>
            <div className="line-container">
                <div className="line"></div>
            </div>
            <div className="node-container">
                {data.map((node: any) => (
                    <TreeNodes key={node?.nome} node={node} />
                ))}
            </div>
        </div>
    );
};

export default Arvore;
