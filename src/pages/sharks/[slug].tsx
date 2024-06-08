import { useRouter } from 'next/router'
import SharkDetailsTable from '@/components/SharkDetailsTable'
import SharkCarousel from '@/components/SharkCarousel'
import SharkData from '@/data/sharks.json'
import SharkType from '@/types/SharkType';
import Layout from '@/components/Layout';

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

export default function Sharks({ shark }: { shark: SharkType }) {
  const router = useRouter()

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {shark && (
          <div className="text-center sm:w-3/4 lg:w-1/2 p-2">
            <h1 className="text-4xl font-bold">{shark.name} Shark</h1>
            <small>({shark.genus})</small>
            <div className="flex flex-col items-center sm:pt-2">
              <SharkCarousel {...shark} />
              <div className="lg:w-3/4">
                <p className="my-5">{shark.description}</p>
              </div>
              <SharkDetailsTable {...shark} />
              <button
                onClick={() => router.push(`${router.asPath}/quiz`)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-full w-3/4 md:w-1/2"
              >
                Take the Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}