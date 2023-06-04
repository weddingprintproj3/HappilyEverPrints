import React, { useEffect } from 'react';
import { fabric } from 'fabric';


const DesignCanvas = () => {
    let canvas;

    useEffect(() => {
        canvas = new fabric.Canvas('canva', { width: 429, height: 600 });

        fabric.Object.prototype.transparentCorners = false;

        const text = new fabric.Textbox('Lorum ipsum dolor sit amet', {
            left: 50,
            top: 50,
            width: 150,
            fontSize: 20,
        });

        canvas.add(text);

    }, []);

    const changeBackgroundImage = (imageUrl) => {
        fabric.Image.fromURL(imageUrl, (img) => {
            const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        img.set({
            scaleX,
            scaleY,
            originX: 'left',
            originY: 'top'
        });

            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top'
            });
        });
    };

    const changeFont = (fontFamily) => {
        // example of changing selected text font
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set({ fontFamily });
            canvas.requestRenderAll();
        }
    };

    return (
        <div>
            <canvas id="canva" />
            <button onClick={() => changeBackgroundImage('/images/White-Green-Watercolor-Floral-Border-Wedding-Invitation-no-text.png')}>Image 1</button>
            <button onClick={() => changeBackgroundImage('/images/Beige-Elegance-Wedding-Invitation-no-text.png')}>Image 2</button>
            <button onClick={() => changeFont('Courier New')}>Change font to Courier New</button>
        </div>
    );
};

export default DesignCanvas;