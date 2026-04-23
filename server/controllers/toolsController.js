const { PDFDocument } = require('pdf-lib');
const mammoth = require('mammoth');
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const User = require('../models/User');
const FileShare = require('../models/FileShare');
const crypto = require('crypto');

exports.mergePdf = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) return res.status(400).json({ message: 'Select at least 2 files' });

    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const bytes = await mergedPdf.save();
    const outputPath = path.join(__dirname, '../uploads', `merged_${Date.now()}.pdf`);
    await fs.writeFile(outputPath, bytes);

    // Update usage
    await User.findByIdAndUpdate(req.user.id, { $inc: { usageCount: 1 } });

    res.download(outputPath, (err) => {
      // Clean up temp files
      files.forEach(f => fs.remove(f.path));
      fs.remove(outputPath);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.pdfToWord = async (req, res) => {
  // Real implementation for production would use a more robust converter or API
  // Here we show extraction intent
  try {
    const file = req.file;
    const pdfBytes = await fs.readFile(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    
    // In a real scenario, you'd use a lib that can actually write docx from PDF layout
    // For this demonstration, we create a placeholder text-based docx representation
    const textContent = `FileOra Conversion Output\n\nPages: ${pages.length}\nSource: ${file.originalname}\n\n[Full Layout Conversion Engine Running...]`;
    
    const outputPath = path.join(__dirname, '../uploads', `converted_${Date.now()}.docx`);
    await fs.writeFile(outputPath, textContent);

    await User.findByIdAndUpdate(req.user.id, { $inc: { usageCount: 1 } });

    res.download(outputPath, () => {
      fs.remove(file.path);
      fs.remove(outputPath);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.imageToPdf = async (req, res) => {
  try {
    const files = req.files;
    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      const imgBytes = await fs.readFile(file.path);
      let img;
      if (file.mimetype === 'image/jpeg') img = await pdfDoc.embedJpg(imgBytes);
      else if (file.mimetype === 'image/png') img = await pdfDoc.embedPng(imgBytes);
      else continue;

      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const bytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, '../uploads', `images_${Date.now()}.pdf`);
    await fs.writeFile(outputPath, bytes);

    await User.findByIdAndUpdate(req.user.id, { $inc: { usageCount: 1 } });

    res.download(outputPath, () => {
      files.forEach(f => fs.remove(f.path));
      fs.remove(outputPath);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fixFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    let outputPath;
    const timestamp = Date.now();

    if (file.mimetype === 'application/pdf') {
      // PDF Optimization: For demo, we just reload and resave with linearize or just minimal bytes
      const pdfBytes = await fs.readFile(file.path);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const bytes = await pdfDoc.save({ useObjectStreams: true });
      outputPath = path.join(__dirname, '../uploads', `fixed_${timestamp}.pdf`);
      await fs.writeFile(outputPath, bytes);
    } else if (file.mimetype.startsWith('image/')) {
      // Image Optimization: Sharpen and compress
      outputPath = path.join(__dirname, '../uploads', `fixed_${timestamp}.jpg`);
      await sharp(file.path)
        .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
        .sharpen()
        .jpeg({ quality: 80 })
        .toFile(outputPath);
    }

    res.download(outputPath, () => {
      fs.remove(file.path);
      fs.remove(outputPath);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateShareLink = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const uniqueId = crypto.randomBytes(8).toString('hex');
    const persistentPath = path.join(__dirname, '../uploads/shared', `${uniqueId}${path.extname(file.originalname)}`);
    
    await fs.ensureDir(path.join(__dirname, '../uploads/shared'));
    await fs.copy(file.path, persistentPath);

    const share = new FileShare({
      uniqueId,
      originalName: file.originalname,
      filePath: persistentPath,
      mimeType: file.mimetype
    });
    await share.save();

    res.json({ 
      success: true, 
      shareLink: `fileora.app/f/${uniqueId}`,
      expiresAt: new Date(Date.now() + 86400000)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.chatWithFile = async (req, res) => {
  try {
    const { message, fileId } = req.body;
    // In a real app, you'd extract text from the fileId and send to LLM
    // Here we simulate AI response
    const responses = [
      "I've analyzed the document. It seems to be a contract regarding software services.",
      "The main points are: 1. Payment terms, 2. Liability clauses, 3. Termination rights.",
      "The document mentions a deadline of December 31st, 2026.",
      "I can summarize this in three bullet points if you like."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    res.json({ 
      role: 'assistant',
      content: randomResponse 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
