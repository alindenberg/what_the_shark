import SharkDetailsTable from '@/components/SharkDetailsTable'
import SharkData from '@/data/sharks.json'

export async function getStaticPaths() {
  const paths = SharkData.map((shark) => ({
    params: { slug: shark.name.toLowerCase().replace(' ', '_') },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
  const shark = SharkData.find((shark) => shark.name.toLowerCase().replace(' ', '_') === params.slug)
  return { props: { shark } }
}


export interface SharkType {
  id: number;
  name: string;
  image: string;
  genus?: string;
  description?: string;
  fun_facts?: string[];
  diet?: string[];
  habitat?: string;
  size?: string;
  lifespan?: string;
  recorded_attacks?: string;
}

export default function Sharks({ shark }: { shark: any }) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-10">
      {shark && (
        <div className="text-center sm:w-2/3 p-2">
          <h1 className="text-4xl font-bold">{shark.name} Shark</h1>
          <small>({shark.genus})</small>
          <div className="flex justify-center p-4">
            <img src={`/sharks/${shark.image}`} alt={shark.name} width={500} height={400} style={{ borderRadius: '50%' }} />
          </div>
          <div className="sm:flex sm:flex-col-reverse md:flex-row md:items-start sm:pt-2">
            <div className="md:w-1/2 md:pr-2 flex justify-center">
              <p>{shark.description}</p>
            </div>
            <div className="md:w-1/2 md:pl-2">
              <SharkDetailsTable shark={shark} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}