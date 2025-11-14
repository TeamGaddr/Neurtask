/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

interface ITranscript {
    id: string
    date: string
    transcript: {
        text: string
    }[]
}

const Transcription = () => {
    const [transcript, setTranscript] = useState<ITranscript[] | null>([])
    const token = localStorage.getItem("token");
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;


    useEffect(() => {
        const token = localStorage.getItem("token");

        const getTranscription = async () => {
            try {
                const resposne = await fetch(`${base}/api/transcript`, {
                    headers: { Authorization: `Bearer ${token}` },
                    method: "GET"
                })

                const data = await resposne.json()

                setTranscript(data)

                if (!resposne.ok) {
                    throw new Error(`Couldn't find any transcript ${resposne.status}`)
                }
            } catch (error) {
                console.error("ERROR: Couldn't get any transcription", error)
                return
            }

        }
        getTranscription()
    }, [])


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deleteTranscription = async (id: any) => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error(`There is no Token `)

        }
        if (!id) {
            throw new Error(`There is no ID `)

        }
        try {
            const response = await fetch(`${base}/api/transcript/${encodeURIComponent(id)}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error(`Failed to delete transcript ${response.status}`)
            }

            if (response.ok) {
                console.log(`Transcript with the ID of: ${id} was deleted`)
                setTranscript((prev) => prev?.filter((t) => t.id !== id) || [])
            }
        } catch (error) {
            console.error("ERROR: Couldn't delete any transcription", error)
            return
        }
    }

    console.log(transcript)

    return (
        <div>
            {
                transcript?.length === 0 ? <p>There is no Transcript</p> :

                    transcript?.map((item) => {
                        return (

                            <div key={item.id}>

                                <h2>{item.id}</h2>
                                <h2>{item.date.slice(0, 10)}</h2>

                                {item.transcript.map((transcriptions, index: number) => {
                                    return (
                                        <div key={index}>
                                            <p>{transcriptions.text}</p>
                                        </div>
                                    )
                                })}
                                <button onClick={() => deleteTranscription(item.id)}>Delete Transcript</button><br />
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default Transcription
