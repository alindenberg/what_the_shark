import { useRouter } from 'next/router'

export default function Quiz() {
    const router = useRouter()
    const { slug } = router.query

    return (
        <div className="flex min-h-screen flex-col items-center pt-10">
            <h1>Quiz for {slug} shark</h1>
            {/* Add your quiz components here */}
        </div>
    )
}