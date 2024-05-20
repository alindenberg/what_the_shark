interface SortProps {
    sortOrder: string;
    handler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


export default function Sort(props: SortProps) {
    return (
        <div>
            {/* <label htmlFor="sort">Sort: </label> */}
            <select id="sort" value={props.sortOrder} onChange={props.handler}>
                <option value="asc">Name (A-Z)</option>
                <option value="desc">Name (Z-A)</option>
            </select>
        </div>
    );
}