import React, { useEffect, useRef } from "react";
import { SortDirection } from "react-virtualized";

const PALLETE = ['#fff', '#E4B251', '#7BF5BB', '#E98686', '#616161'];

const CustomDoughnutChart = ({data, bgColor=null}) => {

    const canvasRef = useRef(null);
    const arcRef = useRef(null);

    const drawFrame = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const size = 320;
        const fixedRatio = 2;
        window.devicePixelRatio=fixedRatio;
        const dpr = window.devicePixelRatio;

        const cw = Math.floor(size * dpr);
        const ch = Math.floor(size * dpr);
        const ax = cw/4;
        const ay = ch/4;
        const radius = 75;

        canvas.style.position ='relative';
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        canvas.style.margin = '0 auto';

        canvas.width = cw;
        canvas.height = ch;

        ctx.scale(dpr, dpr);

        ctx.fillStyle= bgColor || 'transparent';
        ctx.fillRect(0, 0, cw, ch);

        ctx.fillStyle='#fff';
        ctx.textAlign = 'center';
        ctx.font = "16.5px 'NotoSans KR', sans-serif";
        ctx.fillText(data.title, ax, 50);
        ctx.font = "14.5px 'NotoSans KR', sans-serif";
        ctx.fillText(data.chartTitle.main, ax, ay-4);
        ctx.fillText(data.chartTitle.sub, ax, ay+14);

        data.customLabels.forEach((label, idx) => {
            const x = (idx%2 > 0)? ax-85 : ax+40;
            const y = (ay + 110) + (idx<2?0 : 1)*25;

            ctx.beginPath();
            ctx.arc(x-10, y-5, 4, 0, Math.PI * 2);
            ctx.fillStyle = label.color;
            ctx.fill();

            ctx.fillStyle='#fff';
            ctx.textAlign = 'left';
            ctx.font = "14px 'NotoSans KR', sans-serif";
            ctx.fillText(label.text, x, y);
        });

        const customOffset = (1.5 * Math.PI);
        const customAngle = (angle) => angle + customOffset;
        const drawArc = (angle, idx) => {    

            ctx.strokeStyle = PALLETE[idx];
            ctx.beginPath();
            ctx.arc(ax, ay, radius-(idx * 9.5), customOffset, customAngle(angle));
            ctx.lineWidth = 6.5;
            ctx.lineCap = 'round';
            ctx.stroke();
        };
        const TOTAL = data.customDataset[0];
        // data.customDataset.forEach((value, idx) => {
        //     const angle = (value / TOTAL)*(Math.PI * 2);
        //     drawArc(angle, idx);
        // });
    };

    const drawArcs = () => {
        const arcCanvas = arcRef.current;
        const ctx = arcCanvas.getContext('2d');

        const cw = 300;
        const ch = 300;
        const ax = cw/2;
        const ay = ch/2;
        const radius = 75;
        arcCanvas.style.position = 'absolute';
        arcCanvas.style.top = '50%';
        arcCanvas.style.left = '50%';
        arcCanvas.style.transform = 'translate(-50%, -50%)';
        arcCanvas.style.width = cw;
        arcCanvas.style.height = ch;

        arcCanvas.width = cw;
        arcCanvas.height = ch;

        const customOffset = (1.5 * Math.PI);
        const customAngle = (angle) => angle + customOffset;
        const drawArc = (angle, idx) => { 
            ctx.strokeStyle = idx < 0 ? 'rgba(255,255,255,.3)' : PALLETE[idx];
            ctx.beginPath();
            ctx.arc(ax, ay, radius-(idx * 9.5), customOffset, customAngle(angle));
            ctx.lineWidth = 6.5;
            ctx.lineCap = 'round';
            ctx.stroke();
        };

        const TOTAL = data.customDataset[0];
        if(TOTAL > 0) {
            data.customDataset.forEach((value, idx) => {
                const angle = (value / TOTAL)*(Math.PI * 2);
                drawArc(angle, idx);
            });
        } else {
            drawArc((Math.PI * 2), -1);
        }
    };

    useEffect(() => {
        drawFrame();
        drawArcs();
    }, []);

    return (    
        <div style={{ 
            position: 'relative',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', 
            backgroundColor: bgColor? 'transparent' : '#001F60',
        }}>
            <canvas ref={ canvasRef } />
            <canvas ref={ arcRef } />
        </div>
    )
};

export default CustomDoughnutChart