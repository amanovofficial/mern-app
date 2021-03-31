import classes from "./imageGallery.module.css";
const imageGallery = ({ images, handleOnDelete, preview }) => {
    return (<div className={classes.imgContainer}>
        {
            images ?
                images.map((img,index) => {
                    const imgSrc = preview ? img.previewSrc : `/${img}`
                    const filename = preview ? img.originalName : img
                    return (
                        <div key={index} className={classes.Card}>
                            <img className={classes.img} src={imgSrc} alt={imgSrc} />
                            <button
                                onClick={handleOnDelete}
                                data-filename={filename} type='button'
                                className={classes.deleteBtn}
                            >
                                Удалить
                            </button>
                        </div>
                    )
                })
                : null
        }
    </div>
    )
}

export default imageGallery