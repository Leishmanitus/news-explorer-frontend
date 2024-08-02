import './SearchForm.css';

function SearchForm() {
    return (
        <div className='search'>
            <h1 className='search__title'>What's going on in the world?</h1>
            <p className='search__description'>Find the latest news on any topic and save them to your personal account</p>
            <form className='search__form' name='search-form'>
                <input className='search__form-input' id='search-input' placeholder='Enter topic'></input>
                <button className='search__form-button' type='button'>Search</button>
            </form>
        </div>
    )
}

export default SearchForm;
