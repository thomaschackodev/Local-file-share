# Local File Share

A simple Node.js web app for sharing files between devices on the same Wi-Fi network — no cloud, no cables, no USB drives. Upload a file, get a download link and QR code, and open it on any other device connected to the same network.

## Features

- Upload any file from one device
- Generates a shareable download link
- Generates a QR code for quick scanning on another device
- Preserves original file extensions
- Simple, styled UI

## How It Works

1. Run the server on your computer
2. Open the web page and upload a file
3. A link and QR code are generated
4. Open the link (or scan the QR code) on another device connected to the same Wi-Fi
5. The file downloads automatically

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) installed on your computer

###Installation
1. Clone this repository

- git clone https://github.com/thomaschackodev/Local-file-share.git

cd Local-file-share

2. Install dependencies
npm install

3. Find your computer's local IPv4 address
   - Windows: run `ipconfig` in Command Prompt
   - Mac/Linux: run `ifconfig` or `ip a`

4. Update `computerIp` in `server.js` with your address:
```js
   const computerIp = "YOUR_LOCAL_IP_HERE";
```

5. Start the server
node server.js

6. Open `http://localhost:3000` in your browser

## Notes

- Both devices must be connected to the same Wi-Fi network
- If the link doesn't work on another device, check that your firewall allows Node.js on private networks
- Your local IP address may change if you reconnect to Wi-Fi or restart your router

## Built With

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Multer](https://github.com/expressjs/multer) — file upload handling
- [qrcode](https://www.npmjs.com/package/qrcode) — QR code generation    
