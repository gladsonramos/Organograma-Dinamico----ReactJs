import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

const ButtonDireito = ({ label, onClick }: any) => {
    return (
        <DefaultButton styles={{
            root: {
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 3,
                color: 'black',
                fontStyle: 'normal',
                borderStyle: 'none',
            },
            rootHovered: {
                padding: 16,
                backgroundColor: "#0abb98",
                color: 'white',
                borderStyle: 'none',
            }
        }}
            style={{ height: "40px", width: "200px" }}
            onClick={onClick}
        >
            <div>
                {label}
            </div>
        </DefaultButton >
    )
}

export default ButtonDireito;

export const Button = ({ label, colorHov, corTexto, backgroundColorHov, onClick, padding, backgroundColor }: any) => {

    return (

        <DefaultButton styles={{
            root: {
                backgroundColor: backgroundColor,
                borderStyle: 'solid',
                borderColor: '#D6D6D6',
                borderWidth: '1px',
                color: corTexto,

            },
            rootHovered: {
                background: backgroundColorHov,
                color: colorHov,
            }
        }}
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginLeft: 15,
                height: 37,
                padding: padding,
                paddingLeft: 33,
                paddingRight: 33,
                borderRadius: 8,

            }}
            onClick={onClick}

        >
            {label}
        </DefaultButton>
    )
}

