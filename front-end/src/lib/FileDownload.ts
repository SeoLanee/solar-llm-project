import { useCallback } from "react";
import "@/index.css";
import "@/styles/font.css";
import "@/styles/reset.css";


export const onClickImgLink = useCallback((srcUrl: string, name: string) => {
    srcUrl = "https://i.ibb.co/871H3fL/ss.jpg";
    name = "test.png";
    fetch(srcUrl, { method: 'GET' }).then((res) => res.blob()).then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout((_:any) => {
        window.URL.revokeObjectURL(url);
        }, 1000);
        a.remove();
    }).catch((err) => {
        console.error('err', err);
    });
}, []);
