import './searchform.styles.css';
import InputWithLabel from "../library/input/inputwithlabel.component";




const Searchform = ({onSearchSubmit,searchTerm,onSearchInput}) =>{

    const onSearchInputChange = (event)=>{
        onSearchInput(event.target.value);
    }

    const onSearchSubmitForm = (event) =>{
        event.preventDefault();
        onSearchSubmit();
    }

    return (
        <form onSubmit={onSearchSubmitForm}>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInputChange}
            >
                <strong>Search:</strong>
            </InputWithLabel>

            <button type="submit" disabled={!searchTerm}>
                Submit
            </button>
        </form>
    )

}

export default Searchform;
