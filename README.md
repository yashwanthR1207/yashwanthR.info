# Yashwanth Info Website

This is the personal website/portfolio of Yashwanth.

## 🚀 Live Site

The website is currently deployed and hosted on Firebase. You can view the live version here:  
👉 **[https://yashwanthr.web.app](https://yashwanthr.web.app)**

## 📁 Project Structure

This repository is organized to keep the root directory clean. 
- **`/public`**: Contains all the actual website source code (HTML, CSS, JS, Images). This is what gets deployed to the public internet.
- **`firebase.json` & `.firebaserc`**: Configuration files used by Firebase to deploy the website.
- **`.gitignore`**: Tells git which files to ignore (like cache and debug logs).

## 💻 How to Deploy Updates

If you make any changes to the code inside the `/public` folder, you can push those updates to the live website instantly by opening your terminal in this folder and running:

```bash
npx firebase-tools deploy
```

*(Note: You must be logged into Firebase CLI for this to work).*
