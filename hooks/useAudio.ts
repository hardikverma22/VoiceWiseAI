import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState, useTransition } from "react";
import processAudio from "@/lib/actions/action";
import { convertSecondsToHHMMSS } from "@/lib/utils";

const useAudio = () => {
    const [permission, setPermission] = useState<undefined | boolean>(undefined);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [uploading, setUploading] = useState(false);


    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [audioURL, setAudioURL] = useState<undefined | string>(undefined); //for playing
    const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined); //for sending to api later

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [pending, startTransaction] = useTransition();
    const generateUploadUrl = useMutation(api.audio.generateUploadUrl);

    const [showAlertDialog, setShowAlertDialog] = useState(false);

    useEffect(() => {
        if (!audioBlob) return;

        audioRef.current = new Audio(audioURL);

        const stopPlaying = () => setIsPlaying(false);

        const setTime = () => {
            setCurrentTime(audioRef.current!.currentTime)
        }
        // const setDurationTime = (e: Event) => {
        //     console.log("metadata loaded", audioRef.current!.duration);
        //     setDuration(audioRef.current!.duration);
        // };

        if (audioRef && audioRef.current) {
            audioRef.current.addEventListener("ended", stopPlaying);
            audioRef.current.addEventListener("timeupdate", setTime);
            // audioRef.current.addEventListener('loadedmetadata', setDurationTime);
        }

        return () => {
            audioRef.current?.removeEventListener("ended", stopPlaying);
            audioRef.current?.removeEventListener("timeupdate", setTime);
            // audioRef.current?.removeEventListener('loadedmetadata', setDurationTime);
        }

    }, [audioURL, audioBlob])

    const playOrPuase = () => {
        if (!audioURL || !audioRef || !audioRef.current) return;

        if (!isPlaying) {
            audioRef.current?.play();
            timer.current = setInterval(() => {
                setDuration((prevSeconds) => {
                    if (prevSeconds == 0) {
                        clearInterval(timer.current);
                        return elapsedSeconds;
                    }
                    return prevSeconds - 1
                });
            }, 1000);
        }
        else {
            audioRef.current.pause();
            clearInterval(timer.current)
        }
        setIsPlaying(!isPlaying);
    };

    const startRecording = async () => {
        // stop recording if it it has already started and stop the timer
        if (isRecording && mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks in the stream
            setIsRecording(false);
            clearInterval(timer.current);
            timer.current = undefined;
            setDuration(elapsedSeconds);
            return;
        }
        if ("MediaRecorder" in window) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);

                setIsRecording(true);
                setAudioURL(undefined);

                setMediaRecorder(recorder as any);
                recorder.start();

                timer.current = setInterval(() => {
                    setElapsedSeconds((prevSeconds) => prevSeconds + 1);
                }, 1000);

                let audioChunks: any = [];
                recorder.ondataavailable = (e) => {
                    audioChunks.push(e.data);
                };

                recorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
                    setAudioBlob(audioBlob);
                };
            } catch (err) {
                console.log(err);
                setPermission(false);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const triggerProcessAudio = async () => {
        setShowAlertDialog(true);
        setUploading(true);
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": "audio/mp3" },
            body: audioBlob,
        });

        const { storageId } = await result.json();
        if (!storageId) return;
        setUploading(false);
        startTransaction(async () => {
            const planId = await processAudio(storageId);

            if (planId === null) {
                console.log("Error received from server action");
            }
        });
    };

    return {
        hasPermission: permission !== false,
        audioURL,
        playOrPuase,
        isPlaying,
        triggerProcessAudio,
        elapsedSeconds,
        startRecording,
        isRecording,
        currentTime,
        showAlertDialog,
        setShowAlertDialog,
        uploading,
        duration,
        // currentSliderValue: currentTime
    }
}

export default useAudio
