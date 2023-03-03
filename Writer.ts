const writeText = (canvas: HTMLCanvasElement, text: string, font: string, color: string, startPosition: { x: number, y: number }, time:number):void => {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const loop = (lastTimeStamp: number, totalTime: number, currentTime: number): void => {
        if(lastTimeStamp == 0) {
            return requestAnimationFrame(loop.bind(null, currentTime, totalTime)) as unknown as void;
        }

        const deltaTime = (currentTime - lastTimeStamp);

        if(totalTime > time) {
            return;
        }

        const amountToDraw = Math.floor((totalTime + deltaTime) / (time / text.length));
        const fillStyle = ctx.fillStyle;
        const font1 = ctx.font;
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.fillText(text.substring(0, amountToDraw > text.length? text.length: amountToDraw), startPosition.x, startPosition.y);
        ctx.font = font1;
        ctx.fillStyle = fillStyle;
        requestAnimationFrame(loop.bind(null, currentTime, totalTime + deltaTime));
    }

    requestAnimationFrame(loop.bind(null, 0, 0));
}

export { writeText };