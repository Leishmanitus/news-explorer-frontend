import { useContext } from 'react';
import './SearchForm.css';
import UserContext from '../../../contexts/UserContext';
import { getSearchResults } from '../../../utils/newsApi';

function SearchForm() {
    const { setIsLoading, setSearchResults } = useContext(UserContext);

    const handleSearch = () => {
        setIsLoading(true);
        const searchInput = document.getElementById('search-input');
        getSearchResults(searchInput.value)
            .then(data => {data.articles ? setSearchResults(data.articles) : setSearchResults(null)})
            .catch(error => {
                console.error(error);
                setSearchResults(null);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className='search'>
            <h1 className='search__title'>What's going on in the world?</h1>
            <p className='search__description'>Find the latest news on any topic and save them to your personal account</p>
            <form className='search__form' name='search-form'>
                <input className='search__form-input' id='search-input' placeholder='Enter topic' />
                <button className='search__form-button' type='button' onClick={() => handleSearch()}>
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchForm;
