'use client';

interface ErrorPageProps {
    //in action, had written throw new Error("oops")...so error.message = oops
    error: Error,
    //allows us to automatically refresh a route
    reset: () => void
}

export default function ErrorPage({error} : ErrorPageProps) {
    return <div>{error.message}</div>
}