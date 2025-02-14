angular.module('resumeApp', []).controller('resumeController', function($scope) {
    $scope.downloadPDF = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const content = document.getElementById('resume-content');

        html2canvas(content).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            doc.save('resume.pdf');
        });
    };
});