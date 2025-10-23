import { useEffect, useState } from 'react'

interface ISummary {
    id: string
    date: string
    summary: {
        text: string
    }[]
}

const Summary = () => {
    const [summaries, setSummaries] = useState<ISummary[] | null>([])

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getSummaries = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/summary", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "GET"
                })

                const data = await response.json()
                setSummaries(data)
            } catch (error) {
                console.error("ERROR: Couldn't get any summary", error)
                return
            }
        }

        getSummaries()

    }, [])

    console.log(summaries)

    return (
        <div>
            {
                !summaries || summaries?.length === 0 ? <p>There is no summary </p> :
                    <div>
                        {summaries?.map((item, index) => {
                            return (
                                <div key={item?.id}>
                                    <p>Date: {item.date}</p><br />
                                    <p>{item?.summary.map((item, index) => {
                                        return (
                                            <p key={index}>{item.text}</p>
                                        )
                                    })}</p><br />
                                </div>
                            )
                        })}
                    </div>
            }
        </div>
    )
}

export default Summary
