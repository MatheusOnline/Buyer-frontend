import styled from "styled-components"

type FilterBarProps = {
    
    min: number
    max: number
    value: number
    setValue: (value: number) => void
    suffix?: string
}

export const FilterBar = ({
    
    min,
    max,
    value,
    setValue,
    suffix = ""
}: FilterBarProps) => {
    return (
        <>
            <DistanceLabel>
                Até: <strong>{value}{suffix}</strong>
            </DistanceLabel>

            <DistanceRange
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />

            <DistanceValues>
                <span>{min}{suffix}</span>
                <span>{max}{suffix}</span>
            </DistanceValues>
        </>
    )
}

const DistanceLabel = styled.div`
    font-size: 14px;
    color: #333;

    strong {
        font-size: 15px;
        color: #111;
    }
`

const DistanceRange = styled.input`
    width: 100%;
    cursor: pointer;

    appearance: none;
    height: 6px;
    border-radius: 999px;

    background: #e5e5e5;
    outline: none;

    &::-webkit-slider-thumb {
        appearance: none;

        width: 18px;
        height: 18px;
        border-radius: 50%;

        background: #111;

        cursor: pointer;

        transition: 0.2s ease;
    }

    &::-webkit-slider-thumb:hover {
        transform: scale(1.1);
    }

    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border: none;
        border-radius: 50%;

        background: #111;
        cursor: pointer;
    }
`

const DistanceValues = styled.div`
    display: flex;
    justify-content: space-between;

    font-size: 12px;
    color: #777;
`