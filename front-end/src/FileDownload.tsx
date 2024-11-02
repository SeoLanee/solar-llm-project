import { MainLayout } from "@/main-layout";
import { useCallback } from "react";
import "@/index.css";
import "@/styles/font.css";
import "@/styles/reset.css";

function FileDownload() {

    const onClickImgLink = useCallback((srcUrl: string, name: string) => {
        fetch(srcUrl, { method: 'GET' }).then((res) => res.blob()).then((blob) => {
           const url = window.URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.href = url;
           a.download = name;
           document.body.appendChild(a);
           a.click();
           setTimeout((_) => {
           window.URL.revokeObjectURL(url);
           }, 1000);
           a.remove();
        }).catch((err) => {
           console.error('err', err);
        });
     }, []);

    return(
        <button
        style={{width: '100px', height: '100px', backgroundColor: 'grey'}}
        onClick={useCallback(() => {onClickImgLink('https://i.ibb.co/871H3fL/ss.jpg', 'test.png') }, [])}>
            Download Image
        </button>
    )

}

export default FileDownload;