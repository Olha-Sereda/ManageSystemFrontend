import { Input } from "@/components/ui/input"
import { useState } from 'react';


function SearchBar({ onSubmit }){
    const[term, setTerm] = useState('');
    const  handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(term);
    };

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <Input value={term} onChange={handleChange} className={"w-4/6 m-9"} type="text" name="name" placeholder="Search for server"/>
            </form>
        </div>
    );
}
export default SearchBar;