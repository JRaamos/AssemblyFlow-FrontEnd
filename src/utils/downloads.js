
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const convertToCSV = (columns, rows) => {
    const header = columns.map(column => column.title).join(",");
    const csvRows = rows.map(row => {
        return columns.map(column => row[column.ref] || "").join(",");
    });

    return [header, ...csvRows].join("\n");
};

export const downloadCSV = (columns, rows) => {
    const csvContent = convertToCSV(columns, rows);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tabela.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const loadFontAsBinary = async  (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const binaryString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    return binaryString
}

export const downloadAsPDF = (target, fname) => {
    // setOpenToPrint(true)
    setTimeout(() => { 
        const div = document.getElementById(target); 

        console.log("div", div, target)
        
        const divHeight = div.offsetHeight
        const divWidth = div.offsetWidth

        toPng(div)
            .then( (dataUrl) => { 
                const img = new Image();
                img.src = dataUrl;
                img.onload = async () => {

                    const dcanvas = document.createElement("div");
                    dcanvas.id = "reportCanvas"
                    document.body.append(dcanvas)
                    const canvasDiv = document.getElementById("reportCanvas");

                    const canvas = document.createElement("canvas");
                    
                    canvas.id = "canvasPrint"
                    canvas.width = divWidth
                    canvas.height = divHeight
                    const ctx = canvas.getContext("2d");

                    canvasDiv.append(canvas)

                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, divWidth, divHeight);
                    const pdf = new jsPDF({
                        orientation: "landscape",
                        // unit: "in",
                        format: [divWidth, divHeight]
                    });

                    const myFont = await loadFontAsBinary('https://fonts.googleapis.com/css2?family=Poppins&display=swap')

                    pdf.addFileToVFS("Poppins.ttf", myFont);
                    pdf.addFont("Poppins.ttf", "Poppins", "normal");
                    pdf.setFont("Poppins");

                    const myFont2 = await loadFontAsBinary('https://fonts.googleapis.com/css2?family=Roboto&display=swap')

                    pdf.addFileToVFS("Roboto.ttf", myFont2);
                    pdf.addFont("Roboto.ttf", "Roboto", "normal");
                    pdf.setFont("Roboto");

                    pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0, divWidth, divHeight);
                    pdf.save(`${fname}.pdf`);
                };

                setTimeout(() => {
                    const canvasPrintDiv = document.getElementById("canvasPrint");
                    canvasPrintDiv.parentNode.removeChild(canvasPrintDiv)
                    const canvasPrintParentDiv = document.getElementById("reportCanvas");
                    document.body.removeChild(canvasPrintParentDiv)
                    // div.style.fontSize = "14px;"
                    // setOpenToPrint(false)
                }, 1)

            }).catch((error) => {
                console.error('Error:', error);
            });
    }, 100  )
}