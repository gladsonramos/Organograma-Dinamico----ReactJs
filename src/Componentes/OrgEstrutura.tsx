// TreeRenderer.tsx


import { TreeNode } from 'react-organizational-chart';
import { capitalizeWords, Iniciais, countDescendants, procurarObjetoPorNome } from '../Page/Helper';
import { Text } from 'office-ui-fabric-react';
const renderTreeNodes = (node: any, clickedChildId?: any, nestedData?: any, oi?: any) => {


    const hasChildren = node.children && node.children.length > 0;
    const nomeProcurado = node.label;
    const objetoEncontrado = nestedData ? procurarObjetoPorNome(nestedData, nomeProcurado) : null;

    const Nome = capitalizeWords(node.label || "Sem nome Definido");
    const Corredor = capitalizeWords(node.corredor || "Corredor não especificado");
    const nomeAbreviado = clickedChildId === node.id ? (Nome?.length > 27 ? `${Nome?.slice(0, 27)}...` : Nome) : (Nome?.length > 23 ? `${Nome?.slice(0, 23)}...` : Nome);
    const CargoAbreviado = node?.cargo?.length > 26 ? `${node?.cargo.slice(0, 26)}...` : node?.cargo;

    
    return (
        <TreeNode
            label={
                <div
                    onClick={() => oi()}
                    data-child-id={node.id}
                    style={{
                        display: 'inline-block',
                        padding: 14,
                        background: clickedChildId === node.id ? "#f5f5f5" : 'white',
                        borderWidth: '1px',
                        borderColor: clickedChildId === node.id ? '#007e7a' : '#dee2e6',
                        borderStyle: 'solid',
                        width: clickedChildId === node.id ? 250 : 200,
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <Text style={{ fontWeight: 800, fontSize: 12, marginBottom: 2 }}>
                            {nomeAbreviado || "Sem nome Definido"}
                        </Text>
                        <div
                            style={{
                                position: 'absolute',
                                marginLeft: clickedChildId === node.id ? 204 : 170,
                                width: clickedChildId === node.id ? 48 : 31,
                                height: clickedChildId === node.id ? 48 : 31,
                                borderRadius: 100,
                                backgroundColor: '#e5f2f1',
                                marginTop: 2,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: clickedChildId === node.id ? 20 : 12,
                                    color: '#007e7a',
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
                    <div style={{ display: 'flex', marginTop: clickedChildId === node.id ? 16 : 24 }}>
                        <Text
                            style={{ color: '#007e7a', fontSize: 10 }}
                        >
                            {Corredor || "Corredor não especificado"}
                        </Text>
                        <div
                            style={{
                                cursor: 'pointer',
                                width: 36,
                                height: 20,
                                backgroundColor: '#e5f2f1',
                                borderRadius: 100,
                                marginLeft: clickedChildId === node.id ? 214 : 168,
                                position: 'absolute',
                            }}
                            data-child-id={node.id}
                        >
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: 3,
                                    color: '#007e7a',
                                    fontSize: 10,
                                    fontWeight: 600,
                                }}
                            >
                                {countDescendants(objetoEncontrado)} 
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

export default renderTreeNodes;