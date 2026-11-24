import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter } from "../Filters/index.tsx"
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx"

export const FiltersMenu = () => {
    // Estados dos filtros
    const [distance, setDistance] = useState(0)
    const [price, setPrice] = useState(500)
    const [rating, setRating] = useState("")

    /**
     * Hook auxiliar para manipular query params da URL
     * (OBS: ideal seria mover isso pra fora do componente)
     */
    const useFilters = () => {
        const [searchParams, setSearchParams] = useSearchParams()

        // Adiciona ou atualiza um filtro na URL
        const setFilter = (key: string, value: string | number) => {
            const params = new URLSearchParams(searchParams)
            params.set(key, String(value))
            setSearchParams(params)
        }

        // Remove um filtro da URL
        const removeFilter = (key: string) => {
            const params = new URLSearchParams(searchParams)
            params.delete(key)
            setSearchParams(params)
        }

        return { setFilter, removeFilter }
    }

    const { setFilter, removeFilter } = useFilters()

    return (
        <Flex gap="10px">
            {/* FILTRO PREÇO */}
            <Filter.Root
                title="Preço"
                onApply={() => setFilter("price", price)}
                onClear={() => {
                    setPrice(500)
                    removeFilter("price")
                }}
            >
                <Filter.Bar
                    min={0}
                    max={5000}
                    value={price}
                    setValue={setPrice}
                    suffix=" R$"
                />
            </Filter.Root>

            {/* FILTRO DISTÂNCIA */}
            <Filter.Root
                title="Distância"
                onApply={() => setFilter("distance", distance)}
                onClear={() => {
                    setDistance(0)
                    removeFilter("distance")
                }}
            >
                <Filter.Bar
                    min={1}
                    max={100}
                    value={distance}
                    setValue={setDistance}
                    suffix=" km"
                />
            </Filter.Root>

            {/* FILTRO AVALIAÇÃO */}
            <Filter.Root
                title="Avaliação"
                onApply={() => setFilter("rating", rating)}
                onClear={() => {
                    setRating("")
                    removeFilter("rating")
                }}
            >
                <Filter.Select
                    value="1"
                    onChange={setRating}
                    label="Mais de 1 estrela"
                    name="assessment"
                />
                <Filter.Select
                    value="2"
                    onChange={setRating}
                    label="Mais de 2 estrelas"
                    name="assessment"
                />
                <Filter.Select
                    value="3"
                    onChange={setRating}
                    label="Mais de 3 estrelas"
                    name="assessment"
                />
                <Filter.Select
                    value="4"
                    onChange={setRating}
                    label="Mais de 4 estrelas"
                    name="assessment"
                />
            </Filter.Root>
        </Flex>
    )
}