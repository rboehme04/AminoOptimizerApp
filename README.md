# AminoOptimizer

Eine Expo-(React Native)-App. Starte sie auf deinem Smartphone mit **Expo Go**.

## Voraussetzungen

- **Node.js** (v18 oder neuer empfohlen; [nodejs.org](https://nodejs.org))
- **npm** (ist bei Node.js dabei)
- **Expo Go** auf deinem Smartphone:
  - [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)
  - [Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Einrichten und starten

### 1. Abhängigkeiten installieren

```bash
cd AminoOptimizer
npm install
```

### 3. Umgebungsvariablen

Die Supabase-URL und der Public Key sind in `.env` gespeichert und müssen in der Regel nicht angepasst werden.

Der LLM-Aufruf erfolgt über eine Supabase Edge Function, daher müssen keine LLM-Tokens eingefügt werden.

### 4. Entwicklungsserver starten

```bash
npx expo start
```

Ein QR-Code erscheint im Terminal.

### 5. App in Expo Go öffnen

- **iPhone:** Öffne die **Kamera**-App, scanne den QR-Code und tippe dann auf das Banner, um in Expo Go zu öffnen.
- **Android:** Öffne die **Expo Go**-App, tippe auf **„Scan QR code“** und scanne dann den QR-Code aus Terminal.

**Wichtig:** Smartphone und Computer müssen im **gleichen WLAN/LAN** sein.

## Aufräumen nach dem Testen

Um alle installierten Abhängigkeiten zu entfernen (und Speicherplatz freizugeben), lösche den Ordner `node_modules` aus dem Projekt.

Um das Projekt vollständig zu entfernen, lösche den gesamten Projektordner (`AminoOptimizer`) von deinem Computer.