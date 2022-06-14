---
path: '/blog/how-to-export-photoshop-images-at-custom-resolutions-using-javacript-scripting'
date: '1576569600000'
published: true
tags: ['JavaScript', 'Photoshop', 'Scripting']
title: 'How to export Photoshop images at custom resolutions using Adobe Photoshop Scripting and JavaScript'
---

### Goal

For a recent project, a goal was set to improve page load times on mobile devices. One quick win was to develop images at varying breakpoints and load the smallest viable image using `srcset` attributes on `<image>` tags instead of loading the same full-resolution image for all devices.

I thought exporting an image at specific breakpoint widths like `640px, 1024px, 1440px` using Photoshop would be quick and easy but Photoshop's `Export As` option only supports exporting at pre-defined scale multipliers like `0.3x, 1x, 2x` [Figure 1]. Additionally, even if Photoshop's `Export As` option supported specifying breakpoint widths, exporting dozens of images one-at-a-time would prove cumbersome.

![Photoshop Scale Options](/img/blog-posts/2019-17-12-how-to-export-photoshop/photoshop-resize-options.png 'Photoshop Scale Options')
_Figure 1. Photoshop Scale Options_

### Solution

Luckily, Adobe makes available a nifty scripting feature called Adobe Photoshop Scripting (<a href="https://helpx.adobe.com/photoshop/using/scripting.html" target="_blank" rel="noreferrer noopener">about article</a>, <a href="https://www.adobe.com/devnet/photoshop/scripting.html" target="_blank" rel="noreferrer noopener">documentation</a>) which supports scripting in AppleScript, JavaScript and VBScript. We can achieve resizing at various breakpoints using Photoshop Scripting! For this post, we will be using JavaScript, but this method would work across all scripting languages.

### Methodology

The methodology below, of copying and pasting a selection instead of the layer itself, allows the position of the image to be preserved when resizing. If the original layer was copied and resized, the image would be scaled based on its anchor point which is not always in the center and would result in a shifted image [Figure 2].

![photoshop-layer-offset-issue](/img/blog-posts/2019-17-12-how-to-export-photoshop/photoshop-layer-offset.png 'photoshop-layer-offset-issue')
_Figure 2_

### Script Walkthrough

**\*NOTE:** Creating this script took me a couple hours and is just one example solution; there are various ways to achieve resizing using scripting.

First, create your script file using the `.jsx` extension (i.e. `resize.jsx`) as recommended by Adobe. At the very top, we will start our script by creating a reference to the original Photoshop document. This enables us to reference it when our focus is on another document.

```
const docRef = app.activeDocument;
```

Set your desired unit and disable clipboard copying; all the work we are doing lives within Photoshop and does not need to be pasted elsewhere. This should help prevent your memory from blowing up.

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

Stepping into the `generateNewImage` function, calculate the new image size and resize the canvas based on the desired width.

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
    [0, 0],                        [0, docRef.height],
    [docRef.width, docRef.height], [docRef.width, 0],
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
  newDocument = documents.add(
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

Last, save the new image using the native Photoshop save command or save using the web implementation, close the document, and restore focus back to the original document.

```

function generateNewImage(layerRef, desiredSize) {
  ...


  // Save the image
  saveJpeg(documentName, {quality: 9}, '-native-9');

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

### Complete Script

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
  var resizePercent = (desiredSize / docRef.width) * 100;
  var width = Math.floor((docRef.width * resizePercent) / 100);
  var height = Math.floor((docRef.height * resizePercent) / 100);

  // Select the artboard so that we can propertly rescale the images
  docRef.selection.select([
    [0, 0],                        [0, docRef.height],
    [docRef.width, docRef.height], [docRef.width, 0],
  ]);

  // Copy the content
  docRef.selection.copy(true);

  // Create a new document
  var documentName = layerRef.name + '-' + width + 'w';
  newDocument = documents.add(
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
  saveJpeg(documentName, {quality: 9}, '-native-9');

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
