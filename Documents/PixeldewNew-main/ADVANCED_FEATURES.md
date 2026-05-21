# Advanced AI Features Documentation

## 🚀 Overview

PixelDew Dewbit Chat now supports advanced AI capabilities:

1. **Multi-Model Support** - Switch between 3 AI models
2. **Prompt Templates** - 6 different personalities
3. **Export Chat** - Save conversations in multiple formats

## 🧠 AI Models

All models powered by **Groq API** (completely FREE).

| Model | Speed | Capability | Best For |
|-------|-------|------------|----------|
| 🦙 **Llama 3.3 70B** | ⚡⚡ | ⭐⭐⭐ | Complex reasoning, detailed responses |
| 🎯 **Mixtral 8x7B** | ⚡⚡⚡ | ⭐⭐ | Balanced, general use |
| ✨ **Gemma 2 9B** | ⚡⚡⚡ | ⭐⭐ | Ultra-fast, real-time chat |

## 🎭 Prompt Templates

Choose from 6 different personalities:

1. **🌱 General Chat** (Default)
   - Playful, pixel-themed Dewbit
   - Great for casual conversations

2. **🐛 Debug Code**
   - Expert debugging assistant
   - Identifies root causes, suggests fixes

3. **✍️ Creative Writing**
   - Brainstorming partner
   - Helps develop stories and characters

4. **🔬 Explain Tech**
   - Technical educator
   - Breaks down complex concepts simply

5. **⚡ Productivity Coach**
   - Time management expert
   - Focus & motivation advice

6. **👀 Code Reviewer**
   - Professional feedback
   - Best practices & improvements

## 📤 Export Formats

Save your chat in multiple formats:

- **📄 JSON** - Structured data format (recommended for backup)
- **📝 Text** - Plain text with formatting
- **📑 Markdown** - Formatted document ready for sharing
- **📋 Copy** - Copy directly to clipboard

## 💾 Auto-Save Feature

Chats are automatically saved to browser localStorage:
- Persists across browser sessions
- No account needed
- Completely private (stored locally)

## 🔧 How to Use

### Settings Panel (⚙️)
1. Click the ⚙️ icon in chat header
2. Select preferred AI Model
3. Choose Prompt Template
4. Settings persist across sessions

### Export Panel (📤)
1. Click the 📤 icon in chat header
2. Choose export format
3. File downloads automatically

## 📝 API Integration

The chat API endpoint now supports:

```typescript
POST /api/chat

{
  messages: Message[],
  model?: string,           // Optional, defaults to llama-3.3-70b-versatile
  template?: string         // Optional, defaults to "general"
}
