import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

function getCroppedImg(imageSrc, pixelCrop) {
  const canvas = document.createElement("canvas");
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = "cropped.jpeg";
        const fileUrl = URL.createObjectURL(blob);
        resolve({ blob, fileUrl });
      }, "image/jpeg");
    };
    image.onerror = (error) => reject(error);
  });
}

const UseCrop = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    try {
      const { blob, fileUrl } = await getCroppedImg(image, croppedAreaPixels);
      onCropDone(blob);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4">
      <div className="relative w-[900px] h-[900px] bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-between">
        <div className="relative flex-1">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        
        {/* Slider Zoom */}
        <div className="p-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Zoom</label>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-4">
          <Button variant="outline" onClick={onCropCancel}>
            Cancel
          </Button>
          <Button onClick={handleDone}>Done</Button>
        </div>
      </div>
    </div>
  );
};

export default UseCrop;
