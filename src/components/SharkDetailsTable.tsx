import { SharkType } from '../pages/sharks/[slug]';

interface SharkDetailsTableProps {
    shark: SharkType;
}

const SharkDetailsTable: React.FC<SharkDetailsTableProps> = ({ shark }) => {
    return (
        <table className="table-auto">
            <tbody>
                <tr>
                    <td className="border px-4 py-2">Diet</td>
                    <td className="border px-4 py-2">{shark.diet?.join(', ')}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Lifespan</td>
                    <td className="border px-4 py-2">{shark.lifespan}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Recorded Attacks</td>
                    <td className="border px-4 py-2">{shark.recorded_attacks}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Habitat</td>
                    <td className="border px-4 py-2">{shark.habitat}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Size</td>
                    <td className="border px-4 py-2">{shark.size}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Fun Facts</td>
                    <td className="border px-4 py-2">
                        <ul>
                            {shark.fun_facts?.map((fact, index) => (
                                <li key={index}>{fact}</li>
                            ))}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default SharkDetailsTable;
