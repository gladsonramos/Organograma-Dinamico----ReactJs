
export function buildTree(data: any[]): any {

    let dataImport: any = []
    let OpcoesGerencia: any = []
    const map: any = {};
    const tree: any[] = [];
    const dataAtual = new Date();
    data.forEach((node) => {
        dataImport.push(new Date(node.dataImportacao))
    });

    let uniqueArray = Array.from(new Set(dataImport));
    let dataMaisRecente: any = uniqueArray[0]; // Assumimos que a primeira data do array é a mais recente inicialmente
    dataImport.forEach((data: any) => {
        if (data > dataMaisRecente && data <= dataAtual) {
            dataMaisRecente = data;
        }
    });

    data.forEach((node) => {
        map[node.id] = { ...node, children: [] };

    });

    data.forEach((node) => {
        const ResultadoDatas = new Date(node.dataImportacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) === new Date(dataMaisRecente)?.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        if (ResultadoDatas) {
            OpcoesGerencia.push(node)
        }
        if (node.filho !== null && ResultadoDatas) {
            map[node.filho].children.push(map[node.id]);
        } else {
            tree.push(map[node.id]);
        }

    });

    const gerenciaOptions = OpcoesGerencia.filter((cargo: any) => cargo.filho === null).map((cargo: any) => ({
        key: cargo.id,
        text: cargo.nome,
    }));

    return {
        tree,
        gerenciaOptions,
        OpcoesGerencia
    };
}

export const getLastNode = (node: any): any => {
    return node.children && node.children.length > 0 ? getLastNode(node.children[node.children.length - 1]) : node;
};

export const Iniciais = (node: any) => {
    const nameArray = node.split(' ');
    const firstNameInitial = nameArray[0] ? nameArray[0].charAt(0) : '';
    const lastNameInitial = nameArray[1] ? nameArray[1].charAt(0) : '';
    return `${firstNameInitial}${lastNameInitial}`;
};

export function capitalizeWords(str: any): any {
    const words = str?.toLowerCase()?.split(' ');
    const capitalizedWords = words?.map((word: any) => word.charAt(0)?.toUpperCase() + word?.slice(1));
    return capitalizedWords?.join(' ');
}

export const countNodes = (node: any, terceirizadoValue: any) => {

    let totalCount = 0;
    if (node?.terceirizado === terceirizadoValue) {
        totalCount += 1;
    }
    if (node?.children?.length > 0) {
        node.children.forEach((child: any) => {
            totalCount += countNodes(child, terceirizadoValue);
        });
    }
    return totalCount;
};


export const countDescendants = (node: any) => {

    let totalDescendants = 0;
    if (node?.children?.length > 0) {
        node?.children?.forEach((child: any) => {
            totalDescendants += 1 + countDescendants(child);
        });
    }
    return totalDescendants;
};

export const procurarObjetoPorNome = (objetos: any, nomeProcurado: any) => {
    for (const obj of objetos) {
        if (typeof nomeProcurado === 'number') {
            if (obj.id === nomeProcurado) {
                return obj;
            }
        } else if (typeof nomeProcurado === 'string') {
            if (obj.nome === nomeProcurado) {
                return obj;
            }
        }
        if (obj.children && obj.children.length > 0) {
            const resultadoRecursivo: any = procurarObjetoPorNome(obj.children, nomeProcurado);
            if (resultadoRecursivo) {
                return resultadoRecursivo;
            }
        }
    }
    return null;
}

