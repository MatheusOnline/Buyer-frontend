
import styled from "styled-components"
import { useLikedProduct } from "../../../service/likeService";
interface LikeProps {
    liked: boolean;
    product_id: string;
}

export function Like({ liked,product_id }: LikeProps) {
    const { mutate: toggleLike } = useLikedProduct();

    function handleLike(e: React.MouseEvent) {
        e.stopPropagation();
        toggleLike({ productId: product_id, currentlyLiked: liked });
    }
    
    return (
        <Button onClick={
           handleLike}>
            <svg width="20px" height="20px" stroke="#323439" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <g transform="translate(0 -1028.4)">
                    <path 
                        d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                        fill={liked ? "red" : "#00000000"}
                        style={{
                            transition: "fill 0.3s ease"
                        }}
                    />
                </g>
            </svg>
        </Button>
    )
}

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;   
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 6px;

    transition: 0.3s ease;
    &:hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
`

