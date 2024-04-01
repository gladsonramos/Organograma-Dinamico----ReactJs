
import { TextField, Stack } from 'office-ui-fabric-react';

import Label from './Label';


const Input = ({ label, marginLeft, multiline, Icone, marginLeftLabel, value, onChange, disabled, placeholder, errorMessage, required, borderless }: any) => {

    return (
        <Stack style={{ marginLeft: marginLeft }} >
            <Label label={label} marginBottom={7} Icone={Icone} marginLeft={marginLeftLabel} />
            <TextField style={{
                borderRadius: 4, width: 576, maxHeight: 400, backgroundColor: '#F9F9F9',
            }}
                borderless={borderless} maxLength={100} multiline={multiline} onChange={onChange} value={value} disabled={disabled} placeholder={placeholder}
                errorMessage={errorMessage} required={required} styles={{ errorMessage: { marginLeft: 430 } }} />
        </Stack>
    )
}

export default Input;




