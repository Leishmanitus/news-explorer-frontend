import { useContext, useEffect } from 'react';
import './SearchForm.css';
import UserContext from '../../../contexts/UserContext';
import { getSearchResults } from '../../../utils/newsApi';
import { useForm } from '../../../hooks/useForm';

function SearchForm() {
    const { setIsLoading, setSearchResults, setHasSearched, setErrorMessage } = useContext(UserContext);
    const {values, handleChange, setValues} = useForm('');
    const { searchWord } = values;
    useEffect(() => {
        setValues({ searchWord: '' });
    }, [setValues]);
    
    const handleSearch = () => {
        setIsLoading(true);
        getSearchResults(searchWord)
            .then((data) => {
                const {articles} = data;
                articles ? setSearchResults(articles) : setSearchResults([]);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Sorry, something went wrong during the request. Please try again later.');
                setSearchResults([]);
            })
            .finally(() => {
                setIsLoading(false);
                setHasSearched(true);
            });
    };


    return (
        <div className='search'>
            <h1 className='search__title'>What's going on in the world?</h1>
            <p className='search__description'>Find the latest news on any topic and save them to your personal account</p>
            <form
                className='search__form'
                name='search-form'
                id='search-form'
                onSubmit={(event) => {
                        event.preventDefault();
                        handleSearch();
                    }
                }
            >
                <input
                    className='search__form-input'
                    id='search-input'
                    name='searchWord'
                    htmlFor='search-form'
                    placeholder='Enter topic'
                    minLength={3}
                    maxLength={100}
                    type='text'
                    value={searchWord}
                    onChange={handleChange}
                />
                <button className='search__form-button' type='submit' >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchForm;
