import styled from "styled-components"

type selectprops = {
    label: string
    name: string
    value: string,
    onChange: (value: string) => void
}


export const FilterSelect = ({label,name,value, onChange}:selectprops) => {
    return(
        <>
           <Option>
                <input type="radio" name={name} value={value} onChange={() => onChange(value)} />
                <span>{label}</span>
            </Option>
        </>
    )
}


const Option = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px 12px;
    border-radius: 10px;

    cursor: pointer;

    transition: background 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }

    span {
        font-size: 14px;
        color: #333;
    }

    input {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
`
