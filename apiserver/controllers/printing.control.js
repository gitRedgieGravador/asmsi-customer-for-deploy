
// var Result = require("../responses/result");
// var result = new Result();



class MySql {
    constructor() {
        let ThermalPrinter = require("node-thermal-printer").printer;
        let Types = require("node-thermal-printer").types;
        this.printer = new ThermalPrinter({
            type: Types.EPSON,  // 'star' or 'epson'
            interface: `Printer001`,//process.argv[2],
            driver: require("node-thermal-printer-driver"),
            // driver: require("printer"),
            options: {
                timeout: 1000
            },
            // width: 48,                         // Number of characters in one line - default: 48
            // characterSet: 'SLOVENIA',          // Character set - default: SLOVENIA
            removeSpecialCharacters: false,    // Removes special characters - default: false
            lineCharacter: "-",                // Use custom character for drawing lines - default: -
        });
    }
    async print(data, callback) {
        
        let isConnected = await this.printer.isPrinterConnected();
        console.log("Printer connected:", isConnected);

        this.printer.alignLeft();
        this.printer.newLine();
        this.printer.println("Hello World!");
        this.printer.drawLine();

        this.printer.upsideDown(true);
        this.printer.println("Hello World upside down!");
        this.printer.upsideDown(false);
        this.printer.drawLine();

        this.printer.invert(true);
        this.printer.println("Hello World inverted!");
        this.printer.invert(false);
        this.printer.drawLine();

        this.printer.alignLeft();
        this.printer.println("This text is on the left");
        this.printer.alignCenter();
        this.printer.println("This text is in the middle");
        this.printer.alignRight();
        this.printer.println("This text is on the right");
        this.printer.alignLeft();
        this.printer.drawLine();

        this.printer.setTextDoubleHeight();
        this.printer.println("This is double height");
        this.printer.setTextDoubleWidth();
        this.printer.println("This is double width");
        this.printer.setTextQuadArea();
        this.printer.println("This is quad");
        this.printer.setTextSize(7, 7);
        this.printer.println("Wow");
        this.printer.setTextSize(0, 0);
        this.printer.setTextNormal();
        this.printer.println("This is normal");
        this.printer.drawLine();

        this.printer.pdf417("4126565129008670807191");
        this.printer.printQR("https://olaii.com");

        this.printer.newLine();

        this.printer.leftRight("Left", "Right");

        this.printer.table(["One", "Two", "Three", "Four"]);

        this.printer.tableCustom([
            { text: "Left", align: "LEFT", width: 0.5 },
            { text: "Center", align: "CENTER", width: 0.25, bold: true },
            { text: "Right", align: "RIGHT", width: 0.25 }
        ]);

        this.printer.tableCustom([
            { text: "Left", align: "LEFT", cols: 8 },
            { text: "Center", align: "CENTER", cols: 10, bold: true },
            { text: "Right", align: "RIGHT", cols: 10 }
        ]);

        this.printer.cut();
        this.printer.openCashDrawer();

        try {
            let res = await this.printer.execute();
            console.log("Print success.", res);
            callback("Print success. " + res );
            
        } catch (error) {
            console.error("Print error:", error);
            callback("Print error:", error);
        }
    }
}

module.exports = MySql;