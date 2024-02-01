import React, { useRef } from 'react';

const FileInput = ({ onImageSelected }) => {
    const inputRef = useRef();

    // change handle
    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[ 0 ]);
            reader.onload = function (e) {
                onImageSelected(reader.result);
            }
        }
    }
    
    const onChooseImage = (e) => {
        e.preventDefault()
        inputRef.current.click();
    }

    return (
        <div className="">
            <input
                type='file'
                accept='image/*'
                ref={ inputRef }
                onChange={ handleOnChange }
                style={ { display: "none" } }
            />

            <button onClick={ onChooseImage }>
                Click Here to Upload Profile Image
            </button>
        </div>
    )
}

export default FileInput;