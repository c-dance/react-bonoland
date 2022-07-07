import React, { useEffect, useRef } from "react";

const PALLETE = ['#fff', '#E4B251', '#7BF5BB', '#E98686', '#616161'];


const CustomDoughnutChart = ({data}) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const cw = 360;
        const ch = 400;
        canvas.width = cw;
        canvas.height = ch;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle= '#001F60';
        ctx.fillRect(0, 0, 360, 360);

        ctx.fillStyle='#fff';
        ctx.textAlign = 'center';
        ctx.font = "16px 'NotoSans KR', sans-serif";
        ctx.fillText(data.title, cw/2, 40);
        ctx.font = "14px 'NotoSans KR', sans-serif";
        ctx.fillText(data.chartTitle.main, cw/2, 170);
        ctx.fillText(data.chartTitle.sub, cw/2, 190);


        const TOTAL = data.customDataset[0];
        data.customDataset.forEach((value, idx) => {
            const angle = (value / TOTAL)*(Math.PI * 2);
            const customAngle = angle + (1.5 * Math.PI);

            const drawArc = (point) => {
                ctx.strokeStyle = PALLETE[idx];
                ctx.beginPath();
                // ctx.arc(180, 180, 80-(idx * 10), 1.5 * Math.PI, point);
                ctx.arc(180, 180, 80-(idx * 10), 0, point);
                ctx.lineWidth = 7;
                ctx.lineCap = 'round';
                ctx.stroke();
            };

            console.log(customAngle);
            drawArc(angle);
        });

        data.customLabels.forEach((label, idx) => {
            const x = (idx%2 > 0)? 90 :  210;
            const y = 300 + (idx<2?0 : 1)*30;

            ctx.beginPath();
            ctx.arc(x-14, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = label.color;
            ctx.fill();

            ctx.fillStyle='#fff';
            ctx.textAlign = 'left';
            ctx.font = "14px 'NotoSans KR', sans-serif";
            ctx.fillText(label.text, x, y+5);
        });

        
    }, []);

    return <canvas ref={ canvasRef } />
};

export default CustomDoughnutChart