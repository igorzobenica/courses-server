const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

async function importCSV() {
  const results = [];
  const filePath = path.join(__dirname, 'technical_assignment_input_data.csv');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Remove BOM (Byte Order Mark)
    const cleanedData = data.replace(/^\uFEFF/, '');

    // Create a readable stream from the cleaned data
    const readableStream = require('stream').Readable.from(cleanedData);

    readableStream
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const record of results) {
          await prisma.course.create({
            data: {
              id: record.CourseId,
              instituteName: record.InstituteName,
              name: record.CourseName,
              category: record.Category,
              deliveryMethod: record.DeliveryMethod,
              location: record.Location,
              language: record.Language === 'NULL' ? null : record.Language,  // Handle NULL values
              startDate: new Date(record.StartDate),  // Convert to Date object
            },
          });
        }
        console.log('CSV data imported successfully');
        await prisma.$disconnect();
      });
  });
}

importCSV().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
