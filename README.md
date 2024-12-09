# ShopEase

A barcode-powered app that simulates shop billing systems

---

### Features
- Add/edit/delete your products in database
- Auto generate barcodes for your product
- Scan barcodes to checkout an item
- Ability to scan multiple items to generate a bill with total price

---

### Tech Stack
- **Frontend** -> Next.js
- **UI library** -> Shadcn/ui
-- **Backend** -> Next.js api/
-- **Database** -> Firebase (firestore)
-- **Authentication** -> Firebase Auth

---

### How barcodes work?
This app uses UPC-A barcodes. Here is the structure of a typical upc-a barcode:

Left guard, Manufacturer code, Middle guard, Product code, Right guard

- The guard are there to define the beginning, middle and end of barcode
- The Manufacturer and product code are used to uniquely identify products

- A barcode comprises of black and white lines placed together. 
- When a barcode scanner scans a black line, the black color absorbs most light and **very few is reflected back**, this is how the barcode scanner detects its "black"
- Similarly, when the scanner scans a white line, the white color **reflects back most of the light**, this is how the barcode scanner detects it is "white"

- black represents 1
- white represents 0

Hence, we get a list of 1s and 0s when we scan a barcode, this binary can be converted to give the manufacturer and product code using a lookup table. Similarly, we can also encode a manufacturer and product code into binary to form a barcode.