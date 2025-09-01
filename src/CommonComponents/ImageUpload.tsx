import React from 'react'
import { toast } from 'react-toastify';

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  width: string
  height: string
  setGeneric?: React.Dispatch<React.SetStateAction<number>>
}

// Component to handle all image uploads
const ImageUpload = ({setFile, width, height, setGeneric} : Props) => {

  // Check if new file has been uploaded
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setGeneric) setGeneric(0);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid File Type: Use a png or jpeg')
      return;
    }
    setFile(file)
  };


  return (
     <div style={{
        width: `${width}px`,
        height: `${height}px`
      }} className={`border-[#6C16E9] border-2 border-dashed flex justify-center items-center rounded-2xl relative`}>
          <input id='file' className='hidden' type="file" onChange={handleChange} />
          <label htmlFor="file" className='w-full h-full'>
            <svg  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_5718)">
            <path d="M12 21C12 21.553 11.552 22 11 22H5C2.243 22 0 19.757 0 17V5C0 2.243 2.243 0 5 0H17C19.757 0 22 2.243 22 5V11C22 11.553 21.552 12 21 12C20.448 12 20 11.553 20 11V5C20 3.346 18.654 2 17 2H5C3.346 2 2 3.346 2 5V11.959L4.808 9.151C6.34 7.618 8.833 7.618 10.366 9.151L15.707 14.492C16.098 14.883 16.098 15.515 15.707 15.906C15.512 16.101 15.256 16.199 15 16.199C14.744 16.199 14.488 16.101 14.293 15.906L8.952 10.565C8.2 9.814 6.976 9.813 6.222 10.565L2 14.787V17C2 18.654 3.346 20 5 20H11C11.552 20 12 20.447 12 21ZM15 3.5C16.654 3.5 18 4.846 18 6.5C18 8.154 16.654 9.5 15 9.5C13.346 9.5 12 8.154 12 6.5C12 4.846 13.346 3.5 15 3.5ZM15 5.5C14.449 5.5 14 5.948 14 6.5C14 7.052 14.449 7.5 15 7.5C15.551 7.5 16 7.052 16 6.5C16 5.948 15.551 5.5 15 5.5ZM23 18H20V15C20 14.447 19.552 14 19 14C18.448 14 18 14.447 18 15V18H15C14.448 18 14 18.447 14 19C14 19.553 14.448 20 15 20H18V23C18 23.553 18.448 24 19 24C19.552 24 20 23.553 20 23V20H23C23.552 20 24 19.553 24 19C24 18.447 23.552 18 23 18Z" fill="#6C16E9"/>
            </g>
            <defs>
            <clipPath id="clip0_1_5718">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg>
          </label>
        </div>
  )
}

export default ImageUpload