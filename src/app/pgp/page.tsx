import QRCode from 'qrcode'
import Image from 'next/image';
import { encryptMessage } from '@/lib/encryption';



// const downloadFile = async (data: string, filename: string) => {
//     const blob = new Blob([data], { type: 'text/plain' });
//     return window.URL.createObjectURL(blob);
// } 



export default async function Page() {
    // console.log(message)
    return (
        <>  
            {/* <pre>{pgpMessageEncrypted}</pre> */}
            {/* <Image alt="QrCode" src={qrCode}/> */}
        </>
    )
}