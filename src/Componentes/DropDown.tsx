
import { Dropdown, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import Label from './Label';


const DropDowns = ({ label, tamanho, marginLeft, data, multiSelect, disabled, onChange, selectedKeys, selectedKey }: any) => {
    return (
        <>
            <Stack style={{ marginLeft: marginLeft }} >
                <Label label={label} />
                <Dropdown
                    selectedKeys={selectedKeys}
                    selectedKey={selectedKey}
                    options={data}
                    multiSelect={multiSelect}
                    disabled={disabled}
                    onChange={onChange}
                    style={{ marginTop: 7, width: tamanho, borderRadius: 4, }}
                    styles={{
                        title: { borderStyle: 'none', backgroundColor: '#F9F9F9' }
                    }} />
            </Stack>

        </>
    )
}

export default DropDowns;
