import { storage } from '@/lib/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import React from 'react';


export const useUploadFile = () => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const uploadImage = async (file: File, refId: string, reference: string) => {
        setIsLoading(true);
        const storageRef = ref(storage, `${reference}/${refId}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        setIsLoading(false);
        return await getDownloadURL(uploadTask.ref);
    }

    const removeImage = async (referenceUrl: string) => {
        try {
            setIsLoading(true);
            const decodedUrl = decodeURIComponent(referenceUrl);
            const pathStartIndex = decodedUrl.indexOf("/o/") + 3;
            const pathEndIndex = decodedUrl.indexOf("?alt=media");
            const path = decodedUrl.slice(pathStartIndex, pathEndIndex);

            const fileRef = ref(storage, path);

            await deleteObject(fileRef);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            throw new Error(error);
        }
    }

    return { uploadImage, removeImage, isLoading }
}