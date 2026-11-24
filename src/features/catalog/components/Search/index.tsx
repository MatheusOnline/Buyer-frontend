import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ContainerSearch, InputSearch } from "./styled.ts"
import SearchIcon from "@assets/Svgs/SeachNormal.svg"

import { Button } from "../../../../shared/components/ui/Button/index.tsx"


export const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchTerm) return;

        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    };

    return(
        <ContainerSearch>
            <InputSearch 
                type="text" 
                placeholder="O que você está procurando?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" palette="primary" icon={true} onclick={handleSearch}>
                <img src={SearchIcon} alt="Buscar" />
            </Button>
        </ContainerSearch>
    )
}
 