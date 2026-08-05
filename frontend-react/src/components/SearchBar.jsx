import '../App.css';

function SearchBar ({query, setQuery, onSearch}) {
    return (
        <div className='search'>
            <input
                className='searchBar'
                type="text"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch(query);
                    }
                }}
            />
                <button onClick={(e) => {e.preventDefault(); onSearch(query)}}>Search</button>
        </div>
    );
}

export default SearchBar;