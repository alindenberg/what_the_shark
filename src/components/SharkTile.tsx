import Image from "next/image";

export interface SharkType {
    id: number;
    name: string;
    genus?: string;
}

export default function SharkTile(shark: SharkType) {
    return (
        <a
            key={shark.id}
            href={`/sharks/${shark.name.toLowerCase().replace(' ', '_')}`}
            className="border-2 border-blue-300 text-center p-2 transform transition duration-500 ease-in-out hover:scale-105">
            <Image
                src={`/sharks/${shark.name.toLowerCase().replace(' ', '_')}/index.jpg`}
                alt={shark.name}
                width={300}
                height={200}
            />
            <p>{shark.name}</p>
            <small>{shark.genus}</small>
        </a>
    )
}