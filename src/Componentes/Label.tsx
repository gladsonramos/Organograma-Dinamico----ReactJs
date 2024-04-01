
import { Text } from 'office-ui-fabric-react';
import * as React from 'react';


type Labels = {
    label?: any,
    marginLeft?: any,
    tamanho?: any,
    margen?: any,
    marginBottom?: any,
    color?: any,
    Icone?: any,
    fontWeight?: any,
    fontSize?: any,
};



function Label({ label, margen, marginBottom, color, Icone, marginLeft, fontWeight, fontSize }: Labels) {


    return (

        <Text style={{
            fontSize: fontSize || 14,
            marginRight: margen,
            paddingLeft: marginLeft,
            marginBottom: marginBottom,
            color: color,
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            fontWeight: fontWeight
        }}>
            {label}

        </Text>
    )
}

export default Label;
