import{t as e}from"./index-CUqiFNbr.js";import{t}from"./lib-t3kAbS33.js";var n=e(),r={path:`/blog/how-to-export-photoshop-images-at-custom-resolutions-using-scripting`,date:`1576569600000`,published:!0,tags:[`JavaScript`,`Photoshop`,`Scripting`],title:`How to export Photoshop images at custom resolutions using Adobe Photoshop Scripting and JavaScript`};function i(e){let r={a:`a`,code:`code`,em:`em`,h3:`h3`,img:`img`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.h3,{id:`goal`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#goal`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Goal`]}),`
`,(0,n.jsxs)(r.p,{children:[`For a recent project, a goal was set to improve page load times on mobile devices. One quick win was to develop images at varying breakpoints and load the smallest viable image using `,(0,n.jsx)(r.code,{children:`srcset`}),` attributes on `,(0,n.jsx)(r.code,{children:`<image>`}),` tags instead of loading the same full-resolution image for all devices.`]}),`
`,(0,n.jsxs)(r.p,{children:[`I thought exporting an image at specific breakpoint widths like `,(0,n.jsx)(r.code,{children:`640px, 1024px, 1440px`}),` using Photoshop would be quick and easy but Photoshop's `,(0,n.jsx)(r.code,{children:`Export As`}),` option only supports exporting at pre-defined scale multipliers like `,(0,n.jsx)(r.code,{children:`0.3x, 1x, 2x`}),` [Figure 1]. Additionally, even if Photoshop's `,(0,n.jsx)(r.code,{children:`Export As`}),` option supported specifying breakpoint widths, exporting dozens of images one-at-a-time would prove cumbersome.`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2019-17-12-how-to-export-photoshop/photoshop-resize-options.png`,alt:`Photoshop Scale Options`,title:`Photoshop Scale Options`}),`
`,(0,n.jsx)(r.em,{children:`Figure 1. Photoshop Scale Options`})]}),`
`,(0,n.jsxs)(r.h3,{id:`solution`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#solution`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Solution`]}),`
`,(0,n.jsxs)(r.p,{children:[`Luckily, Adobe makes available a nifty scripting feature called Adobe Photoshop Scripting (`,(0,n.jsx)(`a`,{href:`https://helpx.adobe.com/photoshop/using/scripting.html`,target:`_blank`,rel:`noreferrer noopener`,children:`about article`}),`, `,(0,n.jsx)(`a`,{href:`https://www.adobe.com/devnet/photoshop/scripting.html`,target:`_blank`,rel:`noreferrer noopener`,children:`documentation`}),`) which supports scripting in AppleScript, JavaScript and VBScript. We can achieve resizing at various breakpoints using Photoshop Scripting! For this post, we will be using JavaScript, but this method would work across all scripting languages.`]}),`
`,(0,n.jsxs)(r.h3,{id:`methodology`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#methodology`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Methodology`]}),`
`,(0,n.jsx)(r.p,{children:`The methodology below, of copying and pasting a selection instead of the layer itself, allows the position of the image to be preserved when resizing. If the original layer was copied and resized, the image would be scaled based on its anchor point which is not always in the center and would result in a shifted image [Figure 2].`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2019-17-12-how-to-export-photoshop/photoshop-layer-offset.png`,alt:`photoshop-layer-offset-issue`,title:`photoshop-layer-offset-issue`}),`
`,(0,n.jsx)(r.em,{children:`Figure 2`})]}),`
`,(0,n.jsxs)(r.h3,{id:`script-walkthrough`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#script-walkthrough`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Script Walkthrough`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`*NOTE:`}),` Creating this script took me a couple hours and is just one example solution; there are various ways to achieve resizing using scripting.`]}),`
`,(0,n.jsxs)(r.p,{children:[`First, create your script file using the `,(0,n.jsx)(r.code,{children:`.jsx`}),` extension (i.e. `,(0,n.jsx)(r.code,{children:`resize.jsx`}),`) as recommended by Adobe. At the very top, we will start our script by creating a reference to the original Photoshop document. This enables us to reference it when our focus is on another document.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`const docRef = app.activeDocument;
`})}),`
`,(0,n.jsx)(r.p,{children:`Set your desired unit and disable clipboard copying; all the work we are doing lives within Photoshop and does not need to be pasted elsewhere. This should help prevent your memory from blowing up.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`app.preferences.rulerUnits = Units.PIXELS;
app.preferences.exportClipboard = false;
`})}),`
`,(0,n.jsx)(r.p,{children:`Grab all the layers in your photoshop file and set your desired resolutions widths`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`const layers = docRef.layers;
const resolutions = [320, 640, 1125, 1440, 1600, 1920, 2560];
`})}),`
`,(0,n.jsx)(r.p,{children:`Next, we will setup a loop which will iterate over each layer and generate that image at each resolution.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
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
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Stepping into the `,(0,n.jsx)(r.code,{children:`generateNewImage`}),` function, calculate the new image size and resize the canvas based on the desired width.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`function generateNewImage(layerRef, desiredSize) {
  // Calculate the new image size
  var resizePercent = (desiredSize / docRef.width) * 100;
  var width = Math.floor((docRef.width * resizePercent) / 100);
  var height = Math.floor((docRef.height * resizePercent) / 100);

  ...
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Next, create a selection across the entire artboard, from top to bottom, right to left and then copy the content container within that selection.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`function generateNewImage(layerRef, desiredSize) {
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
`})}),`
`,(0,n.jsx)(r.p,{children:`Once the content has been selected, we will create a new document using the name of the layer and append the width as a suffix. NOTE: If you generate names in this manner, you must ensure unique layer names so that one does not overwrite the other.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`function generateNewImage(layerRef, desiredSize) {
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
`})}),`
`,(0,n.jsx)(r.p,{children:`Upon creation of this document, shift focus to the new document, paste the image as a new layer.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`
function generateNewImage(layerRef, desiredSize) {
  ...

  // Set the active document as the one we just made
  app.activeDocument = newDocument;
  // Paste the copied content
  newDocument.paste();

  ...
}

`})}),`
`,(0,n.jsx)(r.p,{children:`Resize the canvas and the layer, setting the anchor position as the middle-center for both to ensure the content scales at the same rate as the canvas.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`
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

`})}),`
`,(0,n.jsx)(r.p,{children:`Last, save the new image using the native Photoshop save command or save using the web implementation, close the document, and restore focus back to the original document.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`
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

`})}),`
`,(0,n.jsx)(r.p,{children:`The save functions are quite simple and can be modified as you see fit`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`
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

`})}),`
`,(0,n.jsx)(r.p,{children:`Once were all wrapped up, we iterate over all the layers one last time and restore their visibilities.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`
for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
  // Set a reference to the layer
  var layer = layers[layerIndex];
  // Restore the layer visibility
  layer.visible = true;
}

`})}),`
`,(0,n.jsxs)(r.h3,{id:`complete-script`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#complete-script`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Complete Script`]}),`
`,(0,n.jsx)(r.p,{children:`The completed script below`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`const docRef = app.activeDocument;
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
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};