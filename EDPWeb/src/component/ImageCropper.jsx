import React, { useState } from "react";
import Cropper from "react-easy-crop";

export const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRation] = useState(1 / 1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    return (
        <div className="h-fit">
            <Cropper
                image={image}
                aspect={aspectRatio}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                    containerStyle: {
                        width: "30%",
                        height: "38%",
                        backgroundColor: "#fff",
                    },
                }}
            />

            <div className="space-x-2">
                Profile Image
                <br />
                <button
                    className="px-3 py-2 text-center bg-red-400"
                    onClick={onCropCancel}
                >
                    Cancel
                </button>
                <button
                    className="px-3 py-2 text-center bg-blue-400"
                    onClick={() => {
                        onCropDone(croppedArea);
                    }}
                >
                    Crop & Apply
                </button>
            </div>
        </div>
    );
};

export default ImageCropper;
