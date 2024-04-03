import { storage } from '@/lib/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


export const useUploadFile = () => {

    const uploadImage = async (file: File, refId: string, reference: string) => {
        const storageRef = ref(storage, `${reference}/${refId}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        return await getDownloadURL(uploadTask.ref);
    }

    const removeImage = async (referenceUrl: string) => {

        try {
            const decodedUrl = decodeURIComponent(referenceUrl);
            const pathStartIndex = decodedUrl.indexOf("/o/") + 3;
            const pathEndIndex = decodedUrl.indexOf("?alt=media");
            const path = decodedUrl.slice(pathStartIndex, pathEndIndex);

            const fileRef = ref(storage, path);

            await deleteObject(fileRef);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return { uploadImage, removeImage }
}