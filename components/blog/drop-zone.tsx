"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useUploadFile } from '@/hooks/useUploadFile'
import { DbCollection } from '@/lib/config/collections'
import { ImagePlus, RemoveFormatting, RotateCcw } from 'lucide-react'


type Props = {
  [key: string]: any
}
export default function DropZone({ ...props }: Props) {

  const {isLoading, removeImage, uploadImage} = useUploadFile()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<any>()
  const [url, setUrl] = React.useState<string>('')
  const [mode, setMode] = React.useState<'none' | 'upload' | 'url'>('none')

  React.useEffect(() => {
    if (props.defaultValue) {
      setUrl(props.defaultValue);
    }
  }, [props.defaultValue]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const files = e.target.files
    const file = files && files[0]
    if (!file) return
    setFile(file)

    if(file) {
      const refId = new Date().getTime().toString()
      uploadImage(file, refId, DbCollection.BLOG_COVERS).then((url) => {
        setUrl(url)
        if(props.onChange) props.onChange(url)
      })
    }
  }

  const handleAddUrl = (e: React.ChangeEvent<HTMLInputElement>) => {

    const url: string = e.target.value

    if(url.length < 10) return
    if(url.includes('unsplash.com')) {
      const uri = url.split('?')[0]
      setUrl(uri)
      if(props.onChange) props.onChange(uri)
        
    }
  }

  const handleRemove = async () => {

    if(mode === 'upload' && url && file) {
      await removeImage(url)
    }
    setFile(null)
    setUrl('')
    setFile(null)
    setMode('none')
  }



  return (
    <div className='w-full max-h-44 h-44 bg-background relative text-foreground border-accent border-dotted border-4 flex flex-col gap-4 justify-center items-center sm:p-8 p-4 rounded-lg'>
      
      <Input {...inputRef} name="cover" id="cover" className='absolute hidden -z-40' value={url} {...props} />

      {
        isLoading && <span className='absolute left-0 backdrop-blur-md top-0 w-full h-full flex items-center justify-center z-10 bg-background/60 p-4 rounded-sm text-xl text-foreground text-center'>
          Loading<span className='animate-pulse text-3xl -mt-4'>...</span>
        </span>
      }

      {
        mode !== "none" && <span className='absolute top-2 flex items-center gap-1 right-2 z-10 bg-background p-1 rounded-sm text-xs font-bold text-destructive cursor-pointer' onClick={handleRemove}>
          <RotateCcw size={16} /> Reset
        </span>
      }

      {
        url && <div className='inset-0 absolute w-full h-full'>
          <Image src={url} alt="cover" priority width={1920} height={1020} className='h-full rounded-lg w-full aspect-video block object-cover' />
        </div>
      }
     
     
      {mode === "none" && <div className='flex space-x-4 my-6'>
        <Button onClick={() => setMode('upload')}>Upload</Button>
        <Button variant="outline" onClick={() => setMode('url')} >
          Add Url
        </Button>
      </div>}

      {mode === "upload" && url==='' && <div className='relative grid w-full h-full place-items-center'>
        <input type='file' accept="image/*" onChange={handleChange} className='absolute cursor-pointer w-full h-full z-30 opacity-0'/>
        <div className='flex items-center gap-2'>
          <ImagePlus size={42} className='block'/>
          <div>
            <h6 className='text-base text-foreground'>Upload a cover image</h6>
            <span className='text-sm block opacity-40 text-foreground'>Only images are supported</span>
          </div>
        </div>
      </div>}
      {mode === "url" && url==="" && <div className='relative flex-1 w-full'>
        <Label>Url </Label>
        <Input type='text' value={url} onChange={handleAddUrl} />
        <span className='text-xs block opacity-40 text-foreground'>Only Unsplash urls are supported</span>
      </div>}
    </div>
  )
}
