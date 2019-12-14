---
path: '/blog/xxxxx'
date: '1526454000000'
published: false
tags: ['JavaScript', 'Photoshop', 'Scripting']
title: 'How to xxx'
---

Photoshop only supports exporting images at preset intervals. I wanted to figure out how I can resize these images dyanmically using a custom set of image widths, primarily to be used in an `srcset` attribute in an `<image>` tag. Below are the blocks of logic and their explinations.

NOTE: This is meant to be a quick script but there are many ways to achieve this. Some scripts I saw copy and pasted layers into new documents but I noticed this would not correctly position the scaled image due to the anchor being in the center.......

Save a reference to the initial document so we can call it when we navigate away

```
const docRef = app.activeDocument;

```

Set your desired unit and disable clipboard copying since all the work we are doing lives within Photoshop and does not need to be pasted elsewhere. This should help prevent your memory from blowing up.

```
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.exportClipboard = false;
```

Grab all the layers in your photoshop file and set your desired resolutions widths

```
const layers = docRef.layers;
const resolutions = [320, 640, 1125, 1440, 1600, 1920, 2560];
```

Next, we will setup a loop which will iterate over each layer and generate that image at each resolution.

```
for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
  // Set a reference to the layer
  var layer = layers[layerIndex];

  // Toggle the layer as visible before copying it to the clipboard
  layer.visible = true;

  // Generate an image for each desired resolution
  for (var sizeIdx = 0; sizeIdx < resolutions.length; sizeIdx++) {
    var resolution = resolutions[sizeIdx];
    generateNewImage(layer, resolution);
  }

  // Bring to focus the original document
  app.activeDocument = docRef;

  // Reset the selection
  docRef.selection.deselect();

  // Toggle the layer as visiblity off to prepare for the next image
  layer.visible = false;
}
```

Stepping into the `generateNewImage` function, calcuate the new image size and resize the canvas based on the desired width.

```
function generateNewImage(layerRef, desiredSize) {

  // Calculate the new image size
  var resizePercent = (desiredSize / docRef.width) * 100;
  var width = Math.floor((docRef.width * resizePercent) / 100);
  var height = Math.floor((docRef.height * resizePercent) / 100);

  ...
}
```

Next, create a selection across the entire artboard, from top to bottom, right to left and then copy the content container within that selection.

```
function generateNewImage(layerRef, desiredSize) {
  ...

  // Select the artboard so that we can propertly rescale the images
  docRef.selection.select([
  [0, 0],
  [0, docRef.height],
  [docRef.width, docRef.height],
  [docRef.width, 0],
  ]);
  // Copy the content
  docRef.selection.copy(true);

  ...
}
```

Once the content has been selected, we will create a new document using the name of the layer and append the width as a suffix. NOTE: If you generate names in this manner, you must ensure unique layer names so that one does not overwrite the other.

```
function generateNewImage(layerRef, desiredSize) {
  ...

  // Create a new document
  var documentName = layerRef.name + '-' + width + 'w';
  newDoc = documents.add(
  docRef.width, // width
  docRef.height, // height
  300, // resolution
  documentName, // name
  NewDocumentMode.RGB, // mode
  DocumentFill.TRANSPARENT, // initialFill
  1, // pixelAspectRatio
  BitsPerChannelType.SIXTEEN // bitsPerChannel
  );

  ...
}
```

Upon creation of this document, shift focus to the new document, paste the image as a new layer.

```

function generateNewImage(layerRef, desiredSize) {
...

// Set the active document as the one we just made
app.activeDocument = newDocument;
// Paste the copied content
newDocument.paste();

...
}

```

Resize the canvas and the layer, setting the anchor position as the middle-center for both to ensure the content scales at the same rate as the canvas.

```

function generateNewImage(layerRef, desiredSize) {
...

// Resize the canvas
newDocument.resizeCanvas(width, height, AnchorPosition.MIDDLECENTER);
// Resize the layer
var newLayer = newDocument.layers[0];
newLayer.name = documentName;
newLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

...
}

```

Last, save the new image using the naitive Photoshop save command or save using the web implementation, close the document, and restore focus back to the original document.

```

function generateNewImage(layerRef, desiredSize) {
...

// Save the image
saveJpeg(documentName, {quality: 9}, '-naitive-9');

// Save the image for web
saveJpegForWeb(documentName, {quality: 68}, '-web-68');

// Close the document
newDocument.close(SaveOptions.DONOTSAVECHANGES);

// Restore focus back to the original document
app.activeDocument = docRef;
}

```

