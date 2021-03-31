const toPreview = (files) => {
    return Object.keys(files).map(i => {
        return {
            previewSrc:URL.createObjectURL(files[i]),
            originalName:files[i].name
        }
    })
}

export default toPreview