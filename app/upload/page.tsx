'use client';

import React, { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState('');
  return (
    <>
      {publicId && <CldImage src={publicId} width={270} height={180} alt='' />}
      <CldUploadWidget
        uploadPreset='x0bre84l'
        options={{ maxImageFileSize: 1000000 }}
        onSuccess={(result, widget) => {
          if (result.event !== 'success') {
            return;
          }
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} className='btn btn-primary'>
              Upload
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
