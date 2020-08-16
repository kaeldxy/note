
const zipImgPromise = imgFile => new Promise(r => {
    const img = new Image()
    const maxWidth = 2000
    const maxHeight = 2000

    img.src = getFileURL(imgFile)

    img.onload = () => {
        const orginWidth = img.width
        const orginHeight = img.height

        if (orginWidth > maxWidth || orginHeight > orginHeight) {
            let targetWidth, targetHeight
            if (orginWidth / orginHeight > 1) {
                targetWidth = maxWidth
                targetHeight = Math.round(maxWidth * (orginHeight / orginWidth))
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (orginWidth / orginHeight))
            }
            const canvas = document.createElement('canvas')
            canvas.width = targetWidth
            canvas.height = targetHeight

            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, targetWidth, targetHeight)

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
            
            canvas.toBlob(blob => r(blob))
        } else {
            r(imgFile)
        }
    }
})
