# Video Demo Placeholder

## Demo Video Location

The demo video (`demo.mp4`) should be placed in the project root directory: `demo.mp4`

## Demo Content Checklist

The video demonstration should cover the following:

### 1. Introduction (0:00 - 0:30)
- ✅ Project overview
- ✅ Zama FHE Challenge submission
- ✅ Universal SDK goals

### 2. SDK Architecture (0:30 - 2:00)
- ✅ Monorepo structure walkthrough
- ✅ packages/fhevm-sdk core package
- ✅ Framework-agnostic design
- ✅ Wagmi-like API structure

### 3. Installation & Setup (2:00 - 3:00)
- ✅ Clone repository
- ✅ Single npm install command
- ✅ Workspace setup
- ✅ < 10 lines of code demo

### 4. SDK Core Features (3:00 - 5:00)
- ✅ FhevmClient initialization
- ✅ Encryption utilities
- ✅ Decryption with EIP-712
- ✅ Contract interactions
- ✅ Type definitions

### 5. React Integration (5:00 - 7:00)
- ✅ FhevmProvider setup
- ✅ useFhevm hook
- ✅ useEncrypt hook
- ✅ useDecrypt hook
- ✅ useContract hook

### 6. Next.js Example (7:00 - 9:00)
- ✅ App Router integration
- ✅ Server and client components
- ✅ Encryption flow demo
- ✅ Decryption flow demo
- ✅ Live contract interaction

### 7. Anonymous Reporting Example (9:00 - 11:00)
- ✅ Real-world use case
- ✅ Smart contract with FHE
- ✅ Frontend using SDK
- ✅ Complete workflow
- ✅ Deployed on Sepolia

### 8. Design Decisions (11:00 - 12:30)
- ✅ Why framework-agnostic
- ✅ Wagmi-like inspiration
- ✅ TypeScript benefits
- ✅ Modular architecture

### 9. Conclusion (12:30 - 13:00)
- ✅ Key features recap
- ✅ Developer benefits
- ✅ Future roadmap
- ✅ Call to action

## Recording Instructions

### Setup
1. Ensure all examples are running locally
2. Have multiple terminal windows ready
3. Prepare browser with examples open
4. Have code editor with key files open

### Recording Software
- OBS Studio (free, open-source)
- Loom (web-based)
- QuickTime (macOS)
- Screen capture tools

### Video Specifications
- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 30 FPS
- **Format**: MP4 (H.264)
- **Duration**: 10-15 minutes
- **Audio**: Clear narration
- **Subtitles**: Optional but recommended

### Script Outline

```
[Opening]
Hi, I'm presenting my submission for the Zama FHE Challenge - a universal, framework-agnostic FHEVM SDK.

[Problem]
Currently, building FHEVM dApps requires dealing with scattered dependencies and complex setup. Developers need a simple, consistent way to add FHE to their applications.

[Solution]
This SDK provides a wagmi-like experience for FHEVM development, working with React, Next.js, Vue, or vanilla JavaScript.

[Demo - Installation]
Let me show you how quick it is to get started...
[Shows: npm install, npm run dev:nextjs]

[Demo - Code]
Here's all the code you need...
[Shows: Provider setup, hook usage]

[Demo - Next.js]
Now let's see it in action in Next.js...
[Shows: Encryption, decryption, contract calls]

[Demo - Real Example]
And here's a real-world privacy-preserving application...
[Shows: Anonymous Reporting dApp]

[Architecture]
The SDK is built in layers - a framework-agnostic core, with optional React hooks on top...
[Shows: Code structure, type definitions]

[Conclusion]
With this SDK, developers can add FHE to their dApps in under 10 lines of code, with familiar wagmi-like patterns.

Thank you!
```

## Placeholder File

If the actual video is not yet recorded, place a text file at:
`demo.mp4.txt`

With content:
```
VIDEO DEMO PLACEHOLDER

This file serves as a placeholder for the demo video.
The actual demo.mp4 file will showcase:
- SDK installation and setup (< 10 lines)
- Framework-agnostic core usage
- React hooks integration
- Next.js example walkthrough
- Anonymous Reporting real-world use case
- Architecture and design decisions

Duration: ~13 minutes
Format: MP4 (1080p)
```

## Upload Instructions

Once recorded:
1. Name the file exactly: `demo.mp4`
2. Place in project root directory
3. Verify file size is reasonable (< 100MB recommended)
4. Test playback before submission
5. Consider uploading to YouTube as backup: [YouTube Upload](https://youtube.com/upload)

## YouTube Upload (Optional Backup)

If uploaded to YouTube:
1. Update README.md with YouTube link
2. Keep MP4 file in repository
3. Add YouTube link to submission

Example README update:
```markdown
## 🎬 Demo

📺 **Video Demo:**
- [Download MP4](./demo.mp4)
- [Watch on YouTube](https://youtu.be/YOUR_VIDEO_ID)
```
