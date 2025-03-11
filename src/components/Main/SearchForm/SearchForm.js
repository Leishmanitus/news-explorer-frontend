import { useContext, useMemo, useRef } from 'react';
import './SearchForm.css';
import UserContext from '../../../contexts/UserContext';
import { getSearchResults } from '../../../utils/newsApi';

function SearchForm() {
    const { setIsLoading, setSearchResults, setHasSearched } = useContext(UserContext);
    const searchInputRef = useRef(null);

    const handleSearch = () => {
        setIsLoading(true);
        getSearchResults(searchInputRef.value)
            .then((data) => {
                const {articles} = data;
                console.log(articles);
                articles ? setSearchResults(articles) : setSearchResults([]);
            })
            .catch(error => {
                console.error(error);
                setSearchResults([]);
            })
            .finally(() => {
                setIsLoading(false)
                setHasSearched(true);
            });
    };

    useMemo(() => {
        searchInputRef.current = document.getElementById('search-input');
    }, []);

    return (
        <div className='search'>
            <h1 className='search__title'>What's going on in the world?</h1>
            <p className='search__description'>Find the latest news on any topic and save them to your personal account</p>
            <form className='search__form'
                name='search-form'
                onSubmit={(event) => {
                        event.preventDefault();
                        handleSearch();
                    }
                } >
                <input className='search__form-input' id='search-input' htmlFor='search-form' placeholder='Enter topic' />
                <button className='search__form-button' type='submit' >
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchForm;
