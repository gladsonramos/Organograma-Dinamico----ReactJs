
import * as React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/Auth';


const Select = () => {

    const {
        selectedOption,
        setSelectedOption,
    } = useContext<any>(AuthContext)

    const handleOptionChange = (event: any) => {
        console.log(event.target.value)
        setSelectedOption(event.target.value);
    };


    return (
        <div>
            <label>
                <input
                    style={{ marginRight: '5px' }}
                    type="radio"
                    value="false"
                    checked={selectedOption === 'false'}
                    onChange={handleOptionChange}
                />
                Vale
            </label>
            <label style={{ marginLeft: 5 }}>
                <input
                    style={{ marginRight: '5px' }}
                    color='red'
                    type="radio"
                    value="true"
                    checked={selectedOption === 'true'}
                    onChange={handleOptionChange}
                />
                Terceirizado
            </label>

        </div>
    )
}


export default Select;