The save functions are quite simple and can be modified as you see fit

```

function saveJpeg(name, options, suffix) {
const doc = app.activeDocument;
const file = new File('~/Desktop/resized/' + name + suffix + '.jpg');

const saveOptions = new JPEGSaveOptions();
saveOptions.quality = options.quality;
saveOptions.embedColorProfile = true;

const asCopy = true;
doc.saveAs(file, saveOptions, asCopy, Extension.LOWERCASE);
}

function saveJpegForWeb(name, options, suffix) {
const doc = app.activeDocument;
const file = new File('~/Desktop/resized/' + name + suffix + '.jpg');

saveOptions = new ExportOptionsSaveForWeb();
saveOptions.format = SaveDocumentType.JPEG;
saveOptions.includeProfile = false;
saveOptions.interlaced = false;
saveOptions.optimized = true;
saveOptions.quality = options.quality;

doc.exportDocument(file, ExportType.SAVEFORWEB, saveOptions);
}

```

Once were all wrapped up, we iterate over all the layers one last time and restore their visibilities.

```

for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
// Set a reference to the layer
var layer = layers[layerIndex];
// Restore the layer visibility
layer.visible = true;
}

```

The completed script below

```

const docRef = app.activeDocument;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.exportClipboard = false;

const layers = docRef.layers;
const resolutions = [320, 640, 1125, 1440, 1600, 1920, 2560];

for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
// Set a reference to the layer
var layer = layers[layerIndex];

// Toggle the layer as visible before copying it to the clipboard
layer.visible = true;

// Generate an image for each desired resolution
for (var sizeIdx = 0; sizeIdx < resolutions.length; sizeIdx++) {
var resolution = resolutions[sizeIdx];
generateNewImage(layer, resolution);
}

// Bring to focus the original document
app.activeDocument = docRef;

// Reset the selection
docRef.selection.deselect();

// Toggle the layer as visiblity off to prepare for the next image
layer.visible = false;
}

for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
// Set a reference to the layer
var layer = layers[layerIndex];
// Restore the layer visibility
layer.visible = true;
}

function generateNewImage(layerRef, desiredSize) {
// Calculate the new image size
var resizePercent = (desiredSize / docRef.width) _ 100;
var width = Math.floor((docRef.width _ resizePercent) / 100);
var height = Math.floor((docRef.height \* resizePercent) / 100);

// Select the artboard so that we can propertly rescale the images
docRef.selection.select([
[0, 0],
[0, docRef.height],
[docRef.width, docRef.height],
[docRef.width, 0],
]);
// Copy the content
docRef.selection.copy(true);

// Create a new document
var documentName = layerRef.name + '-' + width + 'w';
newDoc = documents.add(
docRef.width, // width
docRef.height, // height
300, // resolution
documentName, // name
NewDocumentMode.RGB, // mode
DocumentFill.TRANSPARENT, // initialFill
1, // pixelAspectRatio
BitsPerChannelType.SIXTEEN // bitsPerChannel
);

// Set the active document as the one we just made
app.activeDocument = newDocument;
// Paste the copied content
newDocument.paste();

// Resize the canvas
newDocument.resizeCanvas(width, height, AnchorPosition.MIDDLECENTER);
// Resize the layer
var newLayer = newDocument.layers[0];
newLayer.name = documentName;
newLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

// Save the image
saveJpeg(documentName, {quality: 9}, '-naitive-9');

// Save the image for web
saveJpegForWeb(documentName, {quality: 68}, '-web-68');

// Close the document
newDocument.close(SaveOptions.DONOTSAVECHANGES);

// Restore focus back to the original document
app.activeDocument = docRef;
}

function saveJpeg(name, options, suffix) {
const doc = app.activeDocument;
const file = new File('~/Desktop/resized/' + name + suffix + '.jpg');

const saveOptions = new JPEGSaveOptions();
saveOptions.quality = options.quality;
saveOptions.embedColorProfile = true;

const asCopy = true;
doc.saveAs(file, saveOptions, asCopy, Extension.LOWERCASE);
}

function saveJpegForWeb(name, options, suffix) {
const doc = app.activeDocument;
const file = new File('~/Desktop/resized/' + name + suffix + '.jpg');

saveOptions = new ExportOptionsSaveForWeb();
saveOptions.format = SaveDocumentType.JPEG;
saveOptions.includeProfile = false;
saveOptions.interlaced = false;
saveOptions.optimized = true;
saveOptions.quality = options.quality;

doc.exportDocument(file, ExportType.SAVEFORWEB, saveOptions);
}

```
