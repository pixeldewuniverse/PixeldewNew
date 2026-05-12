# Advanced AI Features Documentation

## 🎯 Overview

This branch adds three major features to the Dewbit chatbot:

1. **Multi-Model Support** - Switch between different Groq AI models
2. **Prompt Templates** - Choose from 6 different personality templates
3. **Export Chat** - Save conversations in multiple formats

---

## 🧠 Multi-Model Support

### Available Models

#### 🦙 Llama 3.3 70B (Most Capable)
- **Speed:** ⚡⚡ (Medium)
- **Capability:** ⚡⚡⚡ (High)
- **Context:** 8,192 tokens
- **Best for:** Complex reasoning, detailed responses, technical tasks

#### 🎯 Mixtral 8x7B (Balanced)
- **Speed:** ⚡⚡⚡ (Fast)
- **Capability:** ⚡⚡ (Medium)
- **Context:** 32,768 tokens
- **Best for:** General use, balanced performance, real-time chat

#### ✨ Gemma 2 9B (Fastest)
- **Speed:** ⚡⚡⚡ (Very Fast)
- **Capability:** ⚡⚡ (Medium)
- **Context:** 8,192 tokens
- **Best for:** Quick responses, real-time interactions

### How to Switch

1. Click **⚙️** icon in the chat header
2. Select a model from the dropdown
3. Model persists for the session
4. API automatically uses selected model

---

## 🎭 Prompt Templates

### Available Personalities

| Template | Emoji | Use Case |
|----------|-------|----------|
| **General Chat** | 🌱 | Default playful Dewbit (default) |
| **Debug Code** | 🐛 | Code debugging & troubleshooting |
| **Creative Writing** | ✍️ | Brainstorming & story ideas |
| **Explain Tech** | 🔬 | Technical concepts made simple |
| **Productivity Coach** | ⚡ | Task management & motivation |
| **Code Reviewer** | 👀 | Professional code feedback |

### How to Change Personality

1. Click **⚙️** icon in the chat header
2. Select personality from the "Personality" dropdown
3. Personality changes immediately
4. Setting persists for the session

### Template System Prompts

Each template has a custom system prompt that shapes Dewbit's responses:

- **Code Reviewer** focuses on constructive feedback and best practices
- **Creative Writing** encourages brainstorming and narrative techniques
- **Explain Tech** breaks down complex concepts with analogies
- **Debug Code** provides step-by-step debugging guidance

---

## 📤 Export Chat

### Export Formats

#### 1. **JSON** 📄
- Structured data format
- Includes metadata (timestamp, message count)
- Best for: Data analysis, archival

```json
{
  "exportDate": "2026-05-12T22:30:00.000Z",
  "messages": [
    {
      "role": "user",
      "content": "...",
      "timestamp": 1234567890
    }
  ],
  "totalMessages": 15
}
```

#### 2. **Plain Text** 📝
- Human-readable format
- Numbered messages with timestamps
- Best for: Quick reading, sharing

```
[1] 👤 You (22:15:30)
Hello Dewbit!

[2] 🌱 Dewbit (22:15:35)
Heyyy! 🌱 What's up?
```

#### 3. **Markdown** 📑
- Formatted for documentation
- GitHub-compatible format
- Best for: Blogs, wikis, documentation

```markdown
### 👤 You
Hello Dewbit!

### 🌱 Dewbit
Heyyy! 🌱 What's up?
```

#### 4. **Copy to Clipboard** 📋
- Paste directly into other apps
- Plain text format
- Best for: Quick sharing, immediate use

### How to Export

1. Click **📤** icon in the chat header
2. Choose export format:
   - **📄 Export as JSON** - Machine-readable format
   - **📝 Export as Text** - Plain text with timestamps
   - **📑 Export as Markdown** - Formatted markdown
   - **📋 Copy to Clipboard** - Quick clipboard copy
3. File downloads or copies automatically
4. Status message confirms export

