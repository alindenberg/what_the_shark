export default function Sort({ sortOrder, handleSortChange }) {
    return (
        <div>
            {/* <label htmlFor="sort">Sort: </label> */}
            <select id="sort" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
            </select>
        </div>
    );
}