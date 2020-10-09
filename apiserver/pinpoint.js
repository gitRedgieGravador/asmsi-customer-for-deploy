const escpos = require('escpos');
// install escpos-usb adapter module manually
console.log("test")
// escpos.USB = require('escpos-usb');
// console.log("test")
// Select the adapter based on your printer type
const device  = new escpos.USB();
console.log("test")
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');
 
const options = { encoding: "GB18030" /* default */ }
console.log("test")
// encoding is optional
 
const printer = new escpos.Printer(device, options);
console.log("test")
 
device.open(function(error){
  printer
  .font('a')
  .align('ct')
  .style('bu')
  .size(1, 1)
  .text('The quick brown fox jumps over the lazy dog')
  .table(["One", "Two", "Three"])
  .tableCustom(
    [
      { text:"Left", align:"LEFT", width:0.33, style: 'B' },
      { text:"Center", align:"CENTER", width:0.33},
      { text:"Right", align:"RIGHT", width:0.33 }
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
});
console.log("last")