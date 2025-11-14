
'use client';
import { Mic, MicOff } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function MeetingRecorder({ meetingId }: { meetingId: string }) {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [recording, setRecording] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [transcriptionText, setTranscriptionText] = useState("")
    const token = localStorage.getItem("token");
    const [micMuted, setMicMuted] = useState(false);
    const micStreamRef = useRef<MediaStream | null>(null);
    // const [meetingId, setMeetingId] = useState<string | null>(null)
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;



    async function start() {
        try {
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStreamRef.current = micStream;

            let systemStream: MediaStream | null = null;
            try {
                systemStream = await navigator.mediaDevices.getDisplayMedia({
                    audio: true,
                    video: true,
                });
            } catch (error) {
                console.error("ERROR: Particpants audio not recording:", error);
            }

            const audioContext = new AudioContext();
            const destination = audioContext.createMediaStreamDestination();

            audioContext.createMediaStreamSource(micStream).connect(destination);
            if (systemStream) {
                try {
                    audioContext.createMediaStreamSource(systemStream).connect(destination);
                    console.log("SUCCESS: Particpants audio stored");
                } catch (error) {
                    console.error("ERROR: Could not get particpants audio:", error);
                }
            }

            const mixedStream = destination.stream;
            const recorder = new MediaRecorder(mixedStream, { mimeType: "audio/webm" });

            chunksRef.current = [];
            recorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
            };

            recorder.start();
            mediaRecorderRef.current = recorder;
            setRecording(true);
            setError(null);

        } catch (error) {
            console.error(error);
            setError((error as Error).message);
        }
    }

    async function stop() {
        if (!mediaRecorderRef.current) return;

        const recorder = mediaRecorderRef.current;

        try {
            const audioBlob: Blob = await new Promise((resolve) => {
                recorder.onstop = () => {
                    recorder.stream.getTracks().forEach((record) => record.stop());
                    resolve(new Blob(chunksRef.current, { type: "audio/webm" }));
                };
                recorder.requestData();
                recorder.stop();
            });

            setRecording(false);

            if (audioBlob.size === 0) {
                setError("Couldn't recorded audio");
                return;
            }

            const form = new FormData();
            const filename = `recording_${Date.now()}.webm`;
            form.append("file", audioBlob, filename);
            form.append("filename", filename);
            form.append("meetingId", meetingId);

            const res = await fetch(`${base}/api/recordmeetings/stop-recording`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: form,
            });

            const json = await res.json();
            if (res.ok) {
                setFileUrl(json.message);
                setTranscriptionText(json.transcription)
            } else {
                setError(json.error || "Failed to upload transcription");
            }
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
            setRecording(false);
        }
    }

    const toggleMute = async () => {
        if (!micStreamRef.current) return;
        micStreamRef.current.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        setMicMuted(prev => !prev)
    }


    return (
        <div className="space-y-4 p-6 max-w-lg mx-auto">
            <div className="space-x-2">
                {!recording && (
                    <button
                        onClick={start}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Start Recording
                    </button>
                )}
                {recording && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={stop}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Stop Recording
                        </button>
                        <button onClick={toggleMute}
                            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center ml-3"
                        >{micMuted ? <Mic /> : <MicOff />}</button>
                    </div>

                )}
            </div>
        </div >
    );