---

## 💾 Auto-Save Feature

- Chat automatically saves to browser's **localStorage**
- Saves after each message exchange
- Persists even after browser closes
- Automatically loads on next session

---

## 🔧 Implementation Details

### Files Added

```
lib/
├── promptTemplates.ts    # 6 personality templates
├── groqModels.ts         # 3 AI models configuration
└── exportChat.ts         # Export functionality

app/api/
└── chat/route.ts         # Updated API with model & template support

components/
└── DewbitChat.tsx        # Enhanced component with UI
```

### Backend Changes

API endpoint now accepts:

```typescript
{
  messages: Message[],
  model?: string,      // "llama-3.3-70b-versatile" (default)
  template?: string    // "general" (default)
}
```

### Frontend State

```typescript
selectedModel: string;     // Current AI model
selectedTemplate: string;  // Current personality
showSettings: boolean;     // Settings panel visibility
showExport: boolean;       // Export panel visibility
exportStatus: string;      // Export confirmation message
```

---

## 🚀 Usage Examples

### Switch to Fastest Model for Real-Time Chat

1. Open settings (⚙️)
2. Select "✨ Gemma 2 9B"
3. Chat is now faster but slightly less capable

### Get Debug Help

1. Open settings (⚙️)
2. Select "🐛 Debug Code" template
3. Paste your buggy code
4. Dewbit will provide step-by-step debugging

### Save Important Conversation

1. Click export (📤)
2. Choose "📑 Export as Markdown"
3. Share on documentation or blog

---

## ✅ Testing Checklist

- [ ] Switch between all 3 models - responses change
- [ ] Switch between all 6 templates - personality changes
- [ ] Export as JSON - valid JSON file
- [ ] Export as Text - readable format
- [ ] Export as Markdown - GitHub compatible
- [ ] Copy to clipboard - text copies correctly
- [ ] Auto-save - messages persist after refresh
- [ ] Settings persist - model/template stick for session

---

## 💰 Cost Analysis

| Feature | Cost |
|---------|------|
| Groq API (3 models) | **FREE** |
| Export (all formats) | **FREE** |
| localStorage (auto-save) | **FREE** |
| **Total** | **$0** |

Groq offers generous free tier with no credit card required!

---

## 🔄 Future Enhancements

Possible additions:

- [ ] Fine-tuned personality customization
- [ ] More export formats (CSV, PDF)
- [ ] Cloud sync for chat history
- [ ] Model-specific system prompts
- [ ] Temperature/creativity slider
- [ ] Token usage display
- [ ] Chat session history
- [ ] Favorite conversations

---

## 📝 Environment Variables

Required:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Get key from: https://console.groq.com

---

## 🎓 How It Works

### Model Selection Flow

```
User selects model
    ↓
Frontend stores in state
    ↓
Send to API with selectedModel
    ↓
API routes to Groq endpoint
    ↓
Groq processes with selected model
    ↓
Response returned with model info
```

### Template Selection Flow

```
User selects template
    ↓
Template system prompt loaded
    ↓
Sent to API
    ↓
API includes in system message
    ↓
Groq uses custom prompt
    ↓
Personality changes in response
```

### Export Flow

```
User clicks export format
    ↓
Export function formats messages
    ↓
Blob created
    ↓
Browser download triggered
    ↓
File saved to Downloads
```

---

## 🐛 Troubleshooting

### "API key not configured"
- Check `.env.local` has `GROQ_API_KEY`
- Get key from https://console.groq.com
- Restart dev server after setting env var

### Export not working
- Check browser allows downloads
- Clear localStorage if corrupted
- Try different export format

### Settings don't persist
- Settings persist only for current session
- Refresh clears settings (by design)
- Auto-save only saves messages, not settings

---

## 📚 Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Browser localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)

---

## ✨ Credits

Built with ❤️ for **PixelDew Universe** by **Copilot**
