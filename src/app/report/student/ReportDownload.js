import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet, pdf, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    section: {
        flexGrow: 1
    }
});


export const ResumeContainer = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            {isClient && (
                <PDFDownloadLink document={
                    <MyDocument

                    />
                } fileName="resume.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download my resume')}
                </PDFDownloadLink>
            )}
        </>
    );
}
export const MyDocument = (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Hello World!</Text>
            </View>
            <View style={styles.section}>
                <Text>We're inside a PDF!</Text>
            </View>
        </Page>
    </Document>
);

// export const generatePdfDocument = async (documentData) => {
//     const blob = await pdf((
//         <MyDocument
//             title='My PDF'
//             pdfDocumentData={documentData}
//         />
//     )).toBlob();
//     saveAs(blob, 'report.pdf');
// };
