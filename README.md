# AminoOptimizer

An Expo (React Native) app. Run it on your phone using **Expo Go**.

## Prerequisites

- **Node.js** (v18 or newer recommended; [nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js)
- **Expo Go** on your phone:
  - [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)
  - [Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Setup and run

### 1. Clone the repository

```bash
git clone <repository-url>
cd AminoOptimizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

A `.env` file with Supabase credentials is included in the repo. After cloning, you don't need to create one—the app will use it automatically.

If you want to use your own Supabase project instead, create or edit `.env` in the project root:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```


### 4. Start the development server

```bash
npx expo start
```

A QR code will appear in the terminal (and often in the browser).

### 5. Open the app in Expo Go

- **iPhone:** Open the **Camera** app and scan the QR code, then tap the banner to open in Expo Go.
- **Android:** Open the **Expo Go** app and tap **“Scan QR code”**, then scan the QR code from the terminal or browser.

**Important:** Your phone and your computer must be on the **same Wi‑Fi network**. If the QR code doesn’t work, try “Tunnel” mode: press `s` in the terminal to switch connection type, or run:

```bash
npx expo start --tunnel
```

(Tunnel may require installing `@expo/ngrok` when prompted.)

## Scripts

| Command              | Description                    |
|----------------------|--------------------------------|
| `npm start`          | Start Expo (same as above)     |
| `npx expo start --ios`   | Start and open iOS simulator (Mac only) |
| `npx expo start --android` | Start and open Android emulator   |
| `npx expo start --web`   | Run in the browser             |

## Troubleshooting

- **“Unable to resolve module” or similar:** Run `npm install` again and then `npx expo start`.
- **QR code doesn’t connect:** Use the same Wi‑Fi for phone and computer, or try `npx expo start --tunnel`.
- **Expo Go asks to update:** Update Expo Go in the App Store / Play Store if the CLI suggests it.
