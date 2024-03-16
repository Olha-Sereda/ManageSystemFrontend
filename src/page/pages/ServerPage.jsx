import {useParams} from "react-router-dom";

export default function ServerPage() {
    let { id } = useParams();

    return (
        <div>{id}</div>
    )
}